<template>
  <div id="app">
    <luck-bag-layer
      :showOverlay="bagConfig.showOverlay"
      :closeOverlay="closeOverlay"
      :showFirstBag="bagConfig.showFirstBag"
      :showDoubleBag="bagConfig.showDoubleBag"
      :watchVideo="watchVideo"
      :watchDoubleVideo="watchDoubleVideo"
      :reward="bagConfig.reward" />
    <Toast :toastText="toastText"
           :showToast.sync="showToast"
           :duration="duration" />
  </div>
</template>

<script>
import Toast from './components/toast.vue';
import LuckBagLayer from './pages/LuckBagLayer.vue';
import stat from '../utils/stat';

import { playRewardAdVideo } from '../utils/native';
import { isIOS } from '../utils/ua';
import { openBag, getBagSwell } from '../service/apis/lucky-bag';

const baseBagConfig = Object.freeze({
  showOverlay: false,
  showFirstBag: true,
  showDoubleBag: false,
  reward: 0,
  canWatchVideo: true,
  luckBagId: 0,
});

export default {
  components: {
    LuckBagLayer,
    Toast,
  },
  data() {
    return {
      bagConfig: {
        showOverlay: true,
        showFirstBag: true,
        showDoubleBag: false,
        reward: 0,
        canWatchVideo: true,
        luckBagId: 1333243717452173312,
      },
      showToast: false,
      toastText: '您已经拆开过该福袋啦',
      duration: 2000,
    };
  },
  beforeDestroy(){
    this.closeOverlay();
  },
  methods: {
    // TODO 添加ModalHelper;
    closeOverlay() {
      this.bagConfig = {...baseBagConfig};
    },

    async afterWatchVideo({ luckBagId, clicked, type}){
      const res = type === 'first' ? await openBag({ luckBagId, clicked }) : await getBagSwell({ luckBagId, clicked });
      if (res && res.isSuccess) {
        this.showToast = false;
        const { expand, luckBagId, reward } = res.data;
        this.bagConfig.luckBagId = luckBagId;
        this.bagConfig.reward = reward;
        this.bagConfig.showFirstBag = false;
        this.bagConfig.showDoubleBag = !!expand;
      } else {
        this.duration = 2000;
        this.toastText = res.msg;
        this.showToast = true;
      }
    },

    // async afterWatchSwellVideo() {
    //   const res = await openBag({ luckBagId, clicked });
    //   if (res && res.isSuccess) {
    //     this.showToast = false;
    //     const { expand, luckBagId, reward } = res.data;
    //     this.luckBagId = luckBagId;
    //     this.reward = reward;
    //     this.showFirstBag = false;
    //     this.showDoubleBag = !!expand;
    //   } else {
    //     this.duration = 2000;
    //     this.toastText = res.msg;
    //     this.showToast = true;
    //   }
    // },

    watchVideo(){
      this.duration = 20000;
      this.toastText = '请稍等...';
      this.showToast = true;
      // stat.track('click', {
      //   obj_id: 'popup_fudai_open',
      //   obj_type: 'page_fudai',
      // });
      // this.playVideo('first');
    },

    async playVideo(type) {
      if (!this.bagConfig.canWatchVideo) return;
      this.bagConfig.canWatchVideo = false;
      this.duration = 20000;
      this.toastText = '请稍等...';
      this.showToast = true;
      const res = await playRewardAdVideo({
        android: '945248910',
        ios: '945248905',
        byAdId: isIOS ? '10003304' : '10003303',
      });
      if (res && res.data) {
        this.showToast = false;
        const { luckBagId } = this.bagConfig;
        this.afterWatchVideo({luckBagId, clicked: res.data.click, type});
      } else {
        this.showToast = false;
        this.duration = 2000;
        this.toastText = res && res.message ? res.message : '播放失败，请稍后重试';
        this.showToast = true;
        // Toast(res && res.message ? res.message : '播放失败，请稍后重试');
        this.bagConfig.canWatchVideo = true;
      }
    },

    watchDoubleVideo() {
      stat.track('click', {
        obj_id: 'double_popup_fudai_open',
        obj_type: 'page_fudai',
      });
      this.playVideo('swell');
    },
  },
}
</script>

<style lang="less" scoped>
</style>
