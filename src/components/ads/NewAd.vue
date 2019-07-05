<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="blue--text text--darken-2 mb-3">Create new ad</h1>
          <v-form class="mb-3"
                  ref="form"
                  v-model="valid"
                  validation>
            <v-text-field
                name="title"
                label="Ad title"
                type="text"
                v-model="title"
                :rules="[v => !!v || 'Title is required']"
                required
            >
            </v-text-field>
            <v-textarea
                name="description"
                label="Ad description"
                type="text"
                v-model="description"
                :rules="[v => !!v || 'Description is required']"
            >
            </v-textarea>
          </v-form>
          <v-layout row class="mb-3">
           <v-flex>
            <v-btn class="warning" @click="triggerUpload">
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
             <input type="file"
                    accept="image/*"
                    ref="fileInput"
                    style="display: none"
                    @change="onFileChange"
             >
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-img :src="imageSrc" height="150" v-if="imageSrc"></v-img>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-switch
                label="Add to promo?"
                v-model="promo"
                color="primary"
            ></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-spacer class="hidden-xs-only"></v-spacer>
          <v-flex>
            <v-btn
                :loading="loading"
                :disabled="!valid  || !image || loading"
                class="success createBtn"
                @click="createAd"
            >
              Create ad
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'NewAd',
  data () {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false,
      image: null,
      imageSrc: ''
    }
  },
  computed: {
    ...mapGetters('shared', {
      loading: 'loading'
    })
  },
  methods: {
    ...mapActions('ads', {
      createAdProxy: 'createAd'
    }),
    triggerUpload () {
      this.$refs['fileInput'].click()
    },
    onFileChange (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      console.log(reader)
      console.log(file)
      reader.onload = (e) => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    },
    createAd () {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        }
        this.createAdProxy(ad)
          .then(() => {
            this.$router.push({name: 'list'})
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style scoped>
  .grow, .spacer {
    -webkit-box-flex: 9999!important;
    flex-grow: 9999!important;
  }
  @media only screen and (max-width: 600px){
    .v-btn.createBtn{
      min-width: 100%;
      height: auto;
      padding: 16px;

  }

  }
</style>
