<template>
  <div>
    <v-col cols="12" class="mt-3">
      <v-btn color="primary" @click="onClick" block class="btn_class">
        <slot />
      </v-btn>
    </v-col>
  </div>
</template>

<script>
export default {
      props: {
      text: {
        type: String,
        default: 'Submit'
      },
    },
  methods: {
    onClick() {
      this.$emit("submited");
    },
  },
};
</script>

<style  scoped>
.btn_class{
  border-radius: 10px;
}
</style>