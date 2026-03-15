const { addRoute } = require('../../utils/store');

function spotTemplate() {
  return { typeIndex: 0, name: '', note: '' };
}

Page({
  data: {
    ageOptions: ['20-25', '26-30', '31-35'],
    incomeOptions: ['<8k', '8k-20k', '20k+'],
    durationOptions: ['0.5天', '1天', '2天+'],
    styleOptions: ['打卡', '拍照', '美食', '轻松', '暴走'],
    spotTypeOptions: ['打卡地点', '拍照地点', '好吃的', '其他'],
    ageIndex: 1,
    incomeIndex: 1,
    durationIndex: 1,
    styleIndex: 1,
    form: {
      title: '',
      cover: '',
      summary: '',
      budget: '',
      transport: '',
      tips: '',
      author: ''
    },
    spots: [spotTemplate()]
  },

  onInput(e) {
    const key = e.currentTarget.dataset.k;
    const val = e.detail.value;
    this.setData({ [`form.${key}`]: val });
  },

  onAgeChange(e) { this.setData({ ageIndex: Number(e.detail.value) }); },
  onIncomeChange(e) { this.setData({ incomeIndex: Number(e.detail.value) }); },
  onDurationChange(e) { this.setData({ durationIndex: Number(e.detail.value) }); },
  onStyleChange(e) { this.setData({ styleIndex: Number(e.detail.value) }); },

  addSpot() {
    this.setData({ spots: [...this.data.spots, spotTemplate()] });
  },

  removeSpot(e) {
    const i = e.currentTarget.dataset.i;
    const next = this.data.spots.filter((_, idx) => idx !== i);
    this.setData({ spots: next.length ? next : [spotTemplate()] });
  },

  onSpotTypeChange(e) {
    const i = e.currentTarget.dataset.i;
    const v = Number(e.detail.value);
    const next = [...this.data.spots];
    next[i].typeIndex = v;
    this.setData({ spots: next });
  },

  onSpotInput(e) {
    const i = e.currentTarget.dataset.i;
    const k = e.currentTarget.dataset.k;
    const v = e.detail.value;
    const next = [...this.data.spots];
    next[i][k] = v;
    this.setData({ spots: next });
  },

  submit() {
    const { form, spots, ageOptions, incomeOptions, durationOptions, styleOptions, ageIndex, incomeIndex, durationIndex, styleIndex, spotTypeOptions } = this.data;
    if (!form.title.trim()) {
      wx.showToast({ title: '请填写标题', icon: 'none' });
      return;
    }
    if (!form.budget.trim()) {
      wx.showToast({ title: '请填写预算', icon: 'none' });
      return;
    }

    const finalSpots = spots
      .filter((s) => s.name.trim())
      .map((s) => ({
        type: spotTypeOptions[s.typeIndex],
        name: s.name.trim(),
        note: (s.note || '').trim()
      }));

    addRoute({
      title: form.title.trim(),
      cover: form.cover.trim(),
      summary: form.summary.trim(),
      ageRange: ageOptions[ageIndex],
      incomeRange: incomeOptions[incomeIndex],
      duration: durationOptions[durationIndex],
      style: styleOptions[styleIndex],
      budget: form.budget.trim(),
      transport: form.transport.trim(),
      tips: form.tips.trim(),
      author: form.author.trim() || '匿名用户',
      spots: finalSpots
    });

    wx.showToast({ title: '发布成功', icon: 'success' });
    setTimeout(() => wx.switchTab({ url: '/pages/index/index' }), 500);
  }
});
