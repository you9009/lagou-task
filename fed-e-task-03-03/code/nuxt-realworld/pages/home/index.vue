<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Nuxt</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'your_feed'}"
                  exact
                  :to="{ path: '', query: {tab: 'your_feed'}}"
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'global_feed'}"
                  exact
                  :to="{ path: ''}"
                >Global Feed</nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{active: tab === 'tag'}"
                  exact
                  :to="{path: '', query: {tab: 'tag',tag: tag}}"
                ># {{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="(item, index) in articles" :key="index">
            <div class="article-meta">
              <nuxt-link :to="{path: 'profile',query: {username: item.author.username}}">
                <img :src="item.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{ path: 'profile',query: {username: item.author.username}}"
                >{{ item.author.username }}</nuxt-link>
                <span class="date">{{ item.createdAt | date("MMM DD, YYYY") }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{active: item.favorited}"
                @click="onFavorite(item)"
                :disabled="favoriteDisabled"
              >
                <i class="ion-heart"></i>
                {{ item.favoritesCount }}
              </button>
            </div>
            <nuxt-link class="preview-link" :to="{path: 'article',query: {slug: item.slug}}">
              <h1>{{ item.title }}</h1>
              <p>{{ item.description }}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li
                  class="tag-default tag-pill tag-outline"
                  v-for="tag in item.tagList"
                  :key="tag"
                >{{ tag }}</li>
              </ul>
            </nuxt-link>
          </div>
          <nav>
            <ul class="pagination">
              <li
                :class="{ active: item === page }"
                :key="item"
                class="page-item"
                v-for="item in totalPage"
              >
                <nuxt-link
                  :to="{named:'home',query: {page: item,tag: tag,tab: tab}}"
                  class="page-link"
                >{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar" v-if="tagList">
            <p>热门标签</p>
            <div class="tag-list">
              <nuxt-link
                class="tag-pill tag-default"
                :to="{path: '',query: {tab: 'tag',tag: item}}"
                v-for="(item, index) in tagList"
                :key="index"
              >{{item}}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTags, getArticles, getYourFeedArticles, addFavorite, deleteFavorite } from '@/store/api';
import { mapState } from 'vuex'
export default {
  name: 'home',
  middleware: 'notAuthenticated',
  async asyncData ({ query }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 10
    const tab = query.tab || 'global_feed'
    const tag = query.tag
    const loadArticles = tab === 'global_feed' ? getArticles : tab == 'tag' ? getArticles : getYourFeedArticles


    const { data: Articles } = await loadArticles({ limit, offset: (page - 1) * limit, tag })
    const { data: Tags } = await getTags()

    const { articlesCount, articles } = Articles
    const { tags } = Tags

    let loadStatus = articles.length < limit ? 2 : 1
    articles.forEach((article) => (article.favoriteDisabled = false))

    return {
      articlesCount,
      articles,
      limit,
      loadStatus,
      page,
      tab,
      tag,
      tags,
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    },
    tagList () {
      return this.tags.slice(0, 20)
    },
    favoriteDisabled: {
      get () {
        return !this.user
      },
      set () { }
    }
  },
  methods: {
    pageChange (page) {
      this.loadStatus = 0
      this.$router.replace({
        name: 'home',
        query: { ...this.$route.query, page }
      })
    },
    async getTags () {
      let { data: { tags } } = await getTags()
      this.tags = tags
    },
    async onFavorite (article) {
      if (this.user) {
        this.favoriteDisabled = true
        if (article.favorited) {
          // 取消点赞
          await deleteFavorite(article.slug)
          article.favorited = false
          article.favoritesCount += -1
        } else {
          // 添加点赞
          await addFavorite(article.slug)
          article.favorited = true
          article.favoritesCount += 1
        }
        this.favoriteDisabled = false
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>
