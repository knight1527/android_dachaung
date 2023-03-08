"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      is_focus: true
    };
  },
  methods: {
    scrollToTop() {
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
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
    a: !$data.is_focus,
    b: $data.is_focus,
    c: common_vendor.p({
      type: "chatboxes",
      color: "#808080"
    }),
    d: common_vendor.p({
      type: "heart",
      color: "#808080",
      size: "22"
    }),
    e: common_vendor.p({
      type: "chat",
      color: "#808080",
      size: "22"
    }),
    f: common_vendor.t(0),
    g: common_vendor.p({
      type: "closeempty",
      color: "#808080"
    }),
    h: common_vendor.p({
      type: "heart",
      color: "#808080",
      size: "22"
    }),
    i: common_vendor.p({
      type: "chat",
      color: "#808080",
      size: "22"
    }),
    j: common_vendor.p({
      type: "star",
      size: "60rpx",
      color: "#808080"
    }),
    k: common_vendor.p({
      type: "chat",
      size: "60rpx",
      color: "#808080"
    }),
    l: common_vendor.p({
      type: "arrow-up",
      size: "60rpx",
      color: "#808080"
    }),
    m: common_vendor.o((...args) => $options.scrollToTop && $options.scrollToTop(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/dachuang/uniapp_client/Client/pages/events/event_detail/event_detail.vue"]]);
wx.createPage(MiniProgramPage);
