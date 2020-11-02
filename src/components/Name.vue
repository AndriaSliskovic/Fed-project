<template>
  <v-row justify="center" align="center" :style="{ height: setHeight }">
    <v-col cols="12">
      {{ bPoint.lgAndDow }}
      <p
        class="text-h4 purple--text text-darken-2 font-weight-bold font-italic text-center"
        :class="bPoint.lgAndDow ? 'text-h4' : 'text-h3'"
      >
        <slot />
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    height: {
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
    bPoint() {
      return this.$vuetify.breakpoint;
    },
  },
};
</script>

<style  scoped>
</style>