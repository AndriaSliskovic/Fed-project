<template>
  <v-row align="center">
    <template v-for="(price, key) in item.prices">
      <template v-for="(p, k) in price">
        <v-col
          :cols="p != '' ? (selectedOption == 'Ugovor 24 meseca' ? 6 : 12) : 12"
          v-if="k == selectedOption"
          :key="key"
          class="pb-0"
        >
          <v-row justify="center" no-gutters>
            <p
              class="purple--text text-darken-2 font-weight-bold font-italic mb-0"
              :class="
                selectedOption == 'Ugovor 24 meseca' ? 'text-h6' : 'text-h4'
              "
            >
              <span v-if="key == 'old_price_recurring' && p != ''">
                <span class="text-decoration-line-through"
                  >{{ formatPrice(p) }}
                </span>
                rsd/mes.
              </span>
              <span v-if="key == 'price_recurring'" class="text-h4"
                >{{ formatPrice(p) }} rsd/mes</span
              >
            </p>
          </v-row>
        </v-col>
      </template>
    </template>

    <v-col cols="12" v-if="selectedOption == 'Ugovor 24 meseca'" class="py-0">
      <v-row justify="center" no-gutters>
        <span v-html="item.prices.old_price_promo_text"></span>
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
    item: {
      type: Object,
    },
    selectedOption: {
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
  methods: {
    formatPrice(str) {
      return str.split(".")[0];
    },
  },
};
</script>

<style  scoped>
</style>