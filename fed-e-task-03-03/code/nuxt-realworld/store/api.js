import { request } from '@/plugins/request'

// 用户登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

// 用户注册
export const register = (data) => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}

// 更改用户信息
export const update = (data) => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data
  })
}

// 获取个人信息
export const getProfiles = (username) => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`
  })
}

// 获取标签
export const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags'
  })
}

// 获取公共文章列表
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取你的文章列表
export const getYourFeedArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

// 发布文章
export const publishArticle = (data) => {
  return request({
    method: 'POST',
    url: `/api/articles`,
    data
  })
}

// 添加点赞
export const addFavorite = (slug) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞
export const deleteFavorite = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export const getArticle = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 删除文章
export const delArticle = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`
  })
}

// 修改文章
export const modifyArticle = (slug, data) => {
  return request({
    method: 'PUT',
    url: `/api/articles/${slug}`,
    data
  })
}

// 获取文章评论
export const getComments = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

// 发布评论
export const publishComments = (slug, data) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data
  })
}

// 删除评论
export const delComment = (slug, id) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`
  })
}

// 跟随某人
export const follow = (username) => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`
  })
}

// 取消
export const unFollow = (username) => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`
  })
}
