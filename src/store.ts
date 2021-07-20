import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData'
export { ColumnProps, PostProps } from './testData'
// 用户信息接口
interface UserProps {
  isLogin: boolean // 是否登录
  name?: string // 用户名
  id?: number // 用户id
  columnId?: number // 专栏id
}
// 全局数据Props接口
export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}
export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
  fitUrl?: string
}
const store = createStore<GlobalDataProps>({
  state: {
    // 专栏列表信息
    columns: testData,
    // 文章详情信息
    posts: testPosts,
    // 用户信息
    user: { isLogin: false, name: 'viking', columnId: 1 }
  },
  mutations: {
    // 用户登录
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'viking' }
    },
    // 创建文章
    createPost(state, newPost) {
      state.posts.push(newPost)
    }
  },
  getters: {
    // 通过id获取专栏
    getColumnById: state => (id: number) => {
      return state.columns.find(c => c.id === id)
    },
    // 通过cid获取专栏文章
    getPostsByCid: state => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  }
})
export default store
