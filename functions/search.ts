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
    console.time("initializing client")
    const client = new MongoClient(uri)

    await client.connect()
    console.timeEnd("initializing client")

    const raw = client.db("opensearch").collection("raw")

    let page = parseInt(event.queryStringParameters.page || '0')

    let results = await raw.aggregate([
      {
        '$search': {
          'index': 'raw',
          'text': {
            'query': event.queryStringParameters.q,
            'path': {
              'wildcard': '*'
            }
          }
        }
      }
    ]).toArray()
    
    results = uniqBy(results, (result)=>result.href)
    results = uniqBy(results, (result)=>result.title)

    // results = results.map((result)=>{
    //   let sources = sigmoid(result.numLinks/100) * 3
    //   let titleLength = sigmoid(50-result.title.length) * 3

    //   return {
    //     ...result,
    //     score: sources + titleLength
    //   }
    // })

    results = results.sort((a, b)=> b.score - a.score)

    await client.close()

    return {
      statusCode: 200,
      body: JSON.stringify(
        results.map((result)=>({
          href: result.href,
          title: result.title,
          description: result.description,
          screenshot: result.screenshot
        })).slice(page * 40, (page + 1) * 40)
      )
    }
  }
  catch(err) {
    console.log(err)
  }
  return {
    statusCode: 404
  }
}

export { handler };