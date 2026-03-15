const { getRoutes, getFavorites } = require('../../utils/store');

Page({
  data: {
    favRoutes: []
  },

  onShow() {
    const all = getRoutes();
    const favIds = getFavorites();
    const favRoutes = all.filter((r) => favIds.includes(r.id));
    this.setData({ favRoutes });
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` });
  }
});
