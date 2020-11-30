const initStat = () => {
  const stat = window.sa;

  /**
   * 异常检测
   * 1. 可能没有使用 statMiddleWare
   * 2. sdk/sensorsdata 请求异常，加载顺序异常
   */

  if (!stat || !stat.track) {
    // eslint-disable-next-line no-console
    console.error('获取 stat/sa 异常');
  }

  const bigTj = {
    track: (...arg) => {
      try {
        if (arg && arg[1]) {
          arg[1].sa_login_id = window.localStorage.getItem('member_id') || 0;
          const argsObject = arg[1];
          const defaultObj = {
            item_id: '', // 元素物件id，没有取""
            item_name: '', // 元素\物件名称，没有取""
            item_sort: '1', // 元素/物件在模块中的排序位置，从1开始，默认取 1
            location: '', // 元素/物件的位置，优先取用户自定义标识，没有默认取tab名称，都没有置空，取""
            location_id: '', // 位置id，默认取""
            location_sort: '1', // 元素||物件所在位置组件中的排序，从1开始，默认取1
            page_source_type: '',
            sa_card_id: '',
            ...argsObject,
          };
          Object.assign(argsObject, defaultObj);
        }
        stat.track(...arg);
      } catch (error) {
        console.log(error);
      }
    },
  };

  const extendParams = {
    sa_login_id: window.localStorage.getItem('member_id') || 0,
  };
  window.$sa_readtime = extendParams;

  /**
   * 用于大数据打点上报，请 stat.track 这样使用
   * http://wiki.int.zuzuche.info/pages/viewpage.action?pageId=137430124
   *
   * track 核心方法
   * click 点击事件，用于触发单次点击
   * show 曝光事件，用于触发曝光元素，并且只曝光一次即可
   * page_view 触发上报页面PV、UV
   * readtime 上报页面停留时间（MPA无需主动上报，SPA需要自行实现页面停留时间计算）
   */
  return bigTj;
};

export default initStat();
