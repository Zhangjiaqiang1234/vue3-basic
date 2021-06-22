import { ref, toRefs, reactive, onMounted, onUnmounted } from "vue";

function useMousePoint() {
  const data = reactive({
    x: 0,
    y: 0,
  });

  onMounted(() => {
    document.addEventListener("click", getMousePoint);
  });
  onUnmounted(() => {
    document.removeEventListener("click", getMousePoint);
  });

  function getMousePoint(e: MouseEvent) {
    data.x = e.pageX;
    data.y = e.pageY;
  }
  return {
    ...toRefs(data),
  };
}

export default useMousePoint;
