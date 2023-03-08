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
      articles: [],
      articles_focus: [],
      displayCount: 1,
      displayCount_focus: 5,
      a_index: 0,
      af_index: 0,
      searchText: ""
    };
  },
  computed: {
    displayContent() {
      let index = Math.min(articles_focus.length, displayCount_focus + 5);
      this.af_index = index - 1;
      return this.articles_focus.slice(0, index);
    },
    formatDate: function(time) {
      return function(time2) {
        let date = new Date(time2);
        return date.toLocaleString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        });
      };
    }
  },
  created() {
    self_ = this;
    self_.openSection(1);
  },
  onLoad() {
    console.log("debug");
    utils_request.$request({
      url: "/article/index",
      method: "GET",
      data: {
        pageNum: this.displayCount
      }
    }).then((res) => {
      this.articles = res.data;
    }).catch((err) => {
      console.log("\u8BF7\u6C42\u9519\u8BEF" + err.code + "Msg\uFF1A" + err.msg);
    });
    utils_request.$request({
      url: "/article/index_f",
      method: "GET"
    }).then((res) => {
      this.articles_focus = res.data;
    }).catch((err) => {
      console.log("\u8BF7\u6C42\u9519\u8BEF" + err.code + "Msg\uFF1A" + err.msg);
    });
    console.log(this.articles);
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
      this.displayCount++;
      utils_request.$request({
        url: "/article/index",
        method: "GET",
        data: {
          pageNum: this.displayCount
        }
      }).then((res) => {
        this.a_index = this.articles.length - 1;
        if (res.data.length > 0) {
          self_.appendArticle(res.data);
          this.status = "more";
          self_.scrollToItem(0, this.a_index);
        } else {
          this.status = "nomore";
        }
      }).catch((err) => {
        console.log("\u8BF7\u6C42\u9519\u8BEF" + err.code + "Msg\uFF1A" + err.msg);
      });
    },
    clickLoadMoreFocus(e) {
      this.status = "loading";
      this.displayCount_focus += 5;
      self_.scrollToItem(1, af_index);
      this.status = "nomore";
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
    },
    scrollToItem(type, index) {
      if (type == 0) {
        common_vendor.index.createSelectorQuery().select("#item-" + index).boundingClientRect((res) => {
          common_vendor.index.pageScrollTo({
            scrollTop: res.top,
            duration: 300
          });
        }).exec();
      } else {
        common_vendor.index.createSelectorQuery().select("#focusItem-" + index).boundingClientRect((res) => {
          common_vendor.index.pageScrollTo({
            scrollTop: res.top,
            duration: 300
          });
        }).exec();
      }
    },
    appendArticle(newAticles) {
      this.articles.push(...newAticles);
    },
    search() {
      common_vendor.index.navigateTo({
        url: "/pages/search_result/search_result?searchText=" + this.searchText + "&showIndex=0"
      });
    },
    goToArticleDetail(id) {
      common_vendor.index.navigateTo({
        url: "/pages/index/sec_detail/sec_detail?id=" + id
      });
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
    h: common_vendor.o(($event) => $data.searchText = $event),
    i: common_vendor.p({
      placeholder: "\u641C\u7D22\u5185\u5BB9",
      clearable: true,
      modelValue: $data.searchText
    }),
    j: common_vendor.p({
      span: 20
    }),
    k: common_vendor.o($options.search),
    l: common_vendor.p({
      type: "search",
      size: "28",
      color: "grey"
    }),
    m: common_vendor.p({
      span: 4
    }),
    n: $data.show ? 1 : "",
    o: common_vendor.o(($event) => $options.openSection(1)),
    p: common_vendor.p({
      span: 12
    }),
    q: !$data.show ? 1 : "",
    r: common_vendor.o(($event) => $options.openSection(2)),
    s: common_vendor.p({
      span: 12
    }),
    t: !$data.scroll_show,
    v: $data.interval,
    w: common_vendor.f($data.articles, (article, index, i0) => {
      return {
        a: article.user.avatar,
        b: "190ad139-11-" + i0 + "," + ("190ad139-10-" + i0),
        c: common_vendor.t(article.user.nickname),
        d: "190ad139-12-" + i0 + "," + ("190ad139-10-" + i0),
        e: "190ad139-14-" + i0 + "," + ("190ad139-13-" + i0),
        f: "190ad139-13-" + i0 + "," + ("190ad139-10-" + i0),
        g: "190ad139-10-" + i0 + ",190ad139-9",
        h: common_vendor.t(article.title),
        i: "190ad139-17-" + i0 + "," + ("190ad139-16-" + i0),
        j: common_vendor.t(article.commentsNum),
        k: common_vendor.t(article.likesNum),
        l: common_vendor.t(article.createdTime),
        m: "190ad139-18-" + i0 + "," + ("190ad139-16-" + i0),
        n: "190ad139-16-" + i0 + "," + ("190ad139-15-" + i0),
        o: article.avatar,
        p: "190ad139-19-" + i0 + "," + ("190ad139-15-" + i0),
        q: "190ad139-15-" + i0 + ",190ad139-9",
        r: common_vendor.o(($event) => $options.goToArticleDetail(article.id)),
        s: "item-" + index,
        t: article.id
      };
    }),
    x: common_vendor.p({
      span: 2
    }),
    y: common_vendor.p({
      span: 17
    }),
    z: common_vendor.p({
      type: "more-filled"
    }),
    A: common_vendor.t("\xA0"),
    B: common_vendor.p({
      span: 5
    }),
    C: common_vendor.p({
      span: 16
    }),
    D: common_vendor.p({
      span: 8
    }),
    E: common_vendor.sr("popup", "190ad139-20,190ad139-9"),
    F: common_vendor.p({
      type: "bottom"
    }),
    G: common_vendor.o(($event) => $options.clickLoadMore(_ctx.e)),
    H: common_vendor.p({
      status: $data.status,
      color: "#03dac5",
      contentText: $data.contentText,
      iconType: "circle"
    }),
    I: $data.show,
    J: common_vendor.p({
      modeClass: $data.transl,
      show: $data.show
    }),
    K: $data.articles_focus.length == 0
  }, $data.articles_focus.length == 0 ? {} : {}, {
    L: $data.articles_focus.length != 0
  }, $data.articles_focus.length != 0 ? {
    M: common_vendor.f($options.displayContent, (article, index, i0) => {
      return {
        a: article.user.avatar,
        b: "190ad139-24-" + i0 + "," + ("190ad139-23-" + i0),
        c: common_vendor.t(article.user.nickname),
        d: "190ad139-25-" + i0 + "," + ("190ad139-23-" + i0),
        e: "190ad139-27-" + i0 + "," + ("190ad139-26-" + i0),
        f: "190ad139-26-" + i0 + "," + ("190ad139-23-" + i0),
        g: "190ad139-23-" + i0 + ",190ad139-22",
        h: common_vendor.t(article.title),
        i: "190ad139-30-" + i0 + "," + ("190ad139-29-" + i0),
        j: common_vendor.t(article.commentsNum),
        k: common_vendor.t(article.likesNum),
        l: common_vendor.t($options.formatDate(article.createdAt)),
        m: "190ad139-31-" + i0 + "," + ("190ad139-29-" + i0),
        n: "190ad139-29-" + i0 + "," + ("190ad139-28-" + i0),
        o: article.avatar,
        p: "190ad139-32-" + i0 + "," + ("190ad139-28-" + i0),
        q: "190ad139-28-" + i0 + ",190ad139-22",
        r: common_vendor.o(($event) => $options.goToArticleDetail(article.id)),
        s: "focusItem-" + index,
        t: article.id
      };
    }),
    N: common_vendor.p({
      span: 2
    }),
    O: common_vendor.p({
      span: 17
    }),
    P: common_vendor.p({
      type: "more-filled"
    }),
    Q: common_vendor.t("\xA0"),
    R: common_vendor.p({
      span: 5
    }),
    S: common_vendor.p({
      span: 16
    }),
    T: common_vendor.p({
      span: 8
    }),
    U: common_vendor.sr("popup", "190ad139-33,190ad139-22"),
    V: common_vendor.p({
      type: "bottom"
    }),
    W: common_vendor.o(($event) => $options.clickLoadMoreFocus(_ctx.e)),
    X: common_vendor.p({
      status: $data.status,
      color: "#03dac5",
      contentText: $data.contentText,
      iconType: "circle"
    })
  } : {}, {
    Y: !$data.show,
    Z: common_vendor.p({
      modeClass: $data.transr,
      show: !$data.show
    }),
    aa: common_vendor.p({
      pattern: $data.pattern,
      horizontal: "right",
      vertical: "bottom"
    }),
    ab: common_vendor.o((...args) => $options.touchStart && $options.touchStart(...args)),
    ac: common_vendor.o((...args) => $options.touchEnd && $options.touchEnd(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/dachuang/uniapp_client/Client/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
