import { Handler } from "@netlify/functions"

import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI

function generateRegex(term: string) { 
  return new RegExp(term.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "i")
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

    const raw = client.db("opensearch").collection("raw")

    let regex = generateRegex(event.queryStringParameters.q)

    let results = [
      ...(await raw.find({href:regex}).toArray()),
      ...(await raw.find({title:regex}).toArray()),
      ...(await raw.find({description:regex}).toArray())
    ]
    
    results = uniqBy(results, (result)=>result.href)
    results = uniqBy(results, (result)=>result.title)

    results = results.sort((a, b)=> b.numLinks - a.numLinks)

    await client.close()

    return {
      statusCode: 200,
      body: JSON.stringify(
        results.map((result)=>({
          href: result.href,
          title: result.title,
          description: result.description
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