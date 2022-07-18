<template>
  <div>
    <!-- 三级联动全局组件，因为它已经注册为全局组件，因此不需要再引入 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- Floor这个组件，自己内部没有发送请求，数据是通过父组件传过来的 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list='floor' />
    <Brand />
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'
export default {
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed:{
    ...mapState('home',{floorList:'floorList'})
  },
  mounted() {
    this.$store.dispatch('home/getFloorList')
  },
}
</script>

<style>

</style>