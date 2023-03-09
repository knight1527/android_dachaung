"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
var self_;
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
      category_index: -1,
      level_index: -1,
      categories: [],
      levels: [],
      displayCount: 1,
      events: [],
      event_index: 0,
      searchText: ""
    };
  },
  computed: {
    event_status: function() {
      return function(item) {
        if (item.status == "\u62A5\u540D\u4E2D") {
          return "status_before";
        } else if (item.status == "\u8FDB\u884C\u4E2D") {
          return "status_ing";
        } else {
          return "status_end";
        }
      };
    },
    formatDate: function(time) {
      return function(time2) {
        return common_vendor.hooks(time2).format("YYYY-MM-DD");
      };
    },
    event_type_show: function() {
      return function(type) {
        if (this.category_index != -1) {
          console.log(type.name == this.categories[this.category_index].name);
          return type.name == this.categories[this.category_index].name;
        } else {
          return true;
        }
      };
    },
    event_level_show: function() {
      return function(level) {
        if (this.level_index != -1) {
          console.log(level.name == this.levels[this.level_index].name);
          return level.name == this.levels[this.level_index].name;
        } else {
          return true;
        }
      };
    }
  },
  onPageScroll() {
  },
  onLoad() {
    utils_request.$request({
      url: "/type",
      method: "GET"
    }).then((res) => {
      this.categories = res.data;
    }).catch((err) => {
      console.log(err.code + err.msg);
    });
    utils_request.$request({
      url: "/level",
      method: "GET"
    }).then((res) => {
      this.levels = res.data;
    }).catch((err) => {
      console.log(err.code + err.msg);
    });
    utils_request.$request({
      url: "/event/index",
      method: "GET",
      data: {
        pageNum: this.displayCount
      }
    }).then((res) => {
      this.events = res.data;
    }).catch((err) => {
      console.log(err.code + err.msg);
    });
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
      this.displayCount++;
      utils_request.$request({
        url: "/event/index",
        method: "GET",
        data: {
          pageNum: this.displayCount
        }
      }).then((res) => {
        this.event_index = this.events.length - 1;
        if (res.data.length > 0) {
          self_.appendEvent(res.data);
          this.status = "more";
          self_.scrollToItem(this.event_index);
        } else {
          this.status = "nomore";
        }
      }).catch((err) => {
        console.log("\u8BF7\u6C42\u9519\u8BEF" + err.code + "Msg\uFF1A" + err.msg);
      });
    },
    search() {
      common_vendor.index.navigateTo({
        url: "/pages/search_result/search_result?searchText=" + this.searchText + "&showIndex=1"
      });
    },
    appendEvent(newEvents) {
      this.events.push(...newEvents);
    },
    scrollToItem(index) {
      common_vendor.index.createSelectorQuery().select("#item-" + index).boundingClientRect((res) => {
        common_vendor.index.pageScrollTo({
          scrollTop: res.top,
          duration: 300
        });
      }).exec();
    },
    openDetail(id) {
      common_vendor.index.navigateTo({
        url: "/pages/events/event_detail/event_detail?id=" + id
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
  return common_vendor.e({
    a: common_vendor.o(($event) => $data.searchText = $event),
    b: common_vendor.p({
      type: "text",
      placeholder: "\u641C\u7D22\u8D5B\u4E8B",
      clearable: true,
      modelValue: $data.searchText
    }),
    c: common_vendor.p({
      span: 20
    }),
    d: common_vendor.o($options.search),
    e: common_vendor.p({
      type: "search",
      size: "28",
      color: "grey"
    }),
    f: common_vendor.p({
      span: 4
    }),
    g: common_vendor.p({
      type: "list"
    }),
    h: common_vendor.o(($event) => $options.openPopup(1)),
    i: common_vendor.p({
      span: 12
    }),
    j: common_vendor.p({
      type: "settings"
    }),
    k: common_vendor.o(($event) => $options.openPopup(2)),
    l: common_vendor.p({
      span: 12
    }),
    m: common_vendor.t("\u5168\u90E8"),
    n: $data.category_index == -1
  }, $data.category_index == -1 ? {
    o: common_vendor.p({
      type: "checkmarkempty",
      color: "#03dac5",
      size: "26"
    })
  } : {}, {
    p: $data.category_index == -1 ? 1 : "",
    q: common_vendor.o(($event) => $options.choseCategory(-1)),
    r: common_vendor.f($data.categories, (type, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(type.name),
        b: index == $data.category_index
      }, index == $data.category_index ? {
        c: "30399a9a-12-" + i0 + ",30399a9a-10",
        d: common_vendor.p({
          type: "checkmarkempty",
          color: "#03dac5",
          size: "26"
        })
      } : {}, {
        e: index == $data.category_index ? 1 : "",
        f: common_vendor.o(($event) => $options.choseCategory(index)),
        g: type.id
      });
    }),
    s: common_vendor.sr("popup_category", "30399a9a-10"),
    t: common_vendor.p({
      backgroundColor: "#fff",
      type: "top"
    }),
    v: common_vendor.t("\u5168\u90E8"),
    w: $data.level_index == -1
  }, $data.level_index == -1 ? {
    x: common_vendor.p({
      type: "checkmarkempty",
      color: "#03dac5",
      size: "26"
    })
  } : {}, {
    y: $data.level_index == -1 ? 1 : "",
    z: common_vendor.o(($event) => $options.choseLevel(-1)),
    A: common_vendor.f($data.levels, (level, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(level.name),
        b: index == $data.level_index
      }, index == $data.level_index ? {
        c: "30399a9a-15-" + i0 + ",30399a9a-13",
        d: common_vendor.p({
          type: "checkmarkempty",
          color: "#03dac5",
          size: "26"
        })
      } : {}, {
        e: index == $data.level_index ? 1 : "",
        f: common_vendor.o(($event) => $options.choseLevel(index)),
        g: level.id
      });
    }),
    B: common_vendor.sr("popup_level", "30399a9a-13"),
    C: common_vendor.p({
      backgroundColor: "#fff",
      type: "top"
    }),
    D: common_vendor.f($data.events, (event, index, i0) => {
      return {
        a: common_vendor.t(event.status),
        b: common_vendor.n($options.event_status(event)),
        c: event.avatar,
        d: common_vendor.t(event.title),
        e: common_vendor.t($options.formatDate(event.registerAt)),
        f: common_vendor.t($options.formatDate(event.registerEnd)),
        g: common_vendor.t($options.formatDate(event.progressAt)),
        h: common_vendor.t($options.formatDate(event.progressEnd)),
        i: common_vendor.t(event.company),
        j: common_vendor.t(event.favoritesNum),
        k: common_vendor.t(event.commentsNum),
        l: common_vendor.t(event.level.name),
        m: common_vendor.o(($event) => $options.openDetail(event.id)),
        n: "item-" + index,
        o: $options.event_type_show(event.type) && $options.event_level_show(event.level),
        p: event.id
      };
    }),
    E: common_vendor.o(($event) => $options.clickLoadMore(_ctx.e)),
    F: common_vendor.p({
      status: $data.status,
      color: "#03dac5",
      contentText: $data.contentText,
      iconType: "circle"
    }),
    G: common_vendor.p({
      pattern: $data.pattern,
      horizontal: "right",
      vertical: "bottom"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/dachuang/uniapp_client/Client/pages/events/events.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
