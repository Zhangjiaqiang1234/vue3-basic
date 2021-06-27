<template>
  <div class="container">
    <!-- 导航栏 -->
    <global-header :user="currentUser"></global-header>
    <!-- 表单验证内容 -->
    <validate-form @form-submit="onFormSubmit" ref="formRef">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          v-model="emailVal"
          :rules="emailRules"
          placeholder="请输入邮箱地址"
          ref="inputRef"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          v-model="passwordVal"
          :rules="passwordRules"
          placeholder="请输入密码"
        ></validate-input>
      </div>
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>

    <!-- 卡片列表 -->
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumProps } from './components/ColumnList.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
const currentUser: UserProps = {
  isLogin: true,
  name: 'zhangsan',
  id: 1
}
const testData: ColumProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150'
  },
  {
    id: 3,
    title: 'test2的专栏',
    description: '这是test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: ''
  },
  {
    id: 4,
    title: 'test2的专栏',
    description: '这是test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150'
  }
]
// 邮箱验证正则表达式
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup() {
    const inputRef = ref<any>()
    const formRef = ref<any>()
    const emailVal = ref('')
    // 定义邮箱的验证规则
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordVal = ref('')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
      {
        type: 'range',
        message: '',
        min: {
          message: '密码不能少于5位',
          length: 5
        },
        max: {
          message: '密码不能大于10位',
          length: 10
        }
      }
    ]
    // 当触发表单提交
    const onFormSubmit = (result: boolean) => {
      console.log('result', result)
      if (result) {
        // 模拟请求失败
        console.log('请求失败')
        formRef.value.clearInputs()
      }
    }

    /** 邮箱相关属性 */
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })

    return {
      list: testData,
      currentUser,
      emailRef,
      emailVal,
      emailRules,
      passwordVal,
      passwordRules,
      onFormSubmit,
      inputRef,
      formRef
    }
  }
})
</script>

<style>
</style>
