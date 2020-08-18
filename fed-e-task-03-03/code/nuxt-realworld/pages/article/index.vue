<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>
        <div class="article-meta">
          <nuxt-link :to="{name: 'profile',params: {usrname: article.author.username}}">
            <img :src="article.author.image" />
          </nuxt-link>
          <div class="info">
            <nuxt-link
              :to="{name: 'profile',params: {usrname: article.author.username}}"
              class="author"
            >{{article.author.username}}</nuxt-link>
            <span class="date">{{article.createAt | date('MMM DD, YYYY')}}</span>
          </div>
          <button
            :class="{active: article.author.following}"
            class="btn btn-sm btn-outline-secondary"
          >
            <i class="ion-plus-round"></i>
            &nbsp; Follow Eric Simons
            <span class="counter">(10)</span>
          </button>
          &nbsp;&nbsp;
          <button
            :class="{active: article.favorited}"
            class="btn btn-sm btn-outline-primary"
          >
            <i class="ion-heart"></i>
            &nbsp; Favorite Post
            <span class="counter">(29)</span>
          </button>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>
      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <nuxt-link :to="{name: 'profile',params: {usrname: article.author.username}}">
            <img :src="article.author.image" />
          </nuxt-link>
          <div class="info">
            <nuxt-link
              :to="{name: 'profile',params: {usrname: article.author.username}}"
              class="author"
            >{{article.author.username}}</nuxt-link>
            <span class="date">{{article.createAt | date('MMM DD, YYYY')}}</span>
          </div>
          <button
            :class="{active: article.author.following}"
            class="btn btn-sm btn-outline-secondary"
          >
            <i class="ion-plus-round"></i>
            &nbsp; Follow Eric Simons
            <span class="counter">(10)</span>
          </button>
          &nbsp;&nbsp;
          <button
            :class="{active: article.favorited}"
            class="btn btn-sm btn-outline-primary"
          >
            <i class="ion-heart"></i>
            &nbsp; Favorite Post
            <span class="counter">(29)</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
                v-model="comment"
              ></textarea>
            </div>
            <div class="card-footer">
              <img :src="user.image" class="comment-author-img" />
              <button @click="addComment" class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>

          <div :key="comment.id" class="card" v-for="comment in comments">
            <div class="card-block">
              <p class="card-text">{{comment.body}}</p>
            </div>
            <div class="card-footer">
              <nuxt-link
                :to="{name: 'profile',params: {usrname: comment.author.username}}"
                class="comment-author"
              >
                <img :src="comment.author.image" class="comment-author-img" />
              </nuxt-link>&nbsp;
              <nuxt-link
                :to="{name: 'profile',params: {usrname: comment.author.username}}"
                class="comment-author"
              >{{comment.author.username}}</nuxt-link>
              <span class="date-posted">{{comment.createAt | date('MMM DD, YYYY')}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, getComments, addComments, deleteComments } from '@/utils/api'
export default {
  name: 'article',
  data() {
    return {
      comments: [],
      comment: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    this.getComments()
  },
  async asyncData({ params }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article: data.article
    }
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ]
    }
  },
  methods: {
    async getComments() {
      const { data } = await getComments(this.article.slug)
      this.comments = data.comments
    },
    async addComment() {
      try {
        const { data } = await addComments({
          slug: this.article.slug,
          comment: this.comment
        })
        console.log(data)
        debugger
      } catch (error) {
        console.dir(error)
      }
    },
    async deleteComment(id) {
      try {
        const { data } = await deleteComments({ slug: this.article.slug, id })
      } catch (error) {
        console.dir(error)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
