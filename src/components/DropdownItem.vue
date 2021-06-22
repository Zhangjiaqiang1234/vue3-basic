<!-- 下拉菜单的选项组件 -->
<template>
  <li :class="{ 'dropdown-option': true, 'is-disabled': disabled }">
    <slot />
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DropdownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style>
.dropdown-option.is-disabled a {
  background-color: red;
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
