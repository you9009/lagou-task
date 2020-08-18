<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  placeholder="URL of profile picture"
                  type="text"
                  v-model="currentUser.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  placeholder="Your Name"
                  required
                  type="text"
                  v-model="currentUser.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  placeholder="Short bio about you"
                  required
                  rows="8"
                  v-model="currentUser.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  placeholder="Email"
                  required
                  type="text"
                  v-model="currentUser.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  minlength="8"
                  placeholder="Password"
                  required
                  type="password"
                  v-model="currentUser.password"
                />
              </fieldset>
              <button @click="onSubmit" class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUser } from '@/utils/api'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Settings',
  middleware: ['auth'],
  data() {
    return {
      currentUser: {
        email: '',
        image: '',
        username: '',
        bio: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    Object.assign(this.currentUser, this.user)
  },
  methods: {
    ...mapMutations(['setUser']),
    async onSubmit() {
      try {
        await updateUser(this.currentUser)
        this.setUser(this.currentUser)
      } catch (error) {}
    }
  }
}
</script>
