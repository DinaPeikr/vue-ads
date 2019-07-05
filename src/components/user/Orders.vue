<template>
  <v-container>
    <v-layout row v-if="!loading && orders.length !== 0">
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="blue--text text--darken-2 mb-3">Orders</h1>
        <v-list
            subheader
            two-line
            v-for="order in orders"
            :key="order.id"
            :id="order.id"
        >
          <v-list-tile>
            <v-list-tile-action>
              <v-checkbox :input-value="order.done"
                          @change="markDone(order)"
                          color="success"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{order.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{order.phone}}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn class="primary" :to="{name: 'ad', params: {id: order.adId}}">Open</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout v-else-if="!loading && orders.length === 0">
      <v-flex xs12 class="text-xs-center">
        <h1 class="text--primary">You have no orders</h1>
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
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Orders',
  data () {
    return {}
  },
  created () {
    this.loadOrders()
  },
  computed: {
    ...mapGetters('orders', {
      orders: 'orders'
    }),
    ...mapGetters('shared', {
      loading: 'loading'
    })
  },
  methods: {
    ...mapActions('orders', {
      loadOrders: 'loadOrders',
      markOrderDone: 'markOrderDone'
    }),
    markDone (order) {
      console.log(order.id)
      this.markOrderDone(order.id)
        .then(() => {
          order.done = true
        }).catch(() => {})
    }
  }

}
</script>

<style scoped>
</style>
