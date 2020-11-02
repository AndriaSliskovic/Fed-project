<template>
  <div>
    <v-col cols="12" class="mt-3">
      <v-btn color="primary" @click="onClick" block>
        <slot />
      </v-btn>
    </v-col>
  </div>
</template>

<script>
export default {
  methods: {
    onClick() {
      this.$emit("submited");
    },
  },
};
</script>

<style  scoped>
</style>