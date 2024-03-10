export default function (instance) {
  return {
    async getProducts(url, payload = '') {
      return await instance.get(url + `?${payload}`)
    },
    async getCategories(url, payload = '') {
      return await instance.get(url + `?${payload}`)
    },
  }
}
