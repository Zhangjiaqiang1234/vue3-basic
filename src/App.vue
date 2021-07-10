<template>
  <div class="container">
    <!-- 导航栏 -->
    <global-header :user="currentUser"></global-header>

    <!-- 动态内容 -->
    <router-view></router-view>
    <!-- 底部内容 -->
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">@ 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
  },
  setup() {
    const store = useStore()
    const currentUser = computed(() => store.state.user)
    return {
      currentUser
    }
  }
})
</script>

<style>
</style>
