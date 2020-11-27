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
      debugger;
      if(val) {
        debugger;
      }
    },
  },
}
</script>

<style lang="less" scoped>
.toast {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  .toast-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    height: 210px;
    width: 220px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 16px;
    .toast-text {
      margin-top: 16px;
      font-size: 30px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 30px;
    }
  }
}
</style>
