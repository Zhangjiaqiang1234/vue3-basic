<template>
  <form class="validate-form-container">
    <!-- 默认插槽 -->
    <slot name="default"></slot>
    <!-- 提交按钮 -->
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
type ValidateFunc = () => boolean
type clearFunc = () => void
export const emitter = mitt() // 创建一个事件监听器
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'], // 往外抛出事件的列表
  setup(props, context) {
    let funcArr: ValidateFunc[] = [] // 这里存放一系列的异步函数
    let valArr: clearFunc[] = []
    // 当触发表单提交
    const submitForm = () => {
      // 进行循环验证
      const result = funcArr.map(func => func()).every(result => result)
      // 将验证结果返回出去
      context.emit('form-submit', result)
    }
    const callback = (func: any) => {
      funcArr.push(func)
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
      emitter.off('clear-input', getVal)
      valArr = []
    })

    // 接收来自
    const getVal = (func: any) => {
      valArr.push(func)
    }
    // 置空按钮
    const clearInputs = () => {
      console.log('开始置空')
      valArr.map(func => func())
    }
    emitter.on('clear-input', getVal)
    return {
      submitForm,
      clearInputs
    }
  }
})
</script>

<style>
</style>
