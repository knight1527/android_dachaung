"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      contentText: {
        contentdown: "\u67E5\u770B\u66F4\u591A",
        contentrefresh: "\u52A0\u8F7D\u4E2D",
        contentnomore: "\u6CA1\u6709\u66F4\u591A\u4E86"
      },
      status: "more",
      showIndex: 0,
      transType: ["fade", "slide-left"],
      searchText: ""
    };
  },
  onLoad(option) {
    this.searchText = option.searchText;
    this.showIndex = option.showIndex;
  },
  created() {
  },
  methods: {
    back() {
      common_vendor.index.navigateBack();
    },
    clickLoadMore(e) {
      this.status = "loading";
      this.timer = setTimeout(() => {
        this.status = "nomore";
      }, 1e3);
    },
    touchStart(e) {
      console.log("\u89E6\u6478\u5F00\u59CB");
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    },
    touchEnd(e) {
      console.log("\u89E6\u6478\u7ED3\u675F");
      let deltaX = e.changedTouches[0].clientX - this.touchStartX;
      let deltaY = e.changedTouches[0].clientY - this.touchStartY;
      if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX >= 0) {
          if (this.showIndex == 0) {
            this.showIndex = 2;
          } else {
            this.showIndex--;
          }
          this.transType = ["fade", "slide-left"];
          console.log("\u5DE6\u6ED1" + this.showIndex);
          console.log("x:" + this.touchStartX + "y:" + this.touchStartY);
        } else {
          this.showIndex = (this.showIndex + 1) % 3;
          this.transType = ["fade", "slide-right"];
          console.log("\u53F3\u6ED1" + this.showIndex);
        }
      } else if (Math.abs(deltaY) > 50 && Math.abs(deltaX) < Math.abs(deltaY)) {
        if (deltaY < 0) {
          console.log("\u4E0A\u6ED1");
        } else {
          console.log("x:" + this.touchStartX + "y:" + this.touchStartY);
          console.log("\u4E0B\u6ED1");
        }
      } else {
        console.log("\u53EF\u80FD\u662F\u8BEF\u89E6\uFF01");
      }
    },
    changeIndex(index) {
      this.showIndex = index;
    },
    gotoDetail() {
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  (_easycom_uni_icons2 + _easycom_uni_col2 + _easycom_uni_easyinput2 + _easycom_uni_row2 + _easycom_uni_load_more2 + _easycom_uni_transition2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_transition = () => "../../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_col + _easycom_uni_easyinput + _easycom_uni_row + _easycom_uni_load_more + _easycom_uni_transition)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "arrow-left",
      color: "#808080",
      size: "26"
    }),
    b: common_vendor.o((...args) => $options.back && $options.back(...args)),
    c: common_vendor.p({
      span: 4
    }),
    d: common_vendor.o(($event) => $data.searchText = $event),
    e: common_vendor.p({
      placeholder: "\u641C\u7D22",
      clearable: true,
      modelValue: $data.searchText
    }),
    f: common_vendor.p({
      type: "search",
      size: "26",
      color: "#808080"
    }),
    g: common_vendor.p({
      span: 20
    }),
    h: $data.showIndex == 0 ? 1 : "",
    i: common_vendor.o(($event) => $options.changeIndex(0)),
    j: $data.showIndex == 1 ? 1 : "",
    k: common_vendor.o(($event) => $options.changeIndex(1)),
    l: $data.showIndex == 2 ? 1 : "",
    m: common_vendor.o(($event) => $options.changeIndex(2)),
    n: common_vendor.p({
      span: 2
    }),
    o: common_vendor.p({
      span: 17
    }),
    p: common_vendor.p({
      type: "more-filled"
    }),
    q: common_vendor.t("\xA0"),
    r: common_vendor.p({
      span: 5
    }),
    s: common_vendor.p({
      span: 16
    }),
    t: common_vendor.p({
      span: 8
    }),
    v: common_vendor.o(($event) => $options.clickLoadMore(_ctx.e)),
    w: common_vendor.p({
      status: $data.status,
      color: "#03dac5",
      contentText: $data.contentText,
      iconType: "circle"
    }),
    x: $data.showIndex == 0,
    y: common_vendor.p({
      modeClass: $data.transType,
      show: $data.showIndex == 0
    }),
    z: common_vendor.t(0),
    A: common_vendor.t(0),
    B: common_vendor.t("\u5176\u4ED6"),
    C: common_vendor.o(($event) => $options.clickLoadMore(_ctx.e)),
    D: common_vendor.p({
      status: $data.status,
      color: "#03dac5",
      contentText: $data.contentText,
      iconType: "circle"
    }),
    E: $data.showIndex == 1,
    F: common_vendor.p({
      modeClass: $data.transType,
      show: $data.showIndex == 1
    }),
    G: common_vendor.p({
      type: "right",
      size: "22"
    }),
    H: common_vendor.o((...args) => $options.gotoDetail && $options.gotoDetail(...args)),
    I: common_vendor.o(($event) => $options.clickLoadMore(_ctx.e)),
    J: common_vendor.p({
      status: $data.status,
      color: "#03dac5",
      contentText: $data.contentText,
      iconType: "circle"
    }),
    K: $data.showIndex == 2,
    L: common_vendor.p({
      modeClass: $data.transType,
      show: $data.showIndex == 2
    }),
    M: common_vendor.o((...args) => $options.touchStart && $options.touchStart(...args)),
    N: common_vendor.o((...args) => $options.touchEnd && $options.touchEnd(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/dachuang/uniapp_client/Client/pages/search_result/search_result.vue"]]);
wx.createPage(MiniProgramPage);
