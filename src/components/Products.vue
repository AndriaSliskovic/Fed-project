<template>
  <div>
    <v-list dense>
      <v-list-item v-for="(item, i) in products" :key="i">
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.long_name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style lang="scss" scoped>
</style>