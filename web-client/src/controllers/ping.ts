import http from "@/http"

export const ping = async () => {
  return http.get('ping').then(res => res.data)
}