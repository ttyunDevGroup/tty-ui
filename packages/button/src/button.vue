<template>
  <button
    @click="$emit('click')"
    class="t__button"
    :disabled="disabled"
    :style="{width: width ? width + 'px' : 'auto'}"
    :class="[
    't__button--'+type,
    {'is-plain': plain, 'is-disabled': disabled, 'is-round': round},
    't__button--size-'+size
    ]"
  >
    <i v-if="icon !== ''" :class="icon"></i>
    <slot></slot>
  </button>
</template>
<script>
  export default{
    name: 'TButton',
    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: {
        type: String,
        default: 'default'
      },
      icon: {
        type: String,
        default: ''
      },
      width: String,
      plain: Boolean,
      disabled: Boolean,
      round: Boolean
    },
    data () {
      return {
        msg: 'button'
      }
    }
  }
</script>
