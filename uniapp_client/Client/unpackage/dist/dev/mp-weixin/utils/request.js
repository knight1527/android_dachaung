"use strict";
var common_vendor = require("../common/vendor.js");
const BASE_URL = `http://localhost:8096`;
const $request = (options) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: BASE_URL + options.url,
      method: options.method || "GET",
      header: {
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIiwiZXhwIjoxNjc4OTg4NTY4fQ.jHVYW-bAt0dYbROjtKkIJ5t32LFu1cDGVdmOi9fY5mQ"
      },
      data: options.data || {},
      success: (res) => {
        const data = res.data;
        if (data.code == "401") {
          common_vendor.index.navigateTo({
            url: "/pages/user/login/login"
          });
          common_vendor.index.showToast({
            icon: "error",
            title: "\u8BF7\u767B\u5F55\uFF01"
          });
          return;
        }
        console.log("\u8BF7\u6C42\u6210\u529F");
        resolve(data);
      },
      fail: (error) => {
        common_vendor.index.showToast({
          icon: "error",
          title: "\u7CFB\u7EDF\u9519\u8BEF"
        });
        console.log("\u8BF7\u6C42\u5931\u8D25");
        reject(error);
      }
    });
  });
};
exports.$request = $request;
