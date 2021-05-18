import axios from 'axios'

const baseUrl = '/api/books'

const getAll = (successCallback, errorCallback) => {
  const request = axios.get(baseUrl)
  request.then(response => successCallback(response.data))
    .catch(error => errorCallback(error))
}

const create = (book, successCallback, errorCallback) => {
  const request = axios.post(baseUrl, book)
  request.then(response => successCallback(response.data))
    .catch(error => errorCallback(error))
}

const update = (book, successCallback, errorCallback) => {
  const request = axios.put(`${baseUrl}/${book.id}`, book)
  request.then(response => successCallback(response.data))
    .catch(error => errorCallback(error))
}

const remove = (id, successCallback, errorCallback) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  request.then(response => successCallback(response.data))
    .catch(error => errorCallback(error))
}

export default { getAll, create, update, remove }