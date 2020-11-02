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
                v-model="selectedOption"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
        <template>
          <!-- <Products :height="containerHeights.tv"></Products> -->
        </template>
        <!-- Kontejner -->
        <v-col cols="12">
          <v-row id="cards_container" no-gutters>
            <!-- Items kartica-->
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
                  <v-row
                    id="preporuka"
                    justify="center"
                    no-gutters
                    :ref="`preporuka-${item.id}`"
                  >
                    <v-col cols="12">
                      <v-row justify="center">
                        <p
                        v-if="item.is_featured"
                          class="subtitle-1 purple--text text-darken-2 font-weight-bold"
                        >
                          Preporučujemo
                        </p>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <!-- // Preporuka -->

                  <!-- Name -->
                  <v-row id="name" :ref="`name-${item.id}`">
                    <v-col cols="12">
                      <v-row justify="center">
                        <p
                          class="text-h4 purple--text text-darken-2 font-weight-bold text-center"
                        >
                          {{ item.name }}
                        </p>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <!--  // Name -->
                  <!-- TV category -->
                  <v-row id="includedTv" align="center" :ref="`tv-${item.id}`">
                    <v-col cols="4">
                      <v-row justify="center">
                        <v-avatar>
                          <img :src="tvCategory" alt="tv_category" />
                        </v-avatar>
                      </v-row>
                    </v-col>
                    <v-col cols="8">
                      <template v-for="i in item.included">
                        <v-col
                          cols="12"
                          :key="i.id"
                          v-if="i.product_category == 'tv'"
                          class="pa-0"
                        >
                          <p v-html="i.long_name" class="mb-1" />
                        </v-col>
                      </template>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <!--// TV category -->
                  <!-- Net category -->
                  <v-row id="includedNet" align="center">
                    <v-col cols="4">
                      <v-row justify="center">
                        <v-avatar>
                          <img :src="netCategory" alt="tv_category" />
                        </v-avatar>
                      </v-row>
                    </v-col>
                    <v-col cols="8">
                      <template v-for="i in item.included">
                        <v-col
                          cols="12"
                          :key="i.id"
                          v-if="i.product_category == 'net'"
                          class="pa-0"
                        >
                          <p v-html="i.long_name" class="mb-1" />
                        </v-col>
                      </template>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <!-- // Net category -->
                  <!-- Promotions -->
                  <v-row
                    id="promotions"
                    no-gutters
                    align="center"
                    v-if="selectedOption == 'Ugovor 24 meseca'"
                  >
                    <v-col cols="4" class="pa-3">
                      <v-row justify="center">
                        <v-img
                          lazy-src="https://picsum.photos/id/11/10/6"
                          :src="item.promotions[0].promotion_image"
                        ></v-img>
                      </v-row>
                    </v-col>
                    <v-col cols="8">
                      <v-row justify="center">
                        <span
                          v-html="item.promotions[0].promo_text"
                          class="purple--text text-darken-2 font-italic font-weight-medium"
                        ></span>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <!-- // Promotions -->
                  <!-- Prices -->
                  <v-row align="center">
                    <template v-for="(price, key) in item.prices">
                      <template v-for="(p, k) in price">
                        <v-col
                          :cols="
                            p != ''
                              ? selectedOption == 'Ugovor 24 meseca'
                                ? 6
                                : 12
                              : 12
                          "
                          v-if="k == selectedOption"
                          :key="key"
                          class="pb-0"
                        >
                          <v-row justify="center"  no-gutters>
                            <p
                              class="purple--text text-darken-2 font-weight-bold mb-0"
                              :class="
                                selectedOption == 'Ugovor 24 meseca'
                                  ? 'text-h6'
                                  : 'text-h4'
                              "
                            >
                              <span
                                v-if="key == 'old_price_recurring' && p != ''"
                              >
                                <span class="text-decoration-line-through"
                                  >{{ formatPrice(p) }}
                                </span>
                                rsd/mes.
                              </span>
                              <span 
                              v-if="key == 'price_recurring'"
                              class="text-h4"
                                >{{ formatPrice(p) }} rsd/mes</span
                              >
                            </p>
                          </v-row>
                        </v-col>
                      </template>
                    </template>

                    <v-col
                      cols="12"
                      v-if="selectedOption == 'Ugovor 24 meseca'"
                      class="py-0"
                    >
                      <v-row justify="center" no-gutters>
                        <span v-html="item.prices.old_price_promo_text"></span>
                      </v-row>
                    </v-col>
                  </v-row>
                  <!-- // Prices -->
                  <!-- Button -->
                  <v-row justify="center" align="center">
                    <v-col cols="12" class="mt-3">
                      <v-btn color="primary" @click="setRefsKeyArray" block
                        >Naručite</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-card-text>
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
      containerHeights: {},
    };
  },

  components: {

  },
  created() {
    this.getDataFromApi();
  },
  mounted() {
    const arrOfRefKeys = this.setRefsKeyArray();
    for (const iterator of arrOfRefKeys) {
      this.setRefsElements(iterator);
    }
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
      console.log("resize");
    },
    testIt() {
      this.formatToStrong();
    },
    getDataFromApi() {
      this.axios
        .get(this.apiPoint)
        .then((response) => {
          this.dataObject = response.data;
        })
        .then(() => {
          this.selectedOption = this.dataObject.contract_length.preselected_contract_length;
          this.formatToStrong();
          const arrOfRefKeys = this.setRefsKeyArray();
          for (const iterator of arrOfRefKeys) {
            this.setRefsElements(iterator);
          }
          this.loaded = true;
        });
    },
    formatPrice(str) {
      return str.split(".")[0];
    },
    formatToStrong() {
      this.dataObject.items.forEach((el) => {
        el.included.forEach((e) => {
          e.long_name = e.long_name.replace(e.attributes.attribute_value, "__");
          e.attributes.attribute_value = `<strong>${e.attributes.attribute_value}</strong>`;
          e.long_name = e.long_name.replace("__", e.attributes.attribute_value);
        });
      });
    },
    //Logika za izjednacavanje maksimalne visine kontejnera
    //Formira niz za koje treba podesavanje visine, po konvenciji svaki ref (roditelj) koji ima '-' treba podesiti visinu
    //Ovo se moze izbeci hardkodovanim nizom u data objektu
    setRefsKeyArray() {
      const arrOfRefKeys = [];
      console.log("refs", this.$refs);
      for (const key in this.$refs) {
        if (this.$refs.hasOwnProperty(key) && key.includes("-")) {
          const cutedKey = key.split("-")[0];
          arrOfRefKeys.push(cutedKey);
        }
      }
      const uniqueKeys = new Set(arrOfRefKeys);
      // console.log("setRefsKeyArray",uniqueKeys)
      return uniqueKeys;
    },
    //Logika za podesavanje istih visina containera
    setRefsElements(k) {
      const arrOfHeights = [];
      let singleElement = null;
      let sumOfHeights = 0;
      for (const key in this.$refs) {
        //Na ovaj nacin eliminise refse kojima ne treba podesavanje visine (mogu biti i refsi kojima ne treba setovati visinu)
        if (this.$refs.hasOwnProperty(key) && key.includes("-")) {
          const element = this.$refs[key];
          //Setovanje visine za prosledjeni parametar
          if (key.includes(k)) {
            //Ako ima samo jedan element
            if (element.length == 1) {
              const height = element[0].clientHeight;
              arrOfHeights.push(height);
              singleElement = true;
            }
            //Ako ima child elemente
            else {
              let sumOfChildHeights = 0;
              for (const el of element) {
                sumOfChildHeights = sumOfChildHeights + el.clientHeight;
              }
              arrOfHeights.push(sumOfChildHeights);
              singleElement = false;
            }
          }
        }
      }
      console.log("posle foreacha", arrOfHeights, k);
      if (singleElement) {
        //Ukoliko ima samo jedan element treba setovati visinu elementu sa max vrednoscu
        const maxValue = this.getMaxValue(arrOfHeights);
        this.$set(this.containerHeights, k, maxValue);
      } else {
        //Ima child komponente - uzeti zbir visina elemenata
        const sumOfHeights = this.getMaxValue(arrOfHeights);
        this.$set(this.containerHeights[k], k, sumOfHeights);
      }
    },
    getMaxValue(arr) {
      return Math.max(...arr);
    },
    //----------------------- Kraj
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
<style scoped>
</style>
