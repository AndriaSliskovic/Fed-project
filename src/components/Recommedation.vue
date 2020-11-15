<template>
  <v-card
    :color="!data ? 'white' : 'secondary'"
    :style="{ height: setHeight, borderStyle: 'none' }"
    flat
    class="card_class"
  >
    <v-col cols="12" v-if="data">
      <v-row justify="center">
        <p class="main_text primary--text font-weight-bold font-italic my-0">Preporučujemo</p>
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
<style lang="scss" scoped>
$card-border-radius:0px;
.main_text {
  font-size: 15px;
  line-height: 27px;
}
.card_class{
  border-bottom-left-radius:0px;
  
}
</style>