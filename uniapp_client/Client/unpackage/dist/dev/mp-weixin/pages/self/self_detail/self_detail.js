"use strict";
var common_vendor = require("../../../common/vendor.js");
var self_;
const _sfc_main = {
  data() {
    return {
      is_self: true,
      is_focus: false,
      nav_show: false,
      swiperIndex: 0
    };
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
    a: common_vendor.p({
      span: 8
    }),
    b: common_vendor.o((...args) => $options.selfUpdate && $options.selfUpdate(...args)),
    c: $data.is_self,
    d: $data.is_focus,
    e: $data.is_focus,
    f: common_vendor.p({
      span: 16
    }),
    g: common_vendor.t("Author"),
    h: common_vendor.t("\u56DB\u5DDD\u8F7B\u5316\u5DE5\u5927\u5B66"),
    i: common_vendor.t("\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F"),
    j: common_vendor.p({
      color: "#808080",
      type: "mail-open-filled",
      size: "22"
    }),
    k: common_vendor.t("qihang_duan@foxmail.com"),
    l: common_vendor.p({
      color: "#808080",
      type: "navigate",
      size: "22"
    }),
    m: common_vendor.p({
      href: "https://uniapp.dcloud.io/",
      text: "https://uniapp.dcloud.io/",
      color: "#03dac5"
    }),
    n: common_vendor.p({
      color: "#808080",
      type: "flag",
      size: "22"
    }),
    o: common_vendor.t("\u70ED\u7231\u751F\u6D3B"),
    p: $data.swiperIndex == 0 ? 1 : "",
    q: common_vendor.p({
      span: 12
    }),
    r: $data.swiperIndex == 1 ? 1 : "",
    s: common_vendor.p({
      span: 12
    }),
    t: $data.nav_show,
    v: $data.swiperIndex == 0 ? 1 : "",
    w: common_vendor.p({
      span: 12
    }),
    x: $data.swiperIndex == 1 ? 1 : "",
    y: common_vendor.p({
      span: 12
    }),
    z: !$data.nav_show,
    A: common_vendor.p({
      span: 2
    }),
    B: common_vendor.p({
      span: 17
    }),
    C: common_vendor.p({
      type: "more-filled"
    }),
    D: common_vendor.t("\xA0"),
    E: common_vendor.p({
      span: 5
    }),
    F: common_vendor.p({
      span: 16
    }),
    G: common_vendor.p({
      span: 8
    }),
    H: common_vendor.p({
      span: 2
    }),
    I: common_vendor.p({
      span: 17
    }),
    J: common_vendor.p({
      type: "more-filled"
    }),
    K: common_vendor.t("\xA0"),
    L: common_vendor.p({
      span: 5
    }),
    M: common_vendor.p({
      span: 16
    }),
    N: common_vendor.p({
      span: 8
    }),
    O: common_vendor.p({
      span: 2
    }),
    P: common_vendor.p({
      span: 17
    }),
    Q: common_vendor.p({
      type: "more-filled"
    }),
    R: common_vendor.t("\xA0"),
    S: common_vendor.p({
      span: 5
    }),
    T: common_vendor.p({
      span: 16
    }),
    U: common_vendor.p({
      span: 8
    }),
    V: common_vendor.p({
      span: 2
    }),
    W: common_vendor.p({
      span: 17
    }),
    X: common_vendor.p({
      type: "more-filled"
    }),
    Y: common_vendor.t("\xA0"),
    Z: common_vendor.p({
      span: 5
    }),
    aa: common_vendor.p({
      span: 16
    }),
    ab: common_vendor.p({
      span: 8
    }),
    ac: common_vendor.t(0),
    ad: common_vendor.t(0),
    ae: common_vendor.t("\u5176\u4ED6"),
    af: common_vendor.t(0),
    ag: common_vendor.t(0),
    ah: common_vendor.t("\u5176\u4ED6"),
    ai: common_vendor.t(0),
    aj: common_vendor.t(0),
    ak: common_vendor.t("\u5176\u4ED6"),
    al: common_vendor.o((...args) => $options.swiperChage && $options.swiperChage(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/dachuang/uniapp_client/Client/pages/self/self_detail/self_detail.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
