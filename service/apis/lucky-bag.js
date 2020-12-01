import service from '../request';

const urlPrefix = `//test2-market.chuxingyouhui.com/promo-bargain-api/activity/luckBag/api`;
const defaultFailMsg = '系统繁忙，请稍后重试';

const handleRes = res => {
  if (res && res.status === 200 && res.data.code === 200) {
    return {
      isSuccess: true,
      data: res.data.data,
      msg: null,
    };
  }
  return {
    isSuccess: false,
    data: null,
    msg: res.data.msg || defaultFailMsg,
  };
};

const openBag = params => service
  .post(`${urlPrefix}/openLuckBag`, {
    ...params,
  })
  .then(res => handleRes(res));

const getBagSwell = params => service
  .post(`${urlPrefix}/swellLuckBag`, {
    ...params,
  })
  .then(res => handleRes(res));

// const canOpenLuckBag = () => axios
//   .get(`${urlPrefix}/canOpen?appId=1194494896221667908`)
//   .then(res => handleRes(res));


export {
  openBag,
  getBagSwell,
  // canOpenLuckBag,
};
