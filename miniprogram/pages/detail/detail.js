const {
  getRouteById,
  increaseView,
  isFavorite,
  toggleFavorite,
  getComments,
  addComment
} = require('../../utils/store');

Page({
  data: {
    id: '',
    route: null,
    favText: '收藏',
    comments: [],
    commentText: ''
  },

  onLoad(options) {
    const id = options.id;
    this.setData({ id });
    increaseView(id);
    this.reload();
  },

  reload() {
    const route = getRouteById(this.data.id);
    const comments = getComments(this.data.id);
    const fav = isFavorite(this.data.id);
    this.setData({
      route,
      comments,
      favText: fav ? '已收藏（点我取消）' : '收藏'
    });
  },

  onFavorite() {
    const fav = toggleFavorite(this.data.id);
    wx.showToast({ title: fav ? '收藏成功' : '已取消', icon: 'none' });
    this.reload();
  },

  onCommentInput(e) {
    this.setData({ commentText: e.detail.value });
  },

  submitComment() {
    const content = this.data.commentText.trim();
    if (!content) {
      wx.showToast({ title: '评论不能为空', icon: 'none' });
      return;
    }
    addComment(this.data.id, content, '微信用户');
    this.setData({ commentText: '' });
    wx.showToast({ title: '评论成功', icon: 'success' });
    this.reload();
  }
});
