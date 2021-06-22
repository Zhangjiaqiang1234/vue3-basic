<template>
  <h1>{{ result }}</h1>
</template>
<script>
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    return new Promise((resolve) => {
      // 要使用 suspense，这里要使用 Promise
      setTimeout(() => {
        return resolve({
          result: 42,
        });
      }, 1000);
    });
  },
});
</script>

<style></style>
