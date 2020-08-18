<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  type="text"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  placeholder="What's this article about?"
                  type="text"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  placeholder="Write your article (in markdown)"
                  rows="8"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  @keyup.enter="addTag"
                  class="form-control"
                  placeholder="Enter tags"
                  type="text"
                  v-model="tag"
                />
                <div class="tag-list"></div>
                <span
                  :key="item+index"
                  style="margin:5px"
                  v-for="(item,index) in article.tagList"
                >{{item}}</span>
              </fieldset>
              <button
                @click="onSubmit"
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
              >Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticles } from '@/utils/api'
export default {
  name: 'editor',
  middleware: ['auth'],
  data() {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      tag: ''
    }
  },
  methods: {
    async onSubmit() {
      try {
        await createArticles({ article: this.article })
        this.article = {
          title: '',
          description: '',
          body: '',
          tagList: []
        }
        this.$router.push('/')
      } catch (error) {}
    },
    addTag() {
      if (this.tag) {
        this.article.tagList.push(this.tag)
        this.tag = ''
      }
    }
  }
}
</script>
