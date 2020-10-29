<template>
  <div id="app">Pocetna strana : {{dataObject}}</div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      apiPoint: process.env.VUE_APP_API_URL,
      dataObject:{}
    }
  },
  components: {},
  created(){
this.getDataFromApi()

  },
  methods: {
    getDataFromApi() {
this.axios.get(this.apiPoint).then((response) => {
  this.dataObject=response.data
})
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
