App({
  onLaunch() {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 及以上基础库");
      return;
    }
    wx.cloud.init({
      env: "你的云环境ID", // 例如 cloud1-xxxx
      traceUser: true
    });
  }
});
