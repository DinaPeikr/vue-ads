<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-tile v-for="link in links"
                     :key="link.title"
                     :to="link.url"
                     >
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
            v-if="isUserLoggedIn"
            @click="onLogout"
        >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Logout'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark color="primary">
      <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title ><router-link :to="{name: 'home'}" class="pointer" tag="span">Ad Application</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat
               v-for="link in links"
               :key="link.title"
               :to="link.url"
        >
          <v-icon left>{{link.icon}}</v-icon>
          {{link.title}}
        </v-btn>
        <v-btn
            @click="onLogout"
            flat
            v-if="isUserLoggedIn"
        >
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <transition name="slide" mode="out-in">
      <router-view></router-view>
      </transition>
    </v-content>
    <template v-if="error">
      <v-snackbar
          :multi-line="true"
          :timeout="snackbar.timeout"
          :color="snackbar.color"
          @input="closeError"
          :value="true"
      >
        {{error}}
        <v-btn
            dark
            flat
            @click.native="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      drawer: false,
      snackbar: {
        y: 'bottom',
        x: null,
        color: 'error',
        timeout: 5000
      }
    }
  },
  computed: {
    ...mapGetters('shared', {
      error: 'error'
    }),
    ...mapGetters('user', {
      isUserLoggedIn: 'isUserLoggedIn'
    }),
    links () {
      if (this.isUserLoggedIn) {
        return [
          {title: 'Orders', icon: 'bookmark_border', url: '/orders'},
          {title: 'New ad', icon: 'note_add', url: '/new'},
          {title: 'My ads', icon: 'list', url: '/list'}
        ]
      }

      return [
        {title: 'Login', icon: 'lock', url: '/login'},
        {title: 'Registration', icon: 'face', url: '/registration'}
      ]
    }
  },
  methods: {
    ...mapActions('shared', {
      clearError: 'clearError'
    }),
    ...mapActions('user', {
      logoutUser: 'logoutUser'
    }),
    onLogout () {
      this.logoutUser()
      this.$router.push({name: 'home'})
    },
    closeError () {
      this.clearError()
    }
  }
}
</script>
<style scoped>
  .pointer{
    cursor: pointer;
  }
  .slide-enter-active{
    animation: slideIn 0.5s;
  }

  .slide-leave-active{
    animation: slideOut 0.5s;
  }
  @keyframes slideIn{
    from{transform: rotateY(90deg);}
    to{transform: rotateY(0deg);}
  }

  @keyframes slideOut{
    from{transform: rotateY(0deg);}
    to{transform: rotateY(90deg);}
  }
</style>
