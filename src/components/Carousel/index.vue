<template>
  <div>
    <div class="swiper-container" ref="cur">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in list" :key="item.id">
          <img :src="item.imgUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      immediate: true, //组件初始化的时候执行一次handler，无论list有没有发生变化
      handler() {
        this.$nextTick(() => {
          let mySwiper = new Swiper(this.$refs.cur, {
            direction: "horizontal",
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>