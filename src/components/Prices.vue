<template>
  <div>
    <v-row align="center" no-gutters>
      <template v-for="(price, key) in item.prices">
        <v-col
          cols="12"
          sm="6"
          v-if="
            key != 'old_price_promo_text' &&
            selectedOption == 'Ugovor 24 meseca'
          "
          :key="key"
          :order="key == 'price_recurring' ? 1 : 2"
          :order-sm="key == 'price_recurring' ? 2 : 1"
        >
          <Price :keyPrice="key">{{
            formatPrice(price[selectedOption])
          }}</Price>
        </v-col>
        <v-col
          cols="12"
          v-else-if="
            price[selectedOption] != '' && key != 'old_price_promo_text'
          "
          :key="key"
        >
          <Price :keyPrice="key">{{
            formatPrice(price[selectedOption])
          }}</Price>
        </v-col>
      </template>
    </v-row>
    <v-col cols="12" v-if="selectedOption == 'Ugovor 24 meseca'" class="py-0">
      <v-row justify="center" no-gutters>
        <span
          v-html="item.prices.old_price_promo_text"
          class="promo_text_class"
        ></span>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import Price from "@/components/Price.vue";
export default {
  components: {
    Price,
  },
  props: {
    item: {
      type: Object,
    },
    selectedOption: {
      type: String,
    },
  },
  methods: {
    formatPrice(str) {
      if (typeof str !== "undefined") {
        return str.split(".")[0];
      }
      return "";
    },
  },
};
</script>

<style  scoped>
.promo_text_class {
  font-size: 15px;
  line-height: 18px;
  color: #102542;
}
</style>