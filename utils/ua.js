function funIsIOS(ua) {
  if (/\bcpu(?: iphone)? os /.test(ua)) {
    return /\bcpu(?: iphone)? os ([0-9._]+)/.test(ua);
  }
  if (ua.indexOf('iph os ') !== -1) {
    return /\biph os ([0-9_]+)/.test(ua);
  }
  return /\bios\b/.test(ua);
}

function funIsAndroid(ua) {
  if (ua.indexOf('android') >= 0) {
    // eslint-disable-next-line no-useless-escape
    return /\bandroid[ \/-]?([0-9.x]+)?/.test(ua);
  }
  if (ua.indexOf('adr') >= 0) {
    if (ua.indexOf('mqqbrowser') >= 0) {
      return /\badr[ ]\(linux; u; ([0-9.]+)?/.test(ua);
    }
    return /\badr(?:[ ]([0-9.]+))?/.test(ua);
  }
  return /android/.test(ua);
}

// 导出
export const ua = window.navigator.userAgent.toLowerCase();
export const isAPP = /black/.test(ua);
export const isTiShen = /taisem|(ZZCIOS\/black\/1\.20)/.test(ua);
export const isIOS = funIsIOS(ua);
export const isAndroid = funIsAndroid(ua);
export const appVersion = window.navigator.userAgent.split('/')[2] || '1.12.0';
