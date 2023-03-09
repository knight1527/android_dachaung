"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      icon_color: "",
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
      console.log(err.code + err.msg);
    });
  },
  onShow() {
    this.unchange();
  },
  methods: {
    change() {
      this.icon_color = "#C0C0C0";
    },
    unchange() {
      this.icon_color = "";
    },
    showDrawer() {
      this.$refs.showRight.open();
    },
    closeDrawer() {
      this.$refs.showRight.close();
    },
    openPage(index) {
      if (index == 1)
        ;
      else if (index == 2) {
        common_vendor.index.navigateTo({
          url: "/pages/self/self_update/self_update"
        });
      } else if (index == 3)
        ;
      else {
        common_vendor.index.navigateTo({
          url: "/pages/self/self_detail/self_detail?id=" + this.user.id
        });
      }
    },
    openFocus() {
      common_vendor.index.navigateTo({
        url: "/pages/focus/focus"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_nav_bar2 + _easycom_uni_col2 + _easycom_uni_row2 + _easycom_uni_icons2 + _easycom_uni_card2 + _easycom_uni_section2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_col + _easycom_uni_row + _easycom_uni_icons + _easycom_uni_card + _easycom_uni_section + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      fixed: true,
      height: "80rpx",
      title: "\u6211\u7684"
    }),
    b: $data.user.avatar,
    c: common_vendor.p({
      span: 6
    }),
    d: common_vendor.t($data.user.nickname),
    e: common_vendor.t($data.user.focusNum),
    f: common_vendor.o((...args) => $options.openFocus && $options.openFocus(...args)),
    g: common_vendor.p({
      span: 12
    }),
    h: common_vendor.t($data.user.focusedNum),
    i: common_vendor.o((...args) => $options.openFocus && $options.openFocus(...args)),
    j: common_vendor.p({
      span: 12
    }),
    k: common_vendor.p({
      span: 11
    }),
    l: common_vendor.p({
      color: $data.icon_color,
      type: "right"
    }),
    m: common_vendor.o(($event) => $options.openPage(4)),
    n: common_vendor.o(($event) => $options.change()),
    o: common_vendor.p({
      span: 7
    }),
    p: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    q: common_vendor.p({
      title: "\u4F7F\u7528\u63D0\u793A",
      type: "line"
    }),
    r: common_vendor.o(($event) => $options.openPage(1)),
    s: common_vendor.p({
      title: "\u6211\u7684\u6536\u85CF",
      clickable: true,
      showArrow: true
    }),
    t: common_vendor.o(($event) => $options.openPage(2)),
    v: common_vendor.p({
      title: "\u7F16\u8F91\u8D44\u6599",
      clickable: true,
      showArrow: true
    }),
    w: common_vendor.o(($event) => $options.openPage(3)),
    x: common_vendor.p({
      title: "\u8BBE\u7F6E",
      clickable: true,
      showArrow: true
    }),
    y: common_vendor.p({
      title: "\u5E2E\u52A9\u4E0E\u53CD\u9988",
      clickable: true,
      showArrow: true
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/dachuang/uniapp_client/Client/pages/self/self.vue"]]);
wx.createPage(MiniProgramPage);
