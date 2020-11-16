<template>
  <v-row :style="{ height: setHeight }" align="center" class="mt-4">
    <v-col cols="4" class="pr-0">
      <v-row
        :style="{ height: cardHeight }"
        class="row_color"
        align="center"
        justify="start"
        no-gutters
      >
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          :src="img"
          contain
          aspect-ratio="1.7"
          :style="{ position: 'relative', top: imgOffset }"
          :height="imgHeihght"
          max-width="150px"
        ></v-img>
      </v-row>
    </v-col>
    <v-col cols="8" class="pl-0">
      <v-row
        :style="{ height: cardHeight }"
        class="row_color"
        align="center"
        justify="start"
        no-gutters
      >
        <span
          v-html="promotionText"
          class="text-center primary--text font-italic font-weight-bold text-wrap"
          :class="!bPoint.mobile ? 'text_promotions' : ''"
        ></span>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      imgRatio: 1.2,
      cardRatio: 0.9,
    };
  },
  props: {
    height: {
      type: Number,
    },
    img: {
      type: String,
    },
    promotionText: {
      type: String,
    },
  },
  computed: {
    bPoint() {
      return this.$vuetify.breakpoint;
    },
    setHeight() {
      if (!this.height) {
        return "auto";
      }
      return this.height + "px";
    },
    imgHeihght() {
      return this.height * 1.2 + "px";
    },
    cardHeight() {
      return this.height * 0.8 + "px";
    },
    imgOffset() {
      return (
        -(this.height * this.imgRatio - this.height * this.cardRatio) / 2 + "px"
      );
    },
  },
};
</script>

<style  scoped>
.row_color {
  background-color: white;
}
.text_promotions {
  line-height: 48px;
}
</style>
<style >
.v-application p {
  margin-bottom: 0px;
}
</style>
