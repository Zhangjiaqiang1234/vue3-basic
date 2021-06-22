<template>
  <div>
    <h1>x:{{ x }}</h1>
    <h1>y:{{ y }}</h1>
    <h1 v-if="loading">Loading!...</h1>
    <p>{{error}}</p>

    <Suspense>
      <template #default>
        <!-- 自带具名插槽 defalut，成功后显示 -->
        <div>
          <!-- 这里会等待两个组件都 reslove 成功才会显示 -->
          <dog-show />
          <async-show />
        </div>
      </template>
      <template #fallback>
        <!-- 自带具名插槽 fallback，成功前显示 -->
        <h1>Loading !...</h1>
      </template>
    </Suspense>

    <button @click="openModal">Open Modal</button>
    <img v-if="loaded" :src="result[0].url" />
    <modal :isOpen="modalIsOpen" @close-modal="onModalClose">
      My Modal!!!
    </modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  onErrorCaptured,
} from "vue";
import useMousePoint from "./hooks/useMousePositon";
import useURLLoader from "./hooks/useURLLoader";
import Modal from "@/components/Modal.vue";
import AsyncShow from "@/components/AsyncShow.vue";
import DogShow from "@/components/DogShow.vue";
// interface DogResult {
//   message: string;
//   status: string;
// }
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}
export default defineComponent({
  name: "App",
  components: {
    Modal,
    AsyncShow,
    DogShow,
  },
  setup() {
    const { x, y } = useMousePoint();
    const { result, loading, loaded } = useURLLoader<CatResult[]>(
      "https://api.thecatapi.com/v1/images/search?limit=1"
    );
    const error = ref(null);
    onErrorCaptured((e: any) => {
      error.value = e;
      // 最后要注意这个钩子函数要返回一个boolean值，表示是否向上传播
      return true;
    });

    watch(result, () => {
      if (result.value) {
        console.log("value", result.value[0].url);
      }
    });

    const modalIsOpen = ref(false);
    const openModal = () => {
      modalIsOpen.value = true;
    };
    const onModalClose = () => {
      modalIsOpen.value = false;
    };

    return {
      x,
      y,
      result,
      loading,
      loaded,
      error,
      modalIsOpen,
      openModal,
      onModalClose,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
