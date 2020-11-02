<template>
  <v-row align="center" :style="{ height: setHeight }">
    <v-col cols="4" class="pa-3">
      <v-img lazy-src="https://picsum.photos/id/11/10/6" :src="img"></v-img>
    </v-col>
    <v-col cols="8">
      <v-row justify="center">
        <slot />
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
    },
    img: {
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
  },
};
</script>

<style  scoped>
</style>