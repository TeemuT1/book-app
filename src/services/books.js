import axios from 'axios'

const baseUrl = '/api/books'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (book) => {
  const request = axios.post(baseUrl, book)
  return request.then(response => response.data)
}

const update = (book) => {
  const request = axios.put(`${baseUrl}/${book.id}`, book)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }