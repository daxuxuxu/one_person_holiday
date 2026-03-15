const { getRoutes } = require('../../utils/store');

Page({
  data: {
    all: [],
    list: [],
    ageOptions: ['全部', '20-25', '26-30', '31-35'],
    incomeOptions: ['全部', '<8k', '8k-20k', '20k+'],
    durationOptions: ['全部', '0.5天', '1天', '2天+'],
    styleOptions: ['全部', '打卡', '拍照', '美食', '轻松', '暴走'],
    ageIndex: 0,
    incomeIndex: 0,
    durationIndex: 0,
    styleIndex: 0
  },

  onShow() {
    const all = getRoutes();
    this.setData({ all }, this.applyFilter);
  },

  onAgeChange(e) {
    this.setData({ ageIndex: Number(e.detail.value) }, this.applyFilter);
  },
  onIncomeChange(e) {
    this.setData({ incomeIndex: Number(e.detail.value) }, this.applyFilter);
  },
  onDurationChange(e) {
    this.setData({ durationIndex: Number(e.detail.value) }, this.applyFilter);
  },
  onStyleChange(e) {
    this.setData({ styleIndex: Number(e.detail.value) }, this.applyFilter);
  },

  applyFilter() {
    const { all, ageOptions, incomeOptions, durationOptions, styleOptions, ageIndex, incomeIndex, durationIndex, styleIndex } = this.data;
    const age = ageOptions[ageIndex];
    const income = incomeOptions[incomeIndex];
    const duration = durationOptions[durationIndex];
    const style = styleOptions[styleIndex];

    const list = all.filter((r) => {
      if (age !== '全部' && r.ageRange !== age) return false;
      if (income !== '全部' && r.incomeRange !== income) return false;
      if (duration !== '全部' && r.duration !== duration) return false;
      if (style !== '全部' && r.style !== style) return false;
      return true;
    });

    this.setData({ list });
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` });
  }
});
