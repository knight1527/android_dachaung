"use strict";
var common_vendor = require("../../../common/vendor.js");
var utils_request = require("../../../utils/request.js");
var self_;
const _sfc_main = {
  data() {
    return {
      formData_register: {
        username: "",
        password: "",
        verify_password: "",
        code: "",
        codeID: ""
      },
      codeUrl: "",
      rules: {
        username: {
          rules: [{
            required: true,
            errorMessage: "\u8D26\u53F7\u4E0D\u80FD\u4E3A\u7A7A"
          }]
        },
        password: {
          rules: [{
            required: true,
            errorMessage: "\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A"
          }, {
            validateFunction: function(rule, value, data, callback) {
              if (value.length < 6) {
                console.log("\u81F3\u5C11\u516D\u4F4D");
                callback("\u5BC6\u7801\u81F3\u5C11\u516D\u4F4D");
              }
              return true;
            }
          }]
        },
        verify_password: {
          rules: [{
            required: true,
            errorMessage: "\u786E\u8BA4\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A"
          }, {
            validateFunction: function(rule, value, data, callback) {
              if (value != data.password) {
                console.log("\u4E24\u6B21\u5BC6\u7801\u4E0D\u4E00\u81F4");
                callback("\u4E24\u6B21\u5BC6\u7801\u4E0D\u4E00\u81F4");
              }
              return true;
            }
          }]
        },
        code: {
          rules: [{ required: true, errorMessage: "\u9A8C\u8BC1\u7801\u4E0D\u80FD\u4E3A\u7A7A" }]
        }
      }
    };
  },
  onReady() {
  },
  created() {
    this.getCode();
    self_ = this;
  },
  methods: {
    getCode() {
      utils_request.$request({ url: "/user/code", method: "GET", data: "" }).then((res) => {
        this.codeUrl = res.data.img;
        this.formData_register.codeID = res.data.uuid;
      }).catch((err) => {
        console.log("\u9A8C\u8BC1\u7801\u8BF7\u6C42\u5931\u8D25" + err.msg);
      });
    },
    relSubmit() {
      console.log("\u771F\u6B63\u63D0\u4EA4");
      utils_request.$request({
        url: "/user/register",
        method: "POST",
        data: {
          username: this.formData_register.username,
          password: this.formData_register.password,
          code: this.formData_register.code,
          codeID: this.formData_register.codeID
        }
      }).then((res) => {
        if (res.code == "200") {
          common_vendor.index.setStorageSync("token", res.data.token);
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
          common_vendor.index.showToast({
            title: "\u6CE8\u518C\u6210\u529F"
          });
        } else if (res.code == "202") {
          common_vendor.index.showToast({
            icon: "error",
            title: "\u9A8C\u8BC1\u7801\u9519\u8BEF"
          });
        } else {
          common_vendor.index.showToast({
            icon: "error",
            title: res.msg
          });
          console.log(res.code + " Msg:" + res.msg);
        }
      }).catch((err) => {
        console.log(err.code + "Msg:" + err.msg);
      });
    },
    submit() {
      this.$refs.form.validate().then((res) => {
        console.log("\u8868\u5355\u6570\u636E\u4FE1\u606F\uFF1A", res);
        utils_request.$request({
          url: "/user/queryUser",
          method: "GET",
          data: { username: this.formData_register.username }
        }).then((res2) => {
          if (res2.code == "200") {
            console.log("username \u5408\u6CD5");
            self_.relSubmit();
          } else {
            common_vendor.index.showToast({
              icon: "error",
              title: "\u8D26\u53F7\u5DF2\u5B58\u5728\uFF01"
            });
          }
        }).catch((err) => {
          console.log(err);
          console.log("\u670D\u52A1\u5668 500\uFF01");
        });
      }).catch((err) => {
        console.log("\u8868\u5355\u9519\u8BEF\uFF1A", err);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_row2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_col2 + _easycom_uni_forms2)();
}
const _easycom_uni_row = () => "../../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_col = () => "../../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_row + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_col + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.formData_register.username = $event),
    b: common_vendor.p({
      type: "text",
      prefixIcon: "contact-filled",
      placeholder: "\u8D26\u53F7(\u6570\u5B57\u548C\u5B57\u6BCD\u7EC4\u6210)",
      modelValue: $data.formData_register.username
    }),
    c: common_vendor.p({
      label: "\u8D26\u53F7",
      required: true,
      name: "username"
    }),
    d: common_vendor.o(($event) => $data.formData_register.password = $event),
    e: common_vendor.p({
      type: "password",
      prefixIcon: "locked-filled",
      placeholder: "\u5BC6\u7801(\u81F3\u5C116\u4F4D)",
      modelValue: $data.formData_register.password
    }),
    f: common_vendor.p({
      label: "\u5BC6\u7801",
      required: true,
      name: "password"
    }),
    g: common_vendor.o(($event) => $data.formData_register.verify_password = $event),
    h: common_vendor.p({
      type: "password",
      prefixIcon: "locked-filled",
      placeholder: "\u786E\u8BA4\u5BC6\u7801",
      modelValue: $data.formData_register.verify_password
    }),
    i: common_vendor.p({
      label: "\u786E\u8BA4\u5BC6\u7801",
      required: true,
      name: "verify_password"
    }),
    j: common_vendor.o(($event) => $data.formData_register.code = $event),
    k: common_vendor.p({
      type: "text",
      placeholder: "\u9A8C\u8BC1\u7801(\u70B9\u51FB\u5237\u65B0)",
      modelValue: $data.formData_register.code
    }),
    l: common_vendor.p({
      span: 12
    }),
    m: $data.codeUrl,
    n: common_vendor.o(($event) => $options.getCode()),
    o: common_vendor.p({
      span: 12
    }),
    p: common_vendor.p({
      label: "\u9A8C\u8BC1\u7801",
      required: true,
      name: "code"
    }),
    q: common_vendor.sr("form", "7267b917-3,7267b917-2"),
    r: common_vendor.p({
      modelValue: $data.formData_register,
      rules: $data.rules
    }),
    s: common_vendor.o(($event) => $options.submit())
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/dachuang/uniapp_client/Client/pages/user/register/register.vue"]]);
wx.createPage(MiniProgramPage);
