"use strict";
var common_vendor = require("../../../common/vendor.js");
var utils_request = require("../../../utils/request.js");
var mocha = require("../../../mocha.js");
var self_;
const _sfc_main = {
  data() {
    return {
      is_focus: true,
      tepId: 0,
      article: {
        user: {}
      },
      commentText: "",
      currentUser: {},
      is_like: true,
      is_favorites: true,
      article_html: ""
    };
  },
  computed: {
    formatDate: function(time) {
      return function(time2) {
        return common_vendor.hooks(time2).format("YYYY-MM-DD");
      };
    }
  },
  mounted() {
  },
  onLoad(option) {
    this.tepId = option.id;
    utils_request.$request({
      url: "/article/detail",
      method: "GET",
      data: {
        articleId: this.tepId
      }
    }).then((res) => {
      this.article = res.data;
      this.article_html = mocha.marked.marked(this.article.content, {
        highlight: function(code) {
          return common_vendor.HighlightJS.highlightAuto(code).value;
        }
      });
      const regex = new RegExp("<img", "gi");
      this.article_html = this.article_html.replace(regex, `<img style="max-width: 100%;"`);
    }).catch((err) => {
    });
    utils_request.$request({
      url: "/user/self",
      method: "POST"
    }).then((res) => {
      this.currentUser = res.data;
    }).catch((err) => {
    });
  },
  onShow() {
    self_.judgeFocus();
    self_.judgeLikes();
    self_.judgeFavorites();
  },
  created() {
    self_ = this;
  },
  methods: {
    scrollToTop() {
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    },
    chat() {
      common_vendor.index.createSelectorQuery().select("#chat").boundingClientRect((res) => {
        common_vendor.index.pageScrollTo({
          scrollTop: res.top,
          duration: 300
        });
      }).exec();
    },
    judgeFocus() {
      if (this.currentUser.focus != null) {
        for (let i = 0; i < this.currentUser.focus.length; i++) {
          if (this.article.user.id == this.currentUser.focus[i].id) {
            this.is_focus = true;
            return;
          }
        }
      }
      this.is_focus = false;
    },
    judgeLikes() {
      if (this.currentUser.likesArticleIds != null) {
        for (let i = 0; i < this.currentUser.likesArticleIds.length; i++) {
          if (this.article.id == this.currentUser.likesArticleIds[i]) {
            this.is_like = true;
            return;
          }
        }
      }
      this.is_like = false;
    },
    judgeFavorites() {
      if (this.currentUser.favoritesArticles != null) {
        for (let i = 0; i < this.currentUser.favoritesArticles.length; i++) {
          if (this.article.id == this.currentUser.favoritesArticles[i].id) {
            this.is_favorites = true;
            return;
          }
        }
      }
      this.is_favorites = false;
    },
    like() {
      if (!this.is_like) {
        this.is_like = true;
        console.log(this.article.id);
        utils_request.$request({
          url: "/like",
          method: "GET",
          data: {
            articleId: this.article.id
          }
        }).then((res) => {
          console.log("\u70B9\u8D5E\u6210\u529F");
        }).catch((err) => {
          console.log(err.code + err.msg);
        });
      } else {
        this.is_like = false;
        utils_request.$request({
          url: "/cancelLike",
          method: "GET",
          data: {
            articleId: this.article.id
          }
        }).then((res) => {
          console.log("\u53D6\u6D88\u70B9\u8D5E\u6210\u529F");
        }).catch((err) => {
          console.log(err.code + err.msg);
        });
      }
    },
    favorites() {
      if (!this.is_favorites) {
        this.is_favorites = true;
        utils_request.$request({
          url: "/favorites_a",
          method: "GET",
          data: {
            articleId: this.article.id
          }
        }).then((res) => {
          console.log("\u6536\u85CF\u6210\u529F");
        }).catch((err) => {
          console.log(err.code + err.msg);
        });
      } else {
        this.is_favorites = false;
        utils_request.$request({
          url: "/cancel_favorites_a",
          method: "GET",
          data: {
            articleId: this.article.id
          }
        }).then((res) => {
          console.log("\u53D6\u6D88\u6536\u85CF\u6210\u529F");
        }).catch((err) => {
          console.log(err.code + err.msg);
        });
      }
    },
    focus(type) {
      this.is_focus = !this.is_focus;
      if (type == 1) {
        utils_request.$request({
          url: "/user/focus",
          method: "POST",
          data: {
            userId: this.article.user.id
          }
        }).then((res) => {
          console.log("\u5173\u6CE8\u6210\u529F\uFF01");
        }).catch((err) => {
          console.log(err.code + err.msg);
        });
      } else {
        utils_request.$request({
          url: "/user/cancelFocus",
          method: "POST",
          data: {
            userId: this.article.user.id
          }
        }).then((res) => {
          console.log("\u53D6\u6D88\u5173\u6CE8\u6210\u529F\uFF01");
        }).catch((err) => {
          console.log(err.code + err.msg);
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.article.avatar,
    b: $data.article.user.avatar,
    c: common_vendor.t($data.article.user.nickname),
    d: !$data.is_focus,
    e: common_vendor.o(($event) => $options.focus(1)),
    f: $data.is_focus,
    g: common_vendor.o(($event) => $options.focus(2)),
    h: $data.article.user.id != $data.currentUser.id,
    i: $data.article.user.id == $data.currentUser.id,
    j: common_vendor.t($options.formatDate($data.article.createdAt)),
    k: common_vendor.t($data.article.title),
    l: $data.article_html,
    m: common_vendor.f($data.article.tags, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag.name),
        b: tag.id
      };
    }),
    n: common_vendor.p({
      type: "chatboxes",
      color: "#808080"
    }),
    o: $data.commentText,
    p: common_vendor.o(($event) => $data.commentText = $event.detail.value),
    q: common_vendor.p({
      type: "heart",
      color: "#808080",
      size: "22"
    }),
    r: common_vendor.p({
      type: "chat",
      color: "#808080",
      size: "22"
    }),
    s: common_vendor.t(1),
    t: common_vendor.p({
      type: "closeempty",
      color: "#808080"
    }),
    v: common_vendor.p({
      type: "heart",
      color: "#808080",
      size: "22"
    }),
    w: common_vendor.p({
      type: "chat",
      color: "#808080",
      size: "22"
    }),
    x: common_vendor.p({
      type: "heart",
      size: "60rpx",
      color: $data.is_like ? "#DC143C" : "#808080"
    }),
    y: common_vendor.o((...args) => $options.like && $options.like(...args)),
    z: common_vendor.p({
      type: "star",
      size: "60rpx",
      color: $data.is_favorites ? "#FF8C00" : "#808080"
    }),
    A: common_vendor.o((...args) => $options.favorites && $options.favorites(...args)),
    B: common_vendor.p({
      type: "chat",
      size: "60rpx",
      color: "#808080"
    }),
    C: common_vendor.o((...args) => $options.chat && $options.chat(...args)),
    D: common_vendor.p({
      type: "arrow-up",
      size: "60rpx",
      color: "#808080"
    }),
    E: common_vendor.o((...args) => $options.scrollToTop && $options.scrollToTop(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/dachuang/uniapp_client/Client/pages/index/sec_detail/sec_detail.vue"]]);
wx.createPage(MiniProgramPage);
