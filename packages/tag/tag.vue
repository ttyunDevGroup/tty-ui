<template>
  <transition :name="closeTransition ? '' : 'b-zoom-in-center'">
    <span class="b-tag" :class="[type ? 'b-tag-' + type : '', {'is-hit': hit}]" :style="{backgroundColor: color}">
      <slot></slot><i class="b-tag-close t-icon-close" v-if="closable" @click="handleClose"></i>
    </span>
  </transition>
</template>

<script>
export default {
  name: 'TTag',
  props: {
    text: String,
    closable: Boolean,
    type: String,
    hit: Boolean,
    closeTransition: Boolean,
    color: String
  },
  methods: {
    handleClose(event) {
      this.$emit('close', event)
    }
  }
}
</script>

<style lang="less" scoped>
.b-tag {
  background-color: #f5f5f5;
  display: inline-block;
  padding: 0 5px;
  height: 24px;
  line-height: 22px;
  font-size: 12px;
  color: #666;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid transparent;
  white-space: nowrap;
}

.b-tag .b-tag-close {
  display: inline-block;
  border-radius: 50%;
  text-align: center;
  position: relative;
  cursor: pointer;
  font-size: 12px;
  -ms-transform: scale(0.75, 0.75);
  transform: scale(0.75, 0.75);
  height: 20px;
  width: 20px;
  line-height: 20px;
  vertical-align: middle;
  top: -1px;
  right: -2px;
}

.b-tag .b-tag-close:hover {
  box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.1) inset;
}

.b-tag-gray {
  background-color: rgb(228, 241, 236);
  border-color: rgb(228, 241, 236);
  color: rgb(72, 106, 89);
}

.b-tag-gray .b-tag-close:hover {
  background-color: rgb(72, 106, 89);
  color: #fff;
}

.b-tag-gray.is-hit {
  border-color: rgb(72, 106, 89);
}

.b-tag-primary {
  background-color: rgba(32, 160, 255, 0.1);
  border-color: rgba(32, 160, 255, 0.2);
  color: #00a53c;
}

.b-tag-primary .b-tag-close:hover {
  background-color: #00a53c;
  color: #fff;
}

.b-tag-primary.is-hit {
  border-color: #00a53c;
}

.b-tag-success {
  background-color: rgba(18, 206, 102, 0.1);
  border-color: rgba(18, 206, 102, 0.2);
  color: #13ce66;
}

.b-tag-success .b-tag-close:hover {
  background-color: #13ce66;
  color: #fff;
}

.b-tag-success.is-hit {
  border-color: #13ce66;
}

.b-tag-warning {
  background-color: rgba(247, 186, 41, 0.1);
  border-color: rgba(247, 186, 41, 0.2);
  color: #f7ba2a;
}

.b-tag-warning .b-tag-close:hover {
  background-color: #f7ba2a;
  color: #fff;
}

.b-tag-warning.is-hit {
  border-color: #f7ba2a;
}

.b-tag-danger {
  background-color: rgba(255, 73, 73, 0.1);
  border-color: rgba(255, 73, 73, 0.2);
  color: #ff4949;
}

.b-tag-danger .b-tag-close:hover {
  background-color: #ff4949;
  color: #fff;
}

.b-tag-danger.is-hit {
  border-color: #ff4949;
}
</style>