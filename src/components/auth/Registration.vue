<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registration form</v-toolbar-title>
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
              <v-text-field
                  prepend-icon="lock"
                  name="confirm-password"
                  label="Confirm Password"
                  type="password"
                  v-model="confirmPassword"
                  :counter="6"
                  :rules="confirmPasswordRules"
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
                :disabled="!valid || loading">Create account</v-btn>
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

  name: 'Registration',
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => emailRegex.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'Password is required',
        v => (v === this.password) || 'Password should match'
      ],
      valid: false
    }
  },
  computed: {
    ...mapGetters('shared', {
      loading: 'loading'
    })
  },
  methods: {
    ...mapActions('user', {
      registerUser: 'registerUser'
    }),
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.registerUser(user)
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
