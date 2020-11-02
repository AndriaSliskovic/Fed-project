<template>
    <v-row justify="center" :style="{ height: setHeight }">
      <v-col cols="3">
        <v-avatar>
          <img :src="netCategory" alt="tv_category" />
        </v-avatar>
      </v-col>
      <v-col cols="9">
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
  },
};
</script>

<style  scoped>
</style>