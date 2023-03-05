"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      pattern: {
        buttonColor: "#03dac5",
        iconColor: "#fff"
      },
      contentText: {
        contentdown: "\u67E5\u770B\u66F4\u591A",
        contentrefresh: "\u52A0\u8F7D\u4E2D",
        contentnomore: "\u6CA1\u6709\u66F4\u591A\u4E86"
      },
      status: "more",
      category_index: 0,
      level_index: 0,
      categories: ["\u5168\u90E8", "\u5DE5\u79D1\u7C7B", "\u7406\u5B66\u7C7B", "\u519B\u4E8B\u7C7B", "\u7ECF\u6D4E\u7C7B", "\u6587\u4F53\u7C7B", "\u7EFC\u5408\u7C7B"],
      levels: ["\u5168\u90E8", "\u4E16\u754C\u7EA7", "\u56FD\u5BB6\u7EA7", "\u7701\u7EA7", "\u6821\u7EA7", "\u5176\u4ED6"],
      event_arr: [{
        id: 0,
        title: "",
        avatar: "",
        registrationTime: "",
        registrationEndTime: "",
        duringTime: "",
        duringEndTime: "",
        comments: 0,
        collected: 0,
        level: "",
        category: "",
        hostUnit: [""],
        status: 1,
        status_content: "\u8FDB\u884C\u4E2D",
        author: {
          id: 0,
          avatar: "",
          nickname: ""
        }
      }]
    };
  },
  onPageScroll() {
  },
  methods: {
    openPopup(param) {
      if (param == 1) {
        this.$refs.popup_category.open();
      } else {
        this.$refs.popup_level.open();
      }
    },
    choseCategory(index) {
      console.log(this.categories[index]);
      this.category_index = index;
      console.log(this.category_index);
      this.$refs.popup_category.close();
    },
    choseLevel(index) {
      console.log(this.levels[index]);
      this.level_index = index;
      console.log(this.level_index);
      this.$refs.popup_level.close();
    },
    clickLoadMore(e) {
      this.status = "loading";
      this.timer = setTimeout(() => {
        this.status = "nomore";
      }, 1e3);
    },
    search() {
      common_vendor.index.navigateTo({
        url: "/pages/search_result/search_result"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_easyinput2 + _easycom_uni_col2 + _easycom_uni_icons2 + _easycom_uni_row2 + _easycom_uni_popup2 + _easycom_uni_load_more2 + _easycom_uni_fab2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_col + _easycom_uni_icons + _easycom_uni_row + _easycom_uni_popup + _easycom_uni_load_more + _easycom_uni_fab)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      placeholder: "\u641C\u7D22\u8D5B\u4E8B",
      clearable: true
    }),
    b: common_vendor.p({
      span: 20
    }),
    c: common_vendor.o($options.search),
    d: common_vendor.p({
      type: "search",
      size: "28",
      color: "grey"
    }),
    e: common_vendor.p({
      span: 4
    }),
    f: common_vendor.p({
      type: "list"
    }),
    g: common_vendor.o(($event) => $options.openPopup(1)),
    h: common_vendor.p({
      span: 12
    }),
    i: common_vendor.p({
      type: "settings"
    }),
    j: common_vendor.o(($event) => $options.openPopup(2)),
    k: common_vendor.p({
      span: 12
    }),
    l: common_vendor.f($data.categories, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item),
        b: index == $data.category_index
      }, index == $data.category_index ? {
        c: "30399a9a-11-" + i0 + ",30399a9a-10",
        d: common_vendor.p({
          type: "checkmarkempty",
          color: "#03dac5",
          size: "26"
        })
      } : {}, {
        e: index == $data.category_index ? 1 : "",
        f: common_vendor.o(($event) => $options.choseCategory(index)),
        g: item
      });
    }),
    m: common_vendor.sr("popup_category", "30399a9a-10"),
    n: common_vendor.p({
      backgroundColor: "#fff",
      type: "top"
    }),
    o: common_vendor.f($data.levels, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item),
        b: index == $data.level_index
      }, index == $data.level_index ? {
        c: "30399a9a-13-" + i0 + ",30399a9a-12",
        d: common_vendor.p({
          type: "checkmarkempty",
          color: "#03dac5",
          size: "26"
        })
      } : {}, {
        e: index == $data.level_index ? 1 : "",
        f: common_vendor.o(($event) => $options.choseLevel(index)),
        g: item
      });
    }),
    p: common_vendor.sr("popup_level", "30399a9a-12"),
    q: common_vendor.p({
      backgroundColor: "#fff",
      type: "top"
    }),
    r: common_vendor.t(0),
    s: common_vendor.t(0),
    t: common_vendor.t("\u5176\u4ED6"),
    v: common_vendor.o(($event) => $options.clickLoadMore(_ctx.e)),
    w: common_vendor.p({
      status: $data.status,
      color: "#03dac5",
      contentText: $data.contentText,
      iconType: "circle"
    }),
    x: common_vendor.p({
      pattern: $data.pattern,
      horizontal: "right",
      vertical: "bottom"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/dachuang/uniapp_client/Client/pages/events/events.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
