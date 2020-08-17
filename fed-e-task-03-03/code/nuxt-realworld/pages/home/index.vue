<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href>Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href>Global Feed</a>
              </li>
              <li class="nav-item" v-if="tag">
                <a class="nav-link active" href>#{{tag}}</a>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="item in articles" :key="item.slug">
            <div class="article-meta">
              <nuxt-link :to="{name:'profile',params:{username:item.author.username}}">
                <img :src="item.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{name:'profile',params:{username:item.author.username}}"
                  class="author"
                >{{item.author.username}}</nuxt-link>
                <span class="date">{{item.createdAt}}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{active:item.favorited}">
                <i class="ion-heart"></i>
                {{item.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{name:'article',params:{slug:item.slug}}" class="preview-link">
              <h1>{{item.title}}</h1>
              <p>{{item.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <nav v-if="totalPage">
            <ul class="pagination">
              <li
                class="page-item"
                :class="{'active':page==item}"
                v-for="item in totalPage"
                :key="item.slug"
              >
                <nuxt-link class="page-link" :to="{name:'HomeIndex',query:{limit,page:item,tag}}">{{item}}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{name:'HomeIndex',query:{limit,page,tag:item}}"
                class="tag-pill tag-default"
                v-for="(item, index) in tags"
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
import { getArticles, getTags,setFollow,deleteFollow } from '@/utils/api'
export default {
  name: 'HomeIndex',
  async asyncData({ query }) {
    const tag = query.tag
    const page = Number.parseInt(query.page) || 1
    const limit = 10
    const { data } = await getArticles({ limit, offset: (page - 1) * limit ,tag})

    const { data: tagData } = await getTags()
    return {
      tag,
      page,
      limit,
      articles: data.articles,
      articlesCount: data.articlesCount,
      tags: tagData.tags,
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit) || 0
    },
  },
  watchQuery: ['page','tag'],
}
</script>

<style lang='scss' scoped>
</style>
