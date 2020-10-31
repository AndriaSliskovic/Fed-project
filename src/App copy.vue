<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row justify="end">
            <v-btn color="primary" @click="testIt">Klik</v-btn>
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

        <!-- <v-col md="4" offset="4" class="px-5 py-0"  >
          <v-card flat>
            <v-row justify="center">
              <p
                class="purple--text text--darken-2 text-h6 font-weight-bold my-0"
              >
                {{ dataObject.promo_text }}
              </p>
            </v-row>
          </v-card>
        </v-col> -->
<v-col cols="12">
        <v-row align="stretch" class="ma-2">
          <v-col
            md="4"
            class="pa-3 d-flex flex-column"
            v-for="i in dataObject.items"
            :key="i.id"
          >
            <v-card class="elevation-5 flex d-flex flex-column">
              <v-card-title primary-title>
                <h3 class="headline mb-0">{{ i.name }}</h3>
              </v-card-title>
              <v-divider light></v-divider>
              <v-card-text class="flex">
                <div class="body-1">lalalala</div>
                <v-divider light style="margin-top: 15px"></v-divider>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
</v-col>

        <v-row>
          <v-col cols="4">
            <v-card>lalalala</v-card>
          </v-col>
                    <v-col cols="4">
            <v-card>lalalala lklkjlkjlkj kjlk jlkjl kjlk jlkj lkj lkj lkj lkj lkj lkjlk jlkj lkj lkj fafafafa afafafaf fafafafaf</v-card>
          </v-col>
                    <v-col cols="4">
            <v-card height="100%">lalalala</v-card>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
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
  components: {},
  created() {
    this.getDataFromApi();
  },
  methods: {
    testIt() {
      console.log("testIt", this.dataObject.items);
      const futured = this.dataObject.items.filter((el) => el.is_featured);
      console.log("futured", futured);
      const position = this.dataObject.items.forEach((e, i) => {
        //Za slucaj da ima vise preporucenih
        if (Array.isArray(futured)) {
          for (const f of futured) {
            if (e.id === f.id) {
              return console.log("dobijeno", i * this.widthOfMainColumns);
            }
          }
        }
        console.log("foreach", e);
      });
    },
    getDataFromApi() {
      this.axios
        .get(this.apiPoint)
        .then((response) => {
          this.dataObject = response.data;
        })
        .then(() => {
          this.loaded = true;
          //this.setFeaturedOfset()
        });
    },
    setFeaturedOfset() {
      const featured = this.dataObject.items.filter((el) => el.is_featured);
      console.log("set option", featured);
      const position = this.dataObject.items.forEach((e, i) => {
        if (e.id === featured[0].id) {
          return i * widthOfMainColumns;
        }
      });
      this.isFeaturedOfset = position;
    },
  },
  computed: {
    widthOfMainColumns() {
      const arrLength = this.dataObject.items.length;
      const height = 12 / arrLength;
      return height;
    },
    isFeaturedOfset() {
      console.log("featured", this.dataObject.items);
      if (this.dataObject.items) {
        const featured = this.dataObject.items.filter((el) => el.is_featured);
        console.log("featured", featured);
        const position = this.dataObject.items.forEach((e, i) => {
          if (e.id === featured[0].id) {
            return i * this.widthOfMainColumns;
          }
        });
        return position;
      }
      return 0;
    },
  },
};
</script>
