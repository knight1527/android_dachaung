"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      is_focus: true
    };
  },
  methods: {}
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
      size: "60rpx",
      color: "#808080"
    }),
    e: common_vendor.p({
      type: "star",
      size: "60rpx",
      color: "#808080"
    }),
    f: common_vendor.p({
      type: "chat",
      size: "60rpx",
      color: "#808080"
    }),
    g: common_vendor.p({
      type: "arrow-up",
      size: "60rpx",
      color: "#808080"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/dachuang/uniapp_client/Client/pages/index/sec_detail/sec_detail.vue"]]);
wx.createPage(MiniProgramPage);
