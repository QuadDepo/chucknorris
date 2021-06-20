<template>
  <button @click="$emit('click', $event);" class="button" :class="buttonClass">
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    type: {
      required: false,
      type: Array,
      default: () => (['primary'])
    },
    onClick: {
      required: false,
      type: Function,
      default: () => {}
    }
  },
  
  computed: {
    buttonClass: function () {
      return this.type.reduce((currentValue, currentIndex) => {
        return `${currentValue} button--${currentIndex} `
      }, '')
    }
  }
};
</script>

<style lang="scss" scoped>
  .button {
    transition: all .4s ease;
    padding: 0px 16px;
    border: none;
    min-height: 44px;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    user-select: none;

    &--primary {
      background: #1F87FC;
      color: #fff;
    }

    &--secondary {
      color: #3c4043;
      background-color: #e8e8e8;
      border: 1px solid #f8f9fa;

      &:hover {
        background:#dedede;
      }
    }

    &--text {
      padding: 0;
      min-height: auto;
    }
  
    &--outline-danger {
      background: transparent;
      color: #FF2F24;

      &:hover {
        background: transparent;
        color: #e2291f;
      }
    }

    &--outline {
      background: transparent;
      opacity: .4;

      &:hover {
        opacity: 1;
        background: transparent;
      }
    }
  }
</style>
