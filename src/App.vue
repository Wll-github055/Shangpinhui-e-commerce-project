<template>
  <div>
    <Header/>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- Footer组件在Home、Search下要显示，在Login、Register下要隐藏 -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>

import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>


