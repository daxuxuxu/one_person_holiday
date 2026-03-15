太好了，下面给你一份可直接粘贴的完整文档内容。

```md
# 一人行城市旅游项目规划（上海｜20-35岁｜微信小程序MVP）

## 1. 项目概述

- **项目名称（暂定）**：SoloCity 上海一人行
- **目标用户**：20-35岁城市青年（优先上班族、周末短途用户）
- **项目形态**：纯线上（微信小程序）
- **核心场景**：用户查看并发布“可直接执行”的一人行路线（打卡点、拍照点、美食、交通、预算）
- **首发城市**：上海（单城聚焦）

---

## 2. 核心价值主张

1. **按人群分层路线**：同城路线按预算/时长/风格给不同版本  
2. **低决策成本**：打开就能看“今天可走的路线”  
3. **真实可执行**：包含具体点位顺序、交通方式、预算区间、时间建议  

---

## 3. 产品范围（MVP）

### 3.1 必做功能（仅做这6项）
- 路线列表（支持预算/时长/风格筛选）
- 路线详情（点位、交通、预算、Tips）
- 发布路线（UGC）
- 评论
- 收藏
- 分享（小程序转发）

### 3.2 暂不做
- 多城市
- 私信/群聊
- 复杂推荐算法
- 直播/短视频信息流
- 重运营活动系统

---

## 4. 商业化路线（低投入优先）

### 阶段1（0-3个月）
- **分销佣金**：门票/本地体验链接
- **轻会员**：无广告 + 精品路线包（可后置）

### 阶段2（3个月后）
- 本地商家投放
- 城市专题品牌合作

---

## 5. 内容策略（重点）

- 来源：小红书仅作灵感，不直接搬运
- 输出：重写路线、结构化点位信息、统一预算口径
- 原则：
  - 不复制原文/图片
  - 仅提取公开事实信息（地点、时段、交通）
  - 使用自有拍摄/可商用图片
- 首批内容量：10-30条上海路线（可执行优先）

---

## 6. 技术方案

- 前端：微信小程序
- 后端：微信云开发（云数据库 + 云函数 + 云存储）
- 管理：先用云开发控制台，无需单独后台
- 成本策略：尽量不自建服务器，按量付费

---

## 7. 数据库设计（云开发）

## 7.1 users
字段：
- _id
- openid
- nickName
- avatarUrl
- ageRange（20-25 / 26-30 / 31-35）
- incomeRange（可选）
- cityDefault（默认上海）
- createdAt
- lastLoginAt

## 7.2 routes
字段：
- _id
- authorId
- title
- city（上海）
- coverUrl
- summary
- durationDays
- budgetMin
- budgetMax
- travelStyle（暴走/轻松/拍照/美食）
- transportPlan
- tags（数组）
- status（draft/published）
- sourceType（original/inspired）
- sourceNote
- viewCount
- favoriteCount
- commentCount
- createdAt
- updatedAt

## 7.3 route_spots
字段：
- _id
- routeId
- dayIndex
- orderIndex
- spotType（checkin/photo/food/other）
- name
- district
- lat
- lng
- suggestedStayMin
- cost
- bestTime
- tips
- photoUrls（数组）

## 7.4 comments
字段：
- _id
- routeId
- userId
- content
- likeCount
- status（normal/hidden）
- createdAt

## 7.5 favorites
字段：
- _id
- userId
- routeId
- createdAt  
索引建议：
- userId + routeId（唯一索引）

## 7.6 event_logs（可选）
字段：
- _id
- eventName
- userId
- routeId
- props（对象）
- ts

---

## 8. 埋点事件命名（首版）

### 8.1 曝光/访问
- app_launch
- home_view
- route_card_expose
- route_detail_view

### 8.2 搜索/筛选
- search_submit
- filter_apply

### 8.3 内容发布
- route_publish_click
- route_publish_success
- route_edit_success
- publish_fail_validation

### 8.4 互动
- comment_submit
- favorite_click
- favorite_success
- share_click

### 8.5 商业化（后续）
- affiliate_click
- affiliate_order_callback

### 8.6 异常监控
- api_error

公共属性建议：
- city
- ageRange
- incomeRange
- routeId
- authorId
- durationDays
- budgetBucket

---

## 9. 30天按天排期（开发执行清单）

### 第1周：底座搭建
- Day 1：确定MVP边界（单城、单人群、功能不超范围）
- Day 2：创建小程序项目 + 云开发环境
- Day 3：创建集合与基础索引
- Day 4：云函数（登录、列表、详情）
- Day 5：云函数（发布、评论、收藏）
- Day 6：页面骨架与全局样式
- Day 7：打通登录态与基础路由

### 第2周：核心功能
- Day 8：首页列表（分页、空态、下拉刷新）
- Day 9：首页筛选（预算/时长/风格）
- Day 10：详情页头部（封面、摘要、作者）
- Day 11：点位列表（按顺序）
- Day 12：交通/预算/Tips模块
- Day 13：评论列表 + 评论发布
- Day 14：收藏/取消收藏

### 第3周：发布与个人页
- Day 15：发布页基础字段
- Day 16：点位编辑（新增/删除）
- Day 17：表单校验 + 草稿/发布
- Day 18：我的页面（我发布、我收藏）
- Day 19：编辑路线（仅作者）
- Day 20：搜索页（关键词/标签）
- Day 21：分享能力接入

### 第4周：数据、内容、上线
- Day 22：接入核心埋点（10+事件）
- Day 23：错误处理与稳定性修复
- Day 24：性能优化（首屏/图片/分页）
- Day 25：录入首批10-20条种子路线
- Day 26：内测（10人）+问题收集
- Day 27：修复高优先级Bug
- Day 28：全链路回归测试
- Day 29：发布v1并观察24小时数据
- Day 30：复盘（漏斗/留存/最受欢迎路线类型）并制定下个迭代

---

## 10. 关键指标（只盯这5个）

- WAU（周活跃）
- 详情页收藏率
- 评论率
- 分享率
- 路线发布成功率

---

## 11. 风险与合规

- 内容侵权风险：避免直接搬运平台文案与图片
- 数据合规：最小必要收集用户信息
- 冷启动风险：先保证内容质量和可执行性，再谈增长
- 开发风险：严格控制范围，不扩功能

---

## 12. 当前里程碑目标

### 30天目标
- 上线可用MVP（上海单城）
- 有10-30条可执行路线
- 有首批真实用户反馈
- 建立基础数据漏斗

### 90天目标
- 验证留存（D7）
- 验证首笔收入（分销/会员）
- 形成可复制的“单城打法”
```

