<template>
  <div>
    <div v-if="!loading">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
                v-for="(ad) in promoAds"
                :key="ad.id"
                :src="ad.imageSrc"
            >
              <div class="carousel__link">
                <v-btn class="warning" :to="{name: 'ad', params: {id: ad.id}}">{{ ad.title }}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4
                v-for="ad in ads"
                :key="ad.id"
                :id="ad.id"
        >
          <v-card>
            <v-img
                :src="ad.imageSrc"
                aspect-ratio="1.7778"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ad.title}}</h3>
                <div> {{ ad.description }} </div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="warning" :to="{name: 'ad', params: {id: ad.id}}">Open</v-btn>
              <app-buy-modal :ad="ad"></app-buy-modal>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    </div>
    <div v-else>
    <v-container>
      <v-layout row>
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
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Home',
  data () {
    return {}
  },
  computed: {
    ...mapGetters('ads', {
      ads: 'ads',
      promoAds: 'promoAds'
    }),
    ...mapGetters('shared', {
      loading: 'loading'
    })
  }
}
</script>

<style scoped>
  .carousel__link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(0, 0, 0, .5);
    transform: translate(-50%, 0);
    padding: 5px 15px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
  .v-sheet{
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .v-responsive{
    flex-grow: 0;
  }
  .v-card__actions{
    margin-top: auto;
  }
</style>
