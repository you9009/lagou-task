import request from '@/utils/request'

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

export const register = (data) => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}

export const setUsers = (data) => {
  return request({
    method: 'PUT',
    url: '/api/users',
    data
  })
}

export const setArticles = (data) => {
  return request({
    method: 'POST',
    url: '/api/articles',
    data
  })
}

export const getProfiles = (params) => {
  return request({
    method: 'GET',
    url: '/api/profiles/'+params,
  })
}

export const setFollow = (data) => {
  return request({
    method: 'POST',
    url: '/api/profiles/' + data + '/follow'
  })
}

export const deleteFollow = (data) => {
  return request({
    method: 'DELETE',
    url: '/api/profiles/' + data + '/follow'
  })
}

export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

export const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags'
  })
}
