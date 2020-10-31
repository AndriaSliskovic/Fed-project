<template>
  <v-app>
    <v-container fluid>
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
        <v-col cols="12">
          <v-row id="main" ref="main"> </v-row>
        </v-col>
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
