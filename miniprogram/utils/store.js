const ROUTE_KEY = 'solo_routes_v1';
const FAVORITE_KEY = 'solo_favorites_v1';
const COMMENT_KEY = 'solo_comments_v1';

function nowStr() {
  const d = new Date();
  const p = (n) => (n < 10 ? '0' + n : '' + n);
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

function uid(prefix) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

function getRoutes() {
  return wx.getStorageSync(ROUTE_KEY) || [];
}

function setRoutes(routes) {
  wx.setStorageSync(ROUTE_KEY, routes);
}

function initSeed() {
  const current = getRoutes();
  if (current.length) return;

  const seed = [
    {
      id: uid('route'),
      title: '上海一人行｜武康路-安福路半日路线',
      city: '上海',
      ageRange: '26-30',
      incomeRange: '8k-20k',
      duration: '0.5天',
      budget: '200-300',
      style: '拍照',
      cover: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=60',
      summary: '适合周末下午，拍照+咖啡+轻步行',
      transport: '地铁10号线，步行串联',
      spots: [
        { type: '打卡地点', name: '武康大楼', note: '路口视角更出片' },
        { type: '拍照地点', name: '安福路街景', note: '16:00后光线更柔和' },
        { type: '好吃的', name: '本地面包咖啡店', note: '人均50-80' }
      ],
      tips: '避开节假日高峰，穿舒适鞋',
      author: '官方示例',
      createdAt: nowStr(),
      views: 0,
      favorites: 0,
      comments: 0
    }
  ];
  setRoutes(seed);
  wx.setStorageSync(FAVORITE_KEY, []);
  wx.setStorageSync(COMMENT_KEY, {});
}

function addRoute(input) {
  const routes = getRoutes();
  const route = {
    id: uid('route'),
    title: input.title,
    city: '上海',
    ageRange: input.ageRange,
    incomeRange: input.incomeRange,
    duration: input.duration,
    budget: input.budget,
    style: input.style,
    cover: input.cover || '',
    summary: input.summary || '',
    transport: input.transport || '',
    spots: input.spots || [],
    tips: input.tips || '',
    author: input.author || '匿名',
    createdAt: nowStr(),
    views: 0,
    favorites: 0,
    comments: 0
  };
  routes.unshift(route);
  setRoutes(routes);
  return route;
}

function getRouteById(id) {
  return getRoutes().find((r) => r.id === id);
}

function increaseView(id) {
  const routes = getRoutes();
  const idx = routes.findIndex((r) => r.id === id);
  if (idx > -1) {
    routes[idx].views += 1;
    setRoutes(routes);
  }
}

function getFavorites() {
  return wx.getStorageSync(FAVORITE_KEY) || [];
}

function isFavorite(routeId) {
  return getFavorites().includes(routeId);
}

function toggleFavorite(routeId) {
  const list = getFavorites();
  const has = list.includes(routeId);
  let next;
  if (has) {
    next = list.filter((id) => id !== routeId);
  } else {
    next = [...list, routeId];
  }
  wx.setStorageSync(FAVORITE_KEY, next);

  const routes = getRoutes();
  const idx = routes.findIndex((r) => r.id === routeId);
  if (idx > -1) {
    routes[idx].favorites = Math.max(0, routes[idx].favorites + (has ? -1 : 1));
    setRoutes(routes);
  }
  return !has;
}

function getComments(routeId) {
  const map = wx.getStorageSync(COMMENT_KEY) || {};
  return map[routeId] || [];
}

function addComment(routeId, content, user = '微信用户') {
  const map = wx.getStorageSync(COMMENT_KEY) || {};
  const list = map[routeId] || [];
  list.unshift({
    id: uid('c'),
    user,
    content,
    createdAt: nowStr()
  });
  map[routeId] = list;
  wx.setStorageSync(COMMENT_KEY, map);

  const routes = getRoutes();
  const idx = routes.findIndex((r) => r.id === routeId);
  if (idx > -1) {
    routes[idx].comments += 1;
    setRoutes(routes);
  }

  return list;
}

module.exports = {
  initSeed,
  getRoutes,
  addRoute,
  getRouteById,
  increaseView,
  isFavorite,
  toggleFavorite,
  getFavorites,
  getComments,
  addComment
};
