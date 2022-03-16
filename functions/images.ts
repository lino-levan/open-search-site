import { Handler } from "@netlify/functions"

import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI

function generateRegex(term: string) { 
  return new RegExp(term.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "i")
}

function sigmoid(num: number) {
  return 1/(1 + Math.pow(Math.E, -num))
}

// https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
function uniqBy(a: any, key: any) {
  var seen = {};
  return a.filter(function(item) {
      var k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  })
}

const handler: Handler = async (event, context) => {

  console.log(event.queryStringParameters)

  try{
    const client = new MongoClient(uri)

    await client.connect()

    const raw = client.db("opensearch").collection("images")

    let regex = generateRegex(event.queryStringParameters.q)

    let results = [
      ...(await raw.find({alt:regex}).toArray()),
      ...(await raw.find({title:regex}).toArray()),
      ...(await raw.find({description:regex}).toArray())
    ]
    
    results = uniqBy(results, (result)=>result.src)
    results = uniqBy(results, (result)=>result.href)
    results = uniqBy(results, (result)=>result.title)

    results = results.map((result)=>{
      let sources = sigmoid(result.numLinks/100) * 3
      let titleLength = sigmoid(50-result.title.length) * 3
      let isInTitle = regex.test(result.title) ? 1 : 0
      let hasAltText = result.alt.length > 0 ? 1 : 0

      return {
        ...result,
        score: sources + titleLength + isInTitle + hasAltText
      }
    })

    results = results.sort((a, b)=> b.score - a.score)

    await client.close()

    return {
      statusCode: 200,
      body: JSON.stringify(
        results.map((result)=>({
          src: result.src,
          title: result.title,
          href: result.href,
          alt: result.alt,
          width: result.width,
          height: result.height
        }))
      )
    }
  }
  catch(err) {
    console.log("BRO", err)
  }
  return {
    statusCode: 404
  }
}

export { handler };