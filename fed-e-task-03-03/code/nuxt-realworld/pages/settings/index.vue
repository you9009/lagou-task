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
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="getUse.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="getUse.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  v-model="getUse.bio"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="getUse.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="getUse.password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setUsers } from '@/utils/api'
export default {
  name: 'SettingsIndex',
  middleware: 'authenticated',
  computed: {
    ...mapState(['user']),
    getUse: {
      get() {
        return JSON.parse(JSON.stringify(this.user))
      },
      set() {},
    },
  },
  methods: {
    async onSubmit() {
      try {
        let key = {
          email: this.getUse.email,
          username: this.getUse.username,
          password: this.getUse.password,
          image: this.getUse.image,
          bio: this.getUse.bio,
        }
        const { data } = await setUsers({ user: key })
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang='scss' scoped>
</style>
