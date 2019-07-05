<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form"
                    v-model="valid"
                    validation>
              <v-text-field
                  prepend-icon="person"
                  name="email"
                  label="Email"
                  type="email"
                  v-model="email"
                  :rules="emailRules"
                  required
              >
              </v-text-field>
              <v-text-field
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                  v-model="password"
                  :counter="6"
                  :rules="passwordRules"
                  required
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                @click="onSubmit"
                :loading="loading"
                :disabled="!valid || loading">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
// const emailRegexSimple = /.+@.+/

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => emailRegex.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
      ],
      valid: false
    }
  },
  created () {
    if (this.$route.query['loginError']) {
      this.setError('Please log in to access this page.')
    }
  },
  computed: {
    ...mapGetters('shared', {
      loading: 'loading'
    }),
    ...mapGetters('user', {
      user: 'user'
    })
  },
  methods: {
    ...mapActions('user', {
      loginUser: 'loginUser'
    }),
    ...mapActions('shared', {
      setError: 'setError'
    }),
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.loginUser(user)
          .then(() => {
            this.$router.push({name: 'home'})
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style scoped>

</style>
