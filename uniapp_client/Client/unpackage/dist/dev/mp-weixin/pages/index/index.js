"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad() {
  },
  methods: {
    login() {
      common_vendor.index.navigateTo({
        url: "/pages/user/login/login"
      });
    },
    query() {
      utils_request.$request({ url: "/test/api", method: "GET", data: "" }).then((res) => {
        common_vendor.index.showToast({
          title: "data\uFF1A" + res.msg
        });
      }).catch((err) => {
        console.log("\u8BF7\u6C42\u5931\u8D25");
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.login()),
    b: common_vendor.t($data.title),
    c: common_vendor.o(($event) => $options.query())
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/dachuang/uniapp_client/Client/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
