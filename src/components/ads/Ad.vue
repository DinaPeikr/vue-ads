<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
<!--        {{ad}}-->
        <v-card v-if="!loading">
          <v-img
              :src="ad.imageSrc"
              aspect-ratio="1.7778"
          >
          </v-img>
          <v-card-text>
            <h1>{{ad.title}}</h1>
            <p>{{ad.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-edit-ad-modal :ad="ad" v-if="isOwner"></app-edit-ad-modal>
            <app-buy-modal :ad="ad"></app-buy-modal>
          </v-card-actions>
        </v-card>
        <div v-else class="text-xs-center pt-5">
          <v-progress-circular
              indeterminate
              :size="100"
              :width="4"
              color="purple"
          ></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appEditAdModal from './EditAdModal'
import {mapGetters} from 'vuex'
export default {
  name: 'Ad',
  props: ['id'],
  components: {
    appEditAdModal
  },
  computed: {
    ...mapGetters('ads', {
      ads: 'ads',
      getAd: 'ad',
      getAdById: 'adById'
    }),
    ...mapGetters('shared', {
      loading: 'loading'
    }),
    ad () {
      // console.log(this.id)
      return this.getAd(this.id)
      // return this.getAdById(this.id)
    },
    isOwner () {
      if (this.$store.getters['user/user']) {
        return this.ad.ownerId === this.$store.getters['user/user'].id
      }
    }
  }
}
</script>

<style scoped>
</style>
