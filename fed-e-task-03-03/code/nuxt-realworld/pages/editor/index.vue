<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  v-model="article.title"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  v-model="article.description"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  v-model="article.body"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="tag"
                  @keyup.enter="addTag"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
                <span
                  v-for="(item,index) in article.tagList"
                  style="margin:5px"
                  :key="item+index"
                >{{item}}</span>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onSubmit"
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
        tagList: [],
      },
      tag: '',
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
          tagList: [],
        }
        this.$router.push('/')
      } catch (error) {}
    },
    addTag() {
      if (this.tag) {
        this.article.tagList.push(this.tag)
        this.tag = ''
      }
    },
  },
}
</script>
