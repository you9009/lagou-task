const cookieparser = process.server ? require('cookieparser') : require('js-cookie')

export const state = () => {
  return {
    user: process.client ? JSON.parse(cookieparser.get('user') || 'null') : null
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let user = null
    if (req && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {}
    }
    commit('setUser', user)
  }
}
