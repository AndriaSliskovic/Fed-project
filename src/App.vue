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
            <!-- Items -->
            <v-col
              cols="12"
              md="4"
              v-for="item of dataObject.items"
              :key="item.id"
              class="px-4 my-0"
            >
              <v-card color="secondary" outlined flat>
                <v-card-text>
                  <!-- Preporuka -->
                  <v-row justify="center" v-if="item.is_featured">
                    <v-col cols="12">
                      <v-row justify="center"> Promocija </v-row>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>

                  <!-- // Preporuka -->
                  <!-- Title -->
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
                  <v-divider></v-divider>
                  <!--  // Title -->
                  <!-- Categories -->
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
                  <v-divider></v-divider>
                  <!--// Categories -->
                  <!-- Promotions -->
                  <v-row id="promotions" no-gutters align="center">
                    <v-col cols="3" class="pl-3">
                      <v-row justify="center">
                        <v-img
                          lazy-src="https://picsum.photos/id/11/10/6"
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
                  <!-- // Promotions -->
                  <!-- Prices -->
                  <v-row>
                    <template v-for="(price, key) in item.prices">
                      <template v-for="(p, k) in price">
                        <v-col cols="6" v-if="k == selectedOption" :key="k">
                          <v-row justify="center" no-gutters>
                            <p
                              class="text-h6 purple--text text-darken-2 font-weight-bold mb-0"
                            >
                              <span v-if="key == 'old_price_recurring'">
                                <span class="text-decoration-line-through"
                                  >{{ formatPrice(p) }}
                                </span>
                                rsd/mes
                              </span>
                              <span v-else>{{ formatPrice(p) }} rsd/mes</span>
                            </p>
                          </v-row>
                        </v-col>
                      </template>
                    </template>
                    <v-row justify="center" no-gutters>
                      <span v-html="item.prices.old_price_promo_text"></span>
                    </v-row>
                  </v-row>
                  <!-- // Prices -->
                </v-card-text>
                <v-card-actions>
                  <v-row justify="center" align="center">
                    <v-btn color="primary" @click="testIt">Naručite</v-btn>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-col>
            <!-- // Items -->

            <!-- Prices -->
            <!-- // Prices -->
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
      const items = this.dataObject.items;
      const arr = [];
      items.forEach((el) => {
        const obj = {};
        for (const key in el.prices) {
          const element = el.prices[key];
          if (typeof element[this.selectedOption] != "undefined") {
            console.log("ima undefine", key);

            const formatedPrice = element[this.selectedOption].split(".")[0];
            console.log("formated", formated);
            this.$set(obj, key, formated);
          }
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
    formatPrice(str) {
      return str.split(".")[0];
    },
  },
  computed: {
    prices() {
      const items = this.dataObject.items;
      const arr = [];
      items.forEach((el) => {
        const obj = {};
        for (const key in el.prices) {
          const element = el.prices[key];
          if (typeof element[this.selectedOption] != "undefined") {
            const formatedPrice = element[this.selectedOption].split(".")[0];
            this.$set(obj, key, formatedPrice);
          }
        }
        arr.push(obj);
      });
      return arr;
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
