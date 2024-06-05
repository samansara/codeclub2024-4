import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET(request) {
  const region = request.cf.region
  const city = request.cf.city

  return new Response(`You are from ${city}, ${region}`, 200)

  if (!city || !region) {
    return new Response("City or Region is null", 403)
  }

  const answer = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
    prompt: `Can you write me a funny poem about ${city}, ${region}?`,
    stream: true
  })

  if (!answer) {
    return new Response("AI failed to return a response", 403)
  }

  return new Response(answer, {
    headers: {
      "content-type": "text/event-stream"
    }
  })
}