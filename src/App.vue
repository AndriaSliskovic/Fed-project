<template>
  <v-app>
    <v-main>
      <v-container>
        <v-col cols="12" id="select_contract">
          <v-row justify="end">
            <v-col cols="4" id="select_contract_length" v-if="loaded">
              <v-select
                item-value="id"
                item-text="name"
                :items="dataObject.contract_length.contract_length_options"
                dense
                solo
                v-model="selectedOption"
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
                      <v-row justify="center">
                        <p
                          class="text-h4 purple--text text-darken-2 font-weight-bold"
                        >
                          {{ item.name }}
                        </p>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row id="included" align="center">
                    <v-col cols="4">
                      <v-row align="center" justify="center">
                        <v-col cols="12">
                          <v-avatar>
                            <img :src="tvCategory" alt="tv_category" />
                          </v-avatar>
                        </v-col>
                        <v-col cols="12">
                          <v-avatar>
                            <img :src="netCategory" alt="net_category" />
                          </v-avatar>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="8">
                      <v-list-item dense v-for="i in item.included" :key="i.id">
                        <v-list-item-content>
                          {{ i.long_name }}
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                  <v-row id="promotions" no-gutters align="center">
                    <v-col cols="3">
                      <v-row justify="center">
                        <v-img
                          lazy-src="https://picsum.photos/id/11/10/6"
                          max-height="60"
                          max-width="100"
                          :src="item.promotions[0].promotion_image"
                        ></v-img>
                      </v-row>
                    </v-col>
                    <v-col cols="9">
                      <v-row justify="center">
                        <span
                          v-html="item.promotions[0].promo_text"
                          class="purple--text text-darken-2 font-italic"
                        ></span>
                      </v-row>
                    </v-col>
                  </v-row>
                  <!-- Prices -->
                  <v-row id="prices" v-for="(price,i) in prices" :key="i">
                    <v-row>
                      <v-col cols="6">
                        {{ price.old_price_recurring }}
                      </v-col>
                      <v-col cols="6">
                        {{ item.prices.price_recurring }}
                      </v-col>
                    </v-row>
                    <v-col cols="12">
                      <v-row justify="center">
                        <span v-html="item.prices.old_price_promo_text"></span>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-row justify="center">
                    <v-btn color="primary" @click="testIt">Naručite</v-btn>
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
      selectedOption: null,
      //isFeaturedOfset:0
    };
  },

  components: {},
  created() {
    this.getDataFromApi();
  },
  // mounted() {
  // this.selectedOption=this.dataObject.contract_length.preselected_contract_length

  // },
  methods: {
    testIt() {
      console.log("test");
      const items = this.dataObject.items;
      const arr = [];

      items.forEach((el) => {
        const obj = {};
        console.log("forEach");
        for (const key in el.prices) {
          const element = el.prices[key];
          const oldPromo=String(element['old_price_promo_text']) 
          console.log("old_price_promo_text",oldPromo)
          //console.log("for in", element[this.selectedOption], key);
          this.$set(obj, key, element[this.selectedOption]);
        }
        arr.push(obj);
      });
      console.log("niz", arr);
    },
    getDataFromApi() {
      this.axios
        .get(this.apiPoint)
        .then((response) => {
          this.dataObject = response.data;
        })
        .then(() => {
          this.selectedOption = this.dataObject.contract_length.preselected_contract_length;
          this.loaded = true;
        });
    },
    setFeaturedOfset() {},
  },
  computed: {
    prices() {
       const items = this.dataObject.items;
      const arr = [];

      items.forEach((el) => {
        const obj = {};
        for (const key in el.prices) {
          const element = el.prices[key];
          //console.log("for in", element[this.selectedOption], key);
          this.$set(obj, key, element[this.selectedOption]);
        }
        arr.push(obj);
      });
      return arr
    },
    netCategory() {
      return this.dataObject.assets.net_category;
    },
    tvCategory() {
      return this.dataObject.assets.tv_category;
    },
  },
};
</script>
