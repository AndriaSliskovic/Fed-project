<template>
  <div>
    <v-row justify="center">
      <p
        v-if="keyPrice == 'old_price_recurring'"
        class="text-decoration-line-through old_Price"
        :class="price_class"
      >
        <slot /> <span>{{ valuta }}</span>
      </p>
      <p v-else class="new_price" :class="price_class">
        <slot /> <span>{{ valuta }}</span>
      </p>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valuta: "rsd/mes.",
      price_class: "primary--text font-weight-bold font-italic mb-0",
    };
  },
  props: {
    keyPrice: {
      type: String,
    },
  },
  computed: {
    bPoint() {
      return this.$vuetify.breakpoint;
    },
    compPriceClass() {
      if (this.bPoint.sm) {
        return "text-h5";
      } else {
        return "text-h4";
      }
    },
  },
};
</script>

<style scoped>
.old_Price {
  font-size: 22px;
  line-height: 51px;
}
.new_price {
  font-size: 33px;
  line-height: 48px;
}
</style>