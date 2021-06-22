<!-- 下拉菜单组件 -->
<template>
  <div class="dropdown">
    <!-- 按钮 -->
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">{{ title }}</a>
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Dropdown',
  props: {
    // 下拉菜单标题
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const isOpen = ref(false)
    // 切换下拉菜单的显示隐藏
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    return {
      isOpen,
      toggleOpen
    }
  }
})
</script>

<style>
</style>
