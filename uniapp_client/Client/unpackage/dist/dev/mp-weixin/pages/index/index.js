"use strict";
var common_vendor = require("../../common/vendor.js");
var self_;
const _sfc_main = {
  data() {
    return {
      pattern: {
        buttonColor: "#03dac5",
        iconColor: "#fff"
      },
      show: false,
      scroll_show: false,
      transl: ["fade", "slide-left"],
      transr: ["fade", "slide-right"],
      interval: "2000",
      contentText: {
        contentdown: "\u67E5\u770B\u66F4\u591A",
        contentrefresh: "\u52A0\u8F7D\u4E2D",
        contentnomore: "\u6CA1\u6709\u66F4\u591A\u4E86"
      },
      status: "more",
      article_arr: [{
        id: 0,
        title: "",
        comments: 0,
        likes: 0,
        avatar: "",
        author: {
          id: 0,
          avatar: "",
          nickname: ""
        }
      }]
    };
  },
  created() {
    self_ = this;
    self_.openSection(1);
  },
  onLoad() {
  },
  onReady() {
  },
  onPageScroll() {
    self_.nav_fixed_top();
  },
  methods: {
    openSection(index) {
      if (index == "1") {
        this.scroll_show = false;
        this.show = true;
      } else {
        this.scroll_show = false;
        this.show = false;
      }
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
          if (this.touchStartY > 223 || this.touchStartY < 89) {
            self_.openSection(1);
          }
          console.log("\u5DE6\u6ED1");
          console.log("x:" + this.touchStartX + "y:" + this.touchStartY);
        } else {
          if (this.touchStartY > 223 || this.touchStartY < 89) {
            self_.openSection(2);
          }
          console.log("\u53F3\u6ED1");
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
    clickLoadMore(e) {
      this.status = "loading";
      this.timer = setTimeout(() => {
        this.status = "nomore";
      }, 1e3);
    },
    nav_fixed_top() {
      const query = common_vendor.index.createSelectorQuery().in(this);
      let navToTop = 0;
      if (this.show) {
        query.select("#navTop").boundingClientRect((data) => {
          navToTop = data.top;
          if (navToTop <= 46) {
            this.scroll_show = true;
          } else {
            this.scroll_show = false;
          }
        }).exec();
      } else {
        query.select("#navTop2").boundingClientRect((data) => {
          navToTop = data.top;
          if (navToTop <= 50) {
            this.scroll_show = true;
          } else {
            this.scroll_show = false;
          }
        }).exec();
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_col2 + _easycom_uni_easyinput2 + _easycom_uni_icons2 + _easycom_uni_row2 + _easycom_uni_popup2 + _easycom_uni_load_more2 + _easycom_uni_transition2 + _easycom_uni_fab2)();
}
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_transition = () => "../../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_col + _easycom_uni_easyinput + _easycom_uni_icons + _easycom_uni_row + _easycom_uni_popup + _easycom_uni_load_more + _easycom_uni_transition + _easycom_uni_fab)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.show ? 1 : "",
    b: common_vendor.o(($event) => $options.openSection(1)),
    c: common_vendor.p({
      span: 12
    }),
    d: !$data.show ? 1 : "",
    e: common_vendor.o(($event) => $options.openSection(2)),
    f: common_vendor.p({
      span: 12
    }),
    g: $data.scroll_show,
    h: common_vendor.p({
      placeholder: "\u641C\u7D22\u5185\u5BB9",
      clearable: true
    }),
    i: common_vendor.p({
      span: 20
    }),
    j: common_vendor.p({
      type: "search",
      size: "28",
      color: "grey"
    }),
    k: common_vendor.p({
      span: 4
    }),
    l: $data.show ? 1 : "",
    m: common_vendor.o(($event) => $options.openSection(1)),
    n: common_vendor.p({
      span: 12
    }),
    o: !$data.show ? 1 : "",
    p: common_vendor.o(($event) => $options.openSection(2)),
    q: common_vendor.p({
      span: 12
    }),
    r: !$data.scroll_show,
    s: $data.interval,
    t: common_vendor.p({
      span: 2
    }),
    v: common_vendor.p({
      span: 17
    }),
    w: common_vendor.p({
      type: "more-filled"
    }),
    x: common_vendor.t("\xA0"),
    y: common_vendor.p({
      span: 5
    }),
    z: common_vendor.p({
      span: 16
    }),
    A: common_vendor.p({
      span: 8
    }),
    B: common_vendor.p({
      span: 2
    }),
    C: common_vendor.p({
      span: 17
    }),
    D: common_vendor.p({
      type: "more-filled"
    }),
    E: common_vendor.t("\xA0"),
    F: common_vendor.p({
      span: 5
    }),
    G: common_vendor.p({
      span: 16
    }),
    H: common_vendor.p({
      span: 8
    }),
    I: common_vendor.sr("popup", "190ad139-30,190ad139-9"),
    J: common_vendor.p({
      type: "bottom"
    }),
    K: common_vendor.o(($event) => $options.clickLoadMore(_ctx.e)),
    L: common_vendor.p({
      status: $data.status,
      color: "#03dac5",
      contentText: $data.contentText,
      iconType: "circle"
    }),
    M: $data.show,
    N: common_vendor.p({
      modeClass: $data.transl,
      show: $data.show
    }),
    O: $data.article_arr[0].id == 0
  }, $data.article_arr[0].id == 0 ? {} : {}, {
    P: $data.article_arr[0].id != 0
  }, $data.article_arr[0].id != 0 ? {
    Q: common_vendor.p({
      span: 2
    }),
    R: common_vendor.p({
      span: 17
    }),
    S: common_vendor.p({
      type: "more-filled"
    }),
    T: common_vendor.t("\xA0"),
    U: common_vendor.p({
      span: 5
    }),
    V: common_vendor.p({
      span: 16
    }),
    W: common_vendor.p({
      span: 8
    }),
    X: common_vendor.sr("popup", "190ad139-43,190ad139-32"),
    Y: common_vendor.p({
      type: "bottom"
    }),
    Z: common_vendor.o(($event) => $options.clickLoadMore(_ctx.e)),
    aa: common_vendor.p({
      status: $data.status,
      color: "#03dac5",
      contentText: $data.contentText,
      iconType: "circle"
    })
  } : {}, {
    ab: !$data.show,
    ac: common_vendor.p({
      modeClass: $data.transr,
      show: !$data.show
    }),
    ad: common_vendor.p({
      pattern: $data.pattern,
      horizontal: "right",
      vertical: "bottom"
    }),
    ae: common_vendor.o((...args) => $options.touchStart && $options.touchStart(...args)),
    af: common_vendor.o((...args) => $options.touchEnd && $options.touchEnd(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/dachuang/uniapp_client/Client/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
