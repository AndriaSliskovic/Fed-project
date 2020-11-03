<template>
  <v-card
    :color="!data ? 'white' : 'secondary'"
    :style="{ height: setHeight, borderStyle: none }"
    flat
  >
    <v-row justify="center" align="center" no-gutters>
      <v-col cols="12">
        <v-row justify="center" v-if="data">
          <p
            class="subtitle-1 purple--text text-darken-2 font-weight-bold font-italic mb-1"
          >
            Preporučujemo
          </p>
          <v-divider />
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
    },
    data: {
      type: Number,
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