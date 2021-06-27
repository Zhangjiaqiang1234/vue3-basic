<template>
  <div class="validate-input-container pb-3">
    <!-- 输入框 -->
    <input
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />
    <!-- 错误文字提示 -->
    <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from 'vue'
import { emitter } from './ValidateForm.vue'
import mitt from 'mitt'
// 邮箱验证正则表达式
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
interface RuleProp {
  // 验证规则接口
  type: 'required' | 'email' | 'range' // 验证类型
  message?: string // 验证失败错误提示
  min?: {
    // 最小长度
    message: string
    length: number
  }
  max?: {
    // 最大长度
    message: string
    length: number
  }
}
export type RulesProp = RuleProp[]
export default defineComponent({
  name: 'ValidateInput',
  props: {
    // 验证的规则列表
    rules: Array as PropType<RulesProp>,
    modelValue: String
  },
  inheritAttrs: false, // 禁止继承Attribute
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: '',
      min: {
        message: '',
        length: 0
      },
      max: {
        message: '',
        length: 1000
      }
    })
    // 当输入框值发生改变，要实现双向数据绑定
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }

    /** 规则验证 */
    const validateInput = () => {
      if (props.rules) {
        // every 方法:所有都通过才认为是通过，其中一个不通过则认为不通过，会马上退出循环
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message || ''
          switch (rule.type) {
            case 'required':
              // 值不得为空
              passed = inputRef.val.trim() !== ''
              break
            case 'email':
              // 要符合邮箱的格式
              passed = emailReg.test(inputRef.val)
              break
            case 'range':
              // 要符合长度的验证
              if (inputRef.val.trim().length < (rule?.min?.length || inputRef?.min?.length)) {
                inputRef.message = rule?.min?.message || rule.message || ''
                passed = false
              } else if (inputRef.val.trim().length > (rule?.max?.length || inputRef?.max?.length)) {
                passed = false
                inputRef.message = rule?.max?.message || rule.message || ''
              }
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }

    // 清空输入框
    const clearInput = () => {
      inputRef.val = ''
    }
    onMounted(() => {
      // 当组件被创建时，往外发送一个事件
      emitter.emit('form-item-created', validateInput)
      emitter.emit('clear-input', clearInput)
    })
    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>

<style>
</style>
