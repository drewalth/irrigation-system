import http from "@/http"

export const openValve = async () => {
  return http.get('valve-open').then(res => res.data)
}

export const closeValve = async () => {
  return http.get('valve-close').then(res => res.data)
}