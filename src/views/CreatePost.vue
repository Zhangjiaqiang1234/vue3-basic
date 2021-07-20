<!-- 新建文章页面 -->
<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <!-- 文章标题部分 -->
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text" />
      </div>
      <!-- 详情 -->
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          rows="10"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
        />
      </div>
      <!-- 提交按钮 -->
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { GlobalDataProps, PostProps } from '../store'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    // 标题
    const titleVal = ref('')
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    // 标题验证规则
    const titleRules: RulesProp = [{ type: 'required', message: '文章标题不能为空' }]
    // 详情
    const contentVal = ref('')
    // 详情验证规则
    const contentRules: RulesProp = [{ type: 'required', message: '文章详情不能为空' }]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        // 专栏id
        const { columnId } = store.state.user
        // 新建文章数据
        if (columnId) {
          const newPost: PostProps = {
            id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            columnId,
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
          // 跳转至专栏详情页
          router.push({
            name: 'column',
            params: {
              id: columnId
            }
          })
        }
      }
    }

    return {
      titleRules,
      titleVal,
      contentVal,
      contentRules,
      onFormSubmit
    }
  }
})
</script>
