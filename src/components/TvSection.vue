<template>
  <div :style="{ height: setHeight }">products {{ height }}</div>
</template>

<script>
export default {
  data() {
    return {
      color: "red",
    };
  },
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
  },
};
</script>

<style  scoped>
</style>