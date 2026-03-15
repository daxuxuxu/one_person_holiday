目标
在 30 分钟内完成：

Windows 环境安装
微信小程序云开发初始化
login 云函数部署并成功调用
数据库出现用户与点数流水记录
0. 前置准备（2分钟）
微信号（已实名）
小程序 AppID（测试号也可）
稳定网络（公司网络若限制端口，建议手机热点备用）
1. 安装软件（10分钟）
安装微信开发者工具（最新版）
安装 Node.js LTS（建议 18.x）
可选：安装 Git（后续推送代码到 GitHub）
安装后检查：
终端执行 node -v（应显示版本号）
终端执行 npm -v（应显示版本号）
2. 创建小程序项目并启用云开发（5分钟）
 wx.cloud.init({
  env: "你的envId",
  traceUser: true
});
打开微信开发者工具，创建项目（填 AppID）
在项目中启用云开发，创建环境（记录 envId）
在小程序启动代码中初始化云开发：
预期结果：控制台无 wx.cloud 报错
4. 创建数据库集合（3分钟）
在云开发控制台创建以下集合：
users
point_ledger
建议权限（开发阶段）：

先用“仅创建者可读写”或“自定义安全规则”
不建议直接全开放到生产
4. 创建并部署 login 云函数（7分钟）
const cloud = require("wx-server-sdk");
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event = {}) => {
  const { OPENID } = cloud.getWXContext();
  const now = new Date();
  const users = db.collection("users");
  const ledger = db.collection("point_ledger");

  const found = await users.where({ openid: OPENID }).limit(1).get();
  if (!found.data.length) {
    const newUser = {
      openid: OPENID,
      nickName: event.nickName || "",
      ageRange: event.ageRange || "",
      incomeRange: event.incomeRange || "",
      cityDefault: "上海",
      points: 20,
      totalPointsEarned: 20,
      totalPointsSpent: 0,
      createdAt: now,
      lastLoginAt: now
    };
    const addRes = await users.add({ data: newUser });
    await ledger.add({
      data: {
        userId: addRes._id,
        change: 20,
        reason: "signup_bonus",
        balanceAfter: 20,
        createdAt: now
      }
    });
    return { ok: true, isNewUser: true };
  }

  await users.doc(found.data[0]._id).update({ data: { lastLoginAt: now } });
  return { ok: true, isNewUser: false };
};
新建云函数 login
在函数目录安装依赖：npm i wx-server-sdk
粘贴函数代码并部署（云端安装依赖）
参考代码（可直接用）：

5. 前端调用并自检（3分钟）
在任意页面 onShow 调用：
wx.cloud.callFunction({
  name: "login",
  data: { nickName: "测试用户", ageRange: "26-30", incomeRange: "8k-20k" }
}).then(res => console.log(res));
预期结果：

控制台返回 { ok: true }
users 出现 1 条用户记录
首次调用时 point_ledger 出现 signup_bonus 记录
第二次调用同账号不重复送点（isNewUser: false）
30分钟时间分配建议
00-10 分钟：安装工具
10-15 分钟：建项目 + 云环境
15-18 分钟：建集合
18-25 分钟：写并部署 login
25-30 分钟：调用测试 + 验证数据
故障排查（高频）
报错“wx.cloud undefined”：基础库太低或未调用 wx.cloud.init
报错“函数不存在”：函数名不一致或部署到错误环境
报错“权限不足”：集合权限规则过严
调用成功但无数据：检查是否选错云环境 envId
依赖错误：云函数目录未安装 wx-server-sdk 或未“云端安装依赖”
完成标准（打勾）
 node -v 正常
 小程序可编译
 云环境已创建并绑定
 users / point_ledger 已创建
 login 云函数部署成功
 前端调用成功并返回 ok: true
 数据库出现用户与点数流水记录
