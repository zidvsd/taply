export { cn } from "cn"

//  generate google maps url from address
export function getGoogleMapsUrl(businessName: string, placeId: string) {
  const query = encodeURIComponent(businessName)

  return `https://www.google.com/maps/search/?api=1&query=${query}&query_place_id=${placeId}`
}
