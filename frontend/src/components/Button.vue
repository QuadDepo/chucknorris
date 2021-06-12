<template>
  <button>
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    onClick: {
      required: false,
      type: Function,
      default: () => {}
    }
  }
};
</script>
