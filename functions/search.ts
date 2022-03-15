import { Handler } from "@netlify/functions"

import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI

const handler: Handler = async (event, context) => {
  try{
    const client = new MongoClient(uri)

    await client.connect()

    const raw = client.db("opensearch").collection("raw")

    const results = await raw.find({}).toArray()

    client.close()

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