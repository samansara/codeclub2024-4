import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET(request) {

  const responseOptions = {
    1: "New York City: The Big Apple",
    2: "Chicago: The Windy City",
    3: "Detroit: The Motor City",
    4: "Las Vegas: Sin City"
  }

  const maxInt = 4;
  const randomInt = math.ceil(math.random() * maxInt)
  let randomResponse = responseOptions[randomInt]
  return new Response(randomResponse)
}
