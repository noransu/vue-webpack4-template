<template>
  <div id="app">
    <luck-bag-layer
      :showOverlay="showOverlay"
      :luckBagId="luckBagId"
      :closeOverlay="closeOverlay"
      :withdrawMoney="withdrawMoney"
      @afterWatchVideo="afterWatchVideo" />
  </div>
</template>

<script>
import LuckBagLayer from './pages/LuckBagLayer.vue';


export default {
  components: {
    LuckBagLayer,
  },
  data() {
    return {
      showOverlay: false,
      luckBagId: 1333243717452173312,
    };
  },
  mounted(){
    this.showOverlay = true;
  },
  beforeDestroy(){
    this.closeOverlay();
  },
  methods: {
    closeOverlay() {
      this.showOverlay = false;
      this.luckBagId = null;
      this.$emit('clickCloseOverlay');
    },

    withdrawMoney(){
      this.$emit('clcikWithdrawMoney');
    },

    afterWatchVideo(){
      this.$emit('afterWatchVideo');
    }
  },
}
</script>

<style lang="less" scoped>
</style>
