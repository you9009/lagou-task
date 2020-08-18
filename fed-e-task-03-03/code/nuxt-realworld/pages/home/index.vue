<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">nuxt</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  :class="{ active: tab === 'your_feed' }"
                  :to="{name: 'home',query: {tab: 'your_feed'}}"
                  class="nav-link"
                  exact
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  :class="{ active: tab === 'global_feed' }"
                  :to="{name: 'home'}"
                  class="nav-link"
                  exact
                >Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  :class="{ active: tab === 'tag' }"
                  :to="{name: 'home',query: {tab: 'tag',tag}}"
                  class="nav-link"
                  exact
                ># {{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>

          <div :key="article.slug" class="article-preview" v-for="article in articles">
            <div class="article-meta">
              <nuxt-link :to="{name: 'profile',params: {username: article.author.username}}">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{name: 'profile',params: {username: article.author.username}}"
                  class="author"
                >{{ article.author.username }}</nuxt-link>
                <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
              </div>
              <button
                :class="{ active: article.favorited }"
                :disabled="article.loading"
                @click="onFavorite(article)"
                class="btn btn-outline-primary btn-sm pull-xs-right"
              >
                <i class="ion-heart"></i>
                {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{name: 'article',params: {slug: article.slug}}" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li
                  :key="tag"
                  class="tag-default tag-pill tag-outline"
                  v-for="tag in article.tagList"
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
                  :to="{name: 'home',query: {page: item,tag: $route.query.tag,tab: tab}}"
                  class="page-link"
                >{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link
                :key="item"
                :to="{name: 'home',query: {tag: item,tab: 'tag'}}"
                class="tag-pill tag-default"
                v-for="item in tags"
              >{{ item }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getYourFeedArticles, addFavorite, deleteFavorite, getTags } from '@/utils/api'
import { mapState } from 'vuex'
export default {
  name: 'home',
  async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 10
    const tab = query.tab || 'global_feed'
    const tag = query.tag
    const loadArticles =
      tab === 'global_feed' ? getArticles : tab == 'tag' ? getArticles : getYourFeedArticles

    const articleRes = await loadArticles({
      limit,
      offset: (page - 1) * limit,
      tag
    })
    const tagRes = await getTags()
    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data
    articles.forEach((article) => {
      article.loading = false
    })
    return {
      articles,
      articlesCount,
      tags,
      limit,
      page,
      tab,
      tag
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    async onFavorite(article) {
      article.loading = true
      if (article.favorited) {
        // 取消点赞
        try {
          await deleteFavorite(article.slug)
          article.favorited = false
          article.favoritesCount -= 1
        } catch (error) {
          console.log('error: ', error)
          alert('please login')
        }
      } else {
        try {
          await addFavorite(article.slug)
          article.favorited = true
          article.favoritesCount += 1
        } catch (error) {
          console.log('error: ', error)
          alert('please login')
        }
      }
      article.loading = false
    }
  }
}
</script>
