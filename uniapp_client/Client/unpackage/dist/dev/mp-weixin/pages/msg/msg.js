"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  (_easycom_uni_nav_bar2 + _easycom_uni_easyinput2 + _easycom_uni_col2 + _easycom_uni_icons2 + _easycom_uni_row2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_easyinput + _easycom_uni_col + _easycom_uni_icons + _easycom_uni_row)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      fixed: true,
      height: "80rpx",
      title: "\u540C\u5FD7"
    }),
    b: common_vendor.p({
      placeholder: "\u641C\u7D22\u7528\u6237",
      clearable: true
    }),
    c: common_vendor.p({
      span: 20
    }),
    d: common_vendor.p({
      type: "search",
      size: "28",
      color: "grey"
    }),
    e: common_vendor.p({
      span: 4
    }),
    f: common_vendor.p({
      type: "auth-filled",
      size: "27",
      color: "#03dac5"
    }),
    g: common_vendor.p({
      span: 12
    }),
    h: common_vendor.p({
      type: "right"
    }),
    i: common_vendor.p({
      span: 12
    }),
    j: common_vendor.p({
      type: "auth-filled",
      size: "27",
      color: "#F0E68C"
    }),
    k: common_vendor.p({
      span: 12
    }),
    l: common_vendor.p({
      type: "right"
    }),
    m: common_vendor.p({
      span: 12
    }),
    n: common_vendor.p({
      type: "chatboxes-filled",
      size: "27",
      color: "#87CEFA"
    }),
    o: common_vendor.p({
      span: 12
    }),
    p: common_vendor.p({
      span: 12
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/dachuang/uniapp_client/Client/pages/msg/msg.vue"]]);
wx.createPage(MiniProgramPage);
