const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

const WELCOME_POINTS = 20;

exports.main = async (event = {}) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  const now = new Date();

  const usersCol = db.collection('users');
  const ledgerCol = db.collection('point_ledger');

  const {
    nickName = '',
    avatarUrl = '',
    ageRange = '',      // 20-25 / 26-30 / 31-35
    incomeRange = ''    // <8k / 8k-20k / 20k+
  } = event;

  // 1) 查询是否已有用户
  const existRes = await usersCol.where({ openid }).limit(1).get();

  // 2) 首次登录：创建用户 + 初始点数 + 流水
  if (!existRes.data.length) {
    const newUser = {
      openid,
      nickName,
      avatarUrl,
      ageRange,
      incomeRange,
      cityDefault: '上海',
      points: WELCOME_POINTS,
      totalPointsEarned: WELCOME_POINTS,
      totalPointsSpent: 0,
      lastBlindboxDate: '',
      createdAt: now,
      lastLoginAt: now
    };

    const addRes = await usersCol.add({ data: newUser });

    await ledgerCol.add({
      data: {
        userId: addRes._id,
        change: WELCOME_POINTS,
        reason: 'signup_bonus',
        payload: { note: '首次登录奖励' },
        balanceAfter: WELCOME_POINTS,
        createdAt: now
      }
    });

    return {
      ok: true,
      isNewUser: true,
      user: { _id: addRes._id, ...newUser }
    };
  }

  // 3) 非首次：更新登录时间和可选用户信息
  const user = existRes.data[0];

  await usersCol.doc(user._id).update({
    data: {
      lastLoginAt: now,
      ...(nickName ? { nickName } : {}),
      ...(avatarUrl ? { avatarUrl } : {}),
      ...(ageRange ? { ageRange } : {}),
      ...(incomeRange ? { incomeRange } : {})
    }
  });

  const latestRes = await usersCol.doc(user._id).get();

  return {
    ok: true,
    isNewUser: false,
    user: latestRes.data
  };
};
