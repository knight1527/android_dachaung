"use strict";
var common_vendor = require("../../../common/vendor.js");
var utils_request = require("../../../utils/request.js");
var mocha = require("../../../mocha.js");
var self_;
const _sfc_main = {
  data() {
    return {
      is_focus: true,
      is_favorites: true,
      tepId: 0,
      event: {
        user: {},
        type: {},
        level: {}
      },
      commentText: "",
      currentUser: {},
      description_html: ""
    };
  },
  computed: {
    formatDate: function(time) {
      return function(time2) {
        return common_vendor.hooks(time2).format("YYYY-MM-DD");
      };
    }
  },
  created() {
    self_ = this;
  },
  onLoad(option) {
    this.tepId = option.id;
    utils_request.$request({
      url: "/event/detail",
      method: "GET",
      data: {
        eventId: this.tepId
      }
    }).then((res) => {
      this.event = res.data;
      this.description_html = mocha.marked.marked(this.event.description, {
        highlight: function(code) {
          return common_vendor.HighlightJS.highlightAuto(code).value;
        }
      });
      const regex = new RegExp("<img", "gi");
      this.description_html = this.description_html.replace(regex, `<img style="max-width: 100%;"`);
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
    self_.judgeFavorites();
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
          if (this.event.user.id == this.currentUser.focus[i].id) {
            this.is_focus = true;
            return;
          }
        }
      }
      this.is_focus = false;
    },
    judgeFavorites() {
      if (this.currentUser.favoritesEvents != null) {
        for (let i = 0; i < this.currentUser.favoritesEvents.length; i++) {
          if (this.event.id == this.currentUser.favoritesEvents[i].id) {
            this.is_favorites = true;
            return;
          }
        }
      }
      this.is_favorites = false;
    },
    favorites() {
      if (!this.is_favorites) {
        this.is_favorites = true;
        utils_request.$request({
          url: "/favorites_e",
          method: "GET",
          data: {
            eventId: this.event.id
          }
        }).then((res) => {
          console.log("\u6536\u85CF\u6210\u529F");
        }).catch((err) => {
          console.log(err.code + err.msg);
        });
      } else {
        this.is_favorites = false;
        utils_request.$request({
          url: "/cancel_favorites_e",
          method: "GET",
          data: {
            eventId: this.event.id
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
            userId: this.event.user.id
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
            userId: this.event.user.id
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
    a: $data.event.avatar,
    b: common_vendor.t($data.event.title),
    c: $data.event.user.avatar,
    d: common_vendor.t($data.event.user.nickname),
    e: !$data.is_focus,
    f: common_vendor.o(($event) => $options.focus(1)),
    g: $data.is_focus,
    h: common_vendor.o(($event) => $options.focus(2)),
    i: $data.event.user.id != $data.currentUser.id,
    j: $data.event.user.id == $data.currentUser.id,
    k: $data.description_html,
    l: common_vendor.t($data.event.type.name),
    m: common_vendor.t($data.event.level.name),
    n: common_vendor.t($options.formatDate($data.event.registerAt)),
    o: common_vendor.t($options.formatDate($data.event.registerEnd)),
    p: common_vendor.t($options.formatDate($data.event.progressAt)),
    q: common_vendor.t($options.formatDate($data.event.progressEnd)),
    r: common_vendor.t($data.event.company),
    s: common_vendor.p({
      type: "chatboxes",
      color: "#808080"
    }),
    t: $data.commentText,
    v: common_vendor.o(($event) => $data.commentText = $event.detail.value),
    w: common_vendor.p({
      type: "heart",
      color: "#808080",
      size: "22"
    }),
    x: common_vendor.p({
      type: "chat",
      color: "#808080",
      size: "22"
    }),
    y: common_vendor.t(1),
    z: common_vendor.p({
      type: "closeempty",
      color: "#808080"
    }),
    A: common_vendor.p({
      type: "heart",
      color: "#808080",
      size: "22"
    }),
    B: common_vendor.p({
      type: "chat",
      color: "#808080",
      size: "22"
    }),
    C: common_vendor.p({
      type: "star",
      size: "60rpx",
      color: $data.is_favorites ? "#FF8C00" : "#808080"
    }),
    D: common_vendor.o((...args) => $options.favorites && $options.favorites(...args)),
    E: common_vendor.p({
      type: "chat",
      size: "60rpx",
      color: "#808080"
    }),
    F: common_vendor.o((...args) => $options.chat && $options.chat(...args)),
    G: common_vendor.p({
      type: "arrow-up",
      size: "60rpx",
      color: "#808080"
    }),
    H: common_vendor.o((...args) => $options.scrollToTop && $options.scrollToTop(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/dachuang/uniapp_client/Client/pages/events/event_detail/event_detail.vue"]]);
wx.createPage(MiniProgramPage);
