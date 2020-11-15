<template>
  <v-app>
    <v-main>
      <v-container>
        <v-progress-circular
          indeterminate
          color="primary"
          v-if="!loaded"
          class="centered"
        ></v-progress-circular>
        <v-row justify="end" id="select_contract" no-gutters>
          <v-col
            cols="12"
            sm="4"
            lg="3"
            id="select_contract_length"
            v-if="loaded"
            class="px-10"
          >
            <v-row justify="center">
              <v-select
                :items="dataObject.contract_length.contract_length_options"
                dense
                solo
                v-model="selectedOption"
                background-color="secondary"
                color="primary"
                filled
              ></v-select>
            </v-row>
          </v-col>
        </v-row>

        <template> </template>
        <!-- Kontejner -->
        <v-col cols="12">
          <v-row id="cards_container" no-gutters>
            <!-- Items kartica-->
            <v-col
              cols="12"
              md="4"
              v-for="item of dataObject.items"
              :key="item.id"
              class="pa-4"
            >
              <!-- Recommendation -->
              <div id="recommendation" :ref="`recommendation-${item.id}`">
                <Recommendation
                  :data="item.is_featured"
                  :height="containerHeights.recommendation"
                ></Recommendation>
                <v-divider v-if="item.is_featured" class="mx-4"></v-divider>
              </div>
              <!-- // Recommendation -->
              <v-card color="secondary" flat>
                <v-card-text>
                  <!-- Name -->
                  <div id="name" :ref="`name-${item.id}`">
                    <Name :data="item.name" :height="containerHeights.name">
                      {{ item.name }}
                    </Name>
                  </div>
                  <v-divider></v-divider>
                  <!--  // Name -->
                  <!-- TV section -->
                  <div id="tvSection" :ref="`tvSection-${item.id}`">
                    <TvSection
                      :item="item"
                      :height="containerHeights.tvSection"
                      :tvCategory="tvCategory"
                    ></TvSection>
                  </div>
                  <v-divider></v-divider>
                  <!--// TV section -->
                  <!-- Net section -->
                  <div id="netSection" :ref="`netSection-${item.id}`">
                    <NetSection
                      :item="item"
                      :height="containerHeights.netSection"
                      :netCategory="netCategory"
                    ></NetSection>
                  </div>
                  <!-- // Net category -->
                  <!-- Promotions -->
                  <div
                    id="promotions"
                    :ref="`promotions-${item.id}`"
                    v-if="selectedOption == 'Ugovor 24 meseca'"
                  >
                    <Promotions
                      :img="item.promotions[0].promotion_image"
                      :promotionText="item.promotions[0].promo_text"
                      :height="containerHeights.promotions"
                    >
                    </Promotions>
                  </div>
                  <v-divider class="mt-5"></v-divider>
                  <!-- // Promotions -->
                  <!-- Prices -->
                  <div id="prices" :ref="`prices-${item.id}`">
                    <Prices
                      :item="item"
                      :height="containerHeights.prices"
                      :selectedOption="selectedOption"
                    ></Prices>
                  </div>
                  <!-- // Prices -->
                  <!-- Button -->
                  <div id="submitButton">
                    <SubmitButton @submited="onSubmited">
                      <span class="submit_class text-capitalize">
                        Naručite
                      </span>
                    </SubmitButton>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <!-- // Items -->
          </v-row>
        </v-col>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Recommendation from "@/components/Recommedation.vue";
import Name from "@/components/Name";
import TvSection from "@/components/TvSection";
import NetSection from "@/components/NetSection";
import Promotions from "@/components/Promotions";
import Prices from "@/components/Prices";
import SubmitButton from "@/components/SubmitButton";

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
    Recommendation,
    Name,
    TvSection,
    NetSection,
    Promotions,
    Prices,
    SubmitButton,
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
    testIt() {},
    getDataFromApi() {
      this.axios
        .get(this.apiPoint)
        .then((response) => {
          this.dataObject = response.data;
        })
        .then(() => {
          this.selectedOption = this.dataObject.contract_length.preselected_contract_length;
          this.formatToStrong();
        })
        .then(() => {
          const arrOfRefKeys = this.setRefsKeyArray();
          for (const iterator of arrOfRefKeys) {
            this.setRefsElements(iterator);
          }
          this.loaded = true;
        });
    },
    formatToStrong() {
      this.dataObject.items.forEach((el) => {
        el.included.forEach((e) => {
          const attribute = e.attributes.attribute_value;
          const newAttr = `<strong>${attribute}</strong>`;
          e.long_name = e.long_name.replace(attribute, newAttr);
        });
      });
    },
    //Logika za izjednacavanje maksimalne visine kontejnera
    //Formira niz za koje treba podesavanje visine, po konvenciji svaki ref (roditelj) koji ima '-' treba podesiti visinu
    //Ovo se moze izbeci hardkodovanim nizom u data objektu
    setRefsKeyArray() {
      const arrOfRefKeys = [];
      for (const key in this.$refs) {
        if (this.$refs.hasOwnProperty(key) && key.includes("-")) {
          const cutedKey = key.split("-")[0];
          arrOfRefKeys.push(cutedKey);
        }
      }
      const uniqueKeys = new Set(arrOfRefKeys);
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
    onSubmited() {
      console.log("Submited");
    },
  },
  computed: {
    bPoint() {
      return this.$vuetify.breakpoint;
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
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.submit_class {
  font-size: 18px;
  line-height: 48px;
}
</style>
