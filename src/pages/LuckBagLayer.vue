<template>
  <!-- 开福袋遮盖层 -->
  <div>
    <transition name="fade">
      <div v-if="showOverlay" class="container">
        <div v-if="showFirstBag" v-intersection class="overlay-wrapper"
            :data-log="formatLuckBagLayerData()">
          <div class="shine-bg shining" />
          <div class="overlay-top">
            <div class="overlay-title">
              <i class="dot" />
              <span class="text">惊喜福袋</span>
              <i class="dot reverse"></i>
            </div>
            <div class="big-title">看视频即可开福袋</div>
            <div class="sub-title" @click.stop="watchVideo" />
          </div>
          <div class="overlay-content">
            <div class="open-bag">
              <span id="openBtn" class="open-btn" @click.stop="watchVideo" />
            </div>
            <i class="round-close-btn" @click="closeOverlay" />
          </div>
        </div>
        <!-- <div v-else-if="showDoubleBag" v-intersection 
            :data-log="formatLuckBagSwellData()" class="overlay-double-content">
          <div class="overlay-title" />
          <div class="bags-wrapper">
            <div>
              <span class="small-bag" />
              <span class="arrow-wrap">
                <span class="arrow-right" />
              </span>
              <span class="big-bag">
                <span class="open-btn" @click="swell('swell')" />
              </span>
            </div>
            <i class="close-btn" @click="closeOverlay" />
          </div>
        </div> -->
        <div v-else-if="showDoubleBag" v-intersection 
             class="overlay-wrapper" :data-log="formatLuckBagSwellData()">
          <div class="shine-bg shining" />
          <div class="overlay-title" style="margin-bottom: -20px;">
            <i class="dot" />
            <span class="text">恭喜获得福袋奖励金</span>
            <i class="dot reverse"></i>
          </div>
          <div class="overlay-content">
            <div class="result-num">
              <span class="unit">￥</span>
              <span class="number">{{ reward }}</span>
            </div>
            <div class="result-swell__text">再看视频奖励金最高可膨胀<span>5</span>倍</div>
            <div class="opened-bag">
            <!-- <span class="opened-tips">您已经拆开过该福袋啦</span> -->
              <span class="checkup-btn" @click="watchDoubleVideo">我要膨胀</span>
            </div>
            <i class="round-close-btn top-0" @click="closeOverlay" />
          </div>
          <!-- <div v-if="adSingle.length>0 && showAd" class="banner-wrapper">
            <div class="advertise"
                :style="`background:url(${adSingle[0].logo}) no-repeat cover;`"
                @click="jumpLuckBugAd(adSingle[0].url)"
            />
            <i class="ad-close" @click="closeAd" />
          </div> -->
        </div>
        <div v-else v-intersection class="overlay-wrapper" :data-log="formatOpenedLuckBagData()">
          <div class="shine-bg shining" />
          <div class="overlay-title" style="margin-bottom: -20px;">
            <i class="dot" />
            <span class="text">恭喜获得福袋奖励金</span>
            <i class="dot reverse"></i>
          </div>
          <div class="overlay-content">
            <div class="result-num">
              <span class="unit">￥</span>
              <span class="number">{{ reward }}</span>
            </div>
            <div class="result-tips">已存入您的账户中</div>
            <div class="opened-bag">
            <!-- <span class="opened-tips">您已经拆开过该福袋啦</span> -->
              <span class="checkup-btn" @click="withdrawMoney">立即提现</span>
            </div>
            <i class="round-close-btn top-0" @click="closeOverlay" />
          </div>
          <!-- <div v-if="adSingle.length>0 && showAd" class="banner-wrapper">
            <div class="advertise"
                :style="`background:url(${adSingle[0].logo}) no-repeat cover;`"
                @click="jumpLuckBugAd(adSingle[0].url)"
            />
            <i class="ad-close" @click="closeAd" />
          </div> -->
        </div>
      </div>
    </transition>
    
  </div>
</template>

<script>
import { playBottomAdVideo, dismissBottomAd } from '../../utils/native';

const ua = window.navigator.userAgent.toLowerCase();

function funIsIOS(ua) {
  if (/\bcpu(?: iphone)? os /.test(ua)) {
    return /\bcpu(?: iphone)? os ([0-9._]+)/.test(ua);
  }
  if (ua.indexOf('iph os ') !== -1) {
    return /\biph os ([0-9_]+)/.test(ua);
  }
  return /\bios\b/.test(ua);
}

const isIOS = funIsIOS(ua);


export default {
  props: {
    showOverlay: {
      type: Boolean,
      default: false,
    },
    closeOverlay: Function,
    showFirstBag: {
      type: Boolean,
      default: true,
    },
    showDoubleBag: {
      type: Boolean,
      default: false,
    },
    watchVideo: Function,
    watchDoubleVideo: Function,
    reward: {
      type: [Number, String],
      default: 0,
    },
  },
  components: {
  },
  data() {
    return {
    };
  },
  mounted() {
    this.$watch(vm => [vm.showOverlay, vm.showFirstBag, vm.showDoubleBag]
      .join(), newVal => {
      const newArr = newVal.split(',');
      const existTrue = newArr.find(item => item === 'true');
      if (existTrue) {
        playBottomAdVideo({
          android: '945343002',
          ios: '945343003',
          byAdId: isIOS ? '10003319' : '10003318',
        });
        if(this.showOverlay && !this.showFirstBag && !this.showDoubleBag) {
          this.$parent.duratin = 2000;
          this.$parent.toastText = '您已经拆开过该福袋啦';
          this.$parent.showToast = true;
        }
      } else {
        dismissBottomAd();
      }
    });
  },
  beforeDestroy() {
    dismissBottomAd();
  },
  methods: {
    // watchVideo() {
    //   this.$emit('watchVideo');
    // },

    formatLuckBagLayerData() {
      return JSON.stringify({
        event: 'page_view',
        obj_id: 'popup_fudai_open',
        obj_type: 'page_fudai',
      });
    },

    formatOpenedLuckBagData() {
      return JSON.stringify({
        event: 'page_view',
        obj_id: 'popup_fudai_opened',
        obj_type: 'page_fudai',
      });
    },

    formatLuckBagSwellData() {
      return JSON.stringify({
        event: 'page_view',
        obj_id: 'double_popup_fudai_open',
        obj_type: 'page_fudai',
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "../../assets/css/mixin.less";
@import "../../assets/fonts/064-CAI978/064-CAI978.css";

.container {
  position: absolute;
  z-index: 900;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .overlay-wrapper {
    position: absolute;
    height: 862px * @scale;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;

    .shine-bg {
      position: absolute;
      display: inline-block;
      height: 862px * @scale;
      width: 750px * @scale;
      background: url("https://h5-promo.black-unique.com/slime/images/ba3ad42941b1b87bf139794404632077.png")
        no-repeat center / contain;
    }

    .shining {
      top: 40px * @scale;
      transform: scale(0);
      animation: shineBgAppear 0.2s 1 0.2s linear forwards,
        shine 10s infinite 0.4s linear;
    }

    .overlay-title {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: PingFangSC-Medium;
      font-size: 32px * @scale;
      line-height: 45px * @scale;
      color: #ffd27b;
      letter-spacing: 0;
      text-align: center;

      .text {
        margin: 0 18px * @scale;
      }

      .dot {
        display: inline-block;
        width: 45px * @scale;
        height: 9px * @scale;
        .background-image("https://h5-promo.black-unique.com/slime/images/cf44203b79b09695964727736407c695.png");
      }

      .reverse {
        transform: rotate(180deg);
      }
    }

    .overlay-top {
      position: absolute;
      top: 0;
      left: 111px * @scale;
      z-index: 10;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transform: scale(0);
      margin-top: 100px * @scale;
      animation: scaleY 0.3s 1 0.2s linear forwards;
      .overlay-title {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: PingFangSC-Medium;
        font-size: 32px * @scale;
        line-height: 45px * @scale;
        color: #ffd27b;
        letter-spacing: 0;
        text-align: center;

        .text {
          margin: 0 18px * @scale;
        }

        .dot {
          display: inline-block;
          width: 45px * @scale;
          height: 9px * @scale;
          .background-image("https://h5-promo.black-unique.com/slime/images/cf44203b79b09695964727736407c695.png");
        }

        .reverse {
          transform: rotate(180deg);
        }
      }

      .big-title {
        font-family: PingFangSC-Semibold;
        font-size: 66px * @scale;
        line-height: 92px * @scale;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
      }

      .sub-title {
        display: inline-block;
        height: 60px * @scale;
        width: 474px * @scale;
        margin-top: 12px * @scale;
        .background-image("https://h5-promo.black-unique.com/slime/images/8682725f7c05a0236d40dfd861505188.png");
      }
    }

    .overlay-content {
      position: relative;
      top: -23px * @scale;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .open-bag {
        position: relative;
        display: inline-block;
        width: 498px * @scale;
        height: 498px * @scale;
        .background-image("https://h5-promo.black-unique.com/slime/images/8203d04422ce48506562a7bbef30c83b.png");
        animation: fallY 0.2s 1 linear;
        margin-top: 145px * @scale;
        .open-btn {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 66px * @scale;
          margin: auto;
          display: inline-block;
          width: 144px * @scale;
          height: 144px * @scale;
          .background-image("https://h5-promo.black-unique.com/slime/images/a978cdb1e4f991b4d01a995e07b53b40.png");
          animation: scale 0.8s infinite linear;
        }
      }

      .round-close-btn {
        opacity: 0;
        position: relative;
        top: 61.4px * @scale;
        display: inline-block;
        height: 50px * @scale;
        width: 50px * @scale;
        .background-image("https://h5-promo.black-unique.com/slime/images/0061786b46ca894987a2bf5b0cae2d73.png");
        animation: appear 0.3s 1 0.2s linear forwards;
      }

      .result-num {
        color: #ffce27;
        letter-spacing: 0;
        text-align: center;
        margin-right: 20px * @scale;

        .unit {
          font-size: 44px * @scale;
          line-height: 64px * @scale;
        }

        .number {
          font-family: "064-CAI978";
          font-size: 100px * @scale;
          line-height: 130px * @scale;
          letter-spacing: -6px * @scale;
        }
      }

      .result-swell__text {
        font-size: 30px * @scale;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 42px * @scale;
        & span {
          display: inline-block;
          font-size: 58px * @scale;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #f04221;
          line-height: 25px * @scale;
          padding: 0 8px * @scale;
        }
      }

      .result-tips {
        color: #ffffff;
        font-size: 28px * @scale;
        text-align: center;
        margin-top: 12px * @scale;
        line-height: 40px * @scale;
      }

      .opened-bag {
        position: relative;
        top: -40px * @scale;
        display: inline-block;
        height: 501px * @scale;
        width: 472px * @scale;
        font-size: 0;
        background: url("https://h5-promo.black-unique.com/slime/images/b4fe1a50bec9c0f4e550f0d5e4c2392c.png")
          no-repeat center / contain;
        background-position-y: 100%;
      }

      .opened-tips {
        position: relative;
        left: 50%;
        top: 205px * @scale;
        transform: translateX(-50%);
        display: inline-block;
        width: 340px * @scale;
        height: 102px * @scale;
        background: rgba(51, 51, 51, 0.8);
        border-radius: 16px * @scale;
        font-family: PingFangSC-Regular;
        font-size: 28px * @scale;
        color: #ffffff;
        text-align: center;
        line-height: 102px * @scale;
      }

      .checkup-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        left: 50%;
        top: 410px * @scale;
        transform: translateX(-50%);
        width: 256px * @scale;
        height: 70px * @scale;
        .background-image("https://h5-promo.black-unique.com/slime/images/e4fcfc957d4049cdd093e3e7334b948f.png");
        // border-radius: 34.39px * @scale;
        font-size: 34px * @scale;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #963700;
        line-height: 48px * @scale;
        text-shadow: 0px 2px * @scale 0px #fee962;
      }

      .top-0 {
        top: 0;
      }
    }
  }

  // .overlay-double-content {
  //   position: relative;
  //   height: calc(100% - 150px * @scale);
  //   // display: flex;
  //   // flex-direction: column;
  //   // justify-content: center;
  //   // align-items: center;

  //   .overlay-title {
  //     // display: inline-block;
  //     position: absolute;
  //     top: 389px * @scale;
  //     left: 90px * @scale;
  //     height: 112px * @scale;
  //     width: 590px * @scale;
  //     .background-image("https://h5-promo.black-unique.com/slime/images/8b34f8358f79a34b2d05cd46d0832d52.png");
  //     animation: scaleY 0.3s 1 ease-in-out;
  //   }
  //   .bags-wrapper {
  //     position: relative;
  //     width: 100%;
  //     margin: 0 0 61px * @scale;
  //     padding-top: 593px * @scale;
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: center;
  //     align-items: center;

  //     .small-bag {
  //       position: relative;
  //       left: 0;
  //       display: inline-block;
  //       width: 234px * @scale;
  //       height: 211px * @scale;
  //       .background-image("https://h5-promo.black-unique.com/slime/images/e6e74b974a1e579509541222245cab75.png");
  //       opacity: 0;
  //       animation: appear2 0.3s 1 0.3s linear forwards;
  //     }
  //     .arrow-wrap {
  //       position: relative;
  //       left: -150px * @scale;
  //       bottom: 110px * @scale;
  //       display: inline-block;
  //       opacity: 0;
  //       animation: arrowAppear 0.6s 1 0.6s linear forwards;
  //       .arrow-right {
  //         display: inline-block;
  //         width: 60px * @scale;
  //         height: 48px * @scale;
  //         .background-image("https://h5-promo.black-unique.com/slime/images/d2937147110be99ea9ee3b6bb5ddc824.png");
  //         animation: moveX 0.5s infinite linear;
  //       }
  //     }
  //     .big-bag {
  //       position: relative;
  //       left: -300px * @scale;
  //       display: inline-block;
  //       width: 380px * @scale;
  //       height: 334px * @scale;
  //       .background-image("https://h5-promo.black-unique.com/slime/images/35286a8f9fa8e4a7efa765022a6c7d5a.png");
  //       // opacity: 0;
  //       transform: scale(0);
  //       animation: appearX 0.5s 1 0.6s linear forwards;

  //       .open-btn {
  //         position: absolute;
  //         left: 20px * @scale;
  //         right: 0;
  //         bottom: 40px * @scale;
  //         margin: auto;
  //         display: inline-block;
  //         width: 120px * @scale;
  //         height: 120px * @scale;
  //         .background-image("https://h5-promo.black-unique.com/slime/images/a978cdb1e4f991b4d01a995e07b53b40.png");
  //         animation: scale 0.8s infinite linear;
  //       }
  //     }
  //     .close-btn {
  //       display: inline-block;
  //       margin-top: 60px * @scale;
  //       height: 50px * @scale;
  //       width: 50px * @scale;
  //       .background-image("https://h5-promo.black-unique.com/slime/images/0061786b46ca894987a2bf5b0cae2d73.png");
  //     }
  //   }
  // }
}

.banner-wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  display: inline-block;
  width: 100%;
  height: 152px * @scale;

  .advertise {
    display: inline-block;
    width: 100%;
    height: 100%;
    .background-image("https://h5-promo.black-unique.com/slime/images/ee9c39ad3d21178ff0e823805e1f95f8.png");
    background-size: cover;
    border: 1px * @scale solid #eee;
  }

  .ad-close {
    position: absolute;
    top: 10.8px * @scale;
    right: 10.8px * @scale;
    display: inline-block;
    height: 14.8px * @scale;
    width: 14.8px * @scale;
    .background-image("https://h5-promo.black-unique.com/slime/images/d1daea599522089b5b966e5b98f25d37.png");
  }
}

/* vue动画过渡效果设置 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
