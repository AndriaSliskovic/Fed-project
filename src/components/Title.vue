<template>
  <div >
      <p class="text-h3 mb-0">{{ name }}</p>

  </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: ""
        },
    },
};
</script>

<style lang="scss" scoped>
</style>