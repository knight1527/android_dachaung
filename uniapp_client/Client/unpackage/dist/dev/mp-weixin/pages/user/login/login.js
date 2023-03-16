"use strict";
var common_vendor = require("../../../common/vendor.js");
var utils_request = require("../../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      formData_login: {
        username: "",
        password: "",
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
          }],
          validateTrigger: "submit"
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
  },
  methods: {
    getCode() {
      utils_request.$request({ url: "/user/code", method: "GET", data: "" }).then((res) => {
        this.codeUrl = res.data.img;
        this.formData_login.codeID = res.data.uuid;
      }).catch((err) => {
        console.log("\u9A8C\u8BC1\u7801\u8BF7\u6C42\u5931\u8D25" + err.msg);
      });
    },
    submit() {
      this.$refs.form.validate().then((res) => {
        console.log("\u8868\u5355\u6570\u636E\u4FE1\u606F\uFF1A", res);
        utils_request.$request({
          url: "/user/login",
          method: "POST",
          data: {
            username: this.formData_login.username,
            password: this.formData_login.password,
            code: this.formData_login.code,
            codeID: this.formData_login.codeID
          }
        }).then((res2) => {
          if (res2.code == "200") {
            common_vendor.index.setStorageSync("user", res2.data);
            common_vendor.index.showToast({
              title: "\u767B\u5F55\u6210\u529F"
            });
            common_vendor.index.switchTab({
              url: "/pages/index/index"
            });
          } else if (res2.code == "202") {
            common_vendor.index.showToast({
              icon: "error",
              title: "\u9A8C\u8BC1\u7801\u9519\u8BEF"
            });
          } else {
            common_vendor.index.showToast({
              icon: "error",
              title: res2.msg
            });
            console.log(res2.code + " Msg:" + res2.msg);
          }
        }).catch((err) => {
          console.log(err.code + "Msg:" + err.msg);
        });
      }).catch((err) => {
        console.log("\u63D0\u4EA4\u5931\u8D25");
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
  const _easycom_uni_group2 = common_vendor.resolveComponent("uni-group");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_row2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_col2 + _easycom_uni_group2 + _easycom_uni_forms2)();
}
const _easycom_uni_row = () => "../../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_col = () => "../../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_group = () => "../../../uni_modules/uni-group/components/uni-group/uni-group.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_row + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_col + _easycom_uni_group + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.formData_login.username = $event),
    b: common_vendor.p({
      prefixIcon: "contact-filled",
      type: "text",
      placeholder: "\u8BF7\u8F93\u5165\u8D26\u53F7",
      modelValue: $data.formData_login.username
    }),
    c: common_vendor.p({
      label: "\u8D26\u53F7",
      required: true,
      name: "username"
    }),
    d: common_vendor.o(($event) => $data.formData_login.password = $event),
    e: common_vendor.p({
      prefixIcon: "locked-filled",
      type: "password",
      placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
      modelValue: $data.formData_login.password
    }),
    f: common_vendor.p({
      label: "\u5BC6\u7801",
      required: true,
      name: "password"
    }),
    g: common_vendor.o(($event) => $data.formData_login.code = $event),
    h: common_vendor.p({
      type: "text",
      placeholder: "\u9A8C\u8BC1\u7801(\u70B9\u51FB\u5237\u65B0)",
      modelValue: $data.formData_login.code
    }),
    i: common_vendor.p({
      span: 12
    }),
    j: $data.codeUrl,
    k: common_vendor.o(($event) => $options.getCode()),
    l: common_vendor.p({
      span: 12
    }),
    m: common_vendor.p({
      label: "\u9A8C\u8BC1\u7801",
      required: true,
      name: "code"
    }),
    n: common_vendor.sr("form", "dfcac86a-3,dfcac86a-2"),
    o: common_vendor.p({
      modelValue: $data.formData_login,
      rules: $data.rules
    }),
    p: common_vendor.o(($event) => $options.submit())
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/dachuang/uniapp_client/Client/pages/user/login/login.vue"]]);
wx.createPage(MiniProgramPage);
