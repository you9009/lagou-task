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
                  v-model="currentUser.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="currentUser.username"
                  required
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="currentUser.bio"
                  required
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="currentUser.email"
                  required
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="currentUser.password"
                  required
                  minlength="8"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" @click="onSubmit">Update Settings</button>
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
        password: '',
      },
    }
  },
  computed: {
    ...mapState(['user']),
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
    },
  },
}
</script>
