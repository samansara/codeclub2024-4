import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET(request) {
  const region = request.cf.region
  const city = request.cf.city

  const answer = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
    prompt: `Can you write me a funny poem about ${city}, ${region}?`,
    stream: true
  })

  return new Response(answer, {
    headers: {
      "content-type": "text/event-stream"
    }
  })
}