/**
 * 调起底部广告插件
 */
export function playBottomAdVideo(options = {}) {
  if (!options.slotId) {
    const androidSlotId = options.android || '945017263';
    const iosSlotId = options.ios || '945014509';
    options.slotId = isAndroid ? androidSlotId : iosSlotId;
    delete options.ios;
    delete options.android;
  }
  const defaultOptions = {
    toBottom: '0', // 可选字段  默认贴底
    sizeStr: '375*94', // 可选字段  默认 '600*90' 可选范围（'600*300' '600*400' '600*500' '600*260' '600*90' '600*150' '640*100' '690*388'）
    byAdId: '10003064', // 倍业bannerId iOS 默认 10003064
  };

  return new Promise(resolve => {
    zzc.call('showBannerAd', {
      ...defaultOptions,
      ...options,
      success: resolve,
    });
  });
}

/**
 * 关闭底部广告
 *
 * @export
 * @returns
 */
export const dismissBottomAd = () => new Promise(resolve => {
  if (window.zzc && window.zzcjsbridge && window.zzcjsbridge.dismissBannerAd) {
    zzc.call('dismissBannerAd', {
      success: resolve,
    });
  }
});
