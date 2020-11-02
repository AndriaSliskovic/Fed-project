<template>
  <v-row :style="{ height: setHeight }" justify="center" no-gutters>
    <v-col cols="12">
      <v-row justify="center">
        <p
          v-if="data"
          class="subtitle-1 purple--text text-darken-2 font-weight-bold font-italic mb-1"
        >
          Preporučujemo
        </p>
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