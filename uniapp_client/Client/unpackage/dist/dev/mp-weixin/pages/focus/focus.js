"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      showIndex: 0,
      transType: ["fade", "slide-left"],
      contentText: {
        contentdown: "\u67E5\u770B\u66F4\u591A",
        contentrefresh: "\u52A0\u8F7D\u4E2D",
        contentnomore: "\u6CA1\u6709\u66F4\u591A\u4E86"
      },
      status: "more",
      user: {}
    };
  },
  onLoad() {
    utils_request.$request({
      url: "/user/self",
      method: "POST"
    }).then((res) => {
      this.user = res.data;
    }).catch((err) => {
    });
  },
  created() {
  },
  methods: {
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
            this.showIndex = 1;
          } else {
            this.showIndex--;
          }
          this.transType = ["fade", "slide-left"];
          console.log("\u5DE6\u6ED1" + this.showIndex);
          console.log("x:" + this.touchStartX + "y:" + this.touchStartY);
        } else {
          this.showIndex = (this.showIndex + 1) % 2;
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
    goToDetail(id) {
      common_vendor.index.navigateTo({
        url: "/pages/self/self_detail/self_detail?id=" + id
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  (_easycom_uni_row2 + _easycom_uni_icons2 + _easycom_uni_load_more2 + _easycom_uni_transition2)();
}
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_transition = () => "../../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
if (!Math) {
  (_easycom_uni_row + _easycom_uni_icons + _easycom_uni_load_more + _easycom_uni_transition)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.showIndex == 0 ? 1 : "",
    b: common_vendor.o(($event) => $options.changeIndex(0)),
    c: $data.showIndex == 1 ? 1 : "",
    d: common_vendor.o(($event) => $options.changeIndex(1)),
    e: common_vendor.f($data.user.focus, (user, index, i0) => {
      return {
        a: user.avatar,
        b: common_vendor.t(user.nickname),
        c: "22aae6c5-2-" + i0 + ",22aae6c5-1",
        d: common_vendor.o(($event) => $options.goToDetail(user.id)),
        e: user.id
      };
    }),
    f: common_vendor.p({
      type: "right",
      size: "22"
    }),
    g: common_vendor.o(($event) => _ctx.clickLoadMore(_ctx.e)),
    h: common_vendor.p({
      status: $data.status,
      color: "#03dac5",
      contentText: $data.contentText,
      iconType: "circle"
    }),
    i: $data.showIndex == 0,
    j: common_vendor.p({
      modeClass: $data.transType,
      show: $data.showIndex == 0
    }),
    k: common_vendor.f($data.user.focused, (user, index, i0) => {
      return {
        a: user.avatar,
        b: common_vendor.t(user.nickname),
        c: "22aae6c5-5-" + i0 + ",22aae6c5-4",
        d: common_vendor.o(($event) => $options.goToDetail(user.id)),
        e: user.id
      };
    }),
    l: common_vendor.p({
      type: "right",
      size: "22"
    }),
    m: common_vendor.o(($event) => _ctx.clickLoadMore(_ctx.e)),
    n: common_vendor.p({
      status: $data.status,
      color: "#03dac5",
      contentText: $data.contentText,
      iconType: "circle"
    }),
    o: $data.showIndex == 1,
    p: common_vendor.p({
      modeClass: $data.transType,
      show: $data.showIndex == 1
    }),
    q: common_vendor.o((...args) => $options.touchStart && $options.touchStart(...args)),
    r: common_vendor.o((...args) => $options.touchEnd && $options.touchEnd(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/dachuang/uniapp_client/Client/pages/focus/focus.vue"]]);
wx.createPage(MiniProgramPage);
