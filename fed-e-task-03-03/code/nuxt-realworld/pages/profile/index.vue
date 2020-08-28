<template>
  <div class="profile-page">
    <div class="user-info" v-if="profile">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <button
              v-if="user"
              class="btn btn-sm btn-outline-secondary action-btn"
              :disabled="disabledFollow"
              @click="follow"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ profile.following ? "Unf" : "F" }}ollow
              {{ profile.username }}
            </button>
            <nuxt-link
              ui-sref="app.settings"
              v-else
              class="btn btn-sm btn-outline-secondary action-btn"
              to="/settings"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <nuxt-link
                class="nav-item"
                v-for="ta in tabs"
                :key="ta.name"
                :to="{
                  path: $route.path,
                  query: {
                    ...$route.query,
                    tab: ta.id,
                    page: 1,
                  },
                }"
              >
                <span class="nav-link" :class="{ active: ta.id == tab }">
                  {{
                  ta.name
                  }}
                </span>
              </nuxt-link>
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
          <div class="col-md-3">
            <el-pagination
              v-if="totalPage > 1"
              :page-size="limit"
              layout="prev, pager, next"
              @current-change="pageChange"
              :total="articlesCount"
            ></el-pagination>
            <nav>
              <ul class="pagination" v-if="totalPage > 1">
                <li
                  class="page-item"
                  :class="{
                    active: item === page,
                  }"
                  v-for="item in totalPage"
                  :key="item"
                >
                  <nuxt-link
                    class="page-link"
                    :to="{
                      path: $route.path,
                      query: {
                        ...$route.query,
                        page: item,
                      },
                    }"
                  >{{ item }}</nuxt-link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getProfiles, follow, unFollow } from '@/store/api'
import { mapState } from 'vuex'

export default {
  middleware: 'notAuthenticated',
  name: 'profile',
  watchQuery: ['page', 'tab', 'limit', 'username'],
  async asyncData ({ query }) {

    let page = Number.parseInt(query.page) || 1
    let limit = 5
    let offset = (page - 1) * limit
    let tab = query.tab || undefined
    let param = {
      limit,
      offset,
      tab
    }

    let getArticle =
      tab == 'favorite'
        ? getArticles({ ...param, favorited: query.username })
        : getArticles({ ...param, author: query.username })

    let { data: Profiles } = await getProfiles(query.username)
    let { data: Articles } = await getArticle
    const { profile } = Profiles
    const { articles } = Articles

    return {
      tab,
      page,
      limit,
      offset,
      profile,
      articles
    }
  },
  data () {
    return {
      tabs: [
        {
          name: 'My Articles',
          id: undefined
        },
        {
          name: 'Favorited Articles',
          id: 'favorite'
        }
      ],
      disabledFollow: false
    }
  },
  computed: {
    ...mapState(['user']),
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit) || 1
    },
    favoriteDisabled () {
      return !this.user
    }
  },
  created () {
    if (this.user) {
      this.disabledFollow = this.user.username == this.profile.username
    }
  },
  methods: {
    async follow () {
      if (this.disabledFollow) return
      try {
        this.disabledFollow = true
        if (this.profile.following) {
          await unFollow(this.profile.username)
        } else {
          await follow(this.profile.username)
        }
        this.profile.following = !this.profile.following
      } catch (err) { } finally {
        this.disabledFollow = false
      }
    },
    pageChange (page) {
      this.loadStatus = 0
      this.$router.replace({
        name: this.$route.name,
        query: {
          ...this.$route.query,
          page
        }
      })
    }
  }
}
</script>
