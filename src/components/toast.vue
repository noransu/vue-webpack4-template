<template>
  <transition name="toast">
    <div v-if="showToast" class="toast">
      <div class="toast-wrap">
        <div class="toast-text">{{ toastText }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props:{
    showToast: {
      type: Boolean,
      default: false,
    },
    toastText: String,
    duration: {
      type: Number,
      default: 2000,
    }
  },
  watch: {
    showToast(val){
      if(val) {
        const { duration } = this;
        const self = this;
        setTimeout(()=>{
          self.$emit('update:showToast',false);
        }, duration)
      }
    },
  },
}
</script>

<style lang="less" scoped>
@scale: 0.5;

.toast {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  .toast-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    padding: 30px * @scale;
    background-color: rgba(51, 51, 51, 0.8);
    border-radius: 16px * @scale;
    .toast-text {
      font-size: 28px * @scale;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 42px * @scale;
    }
  }
}
</style>
