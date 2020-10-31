<template>
  <v-app>
    <v-main>
      <v-container>
        <v-col cols="12" id="select_contract">
          <v-row justify="end">
            <v-col cols="4" id="select_contract_length" v-if="loaded">
              <v-select
                :items="dataObject.contract_length.contract_length_options"
                dense
                solo
                v-model="dataObject.contract_length.preselected_contract_length"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row id="cards_container" no-gutters>
            <v-col
              cols="12"
              md="4"
              v-for="item of dataObject.items"
              :key="item.id"
              class="px-4 my-0"
            >
              <v-card color="secondary">
                <v-card-text id="featured">
                  <v-row justify="center" v-if="item.is_featured">
                    Promocija
                  </v-row>
                  <v-row id="name">
                    <v-col cols="12">
                      <v-row justify="center"> {{ item.name }} </v-row>
                    </v-col>
                  </v-row>
                  <v-row id="included" align="center">
                    <v-col cols="4">
                      <v-row align="center"> Ikonica </v-row>
                    </v-col>
                    <v-col cols="8">
                      <v-list-item dense v-for="i in item.included" :key="i.id">
                        <v-list-item-content>
                          {{ i.long_name }}
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                  <v-row id="promotions">
                    <v-col cols="4"> 
                      <v-row justify="start">
televizor
                      </v-row>
                       </v-col>
                    <v-col cols="8"> 
                      <v-row justify="center">
{{item.promotions[0].promo_text}}
                      </v-row>
                       </v-col>
                  </v-row>
                  <v-row id="prices">
                    <v-row>
                    <v-col cols="6"> {{item.prices.old_price_recurring}} </v-col>
                    <v-col cols="6"> {{item.prices.price_recurring}} </v-col>
                    </v-row>

                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-row justify="center">
                    <v-btn color="primary" @click="testIt">Narucite</v-btn>
                  </v-row>
                </v-card-actions>
              </v-card>

              <v-divider></v-divider>
            </v-col>
          </v-row>
        </v-col>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      apiPoint: process.env.VUE_APP_API_URL,
      dataObject: {},
      loaded: false,
      //isFeaturedOfset:0
    };
  },
  mounted() {},
  components: {},
  created() {
    this.getDataFromApi();
  },
  methods: {
    testIt() {
      console.log("test");
    },
    getDataFromApi() {
      this.axios
        .get(this.apiPoint)
        .then((response) => {
          this.dataObject = response.data;
        })
        .then(() => {
          this.loaded = true;
        });
    },
    setFeaturedOfset() {},
  },
  computed: {},
};
</script>
