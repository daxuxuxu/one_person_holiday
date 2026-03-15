const { initSeed } = require('./utils/store');

App({
  onLaunch() {
    initSeed();
  }
});
