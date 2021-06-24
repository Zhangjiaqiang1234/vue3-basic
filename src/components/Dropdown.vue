<!-- 下拉菜单组件 -->
<template>
  <div class="dropdown" ref="dropdownRef">
    <!-- 按钮 -->
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">{{ title }}</a>
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'
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

    const dropdownRef = ref<null | HTMLElement>(null)

    // 切换下拉菜单的显示隐藏
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    // 点击事件处理函数
    const isClickOutside = useClickOutside(dropdownRef)
    // 监听变化
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>

<style>
</style>
