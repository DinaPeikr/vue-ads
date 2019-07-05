<template>
  <v-container>
    <v-layout row v-if="!loading && myAds.length !== 0">
      <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
        <h1 class="blue--text text--darken-2 mb-3">Ad List</h1>
        <v-card class="elevation-10 mb-3"
                v-for="ad in myAds"
                :key="ad.id"
        >
          <v-layout row wrap>
            <v-flex xs12 sm4>
              <v-img
                  :src="ad.imageSrc"
                  aspect-ratio="1.778"
              >
              </v-img>
            </v-flex>
            <v-flex xs12 sm8>
              <v-card-text>
                <h2 class="text--primary">{{ad.title}}</h2>
                {{ad.description}}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="primary" :to="{name: 'ad', params: {id: ad.id}}">Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else-if="!loading && myAds.length === 0">
      <v-flex xs12 class="text-xs-center">
        <h1 class="text--primary">You have no ads</h1>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex xs12 class="text-xs-center pt-5">
        <v-progress-circular
            :size="100"
            :width="4"
            color="purple"
            indeterminate
        ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'AdList',
  data () {
    return {}
  },
  computed: {
    ...mapGetters('shared', {
      loading: 'loading'
    }),
    ...mapGetters('ads', {
      getMyAds: 'myAds'
    }),
    myAds () {
      const myAds = this.getMyAds
      return myAds.sort((a, b) => {
        return a.date > b.date ? -1 : 1
      })
    }
  }
}
</script>

<style scoped>
  .v-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
