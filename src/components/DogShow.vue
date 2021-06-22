<template>
  <img :src="result && result.message" />
</template>
<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  async setup() {
    // 可以使用 async + await 的方式使用 suspense，其实 async 只是 Promise 的一个语法糖而已
    const rawData = await axios.get("https://dog.ceo/api/breeds/image/random1");
    return {
      result: rawData.data,
    };
  },
});
</script>

<style></style>
