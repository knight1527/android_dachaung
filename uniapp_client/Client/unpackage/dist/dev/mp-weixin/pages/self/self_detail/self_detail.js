"use strict";
var common_vendor = require("../../../common/vendor.js");
var utils_request = require("../../../utils/request.js");
var self_;
const _sfc_main = {
  data() {
    return {
      is_self: true,
      is_focus: false,
      nav_show: false,
      swiperIndex: 0,
      tepId: 0,
      user: {},
      currentUser: {}
    };
  },
  computed: {
    event_status: function() {
      return function(item) {
        if (item.status == "\u62A5\u540D\u4E2D") {
          return "status_before";
        } else if (item.status == "\u8FDB\u884C\u4E2D") {
          return "status_ing";
        } else {
          return "status_end";
        }
      };
    },
    formatDate: function(time) {
      return function(time2) {
        let date = new Date(time2);
        return date.toLocaleString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        });
      };
    }
  },
  onLoad(option) {
    console.log(option.id);
    console.log(option.id);
    this.tepId = option.id;
    utils_request.$request({
      url: "/user/selfById",
      method: "Get",
      data: {
        userId: this.tepId
      }
    }).then((res) => {
      this.user = res.data;
      console.log(user);
      console.log(res.data);
    }).catch((err) => {
      console.log(err.code + err.msg);
    });
    utils_request.$request({
      url: "/user/selfInfo",
      method: "Get"
    }).then((res) => {
      this.currentUser = res.data;
      console.log(currentUser);
      console.log(res.data);
    }).catch((err) => {
      console.log(err.code + err.msg);
    });
  },
  onShow() {
    self_.judgeSelf();
  },
  created() {
    self_ = this;
  },
  onPageScroll() {
    self_.nav_fixed_top();
  },
  methods: {
    swiperChage(e) {
      this.swiperIndex = e.detail.current;
      console.log(e.detail.current);
    },
    nav_fixed_top() {
      const query = common_vendor.index.createSelectorQuery().in(this);
      let tep = 0;
      query.select("#navTop").boundingClientRect((data) => {
        tep = data.top;
        if (tep <= 0) {
          this.nav_show = true;
        } else {
          this.nav_show = false;
        }
      }).exec();
    },
    selfUpdate() {
      common_vendor.index.navigateTo({
        url: "/pages/self/self_update/self_update"
      });
    },
    judgeSelf() {
      if (this.user.id == this.currentUser.id) {
        this.is_self = true;
      } else {
        this.is_self = false;
      }
      if (this.user.focused != null) {
        for (let i = 0; i < this.user.focused.length; i++) {
          if (this.currentUser.id == this.user.focused[i].id) {
            this.is_focus = true;
            return;
          }
        }
      }
      this.is_focus = false;
    }
  }
};
if (!Array) {
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_link2 = common_vendor.resolveComponent("uni-link");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  (_easycom_uni_col2 + _easycom_uni_icons2 + _easycom_uni_link2 + _easycom_uni_row2)();
}
const _easycom_uni_col = () => "../../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_link = () => "../../../uni_modules/uni-link/components/uni-link/uni-link.js";
const _easycom_uni_row = () => "../../../uni_modules/uni-row/components/uni-row/uni-row.js";
if (!Math) {
  (_easycom_uni_col + _easycom_uni_icons + _easycom_uni_link + _easycom_uni_row)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.user.avatar,
    b: common_vendor.p({
      span: 8
    }),
    c: common_vendor.o((...args) => $options.selfUpdate && $options.selfUpdate(...args)),
    d: $data.is_self,
    e: $data.is_focus,
    f: $data.is_focus,
    g: common_vendor.p({
      span: 16
    }),
    h: common_vendor.t($data.user.nickname),
    i: common_vendor.t($data.user.college),
    j: common_vendor.t($data.user.major),
    k: common_vendor.p({
      color: "#808080",
      type: "mail-open-filled",
      size: "22"
    }),
    l: common_vendor.t($data.user.email),
    m: common_vendor.p({
      color: "#808080",
      type: "navigate",
      size: "22"
    }),
    n: common_vendor.p({
      href: $data.user.blog,
      text: $data.user.blog,
      color: "#03dac5"
    }),
    o: common_vendor.p({
      color: "#808080",
      type: "flag",
      size: "22"
    }),
    p: common_vendor.t($data.user.description),
    q: $data.swiperIndex == 0 ? 1 : "",
    r: common_vendor.p({
      span: 12
    }),
    s: $data.swiperIndex == 1 ? 1 : "",
    t: common_vendor.p({
      span: 12
    }),
    v: $data.nav_show,
    w: $data.swiperIndex == 0 ? 1 : "",
    x: common_vendor.p({
      span: 12
    }),
    y: $data.swiperIndex == 1 ? 1 : "",
    z: common_vendor.p({
      span: 12
    }),
    A: !$data.nav_show,
    B: common_vendor.f($data.user.articles, (article, index, i0) => {
      return {
        a: article.user.avatar,
        b: "3a6e9742-14-" + i0 + "," + ("3a6e9742-13-" + i0),
        c: common_vendor.t(article.user.nickname),
        d: "3a6e9742-15-" + i0 + "," + ("3a6e9742-13-" + i0),
        e: "3a6e9742-17-" + i0 + "," + ("3a6e9742-16-" + i0),
        f: "3a6e9742-16-" + i0 + "," + ("3a6e9742-13-" + i0),
        g: "3a6e9742-13-" + i0 + ",3a6e9742-12",
        h: common_vendor.t(article.title),
        i: "3a6e9742-20-" + i0 + "," + ("3a6e9742-19-" + i0),
        j: common_vendor.t(article.commentsNum),
        k: common_vendor.t(article.likesNum),
        l: common_vendor.t($options.formatDate(article.createdAt)),
        m: "3a6e9742-21-" + i0 + "," + ("3a6e9742-19-" + i0),
        n: "3a6e9742-19-" + i0 + "," + ("3a6e9742-18-" + i0),
        o: article.avatar,
        p: "3a6e9742-22-" + i0 + "," + ("3a6e9742-18-" + i0),
        q: "3a6e9742-18-" + i0 + ",3a6e9742-12",
        r: article.id
      };
    }),
    C: common_vendor.p({
      span: 2
    }),
    D: common_vendor.p({
      span: 17
    }),
    E: common_vendor.p({
      type: "more-filled"
    }),
    F: common_vendor.t("\xA0"),
    G: common_vendor.p({
      span: 5
    }),
    H: common_vendor.p({
      span: 16
    }),
    I: common_vendor.p({
      span: 8
    }),
    J: common_vendor.f($data.user.events, (event, index, i0) => {
      return {
        a: common_vendor.t(event.status),
        b: common_vendor.n($options.event_status(event)),
        c: event.avatar,
        d: common_vendor.t(event.title),
        e: common_vendor.t($options.formatDate(event.registerAt)),
        f: common_vendor.t($options.formatDate(event.registerEnd)),
        g: common_vendor.t($options.formatDate(event.progressAt)),
        h: common_vendor.t($options.formatDate(event.progressEnd)),
        i: common_vendor.t(event.company),
        j: common_vendor.t(event.favoritesNum),
        k: common_vendor.t(event.commentsNum),
        l: common_vendor.t(event.level.name),
        m: event.id
      };
    }),
    K: common_vendor.o((...args) => $options.swiperChage && $options.swiperChage(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/dachuang/uniapp_client/Client/pages/self/self_detail/self_detail.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
