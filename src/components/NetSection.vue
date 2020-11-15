<template>
  <v-row justify="center" align="center" :style="{ height: setHeight }">
    <v-col cols="2">
      <v-avatar :size="bPoint.smAndUp ? 60 : 40">
        <img :src="netCategory" alt="tv_category" />
      </v-avatar>
    </v-col>
    <v-col cols="10">
      <template v-for="i in item.included">
        <ul :key="i.id" v-if="i.product_category == 'net'">
          <li v-html="i.long_name" class="main_text my-1 nettext--text"></li>
        </ul>
      </template>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
    },
    item: {
      type: Object,
    },
    netCategory: {
      type: String,
    },
  },
  computed: {
    setHeight() {
      if (!this.height) {
        return "auto";
      }
      return this.height + "px";
    },
    bPoint() {
      return this.$vuetify.breakpoint;
    },
  },
};
</script>

<style  scoped>
.main_text {
  font-size: 16px;
}
</style>