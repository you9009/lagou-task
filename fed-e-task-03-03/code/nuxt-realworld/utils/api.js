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

export const updateUser = (data) => {
  return request({
    method: 'PUT',
    url: '/api/user',
    params: {
      user: data
    }
  })
}

// 获取文章列表
export const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags'
  })
}

export const getProfile = (username) => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`
  })
}

// 获取文章列表
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

export const createArticles = (params) => {
  return request({
    method: 'POST',
    url: '/api/articles',
    params
  })
}

export const getYourFeedArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

export const addFavorite = (slug) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

export const deleteFavorite = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

export const getArticle = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

export const getComments = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

export const addComments = ({ slug, comment }) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    params: {
      comment: {
        body: comment
      }
    }
  })
}

export const deleteComments = ({ slug, id }) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`
  })
}
