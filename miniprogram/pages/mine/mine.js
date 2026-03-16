// miniprogram/pages/mine/mine.js
const { getRoutes, getFavorites } = require('../../utils/store');

Page({
  data: {
    user: null,
    favRoutes: []
  },

  onShow() {
    // 登录 / 刷新用户信息
    wx.cloud.callFunction({
      name: 'login',
      data: {
        nickName: '微信用户',
        avatarUrl: '',
        ageRange: '26-30',
        incomeRange: '8k-20k'
      }
    }).then(res => {
      console.log('login result:', res.result);
      const user = res.result.user;
      wx.setStorageSync('currentUser', user);
      this.setData({ user });
    }).catch(err => {
      console.error('login failed:', err);
    });

    // 加载收藏列表
    const all = getRoutes();
    const favIds = getFavorites();
    const favRoutes = all.filter(r => favIds.includes(r.id));
    this.setData({ favRoutes });
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` });
  }
});
