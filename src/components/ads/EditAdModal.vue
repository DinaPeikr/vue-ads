<template>
<v-dialog width="400px" v-model="modal">
  <v-btn color="warning" flat slot="activator">Edit</v-btn>
  <v-card>
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <v-card-title>
            <h1 class="text--primary">Edit ad</h1>
          </v-card-title>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row>
        <v-flex xs12>
          <v-card-text>
            <v-text-field
                name="title"
                label="Title"
                type="text"
                v-model="editedTitle"
            ></v-text-field>
            <v-textarea
                name="description"
                label="Description"
                type="text"
                v-model="editedDescription"
            ></v-textarea>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row>
        <v-flex xs12>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="onCancel">Cancel</v-btn>
            <v-btn class="success" flat @click="onSave">Save</v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  name: 'EditAdModal',
  props: ['ad'],
  data () {
    return {
      modal: false,
      editedDescription: this.ad.description,
      editedTitle: this.ad.title
    }
  },
  methods: {
    onCancel () {
      this.editedDescription = this.ad.description
      this.editedTitle = this.ad.title
      this.modal = false
    },
    onSave () {
      if (this.editedDescription !== '' && this.editedTitle !== '') {
        this.$store.dispatch('ads/updateAd', {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.ad.id
        })

        this.modal = false
      }
    }
  }
}
</script>

<style scoped>

</style>
