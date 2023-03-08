"use strict";
var common_vendor = require("../../../common/vendor.js");
var self_;
const _sfc_main = {
  data() {
    return {
      msgType: "success",
      messageText: "\u8FD9\u662F\u4E00\u6761\u6210\u529F\u63D0\u793A",
      inputDialogValue: "",
      inputDialogValue2: "",
      dialogIndex: 2,
      formData: {
        avatar: []
      },
      user: {
        avatar: "../../../static/faces/3-thump.jpg",
        nickname: "author",
        college: "\u56DB\u5DDD\u8F7B\u5316\u5DE5\u5927\u5B66",
        major: "\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F",
        email: "qihang_duan@foxmail.com",
        description: "\u70ED\u7231\u751F\u6D3B\uFF01",
        blog: "qihangduan.icu"
      }
    };
  },
  onLoad(option) {
    console.log(option.id);
  },
  mounted() {
  },
  onShow() {
  },
  created() {
    self_ = this;
  },
  methods: {
    chooseImage() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: "origin",
        sourceType: "album",
        success: function(res) {
          console.log(JSON.stringify(res.tempFilePaths));
          console.log(JSON.stringify(res.tempFiles));
          const tempFilePath = res.tempFilePaths;
          self_.formData.avatar = [tempFilePath];
          self_.avatarSrc = res.tempFilePaths;
          console.log(JSON.stringify(self_.formData.avatar));
        }
      });
    },
    dialogInputConfirm(value) {
      console.log("\u70B9\u51FB\u786E\u8BA4");
      console.log(value);
      this.msgType = "success";
      this.messageText = "Test";
      this.$refs.message.open();
    },
    dialogInputConfirm2(value) {
      console.log("\u70B9\u51FB\u786E\u8BA42");
      console.log(value);
      self_.dosomething(value);
    },
    dosomething(value) {
      let dialogIndex = this.dialogIndex;
      if (dialogIndex == 2) {
        this.user.college = value;
        console.log(this.user.college);
      } else if (dialogIndex == 3) {
        this.user.major = value;
        console.log(this.user.major);
      } else if (dialogIndex == 4) {
        this.user.email = value;
        console.log(this.user.email);
      } else if (dialogIndex == 5) {
        this.user.blog = value;
        console.log(this.user.blog);
      } else if (dialogIndex == 6) {
        this.user.description = value;
        console.log(this.user.description);
      }
    },
    dialogOpen(index) {
      this.dialogIndex = index;
      if (index == 1) {
        this.$refs.inputDialog.open();
        this.inputDialogValue = this.user.nickname;
      } else if (index == 2) {
        this.$refs.inputDialog2.open();
        this.inputDialogValue2 = this.user.college;
      } else if (index == 3) {
        this.$refs.inputDialog2.open();
        this.inputDialogValue2 = this.user.major;
      } else if (index == 4) {
        this.$refs.inputDialog2.open();
        this.inputDialogValue2 = this.user.email;
      } else if (index == 5) {
        this.$refs.inputDialog2.open();
        this.inputDialogValue2 = this.user.blog;
      } else if (index == 6) {
        this.$refs.inputDialog2.open();
        this.inputDialogValue2 = this.user.description;
      }
    },
    submit() {
      common_vendor.index.navigateBack();
    }
  }
};
if (!Array) {
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  (_easycom_uni_col2 + _easycom_uni_row2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_popup_message2)();
}
const _easycom_uni_col = () => "../../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_row = () => "../../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_message = () => "../../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
if (!Math) {
  (_easycom_uni_col + _easycom_uni_row + _easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_popup_message)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.user.avatar,
    b: common_vendor.p({
      span: 12
    }),
    c: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args)),
    d: common_vendor.p({
      span: 12
    }),
    e: common_vendor.t($data.user.nickname),
    f: common_vendor.o(($event) => $options.dialogOpen(1)),
    g: common_vendor.t($data.user.college),
    h: common_vendor.o(($event) => $options.dialogOpen(2)),
    i: common_vendor.t($data.user.major),
    j: common_vendor.o(($event) => $options.dialogOpen(3)),
    k: common_vendor.t($data.user.email),
    l: common_vendor.o(($event) => $options.dialogOpen(4)),
    m: common_vendor.t($data.user.blog),
    n: common_vendor.o(($event) => $options.dialogOpen(5)),
    o: common_vendor.t($data.user.description),
    p: common_vendor.o(($event) => $options.dialogOpen(6)),
    q: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    r: common_vendor.sr("inputClose", "b8f4279c-5,b8f4279c-4"),
    s: common_vendor.o($options.dialogInputConfirm),
    t: common_vendor.p({
      mode: "input",
      title: "\u8F93\u5165\u5185\u5BB9",
      value: $data.inputDialogValue,
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    }),
    v: common_vendor.sr("inputDialog", "b8f4279c-4"),
    w: common_vendor.p({
      type: "dialog"
    }),
    x: common_vendor.sr("inputClose2", "b8f4279c-7,b8f4279c-6"),
    y: common_vendor.o($options.dialogInputConfirm2),
    z: common_vendor.p({
      mode: "input",
      title: "\u8F93\u5165\u5185\u5BB9",
      value: $data.inputDialogValue2,
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    }),
    A: common_vendor.sr("inputDialog2", "b8f4279c-6"),
    B: common_vendor.p({
      type: "dialog"
    }),
    C: common_vendor.p({
      type: $data.msgType,
      message: $data.messageText,
      duration: 2e3
    }),
    D: common_vendor.sr("message", "b8f4279c-8"),
    E: common_vendor.p({
      type: "message"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/dachuang/uniapp_client/Client/pages/self/self_update/self_update.vue"]]);
wx.createPage(MiniProgramPage);
