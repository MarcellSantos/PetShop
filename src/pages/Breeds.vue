<template>
  <q-page class="q-pa-lg">
    <div class="q-pa-md q-gutter-md">
      <q-card class="my-card">
        <q-select
          clearable
          outlined
          label="Cat"
          color="blue-10"
          v-model="selected_breed"
          :options="breeds"
          option-value="id"
          option-label="name"
        >
        </q-select>
        <q-carousel animated v-model="slide" arrows navigation infinite>
          <q-carousel-slide
            v-for="slide in slides"
            :key="slide.id"
            :name="slide.id"
            :img-src="slide.url"
          ></q-carousel-slide>
        </q-carousel>

        <q-card-section>
          <div class="text-h6">
            <!-- <q-chip v-if="selected_breed.experimental == 1">Experimental</q-chip>
            <q-chip v-if="selected_breed.rex == 1">Rex</q-chip>
            <q-chip v-if="selected_breed.natural == 1">Natural</q-chip>
            <q-chip v-if="selected_breed.rare == 1">Rare</q-chip>
            <q-chip v-if="selected_breed.hairless == 1">Hairless</q-chip>
            <q-chip v-if="selected_breed.suppressed_tail == 1">Suppressed Tail</q-chip>
            <q-chip v-if="selected_breed.short_legs == 1">Short Legs</q-chip>
            <q-chip v-if="selected_breed.hypoallergenic == 1">Hypoallergenic</q-chip> -->
          </div>
          <div class="text-subtitle2">by John Doe</div>
         
        </q-card-section>

        <q-card-section class="q-pt-none"> teste </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import ServicesBreeds from "src/services/theBreed";

export default {
  name: "Breeds",
  data() {
    return {
      images: [],
      breeds: [],
      selected_breed: [],
      slide: 1,
      slides: [
        {
          id: 1,
          url: "https://cdn.quasar.dev/img/mountains.jpg",
        },
        {
          id: 2,
          url: "https://cdn.quasar.dev/img/parallax1.jpg",
        },
        {
          id: 3,
          url: "https://cdn.quasar.dev/img/parallax2.jpg",
        },
        {
          id: 4,
          url: "https://cdn.quasar.dev/img/quasar.jpg",
        },
      ],
    };
  },
  methods: {
    getBreeds: async function () {
      var self = this;

      await ServicesBreeds.getBreeds()
        .then(function (response) {

          self.breeds = response.data;
          console.log(response.data);
        })
        .catch(function () {
          console.log("deu erro");
        });
    },
    getImages: async function () {
      var self = this;

      let query_params = {
        breed_ids: "beng",
        limit: 4,
      };
      await ServicesBreeds.getImages(query_params)
        .then(function (response) {
          
          self.images = response.data;
          console.log(response.data);
        })
        .catch(function () {
          console.log("deu erro");
        });
    },
  },
  mounted() {
    var self = this;
    self.getBreeds();
    self.getImages();
  },
  computed: {
    selected_breed() {
      var self = this;

      //self.getImages();
      debugger;
      console.log(self.selected_breed);
    },
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 600px
</style>
