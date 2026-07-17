import axios from 'axios'

export const baseURL = import.meta.env.VITE_API_BASE_URL || ''

export const api = axios.create({
  baseURL,
  withCredentials: true
})

export function useApi() {
  const get = async (url) => {
    try {
      const res = await api.get(url)
      return res.data
    } catch (err) {
      throw err.response ? new Error(`HTTP error! status: ${err.response.status}`) : err
    }
  }

  const post = async (url, data) => {
    try {
      const res = await api.post(url, data)
      return res.data
    } catch (err) {
      throw err.response ? new Error(`HTTP error! status: ${err.response.status}`) : err
    }
  }

  const upload = async (url, formData) => {
    try {
      const res = await api.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return res.data
    } catch (err) {
      throw err.response ? new Error(`HTTP error! status: ${err.response.status}`) : err
    }
  }

  return { get, post, upload, api }
}
