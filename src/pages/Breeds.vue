<template>
  <q-page class="q-pa-lg">
    <div class="q-pa-md q-gutter-md">
      <q-card class="my-card">
        <q-select
          clearable
          outlined
          label="Gato"
          color="blue-10"
          v-model="selected_breed"
          :options="breeds"
          option-value="id"
          option-label="name"
          return-object
        >
        </q-select>
        <q-carousel
          animated
          v-model="slide"
          navigation
          infinite
          :autoplay="autoplay"
          arrows
          id="carrousel"
          transition-prev="slide-right"
          transition-next="slide-left"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
        >
          <q-carousel-slide
            v-for="(item, i) in images"
            :key="i"
            :name="item.id"
            :img-src="item.url"
          />
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
          <div class="text-subtitle2">Nome: {{ selected_breed.name }}</div>
        </q-card-section>

        <q-card-section v-if="selected_breed.description">
          Descrição: {{ selected_breed.description }}
        </q-card-section>
        <q-card-section v-if="selected_breed.temperament">
          Temperamento: {{ selected_breed.temperament }}
        </q-card-section>

        <q-list>
          <q-item>
            <q-item-section>
              Nível de Afeto
              <q-rating
                v-model="selected_breed.affection_level"
                size="3em"
                color="brown-5"
                icon="pets"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              Adaptação
              <q-rating
                v-model="selected_breed.adaptability"
                size="3em"
                color="brown-5"
                icon="pets"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              Amigo da Criança
              <q-rating
                v-model="selected_breed.child_friendly"
                size="3em"
                color="brown-5"
                icon="pets"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              Nível de energia
              <q-rating
                v-model="selected_breed.energy_level"
                size="3em"
                color="brown-5"
                icon="pets"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              Problemas de saúde
              <q-rating
                v-model="selected_breed.health_issues"
                size="3em"
                color="brown-5"
                icon="pets"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              Inteligência
              <q-rating
                v-model="selected_breed.intelligence"
                size="3em"
                color="brown-5"
                icon="pets"
              />
            </q-item-section>
          </q-item>
        </q-list>

        <q-item tag="a" :href="selected_breed.wikipedia_url" clickable>
          <q-item-section avatar>
            <q-icon name="mail" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Wikipedia</q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import ServicesBreeds from "src/services/theBreed";
import { ref } from "vue";

export default {
  name: "Breeds",
  data() {
    return {
      images: [],
      breeds: [],
      autoplay: ref(true),
      selected_breed: [],
      slide: 1,
    };
  },
  methods: {
    getBreeds: async function () {
      var self = this;

      await ServicesBreeds.getBreeds()
        .then(function (response) {
          debugger;
          console.log(response.data);
          self.breeds = response.data;
          self.selected_breed = self.breeds[10];
        })
        .catch(function () {
          console.log("deu erro");
        });
    },
    getImages: async function (id) {
      var self = this;

      let query_params = {
        breed_ids: id,
        limit: 4,
      };
      await ServicesBreeds.getImages(query_params)
        .then(function (response) {
          self.images = response.data;
        })
        .catch(function () {
          console.log("deu erro");
        });
    },
  },
  mounted() {
    var self = this;
    self.getBreeds();
  },
  watch: {
    selected_breed: function () {
      var self = this;

      self.getImages(self.selected_breed.id);
    },
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 600px
</style>
