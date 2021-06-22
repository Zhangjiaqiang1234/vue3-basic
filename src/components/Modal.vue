<template>
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h2>
        <slot>this is modal</slot>
      </h2>
      <button @click="buttonClick">Close</button>
    </div>
  </teleport>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    isOpen: Boolean,
  },
  emits: {
    "close-modal": null,
  },
  setup(props, context) {
    const buttonClick = () => {
      context.emit("close-modal");
    };
    return {
      buttonClick,
    };
  },
});
</script>

<style>
#center {
  position: fixed;
  background-color: #fff;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px solid black;
}
</style>
