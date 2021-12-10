<template>
  <q-page class="q-pa-lg">
    <div class="q-gutter-sm row items-center no-wrap">

      <q-card class="my-card">
        <div class="row">
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input label="Usuário" color="blue-10" v-model="sub_id" />
            </q-item-section>
          </q-item>
        </div>
        <div class="row">
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <q-btn
                label="Gostei"
                style="background: green; color: white; border-radius: 10px"
                size="lg"
                @click="voteUp"
              />
            </q-item-section>
          </q-item>
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <q-btn
                label="Não gostei"
                style="background: red; color: white; border-radius: 10px"
                size="lg"
                @click="voteDown"
              />
            </q-item-section>
          </q-item>
        </div>

        <img class="q-pt-lg" :src="image.url" style="max-height: 700px" />
      </q-card>

      <q-separator />
    </div>
    <q-card-section class="q-pa-none q-mt-md my-table">
      <q-table
        :rows="votesResult"
        :columns="columns"
        :filter="filter"
        row-key="name"
        no-results-label="Nenhum resultado foi encontrado."
      >
        <template v-slot:top-right>
          <q-input
            filled
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </q-card-section>
  </q-page>
</template>

<script>
import ServicesBreeds from "src/services/theBreed";
import { ref } from "vue";
import { date } from "quasar";

export default {
  name: "Vote",
  data() {
    return {
      image: {},
      votesResult: [],
      sub_id: "FAETERJ",
      columns: [
        {
          name: "created_at",
          label: "Data",
          field: "created_at",
          sortable: true,
          align: "left",
        },
        {
          name: "image_id",
          label: "Imagem ID",
          field: "image_id",
          sortable: true,
          align: "left",
        },
        {
          name: "value",
          label: "Valor",
          field: "value",
          sortable: true,
          align: "left",
        },
        {
          name: "sub_id",
          label: "Usuário",
          field: "sub_id",
          sortable: true,
          align: "left",
        },
      ],
      StatusOrderByDesc: {
        sortBy: "id",
        descending: true,
        rowsPerPage: 10,
      },
      filter: "",
    };
  },
  methods: {
    getVotes: async function () {
      var self = this;

      let query_params = {
        order: "DESC",
        limit: 25,
      };

      await ServicesBreeds.getVotes(query_params)
        .then(function (response) {
          response.data.forEach((element) => {
            element.created_at = date.formatDate(
              element.created_at,
              "DD/MM/YYYY - HH:mm:ss"
            );
          });

          response.data.forEach((element) => {
            element.value = element.value == 1 ? "Gostei" : "Não gostei";
          });

          self.votesResult = response.data;
          console.log("-- Votes from TheCatAPI.com");
          console.log(response.data);
        })
        .catch(function () {
          console.log("deu erro - getVotes");
        });
    },
    getImages: async function () {
      var self = this;

      let query_params = {
        limit: 1,
        size: "full",
      };
      await ServicesBreeds.getImages(query_params)
        .then(function (response) {
          self.image = response.data[0];
        })
        .catch(function () {
          console.log("deu erro - getImages");
        });
    },
    voteUp: async function () {
      var self = this;

      let body = {
        image_id: self.image.id,
        sub_id: self.sub_id,
        value: 1,
      };

      await ServicesBreeds.postVote(body)
        .then(function (response) {
          self.getImages();
          self.getVotes();
        })
        .catch(function () {
          console.log("deu erro - voteUp");
        });
    },
    voteDown: async function () {
      var self = this;

      let body = {
        image_id: self.image.id,
        sub_id: self.sub_id,
        value: 0,
      };
      await ServicesBreeds.postVote(body)
        .then(function (response) {
          self.getImages();
          self.getVotes();
        })
        .catch(function () {
          console.log("deu erro - voteDown");
        });
    },
  },
  mounted() {
    var self = this;
    self.getImages();
    self.getVotes();
  },
};
</script>

<style>
.my-card {
  width: 100%;
  max-width: 800px;
}
.my-table {
  width: 80%;
}
</style>
