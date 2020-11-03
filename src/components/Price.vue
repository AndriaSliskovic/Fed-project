<template>
  <div>
    <v-row justify="center">
      <p
        v-if="keyPrice == 'old_price_recurring'"
        class="text-decoration-line-through text-h6"
        :class="price_class"
      >
        <slot /> {{ valuta }}
      </p>
      <p
        v-else
        class="text-h4"
        :class="price_class"
      >
        <slot /> {{ valuta }}
      </p>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valuta: "rsd/mes.",
      price_class:"purple--text text-darken-2 font-weight-bold font-italic mb-0"
    };
  },
  props: {
    keyPrice: {
      type: String,
    },
  },
};
</script>

<style scoped>

</style>