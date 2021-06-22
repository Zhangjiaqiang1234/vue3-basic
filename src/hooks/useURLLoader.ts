import { ref } from "vue";
import axios from "axios";

function useURLLoader<T>(url: string) {
  const result = ref<T | null>(null);
  const loading = ref(true); // 是否加载中
  const loaded = ref(false); // 是否加载完
  const error = ref(null);

  axios
    .get(url)
    .then((rawData) => {
      loading.value = false;
      loaded.value = true;
      result.value = rawData.data;
    })
    .catch((e) => {
      error.value = e;
    });

  return {
    result,
    loading,
    loaded,
    error,
  };
}

export default useURLLoader;
