import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData'
interface UserProps {
  isLogin: boolean // 是否登录
  name?: string // 用户名
  id?: number // 用户id
}
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
    columns: testData,
    posts: testPosts,
    user: { isLogin: false }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'viking' }
    }
  },
  getters: {
    biggerColumnLen(state) {
      return state.columns.filter(c => c.id > 2).length
    },
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
