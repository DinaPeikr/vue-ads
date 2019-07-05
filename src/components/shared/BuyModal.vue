<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-dialog width="400px" v-model="modal">
   <v-btn color="info" slot="activator">Buy</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Fill in your order details</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                  name="name"
                  label="Your name"
                  type="text"
                  v-model="name"
              ></v-text-field>
              <v-text-field
                  name="phone"
                  label="Your phone"
                  type="text"
                  v-model="phone"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat
                     @click="onCancel"
                     :disabled="localLoading"
              >
                Cancel
              </v-btn>
              <v-btn class="success"
                     flat
                     @click="onBuy"
                     :disabled="localLoading"
                     :loading="localLoading"
              >
                Buy it!
                <template v-slot:loader>
                  <v-progress-circular
                      indeterminate
                      :width="3"
                      color="white"
                  ></v-progress-circular>
                </template>
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'BuyModal',
  props: ['ad'],
  data () {
    return {
      modal: false,
      name: '',
      phone: '',
      localLoading: false
    }
  },
  methods: {
    onCancel () {
      this.name = ''
      this.phone = ''
      this.modal = false
    },
    onBuy () {
      if (this.name !== '' && this.phone !== '') {
        this.localLoading = true
        this.$store.dispatch('orders/createOrder', {
          name: this.name,
          phone: this.phone,
          adId: this.ad.id,
          ownerId: this.ad.ownerId
        })
          .finally(() => {
            this.name = ''
            this.phone = ''
            this.localLoading = false
            this.modal = false
          })
        this.$router.push({name: 'orders'})
      }
    }
  }
}
</script>

<style scoped>

</style>
