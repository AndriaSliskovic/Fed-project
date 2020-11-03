<template>
  <v-card
    :color="!data ? 'white' : 'secondary'"
    :style="{ height: setHeight, borderStyle: 'none' }"
    flat
  >
    <v-col cols="12" v-if="data">
      <v-row justify="center">
        <p
          class="subtitle-1 purple--text text-darken-2 font-weight-bold font-italic mb-1"
        >
          Preporučujemo
        </p>
      </v-row>
    </v-col>
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