import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET(request) {

  const myKV = getRequestContext().env.PAGES_AUTHTOKENS
  const userID = request.headers.get("UserID")

  if (!userID) {
    return new Response("UserID is missing", { status: 404 })
  }

  const value = await myKV.get(userID)

  if (!value) {
    return new Response("UserID is not valid", { status: 404 })
  }

  else {
    let newRequest = new Request(request)
    newRequest.headers.set("Auth-Token", value)
    let authValue = newRequest.headers.get("Auth-Token")
    console.log(authValue)
    return new Response(`User token for UserID:${userID} added to Auth-Token header`, { status: 200 })
  }
}
