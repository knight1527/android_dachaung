"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/user/login/login.js";
  "./pages/index/index.js";
  "./pages/user/register/register.js";
  "./pages/events/events.js";
  "./pages/msg/msg.js";
  "./pages/self/self.js";
  "./pages/test/test.js";
  "./pages/self/self_detail/self_detail.js";
  "./pages/self/self_update/self_update.js";
  "./pages/search_result/search_result.js";
  "./pages/index/sec_detail/sec_detail.js";
  "./pages/events/event_detail/event_detail.js";
  "./pages/focus/focus.js";
  "./pages/favorites/favorites.js";
}
const _sfc_main = {
  globalData: {},
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/dachuang/uniapp_client/Client/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
