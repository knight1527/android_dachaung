var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(callback()).then(() => value), (reason) => promise.resolve(callback()).then(() => {
      throw reason;
    }));
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(shared, vue) {
  "use strict";
  function isDebugMode() {
    return typeof __channelId__ === "string" && __channelId__;
  }
  function jsonStringifyReplacer(k, p) {
    switch (shared.toRawType(p)) {
      case "Function":
        return "function() { [native code] }";
      default:
        return p;
    }
  }
  function normalizeLog(type, filename, args) {
    if (isDebugMode()) {
      args.push(filename.replace("at ", "uni-app:///"));
      return console[type].apply(console, args);
    }
    const msgs = args.map(function(v) {
      const type2 = shared.toTypeString(v).toLowerCase();
      if (["[object object]", "[object array]", "[object module]"].indexOf(type2) !== -1) {
        try {
          v = "---BEGIN:JSON---" + JSON.stringify(v, jsonStringifyReplacer) + "---END:JSON---";
        } catch (e) {
          v = type2;
        }
      } else {
        if (v === null) {
          v = "---NULL---";
        } else if (v === void 0) {
          v = "---UNDEFINED---";
        } else {
          const vType = shared.toRawType(v).toUpperCase();
          if (vType === "NUMBER" || vType === "BOOLEAN") {
            v = "---BEGIN:" + vType + "---" + v + "---END:" + vType + "---";
          } else {
            v = String(v);
          }
        }
      }
      return v;
    });
    return msgs.join("---COMMA---") + " " + filename;
  }
  function formatAppLog(type, filename, ...args) {
    const res = normalizeLog(type, filename, args);
    res && console[type](res);
  }
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const ComponentClass$1 = "uni-col";
  const _sfc_main$z = {
    name: "uniCol",
    props: {
      span: {
        type: Number,
        default: 24
      },
      offset: {
        type: Number,
        default: -1
      },
      pull: {
        type: Number,
        default: -1
      },
      push: {
        type: Number,
        default: -1
      },
      xs: [Number, Object],
      sm: [Number, Object],
      md: [Number, Object],
      lg: [Number, Object],
      xl: [Number, Object]
    },
    data() {
      return {
        gutter: 0,
        sizeClass: "",
        parentWidth: 0,
        nvueWidth: 0,
        marginLeft: 0,
        right: 0,
        left: 0
      };
    },
    created() {
      let parent = this.$parent;
      while (parent && parent.$options.componentName !== "uniRow") {
        parent = parent.$parent;
      }
      this.updateGutter(parent.gutter);
      parent.$watch("gutter", (gutter) => {
        this.updateGutter(gutter);
      });
    },
    computed: {
      sizeList() {
        let {
          span,
          offset,
          pull,
          push
        } = this;
        return {
          span,
          offset,
          pull,
          push
        };
      },
      pointClassList() {
        let classList = [];
        ["xs", "sm", "md", "lg", "xl"].forEach((point) => {
          const props = this[point];
          if (typeof props === "number") {
            classList.push(`${ComponentClass$1}-${point}-${props}`);
          } else if (typeof props === "object" && props) {
            Object.keys(props).forEach((pointProp) => {
              classList.push(pointProp === "span" ? `${ComponentClass$1}-${point}-${props[pointProp]}` : `${ComponentClass$1}-${point}-${pointProp}-${props[pointProp]}`);
            });
          }
        });
        return classList.join(" ");
      }
    },
    methods: {
      updateGutter(parentGutter) {
        parentGutter = Number(parentGutter);
        if (!isNaN(parentGutter)) {
          this.gutter = parentGutter / 2;
        }
      }
    },
    watch: {
      sizeList: {
        immediate: true,
        handler(newVal) {
          let classList = [];
          for (let size in newVal) {
            const curSize = newVal[size];
            if ((curSize || curSize === 0) && curSize !== -1) {
              classList.push(size === "span" ? `${ComponentClass$1}-${curSize}` : `${ComponentClass$1}-${size}-${curSize}`);
            }
          }
          this.sizeClass = classList.join(" ");
        }
      }
    }
  };
  function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["uni-col", $data.sizeClass, $options.pointClassList]),
      style: vue.normalizeStyle({
        paddingLeft: `${Number($data.gutter)}rpx`,
        paddingRight: `${Number($data.gutter)}rpx`
      })
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 6);
  }
  var __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$y], ["__scopeId", "data-v-fff79656"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-row/components/uni-col/uni-col.vue"]]);
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  var icons = {
    "id": "2852637",
    "name": "uniui\u56FE\u6807\u5E93",
    "font_family": "uniicons",
    "css_prefix_text": "uniui-",
    "description": "",
    "glyphs": [
      {
        "icon_id": "25027049",
        "name": "yanse",
        "font_class": "color",
        "unicode": "e6cf",
        "unicode_decimal": 59087
      },
      {
        "icon_id": "25027048",
        "name": "wallet",
        "font_class": "wallet",
        "unicode": "e6b1",
        "unicode_decimal": 59057
      },
      {
        "icon_id": "25015720",
        "name": "settings-filled",
        "font_class": "settings-filled",
        "unicode": "e6ce",
        "unicode_decimal": 59086
      },
      {
        "icon_id": "25015434",
        "name": "shimingrenzheng-filled",
        "font_class": "auth-filled",
        "unicode": "e6cc",
        "unicode_decimal": 59084
      },
      {
        "icon_id": "24934246",
        "name": "shop-filled",
        "font_class": "shop-filled",
        "unicode": "e6cd",
        "unicode_decimal": 59085
      },
      {
        "icon_id": "24934159",
        "name": "staff-filled-01",
        "font_class": "staff-filled",
        "unicode": "e6cb",
        "unicode_decimal": 59083
      },
      {
        "icon_id": "24932461",
        "name": "VIP-filled",
        "font_class": "vip-filled",
        "unicode": "e6c6",
        "unicode_decimal": 59078
      },
      {
        "icon_id": "24932462",
        "name": "plus_circle_fill",
        "font_class": "plus-filled",
        "unicode": "e6c7",
        "unicode_decimal": 59079
      },
      {
        "icon_id": "24932463",
        "name": "folder_add-filled",
        "font_class": "folder-add-filled",
        "unicode": "e6c8",
        "unicode_decimal": 59080
      },
      {
        "icon_id": "24932464",
        "name": "yanse-filled",
        "font_class": "color-filled",
        "unicode": "e6c9",
        "unicode_decimal": 59081
      },
      {
        "icon_id": "24932465",
        "name": "tune-filled",
        "font_class": "tune-filled",
        "unicode": "e6ca",
        "unicode_decimal": 59082
      },
      {
        "icon_id": "24932455",
        "name": "a-rilidaka-filled",
        "font_class": "calendar-filled",
        "unicode": "e6c0",
        "unicode_decimal": 59072
      },
      {
        "icon_id": "24932456",
        "name": "notification-filled",
        "font_class": "notification-filled",
        "unicode": "e6c1",
        "unicode_decimal": 59073
      },
      {
        "icon_id": "24932457",
        "name": "wallet-filled",
        "font_class": "wallet-filled",
        "unicode": "e6c2",
        "unicode_decimal": 59074
      },
      {
        "icon_id": "24932458",
        "name": "paihangbang-filled",
        "font_class": "medal-filled",
        "unicode": "e6c3",
        "unicode_decimal": 59075
      },
      {
        "icon_id": "24932459",
        "name": "gift-filled",
        "font_class": "gift-filled",
        "unicode": "e6c4",
        "unicode_decimal": 59076
      },
      {
        "icon_id": "24932460",
        "name": "fire-filled",
        "font_class": "fire-filled",
        "unicode": "e6c5",
        "unicode_decimal": 59077
      },
      {
        "icon_id": "24928001",
        "name": "refreshempty",
        "font_class": "refreshempty",
        "unicode": "e6bf",
        "unicode_decimal": 59071
      },
      {
        "icon_id": "24926853",
        "name": "location-ellipse",
        "font_class": "location-filled",
        "unicode": "e6af",
        "unicode_decimal": 59055
      },
      {
        "icon_id": "24926735",
        "name": "person-filled",
        "font_class": "person-filled",
        "unicode": "e69d",
        "unicode_decimal": 59037
      },
      {
        "icon_id": "24926703",
        "name": "personadd-filled",
        "font_class": "personadd-filled",
        "unicode": "e698",
        "unicode_decimal": 59032
      },
      {
        "icon_id": "24923351",
        "name": "back",
        "font_class": "back",
        "unicode": "e6b9",
        "unicode_decimal": 59065
      },
      {
        "icon_id": "24923352",
        "name": "forward",
        "font_class": "forward",
        "unicode": "e6ba",
        "unicode_decimal": 59066
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrow-right",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrowthinright",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrow-left",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrowthinleft",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrow-up",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrowthinup",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrow-down",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrowthindown",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "bottom",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "arrowdown",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "right",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "arrowright",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "top",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "arrowup",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "left",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "arrowleft",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923334",
        "name": "eye",
        "font_class": "eye",
        "unicode": "e651",
        "unicode_decimal": 58961
      },
      {
        "icon_id": "24923335",
        "name": "eye-filled",
        "font_class": "eye-filled",
        "unicode": "e66a",
        "unicode_decimal": 58986
      },
      {
        "icon_id": "24923336",
        "name": "eye-slash",
        "font_class": "eye-slash",
        "unicode": "e6b3",
        "unicode_decimal": 59059
      },
      {
        "icon_id": "24923337",
        "name": "eye-slash-filled",
        "font_class": "eye-slash-filled",
        "unicode": "e6b4",
        "unicode_decimal": 59060
      },
      {
        "icon_id": "24923305",
        "name": "info-filled",
        "font_class": "info-filled",
        "unicode": "e649",
        "unicode_decimal": 58953
      },
      {
        "icon_id": "24923299",
        "name": "reload-01",
        "font_class": "reload",
        "unicode": "e6b2",
        "unicode_decimal": 59058
      },
      {
        "icon_id": "24923195",
        "name": "mic_slash_fill",
        "font_class": "micoff-filled",
        "unicode": "e6b0",
        "unicode_decimal": 59056
      },
      {
        "icon_id": "24923165",
        "name": "map-pin-ellipse",
        "font_class": "map-pin-ellipse",
        "unicode": "e6ac",
        "unicode_decimal": 59052
      },
      {
        "icon_id": "24923166",
        "name": "map-pin",
        "font_class": "map-pin",
        "unicode": "e6ad",
        "unicode_decimal": 59053
      },
      {
        "icon_id": "24923167",
        "name": "location",
        "font_class": "location",
        "unicode": "e6ae",
        "unicode_decimal": 59054
      },
      {
        "icon_id": "24923064",
        "name": "starhalf",
        "font_class": "starhalf",
        "unicode": "e683",
        "unicode_decimal": 59011
      },
      {
        "icon_id": "24923065",
        "name": "star",
        "font_class": "star",
        "unicode": "e688",
        "unicode_decimal": 59016
      },
      {
        "icon_id": "24923066",
        "name": "star-filled",
        "font_class": "star-filled",
        "unicode": "e68f",
        "unicode_decimal": 59023
      },
      {
        "icon_id": "24899646",
        "name": "a-rilidaka",
        "font_class": "calendar",
        "unicode": "e6a0",
        "unicode_decimal": 59040
      },
      {
        "icon_id": "24899647",
        "name": "fire",
        "font_class": "fire",
        "unicode": "e6a1",
        "unicode_decimal": 59041
      },
      {
        "icon_id": "24899648",
        "name": "paihangbang",
        "font_class": "medal",
        "unicode": "e6a2",
        "unicode_decimal": 59042
      },
      {
        "icon_id": "24899649",
        "name": "font",
        "font_class": "font",
        "unicode": "e6a3",
        "unicode_decimal": 59043
      },
      {
        "icon_id": "24899650",
        "name": "gift",
        "font_class": "gift",
        "unicode": "e6a4",
        "unicode_decimal": 59044
      },
      {
        "icon_id": "24899651",
        "name": "link",
        "font_class": "link",
        "unicode": "e6a5",
        "unicode_decimal": 59045
      },
      {
        "icon_id": "24899652",
        "name": "notification",
        "font_class": "notification",
        "unicode": "e6a6",
        "unicode_decimal": 59046
      },
      {
        "icon_id": "24899653",
        "name": "staff",
        "font_class": "staff",
        "unicode": "e6a7",
        "unicode_decimal": 59047
      },
      {
        "icon_id": "24899654",
        "name": "VIP",
        "font_class": "vip",
        "unicode": "e6a8",
        "unicode_decimal": 59048
      },
      {
        "icon_id": "24899655",
        "name": "folder_add",
        "font_class": "folder-add",
        "unicode": "e6a9",
        "unicode_decimal": 59049
      },
      {
        "icon_id": "24899656",
        "name": "tune",
        "font_class": "tune",
        "unicode": "e6aa",
        "unicode_decimal": 59050
      },
      {
        "icon_id": "24899657",
        "name": "shimingrenzheng",
        "font_class": "auth",
        "unicode": "e6ab",
        "unicode_decimal": 59051
      },
      {
        "icon_id": "24899565",
        "name": "person",
        "font_class": "person",
        "unicode": "e699",
        "unicode_decimal": 59033
      },
      {
        "icon_id": "24899566",
        "name": "email-filled",
        "font_class": "email-filled",
        "unicode": "e69a",
        "unicode_decimal": 59034
      },
      {
        "icon_id": "24899567",
        "name": "phone-filled",
        "font_class": "phone-filled",
        "unicode": "e69b",
        "unicode_decimal": 59035
      },
      {
        "icon_id": "24899568",
        "name": "phone",
        "font_class": "phone",
        "unicode": "e69c",
        "unicode_decimal": 59036
      },
      {
        "icon_id": "24899570",
        "name": "email",
        "font_class": "email",
        "unicode": "e69e",
        "unicode_decimal": 59038
      },
      {
        "icon_id": "24899571",
        "name": "personadd",
        "font_class": "personadd",
        "unicode": "e69f",
        "unicode_decimal": 59039
      },
      {
        "icon_id": "24899558",
        "name": "chatboxes-filled",
        "font_class": "chatboxes-filled",
        "unicode": "e692",
        "unicode_decimal": 59026
      },
      {
        "icon_id": "24899559",
        "name": "contact",
        "font_class": "contact",
        "unicode": "e693",
        "unicode_decimal": 59027
      },
      {
        "icon_id": "24899560",
        "name": "chatbubble-filled",
        "font_class": "chatbubble-filled",
        "unicode": "e694",
        "unicode_decimal": 59028
      },
      {
        "icon_id": "24899561",
        "name": "contact-filled",
        "font_class": "contact-filled",
        "unicode": "e695",
        "unicode_decimal": 59029
      },
      {
        "icon_id": "24899562",
        "name": "chatboxes",
        "font_class": "chatboxes",
        "unicode": "e696",
        "unicode_decimal": 59030
      },
      {
        "icon_id": "24899563",
        "name": "chatbubble",
        "font_class": "chatbubble",
        "unicode": "e697",
        "unicode_decimal": 59031
      },
      {
        "icon_id": "24881290",
        "name": "upload-filled",
        "font_class": "upload-filled",
        "unicode": "e68e",
        "unicode_decimal": 59022
      },
      {
        "icon_id": "24881292",
        "name": "upload",
        "font_class": "upload",
        "unicode": "e690",
        "unicode_decimal": 59024
      },
      {
        "icon_id": "24881293",
        "name": "weixin",
        "font_class": "weixin",
        "unicode": "e691",
        "unicode_decimal": 59025
      },
      {
        "icon_id": "24881274",
        "name": "compose",
        "font_class": "compose",
        "unicode": "e67f",
        "unicode_decimal": 59007
      },
      {
        "icon_id": "24881275",
        "name": "qq",
        "font_class": "qq",
        "unicode": "e680",
        "unicode_decimal": 59008
      },
      {
        "icon_id": "24881276",
        "name": "download-filled",
        "font_class": "download-filled",
        "unicode": "e681",
        "unicode_decimal": 59009
      },
      {
        "icon_id": "24881277",
        "name": "pengyouquan",
        "font_class": "pyq",
        "unicode": "e682",
        "unicode_decimal": 59010
      },
      {
        "icon_id": "24881279",
        "name": "sound",
        "font_class": "sound",
        "unicode": "e684",
        "unicode_decimal": 59012
      },
      {
        "icon_id": "24881280",
        "name": "trash-filled",
        "font_class": "trash-filled",
        "unicode": "e685",
        "unicode_decimal": 59013
      },
      {
        "icon_id": "24881281",
        "name": "sound-filled",
        "font_class": "sound-filled",
        "unicode": "e686",
        "unicode_decimal": 59014
      },
      {
        "icon_id": "24881282",
        "name": "trash",
        "font_class": "trash",
        "unicode": "e687",
        "unicode_decimal": 59015
      },
      {
        "icon_id": "24881284",
        "name": "videocam-filled",
        "font_class": "videocam-filled",
        "unicode": "e689",
        "unicode_decimal": 59017
      },
      {
        "icon_id": "24881285",
        "name": "spinner-cycle",
        "font_class": "spinner-cycle",
        "unicode": "e68a",
        "unicode_decimal": 59018
      },
      {
        "icon_id": "24881286",
        "name": "weibo",
        "font_class": "weibo",
        "unicode": "e68b",
        "unicode_decimal": 59019
      },
      {
        "icon_id": "24881288",
        "name": "videocam",
        "font_class": "videocam",
        "unicode": "e68c",
        "unicode_decimal": 59020
      },
      {
        "icon_id": "24881289",
        "name": "download",
        "font_class": "download",
        "unicode": "e68d",
        "unicode_decimal": 59021
      },
      {
        "icon_id": "24879601",
        "name": "help",
        "font_class": "help",
        "unicode": "e679",
        "unicode_decimal": 59001
      },
      {
        "icon_id": "24879602",
        "name": "navigate-filled",
        "font_class": "navigate-filled",
        "unicode": "e67a",
        "unicode_decimal": 59002
      },
      {
        "icon_id": "24879603",
        "name": "plusempty",
        "font_class": "plusempty",
        "unicode": "e67b",
        "unicode_decimal": 59003
      },
      {
        "icon_id": "24879604",
        "name": "smallcircle",
        "font_class": "smallcircle",
        "unicode": "e67c",
        "unicode_decimal": 59004
      },
      {
        "icon_id": "24879605",
        "name": "minus-filled",
        "font_class": "minus-filled",
        "unicode": "e67d",
        "unicode_decimal": 59005
      },
      {
        "icon_id": "24879606",
        "name": "micoff",
        "font_class": "micoff",
        "unicode": "e67e",
        "unicode_decimal": 59006
      },
      {
        "icon_id": "24879588",
        "name": "closeempty",
        "font_class": "closeempty",
        "unicode": "e66c",
        "unicode_decimal": 58988
      },
      {
        "icon_id": "24879589",
        "name": "clear",
        "font_class": "clear",
        "unicode": "e66d",
        "unicode_decimal": 58989
      },
      {
        "icon_id": "24879590",
        "name": "navigate",
        "font_class": "navigate",
        "unicode": "e66e",
        "unicode_decimal": 58990
      },
      {
        "icon_id": "24879591",
        "name": "minus",
        "font_class": "minus",
        "unicode": "e66f",
        "unicode_decimal": 58991
      },
      {
        "icon_id": "24879592",
        "name": "image",
        "font_class": "image",
        "unicode": "e670",
        "unicode_decimal": 58992
      },
      {
        "icon_id": "24879593",
        "name": "mic",
        "font_class": "mic",
        "unicode": "e671",
        "unicode_decimal": 58993
      },
      {
        "icon_id": "24879594",
        "name": "paperplane",
        "font_class": "paperplane",
        "unicode": "e672",
        "unicode_decimal": 58994
      },
      {
        "icon_id": "24879595",
        "name": "close",
        "font_class": "close",
        "unicode": "e673",
        "unicode_decimal": 58995
      },
      {
        "icon_id": "24879596",
        "name": "help-filled",
        "font_class": "help-filled",
        "unicode": "e674",
        "unicode_decimal": 58996
      },
      {
        "icon_id": "24879597",
        "name": "plus-filled",
        "font_class": "paperplane-filled",
        "unicode": "e675",
        "unicode_decimal": 58997
      },
      {
        "icon_id": "24879598",
        "name": "plus",
        "font_class": "plus",
        "unicode": "e676",
        "unicode_decimal": 58998
      },
      {
        "icon_id": "24879599",
        "name": "mic-filled",
        "font_class": "mic-filled",
        "unicode": "e677",
        "unicode_decimal": 58999
      },
      {
        "icon_id": "24879600",
        "name": "image-filled",
        "font_class": "image-filled",
        "unicode": "e678",
        "unicode_decimal": 59e3
      },
      {
        "icon_id": "24855900",
        "name": "locked-filled",
        "font_class": "locked-filled",
        "unicode": "e668",
        "unicode_decimal": 58984
      },
      {
        "icon_id": "24855901",
        "name": "info",
        "font_class": "info",
        "unicode": "e669",
        "unicode_decimal": 58985
      },
      {
        "icon_id": "24855903",
        "name": "locked",
        "font_class": "locked",
        "unicode": "e66b",
        "unicode_decimal": 58987
      },
      {
        "icon_id": "24855884",
        "name": "camera-filled",
        "font_class": "camera-filled",
        "unicode": "e658",
        "unicode_decimal": 58968
      },
      {
        "icon_id": "24855885",
        "name": "chat-filled",
        "font_class": "chat-filled",
        "unicode": "e659",
        "unicode_decimal": 58969
      },
      {
        "icon_id": "24855886",
        "name": "camera",
        "font_class": "camera",
        "unicode": "e65a",
        "unicode_decimal": 58970
      },
      {
        "icon_id": "24855887",
        "name": "circle",
        "font_class": "circle",
        "unicode": "e65b",
        "unicode_decimal": 58971
      },
      {
        "icon_id": "24855888",
        "name": "checkmarkempty",
        "font_class": "checkmarkempty",
        "unicode": "e65c",
        "unicode_decimal": 58972
      },
      {
        "icon_id": "24855889",
        "name": "chat",
        "font_class": "chat",
        "unicode": "e65d",
        "unicode_decimal": 58973
      },
      {
        "icon_id": "24855890",
        "name": "circle-filled",
        "font_class": "circle-filled",
        "unicode": "e65e",
        "unicode_decimal": 58974
      },
      {
        "icon_id": "24855891",
        "name": "flag",
        "font_class": "flag",
        "unicode": "e65f",
        "unicode_decimal": 58975
      },
      {
        "icon_id": "24855892",
        "name": "flag-filled",
        "font_class": "flag-filled",
        "unicode": "e660",
        "unicode_decimal": 58976
      },
      {
        "icon_id": "24855893",
        "name": "gear-filled",
        "font_class": "gear-filled",
        "unicode": "e661",
        "unicode_decimal": 58977
      },
      {
        "icon_id": "24855894",
        "name": "home",
        "font_class": "home",
        "unicode": "e662",
        "unicode_decimal": 58978
      },
      {
        "icon_id": "24855895",
        "name": "home-filled",
        "font_class": "home-filled",
        "unicode": "e663",
        "unicode_decimal": 58979
      },
      {
        "icon_id": "24855896",
        "name": "gear",
        "font_class": "gear",
        "unicode": "e664",
        "unicode_decimal": 58980
      },
      {
        "icon_id": "24855897",
        "name": "smallcircle-filled",
        "font_class": "smallcircle-filled",
        "unicode": "e665",
        "unicode_decimal": 58981
      },
      {
        "icon_id": "24855898",
        "name": "map-filled",
        "font_class": "map-filled",
        "unicode": "e666",
        "unicode_decimal": 58982
      },
      {
        "icon_id": "24855899",
        "name": "map",
        "font_class": "map",
        "unicode": "e667",
        "unicode_decimal": 58983
      },
      {
        "icon_id": "24855825",
        "name": "refresh-filled",
        "font_class": "refresh-filled",
        "unicode": "e656",
        "unicode_decimal": 58966
      },
      {
        "icon_id": "24855826",
        "name": "refresh",
        "font_class": "refresh",
        "unicode": "e657",
        "unicode_decimal": 58967
      },
      {
        "icon_id": "24855808",
        "name": "cloud-upload",
        "font_class": "cloud-upload",
        "unicode": "e645",
        "unicode_decimal": 58949
      },
      {
        "icon_id": "24855809",
        "name": "cloud-download-filled",
        "font_class": "cloud-download-filled",
        "unicode": "e646",
        "unicode_decimal": 58950
      },
      {
        "icon_id": "24855810",
        "name": "cloud-download",
        "font_class": "cloud-download",
        "unicode": "e647",
        "unicode_decimal": 58951
      },
      {
        "icon_id": "24855811",
        "name": "cloud-upload-filled",
        "font_class": "cloud-upload-filled",
        "unicode": "e648",
        "unicode_decimal": 58952
      },
      {
        "icon_id": "24855813",
        "name": "redo",
        "font_class": "redo",
        "unicode": "e64a",
        "unicode_decimal": 58954
      },
      {
        "icon_id": "24855814",
        "name": "images-filled",
        "font_class": "images-filled",
        "unicode": "e64b",
        "unicode_decimal": 58955
      },
      {
        "icon_id": "24855815",
        "name": "undo-filled",
        "font_class": "undo-filled",
        "unicode": "e64c",
        "unicode_decimal": 58956
      },
      {
        "icon_id": "24855816",
        "name": "more",
        "font_class": "more",
        "unicode": "e64d",
        "unicode_decimal": 58957
      },
      {
        "icon_id": "24855817",
        "name": "more-filled",
        "font_class": "more-filled",
        "unicode": "e64e",
        "unicode_decimal": 58958
      },
      {
        "icon_id": "24855818",
        "name": "undo",
        "font_class": "undo",
        "unicode": "e64f",
        "unicode_decimal": 58959
      },
      {
        "icon_id": "24855819",
        "name": "images",
        "font_class": "images",
        "unicode": "e650",
        "unicode_decimal": 58960
      },
      {
        "icon_id": "24855821",
        "name": "paperclip",
        "font_class": "paperclip",
        "unicode": "e652",
        "unicode_decimal": 58962
      },
      {
        "icon_id": "24855822",
        "name": "settings",
        "font_class": "settings",
        "unicode": "e653",
        "unicode_decimal": 58963
      },
      {
        "icon_id": "24855823",
        "name": "search",
        "font_class": "search",
        "unicode": "e654",
        "unicode_decimal": 58964
      },
      {
        "icon_id": "24855824",
        "name": "redo-filled",
        "font_class": "redo-filled",
        "unicode": "e655",
        "unicode_decimal": 58965
      },
      {
        "icon_id": "24841702",
        "name": "list",
        "font_class": "list",
        "unicode": "e644",
        "unicode_decimal": 58948
      },
      {
        "icon_id": "24841489",
        "name": "mail-open-filled",
        "font_class": "mail-open-filled",
        "unicode": "e63a",
        "unicode_decimal": 58938
      },
      {
        "icon_id": "24841491",
        "name": "hand-thumbsdown-filled",
        "font_class": "hand-down-filled",
        "unicode": "e63c",
        "unicode_decimal": 58940
      },
      {
        "icon_id": "24841492",
        "name": "hand-thumbsdown",
        "font_class": "hand-down",
        "unicode": "e63d",
        "unicode_decimal": 58941
      },
      {
        "icon_id": "24841493",
        "name": "hand-thumbsup-filled",
        "font_class": "hand-up-filled",
        "unicode": "e63e",
        "unicode_decimal": 58942
      },
      {
        "icon_id": "24841494",
        "name": "hand-thumbsup",
        "font_class": "hand-up",
        "unicode": "e63f",
        "unicode_decimal": 58943
      },
      {
        "icon_id": "24841496",
        "name": "heart-filled",
        "font_class": "heart-filled",
        "unicode": "e641",
        "unicode_decimal": 58945
      },
      {
        "icon_id": "24841498",
        "name": "mail-open",
        "font_class": "mail-open",
        "unicode": "e643",
        "unicode_decimal": 58947
      },
      {
        "icon_id": "24841488",
        "name": "heart",
        "font_class": "heart",
        "unicode": "e639",
        "unicode_decimal": 58937
      },
      {
        "icon_id": "24839963",
        "name": "loop",
        "font_class": "loop",
        "unicode": "e633",
        "unicode_decimal": 58931
      },
      {
        "icon_id": "24839866",
        "name": "pulldown",
        "font_class": "pulldown",
        "unicode": "e632",
        "unicode_decimal": 58930
      },
      {
        "icon_id": "24813798",
        "name": "scan",
        "font_class": "scan",
        "unicode": "e62a",
        "unicode_decimal": 58922
      },
      {
        "icon_id": "24813786",
        "name": "bars",
        "font_class": "bars",
        "unicode": "e627",
        "unicode_decimal": 58919
      },
      {
        "icon_id": "24813788",
        "name": "cart-filled",
        "font_class": "cart-filled",
        "unicode": "e629",
        "unicode_decimal": 58921
      },
      {
        "icon_id": "24813790",
        "name": "checkbox",
        "font_class": "checkbox",
        "unicode": "e62b",
        "unicode_decimal": 58923
      },
      {
        "icon_id": "24813791",
        "name": "checkbox-filled",
        "font_class": "checkbox-filled",
        "unicode": "e62c",
        "unicode_decimal": 58924
      },
      {
        "icon_id": "24813794",
        "name": "shop",
        "font_class": "shop",
        "unicode": "e62f",
        "unicode_decimal": 58927
      },
      {
        "icon_id": "24813795",
        "name": "headphones",
        "font_class": "headphones",
        "unicode": "e630",
        "unicode_decimal": 58928
      },
      {
        "icon_id": "24813796",
        "name": "cart",
        "font_class": "cart",
        "unicode": "e631",
        "unicode_decimal": 58929
      }
    ]
  };
  const getVal$1 = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$y = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: icons.glyphs
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v) => v.font_class === this.type);
        if (code) {
          return unescape(`%u${code.unicode}`);
        }
        return "";
      },
      iconSize() {
        return getVal$1(this.size);
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("text", {
      style: vue.normalizeStyle({ color: $props.color, "font-size": $options.iconSize }),
      class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
      onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
    }, null, 6);
  }
  var __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$x], ["__scopeId", "data-v-a2e81f6e"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  function obj2strClass(obj) {
    let classess = "";
    for (let key in obj) {
      const val = obj[key];
      if (val) {
        classess += `${key} `;
      }
    }
    return classess;
  }
  function obj2strStyle(obj) {
    let style = "";
    for (let key in obj) {
      const val = obj[key];
      style += `${key}:${val};`;
    }
    return style;
  }
  const _sfc_main$x = {
    name: "uni-easyinput",
    emits: ["click", "iconClick", "update:modelValue", "input", "focus", "blur", "confirm", "clear", "eyes", "change"],
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    options: {
      virtualHost: true
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      },
      formItem: {
        from: "uniFormItem",
        default: null
      }
    },
    props: {
      name: String,
      value: [Number, String],
      modelValue: [Number, String],
      type: {
        type: String,
        default: "text"
      },
      clearable: {
        type: Boolean,
        default: true
      },
      autoHeight: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: " "
      },
      placeholderStyle: String,
      focus: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      confirmType: {
        type: String,
        default: "done"
      },
      clearSize: {
        type: [Number, String],
        default: 24
      },
      inputBorder: {
        type: Boolean,
        default: true
      },
      prefixIcon: {
        type: String,
        default: ""
      },
      suffixIcon: {
        type: String,
        default: ""
      },
      trim: {
        type: [Boolean, String],
        default: true
      },
      passwordIcon: {
        type: Boolean,
        default: true
      },
      primaryColor: {
        type: String,
        default: "#2979ff"
      },
      styles: {
        type: Object,
        default() {
          return {
            color: "#333",
            backgroundColor: "#fff",
            disableColor: "#F7F6F6",
            borderColor: "#e5e5e5"
          };
        }
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      }
    },
    data() {
      return {
        focused: false,
        val: "",
        showMsg: "",
        border: false,
        isFirstBorder: false,
        showClearIcon: false,
        showPassword: false,
        focusShow: false,
        localMsg: "",
        isEnter: false
      };
    },
    computed: {
      isVal() {
        const val = this.val;
        if (val || val === 0) {
          return true;
        }
        return false;
      },
      msg() {
        return this.localMsg || this.errorMessage;
      },
      inputMaxlength() {
        return Number(this.maxlength);
      },
      boxStyle() {
        return `color:${this.inputBorder && this.msg ? "#e43d33" : this.styles.color};`;
      },
      inputContentClass() {
        return obj2strClass({
          "is-input-border": this.inputBorder,
          "is-input-error-border": this.inputBorder && this.msg,
          "is-textarea": this.type === "textarea",
          "is-disabled": this.disabled,
          "is-focused": this.focusShow
        });
      },
      inputContentStyle() {
        const focusColor = this.focusShow ? this.primaryColor : this.styles.borderColor;
        const borderColor = this.inputBorder && this.msg ? "#dd524d" : focusColor;
        return obj2strStyle({
          "border-color": borderColor || "#e5e5e5",
          "background-color": this.disabled ? this.styles.disableColor : this.styles.backgroundColor
        });
      },
      inputStyle() {
        const paddingRight = this.type === "password" || this.clearable || this.prefixIcon ? "" : "10px";
        return obj2strStyle({
          "padding-right": paddingRight,
          "padding-left": this.prefixIcon ? "" : "10px"
        });
      }
    },
    watch: {
      value(newVal) {
        this.val = newVal;
      },
      modelValue(newVal) {
        this.val = newVal;
      },
      focus(newVal) {
        this.$nextTick(() => {
          this.focused = this.focus;
          this.focusShow = this.focus;
        });
      }
    },
    created() {
      this.init();
      if (this.form && this.formItem) {
        this.$watch("formItem.errMsg", (newVal) => {
          this.localMsg = newVal;
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.focused = this.focus;
        this.focusShow = this.focus;
      });
    },
    methods: {
      init() {
        if (this.value || this.value === 0) {
          this.val = this.value;
        } else if (this.modelValue || this.modelValue === 0 || this.modelValue === "") {
          this.val = this.modelValue;
        } else {
          this.val = null;
        }
      },
      onClickIcon(type) {
        this.$emit("iconClick", type);
      },
      onEyes() {
        this.showPassword = !this.showPassword;
        this.$emit("eyes", this.showPassword);
      },
      onInput(event) {
        let value = event.detail.value;
        if (this.trim) {
          if (typeof this.trim === "boolean" && this.trim) {
            value = this.trimStr(value);
          }
          if (typeof this.trim === "string") {
            value = this.trimStr(value, this.trim);
          }
        }
        if (this.errMsg)
          this.errMsg = "";
        this.val = value;
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
      },
      onFocus() {
        this.$nextTick(() => {
          this.focused = true;
        });
        this.$emit("focus", null);
      },
      _Focus(event) {
        this.focusShow = true;
        this.$emit("focus", event);
      },
      onBlur() {
        this.focused = false;
        this.$emit("focus", null);
      },
      _Blur(event) {
        event.detail.value;
        this.focusShow = false;
        this.$emit("blur", event);
        if (this.isEnter === false) {
          this.$emit("change", this.val);
        }
        if (this.form && this.formItem) {
          const { validateTrigger } = this.form;
          if (validateTrigger === "blur") {
            this.formItem.onFieldChange();
          }
        }
      },
      onConfirm(e) {
        this.$emit("confirm", this.val);
        this.isEnter = true;
        this.$emit("change", this.val);
        this.$nextTick(() => {
          this.isEnter = false;
        });
      },
      onClear(event) {
        this.val = "";
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
        this.$emit("clear");
      },
      onkeyboardheightchange(event) {
        this.$emit("keyboardheightchange", event);
      },
      trimStr(str, pos = "both") {
        if (pos === "both") {
          return str.trim();
        } else if (pos === "left") {
          return str.trimLeft();
        } else if (pos === "right") {
          return str.trimRight();
        } else if (pos === "start") {
          return str.trimStart();
        } else if (pos === "end") {
          return str.trimEnd();
        } else if (pos === "all") {
          return str.replace(/\s+/g, "");
        } else if (pos === "none") {
          return str;
        }
        return str;
      }
    }
  };
  function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["uni-easyinput", { "uni-easyinput-error": $options.msg }]),
      style: vue.normalizeStyle($options.boxStyle)
    }, [
      vue.createElementVNode("view", {
        class: vue.normalizeClass(["uni-easyinput__content", $options.inputContentClass]),
        style: vue.normalizeStyle($options.inputContentStyle)
      }, [
        $props.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
          key: 0,
          class: "content-clear-icon",
          type: $props.prefixIcon,
          color: "#c0c4cc",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onClickIcon("prefix")),
          size: "22"
        }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true),
        $props.type === "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
          key: 1,
          class: vue.normalizeClass(["uni-easyinput__content-textarea", { "input-padding": $props.inputBorder }]),
          name: $props.name,
          value: $data.val,
          placeholder: $props.placeholder,
          placeholderStyle: $props.placeholderStyle,
          disabled: $props.disabled,
          "placeholder-class": "uni-easyinput__placeholder-class",
          maxlength: $options.inputMaxlength,
          focus: $data.focused,
          autoHeight: $props.autoHeight,
          onInput: _cache[1] || (_cache[1] = (...args) => $options.onInput && $options.onInput(...args)),
          onBlur: _cache[2] || (_cache[2] = (...args) => $options._Blur && $options._Blur(...args)),
          onFocus: _cache[3] || (_cache[3] = (...args) => $options._Focus && $options._Focus(...args)),
          onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
          onKeyboardheightchange: _cache[5] || (_cache[5] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
        }, null, 42, ["name", "value", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "autoHeight"])) : (vue.openBlock(), vue.createElementBlock("input", {
          key: 2,
          type: $props.type === "password" ? "text" : $props.type,
          class: "uni-easyinput__content-input",
          style: vue.normalizeStyle($options.inputStyle),
          name: $props.name,
          value: $data.val,
          password: !$data.showPassword && $props.type === "password",
          placeholder: $props.placeholder,
          placeholderStyle: $props.placeholderStyle,
          "placeholder-class": "uni-easyinput__placeholder-class",
          disabled: $props.disabled,
          maxlength: $options.inputMaxlength,
          focus: $data.focused,
          confirmType: $props.confirmType,
          onFocus: _cache[6] || (_cache[6] = (...args) => $options._Focus && $options._Focus(...args)),
          onBlur: _cache[7] || (_cache[7] = (...args) => $options._Blur && $options._Blur(...args)),
          onInput: _cache[8] || (_cache[8] = (...args) => $options.onInput && $options.onInput(...args)),
          onConfirm: _cache[9] || (_cache[9] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
          onKeyboardheightchange: _cache[10] || (_cache[10] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
        }, null, 44, ["type", "name", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType"])),
        $props.type === "password" && $props.passwordIcon ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 3 }, [
          vue.createCommentVNode(" \u5F00\u542F\u5BC6\u7801\u65F6\u663E\u793A\u5C0F\u773C\u775B "),
          $options.isVal ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
            key: 0,
            class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
            type: $data.showPassword ? "eye-slash-filled" : "eye-filled",
            size: 22,
            color: $data.focusShow ? $props.primaryColor : "#c0c4cc",
            onClick: $options.onEyes
          }, null, 8, ["class", "type", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
        ], 64)) : $props.suffixIcon ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 4 }, [
          $props.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
            key: 0,
            class: "content-clear-icon",
            type: $props.suffixIcon,
            color: "#c0c4cc",
            onClick: _cache[11] || (_cache[11] = ($event) => $options.onClickIcon("suffix")),
            size: "22"
          }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true)
        ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 5 }, [
          $props.clearable && $options.isVal && !$props.disabled && $props.type !== "textarea" ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
            key: 0,
            class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
            type: "clear",
            size: $props.clearSize,
            color: $options.msg ? "#dd524d" : $data.focusShow ? $props.primaryColor : "#c0c4cc",
            onClick: $options.onClear
          }, null, 8, ["class", "size", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
        ], 64)),
        vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
      ], 6)
    ], 6);
  }
  var __easycom_2$4 = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$w], ["__scopeId", "data-v-abe12412"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"]]);
  const ComponentClass = "uni-row";
  const modifierSeparator = "--";
  const _sfc_main$w = {
    name: "uniRow",
    componentName: "uniRow",
    props: {
      type: String,
      gutter: Number,
      justify: {
        type: String,
        default: "start"
      },
      align: {
        type: String,
        default: "top"
      },
      width: {
        type: [String, Number],
        default: 750
      }
    },
    created() {
    },
    computed: {
      marginValue() {
        if (this.gutter) {
          return -(this.gutter / 2);
        }
        return 0;
      },
      typeClass() {
        return this.type === "flex" ? `${ComponentClass + modifierSeparator}flex` : "";
      },
      justifyClass() {
        return this.justify !== "start" ? `${ComponentClass + modifierSeparator}flex-justify-${this.justify}` : "";
      },
      alignClass() {
        return this.align !== "top" ? `${ComponentClass + modifierSeparator}flex-align-${this.align}` : "";
      }
    }
  };
  function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["uni-row", $options.typeClass, $options.justifyClass, $options.alignClass]),
      style: vue.normalizeStyle({
        marginLeft: `${Number($options.marginValue)}rpx`,
        marginRight: `${Number($options.marginValue)}rpx`
      })
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 6);
  }
  var __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$v], ["__scopeId", "data-v-1d993189"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-row/components/uni-row/uni-row.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation(options);
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, __spreadValues({
          styles
        }, config), (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$v = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      stylesObject() {
        let styles = __spreadProps(__spreadValues({}, this.styles), {
          "transition-duration": this.duration / 1e3 + "s"
        });
        let transform = "";
        for (let i in styles) {
          let line = this.toLine(i);
          transform += line + ":" + styles[i] + ";";
        }
        return transform;
      },
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i in obj) {
          try {
            if (typeof obj[i] === "object") {
              this.animation[i](...obj[i]);
            } else {
              this.animation[i](obj[i]);
            }
          } catch (e) {
            formatAppLog("error", "at uni_modules/uni-transition/components/uni-transition/uni-transition.vue:139", `\u65B9\u6CD5 ${i} \u4E0D\u5B58\u5728`);
          }
        }
        this.animation.step(config);
        return this;
      },
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 1 : 0,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.isShow ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])) : vue.createCommentVNode("v-if", true);
  }
  var __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$u], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$u = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      animation: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: "center"
      },
      isMaskClick: {
        type: Boolean,
        default: null
      },
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      }
    },
    watch: {
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: this.isDesktop ? "fixforpc-top" : "top"
      };
    },
    computed: {
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    unmounted() {
      this.setH5Visible();
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible() {
      },
      closeMask() {
        this.maskShow = false;
      },
      disableMask() {
        this.mkclick = false;
      },
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          clearTimeout(this.timer);
          this.showPopup = false;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:280", "\u7F3A\u5C11\u7C7B\u578B\uFF1A", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_3$1);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
    }, [
      vue.createElementVNode("view", {
        onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
      }, [
        $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
          key: "1",
          name: "mask",
          "mode-class": "fade",
          styles: $data.maskClass,
          duration: $data.duration,
          show: $data.showTrans,
          onClick: $options.onTap
        }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
        vue.createVNode(_component_uni_transition, {
          key: "2",
          "mode-class": $data.ani,
          name: "content",
          styles: $data.transClass,
          duration: $data.duration,
          show: $data.showTrans,
          onClick: $options.onTap
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
              style: vue.normalizeStyle({ backgroundColor: $options.bg }),
              onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
            }, [
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ], 6)
          ]),
          _: 3
        }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
      ], 32)
    ], 2)) : vue.createCommentVNode("v-if", true);
  }
  var __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$t], ["__scopeId", "data-v-7c43d41b"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
  const isObject = (val) => val !== null && typeof val === "object";
  const defaultDelimiters = ["{", "}"];
  class BaseFormatter {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message, values, delimiters = defaultDelimiters) {
      if (!values) {
        return [message];
      }
      let tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format.length) {
      let char = format[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format[position++];
        }
        const isClosed = char === endDelimiter;
        const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type });
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index < tokens.length) {
      const token = tokens[index];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode === "named") {
            compiled.push(values[token.value]);
          } else {
            {
              console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
            }
          }
          break;
        case "unknown":
          {
            console.warn(`Detect 'unknown' type of token!`);
          }
          break;
      }
      index++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages2) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages2 && messages2[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({ locale, fallbackLocale, messages: messages2, watcher, formater }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater || defaultFormatter;
      this.messages = messages2 || {};
      this.setLocale(locale || LOCALE_EN);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn) {
      const index = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index, 1);
      };
    }
    add(locale, message, override = true) {
      const curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach((key) => {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
    f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join("");
    }
    t(key, locale, values) {
      let message = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message[key], values).join("");
    }
  }
  function watchAppLocale(appVm, i18n) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof global !== "undefined" && global.getLocale) {
      return global.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale, messages2 = {}, fallbackLocale, watcher) {
    if (typeof locale !== "string") {
      [locale, messages2] = [
        messages2,
        locale
      ];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    const i18n = new I18n({
      locale,
      fallbackLocale,
      messages: messages2,
      watcher
    });
    let t2 = (key, values) => {
      if (typeof getApp !== "function") {
        t2 = function(key2, values2) {
          return i18n.t(key2, values2);
        };
      } else {
        let isWatchedAppLocale = false;
        t2 = function(key2, values2) {
          const appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n);
            }
          }
          return i18n.t(key2, values2);
        };
      }
      return t2(key, values);
    };
    return {
      i18n,
      f(message, values, delimiters) {
        return i18n.f(message, values, delimiters);
      },
      t(key, values) {
        return t2(key, values);
      },
      add(locale2, message, override = true) {
        return i18n.add(locale2, message, override);
      },
      watch(fn) {
        return i18n.watchLocale(fn);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  var en$1 = {
    "uni-load-more.contentdown": "Pull up to show more",
    "uni-load-more.contentrefresh": "loading...",
    "uni-load-more.contentnomore": "No more data"
  };
  var zhHans$1 = {
    "uni-load-more.contentdown": "\u4E0A\u62C9\u663E\u793A\u66F4\u591A",
    "uni-load-more.contentrefresh": "\u6B63\u5728\u52A0\u8F7D...",
    "uni-load-more.contentnomore": "\u6CA1\u6709\u66F4\u591A\u6570\u636E\u4E86"
  };
  var zhHant$1 = {
    "uni-load-more.contentdown": "\u4E0A\u62C9\u986F\u793A\u66F4\u591A",
    "uni-load-more.contentrefresh": "\u6B63\u5728\u52A0\u8F09...",
    "uni-load-more.contentnomore": "\u6C92\u6709\u66F4\u591A\u6578\u64DA\u4E86"
  };
  var messages$1 = {
    en: en$1,
    "zh-Hans": zhHans$1,
    "zh-Hant": zhHant$1
  };
  let platform$1;
  setTimeout(() => {
    platform$1 = uni.getSystemInfoSync().platform;
  }, 16);
  const {
    t: t$1
  } = initVueI18n(messages$1);
  const _sfc_main$t = {
    name: "UniLoadMore",
    emits: ["clickLoadMore"],
    props: {
      status: {
        type: String,
        default: "more"
      },
      showIcon: {
        type: Boolean,
        default: true
      },
      iconType: {
        type: String,
        default: "auto"
      },
      iconSize: {
        type: Number,
        default: 24
      },
      color: {
        type: String,
        default: "#777777"
      },
      contentText: {
        type: Object,
        default() {
          return {
            contentdown: "",
            contentrefresh: "",
            contentnomore: ""
          };
        }
      },
      showText: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        webviewHide: false,
        platform: platform$1,
        imgBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzlBMzU3OTlEOUM0MTFFOUI0NTZDNERBQURBQzI4RkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzlBMzU3OUFEOUM0MTFFOUI0NTZDNERBQURBQzI4RkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOUEzNTc5N0Q5QzQxMUU5QjQ1NkM0REFBREFDMjhGRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDOUEzNTc5OEQ5QzQxMUU5QjQ1NkM0REFBREFDMjhGRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt+ALSwAAA6CSURBVHja1FsLkFZVHb98LM+F5bHL8khA1iSeiyQBCRM+YGqKUnnJTDLGI0BGZlKDIU2MMglUiDApEZvSsZnQtBRJtKwQNKQMFYeRDR10WOLd8ljYXdh+v8v5fR3Od+797t1dnOnO/Ofce77z+J//+b/P+ZqtXbs2sJ9MJhNUV1cHJ06cCJo3bx7EPc2aNcvpy7pWrVoF+/fvDyoqKoI2bdoE9fX1F7TjN8a+EXBn/fkfvw942Tf+wYMHg9mzZwfjxo0LDhw4EPa1x2MbFw/fOGfPng1qa2tzcCkILsLDydq2bRsunpOTMM7TD/W/tZDZhPdeKD+yGxHhdu3aBV27dg3OnDlzMVANMheLAO3btw8KCwuDmpoaX5OxbgUIMEq7K8IcPnw4KCsrC/r37x8cP378/4cAXAB3vqSkJMuiDhTkw+XcuXNhOWbMmKBly5YhUT8xArhyFvP0BfwRsAuwxJZJsm/nzp2DTp06he/OU+cZ64K6o0ePBkOHDg2GDx8e6gEbJ5Q/NHNuAJQ1hgBeHUDlR7nVTkY8rQAvAi4z34vR/mPs1FoRsaCgIJThI0eOBC1atEiFGGV+5MiRoS45efJkqFjJFXV1dQuA012m2WcwTw98fy6CqBdsaiIO4CScrGPHjvk4odhavPquRtFWXEC25VgkREKOCh/qDSq+vn37htzD/mZTOmOc5U7zKzBPEedygWshcDyWvs30igAbU+6oyMgJBCFhwQE0fccxN60Ay9iebbjoDh06hMowjQxT4fXq1SskArmHZpkArvixp/kWzHdMeArExSJEaiXIjjRjRJ4DaAGWpibLzXN3Fm1vA5teBgh3j1Rv3bp1YgKwPdmf2p9zcyNYYgPKMfY0T5f5nNYdw158nJ8QawW4CLKwiOBSEgO/hok2eBydR+3dYH+PLxA5J8Vv0KBBwenTp0P2JWAx6+yFEBfs8lMY+y0SWMBNI9E4ThKi58VKTg3FQZS1RQF1cz27eC0QHMu+3E0SkUowjhVt5VdaWhp07949ZHv2Qd1EjDXM2cla1M0nl3GxAs3J9yREzyTdFVKVFOaE9qRA8GM0WebRuo9JGZKA7Mv2SeS/Z8+eoQ9BArMfFrLGo6jvxbhHbJZnKX2Rzz1O7QhJJ9Cs2ZMaWIyq/zhdeqPNfIoHd58clIQD+JSXl4dKlyIAuBdVXZwFVWKspSSoxE++h8x4k3uCnEhE4I5KwRiFWGOU0QWKiCYLbdoRMRKAu2kQ9vkfLU6dOhX06NEjlH+yMRZSinnuyWnYosVcji8CEA/6Cg2JF+IIUBqnGKUTCNwtwBN4f89RiK1R96DEgO2o0NDmtEdvVFdVVYV+P3UAPUEs6GFwV3PHmXkD4vh74iDFJysVI/MlaQhwKeBNTLYX5VuA8T4/gZxA4MRGFxDB6R7OmYPfyykGRJbyie+XnGYnQIC/coH9+vULiYrxrkL9ZA9+0ykaHIfEpM7ge8TiJ2CsHYwyMfafAF1yCGBHYIbCVDjDjKt7BeB51D+LgQa6OkG7IDYEEtvQ7lnXLKLtLdLuJBpE4gPUXcW2+PkZwOex+4cGDhwYDBkyRL7/HFcEwUGPo/8uWRUpYnfxGHco8HkewLHLyYmAawAPuIFZxhOpDfJQ8gbUv41yORAptMWBNr6oqMhWird5+u+iHmBb2nhjDV7HWBNQTgK8y11l5NetWzc5ULscAtSj7nbNI0skhWeUZCc0W4nyH/jO4Vz0u1IeYhbk4AiwM6tjxIWByHsoZ9qcIBPJd/y+DwPfBESOmCa/QF3WiZHucLlEDpNxcNhmheEOPgdQNx6/VZFQzFZ5TN08AHXQt2Ii3EdyFuUsPtTcGPhW5iMiCNELvz+Gdn9huG4HUJaW/w3g0wxV0XaG7arG2WeKiUWYM4Y7GO5ezshTARbbWGw/DvXkpp/ivVvE0JVoMxN4rpGzJMhE5Pl+xlATsDIqikP9F9D2z3h9nOksEUFhK+qO4rcPkoalMQ/HqJLIyb3F3JdjrCcw1yZ8joyJLR5gCo54etlag7qIoeNh1N1BRYj3DTFJ0elotxPlVzkGuYAmL0VSJVGAJA41c4Z6A3BzTLfn0HYwYKEI6CUAMzZEWvLsIcQOo1AmmyyM72nHJCfYsogflGV6jEk9vyQZXSuq6w4c16NsGcGZbwOPr+H1RkOk2LEzjNepxQkihHSCQ4ynAYNRx2zMKV92CQMWqj8J0BRE8EShxRFN6YrfCRhC0x3r/Zm4IbQCcmJoV0kMamllccR6FjHqUC5F2R/wS2dcymOlfAKOS4KmzQb5cpNC2MC7JhVn5wjXoJ44rYhLh8n0eXOCorJxa7POjbSlCGVczr34/RsAmrcvo9s+wGp3tzVhntxiXiJ4nvEYb4FJkf0O8HocAePmLvCxnL0AORraVekJk6TYjDabRVXfRE2lCN1h6ZQRN1+InUbsCpKwoBZHh0dODN9JBCUffItXxEavTQkUtnfTVAplCWL3JISz29h4NjotnuSsQKJCk8dF+kJR6RARjrqFVmfPnj3ZbK8cIJ0msd6jgHPGtfVTQ8VLmlvh4mct9sobRmPic0DyDQQnx/NlfYUgyz59+oScsH379pAwXABD32nTpoUHIToESeI5mnbE/UqDdyLcafEBf2MCqgC7NwxIbMREJQ0g4D4sfJwnD+AmRrII05cfMWJE+L1169bQr+fip06dGp4oJ83lmYd5wj/EmMa4TaHivo4EeCguYZBnkB5g2aWA69OIEnUHOaGysjIYMGBAMGnSpODYsWPZwCpFmm4lNq+4gSLQA7jcX8DwtjEyRC8wjabnXEx9kfWnTJkSJkAo90xpJVV+FmcVNeYAF5zWngS4C4O91MBxmAv8blLEpbjI5sz9MTdAhcgkCT1RO8mZkAjfiYpTEvStAS53Uw1vAiUGgZ3GpuQEYvoiBqlIan7kSDHnTwJQFNiPu0+5VxCVYhcZIjNrdXUDdp+Eq5AZ3Gkg8QAyVZRZIk4Tl4QAbF9cXJxNYZMAtAokgs4BrNxEpCtteXg7DDTMDKYNSuQdKsnJBek7HxewvxaosWxLYXtw+cJp18217wql4aKCfBNoEu0O5VU+PhctJ0YeXD4C6JQpyrlpSLTojpGGGN5YwNziChdIZLk4lvLcFJ9jMX3QdiImY9bmGQU+TRUL5CHITTRlgF8D9ouD1MfmLoEPl5xokIumZ2cfgMpHt47IW9N64Hsh7wQYYjyIugWuF5fCqYncXRd5vPMWyizzvhi/32+nvG0dZc9vR6fZOu0md5e+uC408FvKSIOZwXlGvxPv95izA2Vtvg1xKFWARI+vMX66HUhpQQb643uW1bSjuTWyw2SBvDrBvjFic1eGGlz5esq3ko9uSIlBRqPuFcCv8F4WIcN12nVaBd0SaYwI6PDDImR11JkqgHcPmQssjxIn6bUshygDFJUTxPMpHk+jfjPgupgdnYV2R/g7xSjtpah8RJBewhwf0gGK6XI92u4wXFEU40afJ4DN4h5LcAd+40HI3JgJecuT0c062W0i2hQJUTcxan3/CMW1PF2K6bbA+Daz4xRs1D3Br1Cm0OihKCqizW78/nXAF/G5TXrEcVzaNMH6CyMswqsAHqDyDLEyou8lwOXnKF8DjI6KjV3KzMBiXkDH8ij/H214J5A596ekrZ3F0zXlWeL7+P5eUrNo3/QwC15uxthuzidy7DzKRwEDaAViiDgKbTbz7CJnzo0bN7pIfIiid8SuPwn25o3QCmpnyjlZkyxPP8EomCJzrGb7GJMx7tNsq4MT2xMUYaiErZOluTzKsnz3gwCeCZyVRZJfYplNEokEjwrPtxlxjeYAk+F1F74VAzPxQRNYYdtpOUvWs8J1sGhBJMNsb7igN8plJs1eSmLIhLKE4rvaCX27gOhLpLOsIzJ7qn/i+wZzcvSOZ23/du8TZjwV8zHIXoP4R3ifBxiFz1dcVpa3aPntPE+c6TmIWE9EtcMmAcPdWAhYhAXxcLOQi9L1WhD1Sc8p1d2oL7XGiRKp8F4A2i8K/nfI+y/gsTDJ/YC/8+AD5Uh04KHiGl+cIFPnBDDrPMjwRGkLXyxO4VGbfQWnDH2v0bVWE3C9QOXlepbgjEfIJQI6XDG3z5ahD9cw2pS78ipB85wyScNTvsVzlzzhL8/jRrnmVjfFJK/m3m4nj9vbgQTguT8XZTjsm672R5uJKEaQmBI/c58gyus8ZDagLpEVSJBIyHp4jn++xqPV71OgQgJYEWOtZ/haxRtKmWOBu8xdBLftWltsY84zE6WIEy/eIOWL+BaayMx+KHtL7EAkqdNDLiEXmEMUHniedtJqg9HmZtfvt26vNi0BdG3Ft3g8ZOf7PAu59TxtzivLNIekyi+wD1i8CuUiD9FXAa8C+/xS3JPmZnomyc7H+fb4/Se0bk41Fel621r4cgVxbq91V4jVqwB7HTe2M7jgB+QWHavZkDRPmZcASoZEmBx6i75bGjPcMdL4/VKGFAGWZkGzPG0XAbdL9A81G5LOmUnC9hHKJeO7dcUMjblSl12867ElFTtaGl20xvvLGPdVz/8TVuU7y0x1PG7vtNg24oz9Uo/Z412++VFWI7Fcog9tu9Lm6gvRmIPv9x1xmQAu6RDkXtbOtlGEmpgD5Nvnyc0dcv0EE6cfdi1HmhMf9wDF3k3gtRvEedhxjpgfqPb9PU9iEJHnyOUA7bQUXh6kq/D7l2iTjWv7XOD530BDr8jIrus+srXjt4MzumJMHuTsBa63YKE1+RR5lBjEikCCnWKWiHdzOgKO+nRIBAF88za/IFmJ3eMZov4CYxGBabcpGL8EYx+SeMXJeRwHNsV/h+vdxeuhEpN3ZyNY78Gm2fknJxVGhyjixPiQvVkNzT1elD9Py/aTAL64Hb9vcYmC9zfdXdT/C1LeGbg4rnBaAihDFJH12W5ulfNCNe/xTsP3bp8ikzJs5BF+5PNfAQYAPaseTdsEcaYAAAAASUVORK5CYII="
      };
    },
    computed: {
      iconSnowWidth() {
        return (Math.floor(this.iconSize / 24) || 1) * 2;
      },
      contentdownText() {
        return this.contentText.contentdown || t$1("uni-load-more.contentdown");
      },
      contentrefreshText() {
        return this.contentText.contentrefresh || t$1("uni-load-more.contentrefresh");
      },
      contentnomoreText() {
        return this.contentText.contentnomore || t$1("uni-load-more.contentnomore");
      }
    },
    mounted() {
      var pages = getCurrentPages();
      var page = pages[pages.length - 1];
      var currentWebview = page.$getAppWebview();
      currentWebview.addEventListener("hide", () => {
        this.webviewHide = true;
      });
      currentWebview.addEventListener("show", () => {
        this.webviewHide = false;
      });
    },
    methods: {
      onClick() {
        this.$emit("clickLoadMore", {
          detail: {
            status: this.status
          }
        });
      }
    }
  };
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "uni-load-more",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      !$data.webviewHide && ($props.iconType === "circle" || $props.iconType === "auto" && $data.platform === "android") && $props.status === "loading" && $props.showIcon ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        style: vue.normalizeStyle({ width: $props.iconSize + "px", height: $props.iconSize + "px" }),
        class: "uni-load-more__img uni-load-more__img--android-MP"
      }, [
        vue.createElementVNode("view", {
          class: "uni-load-more__img-icon",
          style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
        }, null, 4),
        vue.createElementVNode("view", {
          class: "uni-load-more__img-icon",
          style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
        }, null, 4),
        vue.createElementVNode("view", {
          class: "uni-load-more__img-icon",
          style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
        }, null, 4)
      ], 4)) : !$data.webviewHide && $props.status === "loading" && $props.showIcon ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        style: vue.normalizeStyle({ width: $props.iconSize + "px", height: $props.iconSize + "px" }),
        class: "uni-load-more__img uni-load-more__img--ios-H5"
      }, [
        vue.createElementVNode("image", {
          src: $data.imgBase64,
          mode: "widthFix"
        }, null, 8, ["src"])
      ], 4)) : vue.createCommentVNode("v-if", true),
      $props.showText ? (vue.openBlock(), vue.createElementBlock("text", {
        key: 2,
        class: "uni-load-more__text",
        style: vue.normalizeStyle({ color: $props.color })
      }, vue.toDisplayString($props.status === "more" ? $options.contentdownText : $props.status === "loading" ? $options.contentrefreshText : $options.contentnomoreText), 5)) : vue.createCommentVNode("v-if", true)
    ]);
  }
  var __easycom_2$3 = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$s], ["__scopeId", "data-v-90d4256a"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue"]]);
  let platform = "other";
  const _sfc_main$s = {
    name: "UniFab",
    emits: ["fabClick", "trigger"],
    props: {
      pattern: {
        type: Object,
        default() {
          return {};
        }
      },
      horizontal: {
        type: String,
        default: "left"
      },
      vertical: {
        type: String,
        default: "bottom"
      },
      direction: {
        type: String,
        default: "horizontal"
      },
      content: {
        type: Array,
        default() {
          return [];
        }
      },
      show: {
        type: Boolean,
        default: false
      },
      popMenu: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        fabShow: false,
        isShow: false,
        isAndroidNvue: platform === "android",
        styles: {
          color: "#3c3e49",
          selectedColor: "#007AFF",
          backgroundColor: "#fff",
          buttonColor: "#007AFF",
          iconColor: "#fff"
        }
      };
    },
    computed: {
      contentWidth(e) {
        return (this.content.length + 1) * 55 + 15 + "px";
      },
      contentWidthMin() {
        return "55px";
      },
      boxWidth() {
        return this.getPosition(3, "horizontal");
      },
      boxHeight() {
        return this.getPosition(3, "vertical");
      },
      leftBottom() {
        return this.getPosition(0, "left", "bottom");
      },
      rightBottom() {
        return this.getPosition(0, "right", "bottom");
      },
      leftTop() {
        return this.getPosition(0, "left", "top");
      },
      rightTop() {
        return this.getPosition(0, "right", "top");
      },
      flexDirectionStart() {
        return this.getPosition(1, "vertical", "top");
      },
      flexDirectionEnd() {
        return this.getPosition(1, "vertical", "bottom");
      },
      horizontalLeft() {
        return this.getPosition(2, "horizontal", "left");
      },
      horizontalRight() {
        return this.getPosition(2, "horizontal", "right");
      },
      nvueBottom() {
        uni.getSystemInfoSync().windowBottom;
        return 30;
      }
    },
    watch: {
      pattern: {
        handler(val, oldVal) {
          this.styles = Object.assign({}, this.styles, val);
        },
        deep: true
      }
    },
    created() {
      this.isShow = this.show;
      if (this.top === 0) {
        this.fabShow = true;
      }
      this.styles = Object.assign({}, this.styles, this.pattern);
    },
    methods: {
      _onClick() {
        this.$emit("fabClick");
        if (!this.popMenu) {
          return;
        }
        this.isShow = !this.isShow;
      },
      open() {
        this.isShow = true;
      },
      close() {
        this.isShow = false;
      },
      _onItemClick(index, item) {
        this.$emit("trigger", {
          index,
          item
        });
      },
      getPosition(types2, paramA, paramB) {
        if (types2 === 0) {
          return this.horizontal === paramA && this.vertical === paramB;
        } else if (types2 === 1) {
          return this.direction === paramA && this.vertical === paramB;
        } else if (types2 === 2) {
          return this.direction === paramA && this.horizontal === paramB;
        } else {
          return this.isShow && this.direction === paramA ? this.contentWidth : this.contentWidthMin;
        }
      }
    }
  };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-cursor-point" }, [
      $props.popMenu && ($options.leftBottom || $options.rightBottom || $options.leftTop || $options.rightTop) && $props.content.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: vue.normalizeClass([{
          "uni-fab--leftBottom": $options.leftBottom,
          "uni-fab--rightBottom": $options.rightBottom,
          "uni-fab--leftTop": $options.leftTop,
          "uni-fab--rightTop": $options.rightTop
        }, "uni-fab"]),
        style: vue.normalizeStyle($options.nvueBottom)
      }, [
        vue.createElementVNode("view", {
          class: vue.normalizeClass([{
            "uni-fab__content--left": $props.horizontal === "left",
            "uni-fab__content--right": $props.horizontal === "right",
            "uni-fab__content--flexDirection": $props.direction === "vertical",
            "uni-fab__content--flexDirectionStart": $options.flexDirectionStart,
            "uni-fab__content--flexDirectionEnd": $options.flexDirectionEnd,
            "uni-fab__content--other-platform": !$data.isAndroidNvue
          }, "uni-fab__content"]),
          style: vue.normalizeStyle({ width: $options.boxWidth, height: $options.boxHeight, backgroundColor: $data.styles.backgroundColor }),
          elevation: "5"
        }, [
          $options.flexDirectionStart || $options.horizontalLeft ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-fab__item uni-fab__item--first"
          })) : vue.createCommentVNode("v-if", true),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.content, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: index,
              class: vue.normalizeClass([{ "uni-fab__item--active": $data.isShow }, "uni-fab__item"]),
              onClick: ($event) => $options._onItemClick(index, item)
            }, [
              vue.createElementVNode("image", {
                src: item.active ? item.selectedIconPath : item.iconPath,
                class: "uni-fab__item-image",
                mode: "aspectFit"
              }, null, 8, ["src"]),
              vue.createElementVNode("text", {
                class: "uni-fab__item-text",
                style: vue.normalizeStyle({ color: item.active ? $data.styles.selectedColor : $data.styles.color })
              }, vue.toDisplayString(item.text), 5)
            ], 10, ["onClick"]);
          }), 128)),
          $options.flexDirectionEnd || $options.horizontalRight ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "uni-fab__item uni-fab__item--first"
          })) : vue.createCommentVNode("v-if", true)
        ], 6)
      ], 6)) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", {
        class: vue.normalizeClass([{
          "uni-fab__circle--leftBottom": $options.leftBottom,
          "uni-fab__circle--rightBottom": $options.rightBottom,
          "uni-fab__circle--leftTop": $options.leftTop,
          "uni-fab__circle--rightTop": $options.rightTop,
          "uni-fab__content--other-platform": !$data.isAndroidNvue
        }, "uni-fab__circle uni-fab__plus"]),
        style: vue.normalizeStyle({ "background-color": $data.styles.buttonColor, "bottom": $options.nvueBottom }),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      }, [
        vue.createVNode(_component_uni_icons, {
          class: vue.normalizeClass(["fab-circle-icon", { "uni-fab__plus--active": $data.isShow && $props.content.length > 0 }]),
          type: "plusempty",
          color: $data.styles.iconColor,
          size: "32"
        }, null, 8, ["color", "class"]),
        vue.createCommentVNode(` <view class="fab-circle-v"  :class="{'uni-fab__plus--active': isShow && content.length > 0}"></view>\r
			<view class="fab-circle-h" :class="{'uni-fab__plus--active': isShow  && content.length > 0}"></view> `)
      ], 6)
    ]);
  }
  var __easycom_6$1 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r], ["__scopeId", "data-v-7d5a6316"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-fab/components/uni-fab/uni-fab.vue"]]);
  const BASE_URL = `http://localhost:8096`;
  const $request = (options) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: BASE_URL + options.url,
        method: options.method || "GET",
        header: {
          token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIiwiZXhwIjoxNjc4MjY4NDU3fQ.z4VRanmekXCbidLHGQqV-siBwIqFmmrl1pXSniCm9bc"
        },
        data: options.data || {},
        success: (res) => {
          const data = res.data;
          if (data.code == "401") {
            uni.navigateTo({
              url: "/pages/user/login/login"
            });
            uni.showToast({
              icon: "error",
              title: "\u8BF7\u767B\u5F55\uFF01"
            });
            return;
          }
          formatAppLog("log", "at utils/request.js:27", "\u8BF7\u6C42\u6210\u529F");
          resolve(data);
        },
        fail: (error) => {
          uni.showToast({
            icon: "error",
            title: "\u7CFB\u7EDF\u9519\u8BEF"
          });
          formatAppLog("log", "at utils/request.js:35", "\u8BF7\u6C42\u5931\u8D25");
          reject(error);
        }
      });
    });
  };
  var self_$4;
  const _sfc_main$r = {
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
      self_$4 = this;
      self_$4.openSection(1);
    },
    onLoad() {
      formatAppLog("log", "at pages/index/index.vue:310", "debug");
      $request({
        url: "/article/index",
        method: "GET",
        data: {
          pageNum: this.displayCount
        }
      }).then((res) => {
        this.articles = res.data;
      }).catch((err) => {
        formatAppLog("log", "at pages/index/index.vue:321", "\u8BF7\u6C42\u9519\u8BEF" + err.code + "Msg\uFF1A" + err.msg);
      });
      $request({
        url: "/article/index_f",
        method: "GET"
      }).then((res) => {
        this.articles_focus = res.data;
      }).catch((err) => {
        formatAppLog("log", "at pages/index/index.vue:330", "\u8BF7\u6C42\u9519\u8BEF" + err.code + "Msg\uFF1A" + err.msg);
      });
      formatAppLog("log", "at pages/index/index.vue:332", this.articles);
    },
    onReady() {
    },
    onPageScroll() {
      self_$4.nav_fixed_top();
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
        formatAppLog("log", "at pages/index/index.vue:354", "\u89E6\u6478\u5F00\u59CB");
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
      },
      touchEnd(e) {
        formatAppLog("log", "at pages/index/index.vue:363", "\u89E6\u6478\u7ED3\u675F");
        let deltaX = e.changedTouches[0].clientX - this.touchStartX;
        let deltaY = e.changedTouches[0].clientY - this.touchStartY;
        if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX >= 0) {
            if (this.touchStartY > 223 || this.touchStartY < 89) {
              self_$4.openSection(1);
            }
            formatAppLog("log", "at pages/index/index.vue:371", "\u5DE6\u6ED1");
            formatAppLog("log", "at pages/index/index.vue:372", "x:" + this.touchStartX + "y:" + this.touchStartY);
          } else {
            if (this.touchStartY > 223 || this.touchStartY < 89) {
              self_$4.openSection(2);
            }
            formatAppLog("log", "at pages/index/index.vue:377", "\u53F3\u6ED1");
          }
        } else if (Math.abs(deltaY) > 50 && Math.abs(deltaX) < Math.abs(deltaY)) {
          if (deltaY < 0) {
            formatAppLog("log", "at pages/index/index.vue:381", "\u4E0A\u6ED1");
          } else {
            formatAppLog("log", "at pages/index/index.vue:383", "x:" + this.touchStartX + "y:" + this.touchStartY);
            formatAppLog("log", "at pages/index/index.vue:384", "\u4E0B\u6ED1");
          }
        } else {
          formatAppLog("log", "at pages/index/index.vue:387", "\u53EF\u80FD\u662F\u8BEF\u89E6\uFF01");
        }
      },
      clickLoadMore(e) {
        this.status = "loading";
        this.displayCount++;
        $request({
          url: "/article/index",
          method: "GET",
          data: {
            pageNum: this.displayCount
          }
        }).then((res) => {
          this.a_index = this.articles.length - 1;
          if (res.data.length > 0) {
            self_$4.appendArticle(res.data);
            this.status = "more";
            self_$4.scrollToItem(0, this.a_index);
          } else {
            this.status = "nomore";
          }
        }).catch((err) => {
          formatAppLog("log", "at pages/index/index.vue:411", "\u8BF7\u6C42\u9519\u8BEF" + err.code + "Msg\uFF1A" + err.msg);
        });
      },
      clickLoadMoreFocus(e) {
        this.status = "loading";
        this.displayCount_focus += 5;
        self_$4.scrollToItem(1, af_index);
        this.status = "nomore";
      },
      nav_fixed_top() {
        const query = uni.createSelectorQuery().in(this);
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
          uni.createSelectorQuery().select("#item-" + index).boundingClientRect((res) => {
            uni.pageScrollTo({
              scrollTop: res.top,
              duration: 300
            });
          }).exec();
        } else {
          uni.createSelectorQuery().select("#focusItem-" + index).boundingClientRect((res) => {
            uni.pageScrollTo({
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
        uni.navigateTo({
          url: "/pages/search_result/search_result?searchText=" + this.searchText + "&showIndex=0"
        });
      }
    }
  };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_1$2);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_2$4);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_1$1);
    const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_0$1);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_3);
    const _component_uni_load_more = resolveEasycom(vue.resolveDynamicComponent("uni-load-more"), __easycom_2$3);
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_3$1);
    const _component_uni_fab = resolveEasycom(vue.resolveDynamicComponent("uni-fab"), __easycom_6$1);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "container",
      onTouchstart: _cache[7] || (_cache[7] = (...args) => $options.touchStart && $options.touchStart(...args)),
      onTouchend: _cache[8] || (_cache[8] = (...args) => $options.touchEnd && $options.touchEnd(...args))
    }, [
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createCommentVNode(" \u6EDA\u52A8\u5230\u9876\u90E8\u663E\u793A "),
          vue.withDirectives(vue.createElementVNode("view", { style: { "height": "110rpx" } }, [
            vue.createElementVNode("view", {
              style: { "height": "100rpx", "width": "100%" },
              class: "baiyan fixed"
            }, [
              vue.createVNode(_component_uni_col, { span: 12 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", {
                    class: "aligin_center_item",
                    style: { "height": "90rpx" },
                    onClick: _cache[0] || (_cache[0] = ($event) => $options.openSection(1))
                  }, [
                    vue.createElementVNode("text", {
                      class: vue.normalizeClass(["aligin_center_item height_100per", { "border_line": $data.show }])
                    }, "\u63A8\u8350", 2)
                  ])
                ]),
                _: 1
              }),
              vue.createVNode(_component_uni_col, { span: 12 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", {
                    class: "aligin_center_item",
                    style: { "height": "90rpx" },
                    onClick: _cache[1] || (_cache[1] = ($event) => $options.openSection(2))
                  }, [
                    vue.createElementVNode("text", {
                      class: vue.normalizeClass(["aligin_center_item height_100per", { "border_line": !$data.show }])
                    }, "\u5173\u6CE8", 2)
                  ])
                ]),
                _: 1
              })
            ])
          ], 512), [
            [vue.vShow, $data.scroll_show]
          ]),
          vue.createCommentVNode(" \u6EDA\u52A8\u5230\u9876\u90E8\u9690\u85CF "),
          vue.withDirectives(vue.createElementVNode("view", null, [
            vue.createCommentVNode(" \u641C\u7D22\u6846 "),
            vue.createElementVNode("view", {
              style: { "height": "110rpx" },
              class: "baiyan"
            }, [
              vue.createVNode(_component_uni_col, { span: 20 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", { class: "margin_10" }, [
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: $data.searchText,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.searchText = $event),
                      placeholder: "\u641C\u7D22\u5185\u5BB9",
                      clearable: ""
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                _: 1
              }),
              vue.createVNode(_component_uni_col, { span: 4 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", {
                    style: { "width": "100%" },
                    class: "margin_auto"
                  }, [
                    vue.createElementVNode("view", { class: "margin_top_20 margin_left_15" }, [
                      vue.createVNode(_component_uni_icons, {
                        type: "search",
                        size: "28",
                        color: "grey",
                        onClick: $options.search
                      }, null, 8, ["onClick"])
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            vue.createElementVNode("view", {
              style: { "height": "90rpx" },
              class: "baiyan"
            }, [
              vue.createVNode(_component_uni_col, { span: 12 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", {
                    class: "aligin_center_item",
                    style: { "height": "90rpx" },
                    onClick: _cache[3] || (_cache[3] = ($event) => $options.openSection(1))
                  }, [
                    vue.createElementVNode("text", {
                      class: vue.normalizeClass(["aligin_center_item height_100per", { "border_line": $data.show }])
                    }, "\u63A8\u8350", 2)
                  ])
                ]),
                _: 1
              }),
              vue.createVNode(_component_uni_col, { span: 12 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", {
                    class: "aligin_center_item",
                    style: { "height": "90rpx" },
                    onClick: _cache[4] || (_cache[4] = ($event) => $options.openSection(2))
                  }, [
                    vue.createElementVNode("text", {
                      class: vue.normalizeClass(["aligin_center_item height_100per", { "border_line": !$data.show }])
                    }, "\u5173\u6CE8", 2)
                  ])
                ]),
                _: 1
              })
            ])
          ], 512), [
            [vue.vShow, !$data.scroll_show]
          ])
        ]),
        _: 1
      }),
      vue.createCommentVNode(" \u63A8\u8350\u6587\u7AE0\u5217\u8868 "),
      vue.createVNode(_component_uni_transition, {
        modeClass: $data.transl,
        show: $data.show
      }, {
        default: vue.withCtx(() => [
          vue.withDirectives(vue.createElementVNode("view", { class: "margin_top_20" }, [
            vue.createCommentVNode(" \u8F6E\u64AD\u56FE "),
            vue.createElementVNode("view", {
              id: "navTop",
              style: { "height": "300rpx" }
            }, [
              vue.createElementVNode("swiper", {
                class: "fill",
                circular: "true",
                autoplay: "true",
                "indicator-dots": "true",
                interval: $data.interval
              }, [
                vue.createElementVNode("swiper-item", null, [
                  vue.createElementVNode("view", { class: "fill" }, [
                    vue.createElementVNode("image", {
                      class: "fill",
                      src: "/static/ad/home2.jpg",
                      mode: "scaleToFill"
                    })
                  ])
                ]),
                vue.createElementVNode("swiper-item", null, [
                  vue.createElementVNode("view", { class: "fill" }, [
                    vue.createElementVNode("image", {
                      class: "fill",
                      src: "/static/ad/ad1.jpg",
                      mode: "scaleToFill"
                    })
                  ])
                ]),
                vue.createElementVNode("swiper-item", null, [
                  vue.createElementVNode("view", { class: "fill" }, [
                    vue.createElementVNode("image", {
                      class: "fill",
                      src: "/static/ad/ad2.jpg",
                      mode: "scaleToFill"
                    })
                  ])
                ])
              ], 8, ["interval"])
            ]),
            vue.createCommentVNode(" \u6587\u7AE0 "),
            vue.createElementVNode("scroll-view", null, [
              vue.createCommentVNode(" \u6587\u7AE0\u9884\u89C8\u5361\u7247 "),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.articles, (article, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: article.id
                }, [
                  vue.createElementVNode("view", {
                    id: "item-" + index,
                    class: "border_line_grey_bt margin_top_20 padding_rl_20"
                  }, [
                    vue.createVNode(_component_uni_row, null, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { style: { "height": "75rpx" } }, [
                          vue.createVNode(_component_uni_col, { span: 2 }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("view", {
                                class: "fill aligin_center_text_left",
                                style: { "height": "75rpx" }
                              }, [
                                vue.createElementVNode("image", {
                                  class: "sec_avatar",
                                  src: article.user.avatar
                                }, null, 8, ["src"])
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          vue.createVNode(_component_uni_col, { span: 17 }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("view", {
                                class: "fill aligin_center_text_left",
                                style: { "height": "75rpx", "overflow": "hidden" }
                              }, [
                                vue.createElementVNode("text", null, vue.toDisplayString(article.user.nickname), 1)
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          vue.createVNode(_component_uni_col, { span: 5 }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("view", {
                                class: "fill aligin_center_text_right",
                                style: { "height": "75rpx" }
                              }, [
                                vue.createVNode(_component_uni_icons, { type: "more-filled" }),
                                vue.createElementVNode("text", null, vue.toDisplayString("\xA0"))
                              ])
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 2
                    }, 1024),
                    vue.createVNode(_component_uni_row, null, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { style: { "height": "175rpx" } }, [
                          vue.createVNode(_component_uni_col, { span: 16 }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("view", {
                                class: "fill",
                                style: { "height": "175rpx" }
                              }, [
                                vue.createVNode(_component_uni_row, null, {
                                  default: vue.withCtx(() => [
                                    vue.createElementVNode("view", {
                                      class: "fill padding_top_10",
                                      style: { "height": "110rpx" }
                                    }, [
                                      vue.createElementVNode("view", { class: "fill white-space" }, vue.toDisplayString(article.title), 1)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024),
                                vue.createVNode(_component_uni_row, null, {
                                  default: vue.withCtx(() => [
                                    vue.createElementVNode("view", {
                                      class: "fill aligin_center_text_left",
                                      style: { "height": "60rpx" }
                                    }, [
                                      vue.createElementVNode("view", { class: "sec_message" }, [
                                        vue.createTextVNode(" \u8BC4\u8BBA:"),
                                        vue.createElementVNode("text", null, vue.toDisplayString(article.commentsNum), 1)
                                      ]),
                                      vue.createElementVNode("view", { class: "sec_message" }, [
                                        vue.createTextVNode(" \u70B9\u8D5E:"),
                                        vue.createElementVNode("text", null, vue.toDisplayString(article.likesNum), 1)
                                      ]),
                                      vue.createElementVNode("view", { class: "sec_message" }, vue.toDisplayString(article.createdTime), 1)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          vue.createVNode(_component_uni_col, { span: 8 }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("view", {
                                class: "fill aligin_center_item",
                                style: { "height": "175rpx" }
                              }, [
                                vue.createElementVNode("image", {
                                  mode: "scaleToFill",
                                  style: { "height": "160rpx", "width": "220rpx", "border-radius": "8rpx" },
                                  src: article.avatar
                                }, null, 8, ["src"])
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ], 8, ["id"])
                ]);
              }), 128)),
              vue.createCommentVNode(" \u6587\u7AE0\u5F39\u51FA\u5C42 "),
              vue.createVNode(_component_uni_popup, {
                type: "bottom",
                ref: "popup"
              }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", { style: { "height": "400rpx", "width": "100%", "background-color": "antiquewhite" } })
                ]),
                _: 1
              }, 512),
              vue.createCommentVNode(" \u52A0\u8F7D\u66F4\u591A "),
              vue.createElementVNode("view", { class: "margin_top_50 aligin_center_item" }, [
                vue.createVNode(_component_uni_load_more, {
                  onClickLoadMore: _cache[5] || (_cache[5] = ($event) => $options.clickLoadMore(_ctx.e)),
                  status: $data.status,
                  color: "#03dac5",
                  contentText: $data.contentText,
                  iconType: "circle"
                }, null, 8, ["status", "contentText"])
              ])
            ])
          ], 512), [
            [vue.vShow, $data.show]
          ])
        ]),
        _: 1
      }, 8, ["modeClass", "show"]),
      vue.createCommentVNode(" \u5173\u6CE8\u6587\u7AE0\u5217\u8868 "),
      vue.createVNode(_component_uni_transition, {
        modeClass: $data.transr,
        show: !$data.show
      }, {
        default: vue.withCtx(() => [
          vue.withDirectives(vue.createElementVNode("view", { class: "margin_top_20" }, [
            vue.createElementVNode("view", { id: "navTop2" }),
            vue.createCommentVNode(" \u6CA1\u6709\u5173\u6CE8 "),
            $data.articles_focus.length == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              style: { "height": "1300rpx" }
            }, [
              vue.createElementVNode("view", {
                style: { "margin-top": "80rpx" },
                class: "aligin_center_item_v"
              }, [
                vue.createElementVNode("image", { src: "/static/imgs/nothing.png" }),
                vue.createElementVNode("view", { style: { "font-size": "38rpx", "font-weight": "500", "color": "#03dac5" } }, "\u53BB\u53D1\u73B0\u4F18\u79C0\u4F5C\u8005\u5427")
              ])
            ])) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" \u6709\u5173\u6CE8 "),
            vue.createCommentVNode(" \u6587\u7AE0 "),
            $data.articles_focus.length != 0 ? (vue.openBlock(), vue.createElementBlock("scroll-view", { key: 1 }, [
              vue.createCommentVNode(" \u6587\u7AE0\u9884\u89C8\u5361\u7247 "),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.displayContent, (article, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: article.id
                }, [
                  vue.createElementVNode("view", {
                    id: "focusItem-" + index,
                    class: "border_line_grey_bt margin_top_20 padding_rl_20"
                  }, [
                    vue.createVNode(_component_uni_row, null, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { style: { "height": "75rpx" } }, [
                          vue.createVNode(_component_uni_col, { span: 2 }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("view", {
                                class: "fill aligin_center_text_left",
                                style: { "height": "75rpx" }
                              }, [
                                vue.createElementVNode("image", {
                                  class: "sec_avatar",
                                  src: article.user.avatar
                                }, null, 8, ["src"])
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          vue.createVNode(_component_uni_col, { span: 17 }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("view", {
                                class: "fill aligin_center_text_left",
                                style: { "height": "75rpx", "overflow": "hidden" }
                              }, [
                                vue.createElementVNode("text", null, vue.toDisplayString(article.user.nickname), 1)
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          vue.createVNode(_component_uni_col, { span: 5 }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("view", {
                                class: "fill aligin_center_text_right",
                                style: { "height": "75rpx" }
                              }, [
                                vue.createVNode(_component_uni_icons, { type: "more-filled" }),
                                vue.createElementVNode("text", null, vue.toDisplayString("\xA0"))
                              ])
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 2
                    }, 1024),
                    vue.createVNode(_component_uni_row, null, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { style: { "height": "175rpx" } }, [
                          vue.createVNode(_component_uni_col, { span: 16 }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("view", {
                                class: "fill",
                                style: { "height": "175rpx" }
                              }, [
                                vue.createVNode(_component_uni_row, null, {
                                  default: vue.withCtx(() => [
                                    vue.createElementVNode("view", {
                                      class: "fill padding_top_10",
                                      style: { "height": "110rpx" }
                                    }, [
                                      vue.createElementVNode("view", { class: "fill white-space" }, vue.toDisplayString(article.title), 1)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024),
                                vue.createVNode(_component_uni_row, null, {
                                  default: vue.withCtx(() => [
                                    vue.createElementVNode("view", {
                                      class: "fill aligin_center_text_left",
                                      style: { "height": "60rpx" }
                                    }, [
                                      vue.createElementVNode("view", { class: "sec_message" }, [
                                        vue.createTextVNode(" \u8BC4\u8BBA:"),
                                        vue.createElementVNode("text", null, vue.toDisplayString(article.commentsNum), 1)
                                      ]),
                                      vue.createElementVNode("view", { class: "sec_message" }, [
                                        vue.createTextVNode(" \u70B9\u8D5E:"),
                                        vue.createElementVNode("text", null, vue.toDisplayString(article.likesNum), 1)
                                      ]),
                                      vue.createElementVNode("view", { class: "sec_message" }, vue.toDisplayString($options.formatDate(article.createdTime)), 1)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          vue.createVNode(_component_uni_col, { span: 8 }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("view", {
                                class: "fill aligin_center_item",
                                style: { "height": "175rpx" }
                              }, [
                                vue.createElementVNode("image", {
                                  mode: "scaleToFill",
                                  style: { "height": "160rpx", "width": "220rpx", "border-radius": "8rpx" },
                                  src: article.avatar
                                }, null, 8, ["src"])
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ], 8, ["id"])
                ]);
              }), 128)),
              vue.createCommentVNode(" \u6587\u7AE0\u5F39\u51FA\u5C42 "),
              vue.createVNode(_component_uni_popup, {
                type: "bottom",
                ref: "popup"
              }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", { style: { "height": "400rpx", "width": "100%", "background-color": "antiquewhite" } })
                ]),
                _: 1
              }, 512),
              vue.createCommentVNode(" \u52A0\u8F7D\u66F4\u591A "),
              vue.createElementVNode("view", { class: "margin_top_50 aligin_center_item" }, [
                vue.createVNode(_component_uni_load_more, {
                  onClickLoadMore: _cache[6] || (_cache[6] = ($event) => $options.clickLoadMoreFocus(_ctx.e)),
                  status: $data.status,
                  color: "#03dac5",
                  contentText: $data.contentText,
                  iconType: "circle"
                }, null, 8, ["status", "contentText"])
              ])
            ])) : vue.createCommentVNode("v-if", true)
          ], 512), [
            [vue.vShow, !$data.show]
          ])
        ]),
        _: 1
      }, 8, ["modeClass", "show"]),
      vue.createCommentVNode(" \u65B0\u589E\u5185\u5BB9 "),
      vue.createVNode(_component_uni_fab, {
        pattern: $data.pattern,
        horizontal: "right",
        vertical: "bottom"
      }, null, 8, ["pattern"])
    ], 32);
  }
  var PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q], ["__file", "D:/dachuang/uniapp_client/Client/pages/index/index.vue"]]);
  const _sfc_main$q = {
    name: "uniFormsItem",
    options: {
      virtualHost: true
    },
    provide() {
      return {
        uniFormItem: this
      };
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      }
    },
    props: {
      rules: {
        type: Array,
        default() {
          return null;
        }
      },
      name: {
        type: [String, Array],
        default: ""
      },
      required: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ""
      },
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      labelAlign: {
        type: String,
        default: ""
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      },
      leftIcon: String,
      iconColor: {
        type: String,
        default: "#606266"
      }
    },
    data() {
      return {
        errMsg: "",
        isRequired: false,
        userRules: null,
        localLabelAlign: "left",
        localLabelWidth: "65px",
        localLabelPos: "left",
        border: false,
        isFirstBorder: false
      };
    },
    computed: {
      msg() {
        return this.errorMessage || this.errMsg;
      }
    },
    watch: {
      "form.formRules"(val) {
        this.init();
      },
      "form.labelWidth"(val) {
        this.localLabelWidth = this._labelWidthUnit(val);
      },
      "form.labelPosition"(val) {
        this.localLabelPos = this._labelPosition();
      },
      "form.labelAlign"(val) {
      }
    },
    created() {
      this.init(true);
      if (this.name && this.form) {
        this.$watch(() => {
          const val = this.form._getDataValue(this.name, this.form.localData);
          return val;
        }, (value, oldVal) => {
          const isEqual2 = this.form._isEqual(value, oldVal);
          if (!isEqual2) {
            const val = this.itemSetValue(value);
            this.onFieldChange(val, false);
          }
        }, {
          immediate: false
        });
      }
    },
    unmounted() {
      this.__isUnmounted = true;
      this.unInit();
    },
    methods: {
      setRules(rules = null) {
        this.userRules = rules;
        this.init(false);
      },
      setValue() {
      },
      async onFieldChange(value, formtrigger = true) {
        const {
          formData,
          localData,
          errShowType,
          validateCheck,
          validateTrigger,
          _isRequiredField,
          _realName
        } = this.form;
        const name = _realName(this.name);
        if (!value) {
          value = this.form.formData[name];
        }
        const ruleLen = this.itemRules.rules && this.itemRules.rules.length;
        if (!this.validator || !ruleLen || ruleLen === 0)
          return;
        const isRequiredField2 = _isRequiredField(this.itemRules.rules || []);
        let result = null;
        if (validateTrigger === "bind" || formtrigger) {
          result = await this.validator.validateUpdate({
            [name]: value
          }, formData);
          if (!isRequiredField2 && (value === void 0 || value === "")) {
            result = null;
          }
          if (result && result.errorMessage) {
            if (errShowType === "undertext") {
              this.errMsg = !result ? "" : result.errorMessage;
            }
            if (errShowType === "toast") {
              uni.showToast({
                title: result.errorMessage || "\u6821\u9A8C\u9519\u8BEF",
                icon: "none"
              });
            }
            if (errShowType === "modal") {
              uni.showModal({
                title: "\u63D0\u793A",
                content: result.errorMessage || "\u6821\u9A8C\u9519\u8BEF"
              });
            }
          } else {
            this.errMsg = "";
          }
          validateCheck(result ? result : null);
        } else {
          this.errMsg = "";
        }
        return result ? result : null;
      },
      init(type = false) {
        const {
          validator,
          formRules,
          childrens,
          formData,
          localData,
          _realName,
          labelWidth,
          _getDataValue,
          _setDataValue
        } = this.form || {};
        this.localLabelAlign = this._justifyContent();
        this.localLabelWidth = this._labelWidthUnit(labelWidth);
        this.localLabelPos = this._labelPosition();
        this.isRequired = this.required;
        this.form && type && childrens.push(this);
        if (!validator || !formRules)
          return;
        if (!this.form.isFirstBorder) {
          this.form.isFirstBorder = true;
          this.isFirstBorder = true;
        }
        if (this.group) {
          if (!this.group.isFirstBorder) {
            this.group.isFirstBorder = true;
            this.isFirstBorder = true;
          }
        }
        this.border = this.form.border;
        const name = _realName(this.name);
        const itemRule = this.userRules || this.rules;
        if (typeof formRules === "object" && itemRule) {
          formRules[name] = {
            rules: itemRule
          };
          validator.updateSchema(formRules);
        }
        const itemRules = formRules[name] || {};
        this.itemRules = itemRules;
        this.validator = validator;
        this.itemSetValue(_getDataValue(this.name, localData));
        this.isRequired = this._isRequired();
      },
      unInit() {
        if (this.form) {
          const {
            childrens,
            formData,
            _realName
          } = this.form;
          childrens.forEach((item, index) => {
            if (item === this) {
              this.form.childrens.splice(index, 1);
              delete formData[_realName(item.name)];
            }
          });
        }
      },
      itemSetValue(value) {
        const name = this.form._realName(this.name);
        const rules = this.itemRules.rules || [];
        const val = this.form._getValue(name, value, rules);
        this.form._setDataValue(name, this.form.formData, val);
        return val;
      },
      clearValidate() {
        this.errMsg = "";
      },
      _isRequired() {
        return this.required;
      },
      _justifyContent() {
        if (this.form) {
          const {
            labelAlign
          } = this.form;
          let labelAli = this.labelAlign ? this.labelAlign : labelAlign;
          if (labelAli === "left")
            return "flex-start";
          if (labelAli === "center")
            return "center";
          if (labelAli === "right")
            return "flex-end";
        }
        return "flex-start";
      },
      _labelWidthUnit(labelWidth) {
        return this.num2px(this.labelWidth ? this.labelWidth : labelWidth || (this.label ? 65 : "auto"));
      },
      _labelPosition() {
        if (this.form)
          return this.form.labelPosition || "left";
        return "left";
      },
      isTrigger(rule, itemRlue, parentRule) {
        if (rule === "submit" || !rule) {
          if (rule === void 0) {
            if (itemRlue !== "bind") {
              if (!itemRlue) {
                return parentRule === "" ? "bind" : "submit";
              }
              return "submit";
            }
            return "bind";
          }
          return "submit";
        }
        return "bind";
      },
      num2px(num) {
        if (typeof num === "number") {
          return `${num}px`;
        }
        return num;
      }
    }
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["uni-forms-item", ["is-direction-" + $data.localLabelPos, $data.border ? "uni-forms-item--border" : "", $data.border && $data.isFirstBorder ? "is-first-border" : ""]])
    }, [
      vue.renderSlot(_ctx.$slots, "label", {}, () => [
        vue.createElementVNode("view", {
          class: vue.normalizeClass(["uni-forms-item__label", { "no-label": !$props.label && !$data.isRequired }]),
          style: vue.normalizeStyle({ width: $data.localLabelWidth, justifyContent: $data.localLabelAlign })
        }, [
          $data.isRequired ? (vue.openBlock(), vue.createElementBlock("text", {
            key: 0,
            class: "is-required"
          }, "*")) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("text", null, vue.toDisplayString($props.label), 1)
        ], 6)
      ], true),
      vue.createElementVNode("view", { class: "uni-forms-item__content" }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
        vue.createElementVNode("view", {
          class: vue.normalizeClass(["uni-forms-item__error", { "msg--active": $options.msg }])
        }, [
          vue.createElementVNode("text", null, vue.toDisplayString($options.msg), 1)
        ], 2)
      ])
    ], 2);
  }
  var __easycom_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p], ["__scopeId", "data-v-61dfc0d0"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue"]]);
  const _sfc_main$p = {
    name: "uniGroup",
    emits: ["click"],
    props: {
      title: {
        type: String,
        default: ""
      },
      top: {
        type: [Number, String],
        default: 10
      },
      mode: {
        type: String,
        default: "default"
      },
      stat: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        margin: false,
        border: false
      };
    },
    watch: {
      title(newVal) {
        if (uni.report && this.stat && newVal !== "") {
          uni.report("title", newVal);
        }
      }
    },
    created() {
      this.form = this.getForm();
      if (this.form) {
        this.margin = true;
        this.border = this.form.border;
      }
    },
    methods: {
      getForm() {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== "uniForms") {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      },
      onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["uni-group", ["uni-group--" + $props.mode, $data.margin ? "group-margin" : ""]]),
      style: vue.normalizeStyle({ marginTop: `${$props.top}px` })
    }, [
      vue.renderSlot(_ctx.$slots, "title", {}, () => [
        $props.title ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uni-group__title",
          style: vue.normalizeStyle({ "padding-left": $data.border ? "30px" : "15px" })
        }, [
          vue.createElementVNode("text", { class: "uni-group__title-text" }, vue.toDisplayString($props.title), 1)
        ], 4)) : vue.createCommentVNode("v-if", true)
      ], true),
      vue.createElementVNode("view", {
        class: vue.normalizeClass(["uni-group__content", { "group-conent-padding": $data.border }])
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 2)
    ], 6);
  }
  var __easycom_4$3 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["__scopeId", "data-v-176b3b64"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-group/components/uni-group/uni-group.vue"]]);
  var pattern = {
    email: /^\S+?@\S+?\.\S+?$/,
    idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", "i")
  };
  const FORMAT_MAPPING = {
    "int": "integer",
    "bool": "boolean",
    "double": "number",
    "long": "number",
    "password": "string"
  };
  function formatMessage(args, resources = "") {
    var defaultMessage = ["label"];
    defaultMessage.forEach((item) => {
      if (args[item] === void 0) {
        args[item] = "";
      }
    });
    let str = resources;
    for (let key in args) {
      let reg = new RegExp("{" + key + "}");
      str = str.replace(reg, args[key]);
    }
    return str;
  }
  function isEmptyValue(value, type) {
    if (value === void 0 || value === null) {
      return true;
    }
    if (typeof value === "string" && !value) {
      return true;
    }
    if (Array.isArray(value) && !value.length) {
      return true;
    }
    if (type === "object" && !Object.keys(value).length) {
      return true;
    }
    return false;
  }
  const types = {
    integer(value) {
      return types.number(value) && parseInt(value, 10) === value;
    },
    string(value) {
      return typeof value === "string";
    },
    number(value) {
      if (isNaN(value)) {
        return false;
      }
      return typeof value === "number";
    },
    "boolean": function(value) {
      return typeof value === "boolean";
    },
    "float": function(value) {
      return types.number(value) && !types.integer(value);
    },
    array(value) {
      return Array.isArray(value);
    },
    object(value) {
      return typeof value === "object" && !types.array(value);
    },
    date(value) {
      return value instanceof Date;
    },
    timestamp(value) {
      if (!this.integer(value) || Math.abs(value).toString().length > 16) {
        return false;
      }
      return true;
    },
    file(value) {
      return typeof value.url === "string";
    },
    email(value) {
      return typeof value === "string" && !!value.match(pattern.email) && value.length < 255;
    },
    url(value) {
      return typeof value === "string" && !!value.match(pattern.url);
    },
    pattern(reg, value) {
      try {
        return new RegExp(reg).test(value);
      } catch (e) {
        return false;
      }
    },
    method(value) {
      return typeof value === "function";
    },
    idcard(value) {
      return typeof value === "string" && !!value.match(pattern.idcard);
    },
    "url-https"(value) {
      return this.url(value) && value.startsWith("https://");
    },
    "url-scheme"(value) {
      return value.startsWith("://");
    },
    "url-web"(value) {
      return false;
    }
  };
  class RuleValidator {
    constructor(message) {
      this._message = message;
    }
    async validateRule(fieldKey, fieldValue, value, data, allData) {
      var result = null;
      let rules = fieldValue.rules;
      let hasRequired = rules.findIndex((item) => {
        return item.required;
      });
      if (hasRequired < 0) {
        if (value === null || value === void 0) {
          return result;
        }
        if (typeof value === "string" && !value.length) {
          return result;
        }
      }
      var message = this._message;
      if (rules === void 0) {
        return message["default"];
      }
      for (var i = 0; i < rules.length; i++) {
        let rule = rules[i];
        let vt = this._getValidateType(rule);
        Object.assign(rule, {
          label: fieldValue.label || `["${fieldKey}"]`
        });
        if (RuleValidatorHelper[vt]) {
          result = RuleValidatorHelper[vt](rule, value, message);
          if (result != null) {
            break;
          }
        }
        if (rule.validateExpr) {
          let now = Date.now();
          let resultExpr = rule.validateExpr(value, allData, now);
          if (resultExpr === false) {
            result = this._getMessage(rule, rule.errorMessage || this._message["default"]);
            break;
          }
        }
        if (rule.validateFunction) {
          result = await this.validateFunction(rule, value, data, allData, vt);
          if (result !== null) {
            break;
          }
        }
      }
      if (result !== null) {
        result = message.TAG + result;
      }
      return result;
    }
    async validateFunction(rule, value, data, allData, vt) {
      let result = null;
      try {
        let callbackMessage = null;
        const res = await rule.validateFunction(rule, value, allData || data, (message) => {
          callbackMessage = message;
        });
        if (callbackMessage || typeof res === "string" && res || res === false) {
          result = this._getMessage(rule, callbackMessage || res, vt);
        }
      } catch (e) {
        result = this._getMessage(rule, e.message, vt);
      }
      return result;
    }
    _getMessage(rule, message, vt) {
      return formatMessage(rule, message || rule.errorMessage || this._message[vt] || message["default"]);
    }
    _getValidateType(rule) {
      var result = "";
      if (rule.required) {
        result = "required";
      } else if (rule.format) {
        result = "format";
      } else if (rule.arrayType) {
        result = "arrayTypeFormat";
      } else if (rule.range) {
        result = "range";
      } else if (rule.maximum !== void 0 || rule.minimum !== void 0) {
        result = "rangeNumber";
      } else if (rule.maxLength !== void 0 || rule.minLength !== void 0) {
        result = "rangeLength";
      } else if (rule.pattern) {
        result = "pattern";
      } else if (rule.validateFunction) {
        result = "validateFunction";
      }
      return result;
    }
  }
  const RuleValidatorHelper = {
    required(rule, value, message) {
      if (rule.required && isEmptyValue(value, rule.format || typeof value)) {
        return formatMessage(rule, rule.errorMessage || message.required);
      }
      return null;
    },
    range(rule, value, message) {
      const {
        range,
        errorMessage
      } = rule;
      let list = new Array(range.length);
      for (let i = 0; i < range.length; i++) {
        const item = range[i];
        if (types.object(item) && item.value !== void 0) {
          list[i] = item.value;
        } else {
          list[i] = item;
        }
      }
      let result = false;
      if (Array.isArray(value)) {
        result = new Set(value.concat(list)).size === list.length;
      } else {
        if (list.indexOf(value) > -1) {
          result = true;
        }
      }
      if (!result) {
        return formatMessage(rule, errorMessage || message["enum"]);
      }
      return null;
    },
    rangeNumber(rule, value, message) {
      if (!types.number(value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let {
        minimum,
        maximum,
        exclusiveMinimum,
        exclusiveMaximum
      } = rule;
      let min = exclusiveMinimum ? value <= minimum : value < minimum;
      let max = exclusiveMaximum ? value >= maximum : value > maximum;
      if (minimum !== void 0 && min) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMinimum ? "exclusiveMinimum" : "minimum"]);
      } else if (maximum !== void 0 && max) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMaximum ? "exclusiveMaximum" : "maximum"]);
      } else if (minimum !== void 0 && maximum !== void 0 && (min || max)) {
        return formatMessage(rule, rule.errorMessage || message["number"].range);
      }
      return null;
    },
    rangeLength(rule, value, message) {
      if (!types.string(value) && !types.array(value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let min = rule.minLength;
      let max = rule.maxLength;
      let val = value.length;
      if (min !== void 0 && val < min) {
        return formatMessage(rule, rule.errorMessage || message["length"].minLength);
      } else if (max !== void 0 && val > max) {
        return formatMessage(rule, rule.errorMessage || message["length"].maxLength);
      } else if (min !== void 0 && max !== void 0 && (val < min || val > max)) {
        return formatMessage(rule, rule.errorMessage || message["length"].range);
      }
      return null;
    },
    pattern(rule, value, message) {
      if (!types["pattern"](rule.pattern, value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      return null;
    },
    format(rule, value, message) {
      var customTypes = Object.keys(types);
      var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;
      if (customTypes.indexOf(format) > -1) {
        if (!types[format](value)) {
          return formatMessage(rule, rule.errorMessage || message.typeError);
        }
      }
      return null;
    },
    arrayTypeFormat(rule, value, message) {
      if (!Array.isArray(value)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
      for (let i = 0; i < value.length; i++) {
        const element = value[i];
        let formatResult = this.format(rule, element, message);
        if (formatResult !== null) {
          return formatResult;
        }
      }
      return null;
    }
  };
  class SchemaValidator extends RuleValidator {
    constructor(schema, options) {
      super(SchemaValidator.message);
      this._schema = schema;
      this._options = options || null;
    }
    updateSchema(schema) {
      this._schema = schema;
    }
    async validate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async validateAll(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, true, allData);
      }
      return result;
    }
    async validateUpdate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidateUpdate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async invokeValidate(data, all, allData) {
      let result = [];
      let schema = this._schema;
      for (let key in schema) {
        let value = schema[key];
        let errorMessage = await this.validateRule(key, value, data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    async invokeValidateUpdate(data, all, allData) {
      let result = [];
      for (let key in data) {
        let errorMessage = await this.validateRule(key, this._schema[key], data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    _checkFieldInSchema(data) {
      var keys = Object.keys(data);
      var keys2 = Object.keys(this._schema);
      if (new Set(keys.concat(keys2)).size === keys2.length) {
        return "";
      }
      var noExistFields = keys.filter((key) => {
        return keys2.indexOf(key) < 0;
      });
      var errorMessage = formatMessage({
        field: JSON.stringify(noExistFields)
      }, SchemaValidator.message.TAG + SchemaValidator.message["defaultInvalid"]);
      return [{
        key: "invalid",
        errorMessage
      }];
    }
  }
  function Message() {
    return {
      TAG: "",
      default: "\u9A8C\u8BC1\u9519\u8BEF",
      defaultInvalid: "\u63D0\u4EA4\u7684\u5B57\u6BB5{field}\u5728\u6570\u636E\u5E93\u4E2D\u5E76\u4E0D\u5B58\u5728",
      validateFunction: "\u9A8C\u8BC1\u65E0\u6548",
      required: "{label}\u5FC5\u586B",
      "enum": "{label}\u8D85\u51FA\u8303\u56F4",
      timestamp: "{label}\u683C\u5F0F\u65E0\u6548",
      whitespace: "{label}\u4E0D\u80FD\u4E3A\u7A7A",
      typeError: "{label}\u7C7B\u578B\u65E0\u6548",
      date: {
        format: "{label}\u65E5\u671F{value}\u683C\u5F0F\u65E0\u6548",
        parse: "{label}\u65E5\u671F\u65E0\u6CD5\u89E3\u6790,{value}\u65E0\u6548",
        invalid: "{label}\u65E5\u671F{value}\u65E0\u6548"
      },
      length: {
        minLength: "{label}\u957F\u5EA6\u4E0D\u80FD\u5C11\u4E8E{minLength}",
        maxLength: "{label}\u957F\u5EA6\u4E0D\u80FD\u8D85\u8FC7{maxLength}",
        range: "{label}\u5FC5\u987B\u4ECB\u4E8E{minLength}\u548C{maxLength}\u4E4B\u95F4"
      },
      number: {
        minimum: "{label}\u4E0D\u80FD\u5C0F\u4E8E{minimum}",
        maximum: "{label}\u4E0D\u80FD\u5927\u4E8E{maximum}",
        exclusiveMinimum: "{label}\u4E0D\u80FD\u5C0F\u4E8E\u7B49\u4E8E{minimum}",
        exclusiveMaximum: "{label}\u4E0D\u80FD\u5927\u4E8E\u7B49\u4E8E{maximum}",
        range: "{label}\u5FC5\u987B\u4ECB\u4E8E{minimum}and{maximum}\u4E4B\u95F4"
      },
      pattern: {
        mismatch: "{label}\u683C\u5F0F\u4E0D\u5339\u914D"
      }
    };
  }
  SchemaValidator.message = new Message();
  const deepCopy = (val) => {
    return JSON.parse(JSON.stringify(val));
  };
  const typeFilter = (format) => {
    return format === "int" || format === "double" || format === "number" || format === "timestamp";
  };
  const getValue = (key, value, rules) => {
    const isRuleNumType = rules.find((val) => val.format && typeFilter(val.format));
    const isRuleBoolType = rules.find((val) => val.format && val.format === "boolean" || val.format === "bool");
    if (!!isRuleNumType) {
      if (!value && value !== 0) {
        value = null;
      } else {
        value = isNumber(Number(value)) ? Number(value) : value;
      }
    }
    if (!!isRuleBoolType) {
      value = isBoolean(value) ? value : false;
    }
    return value;
  };
  const setDataValue = (field, formdata, value) => {
    formdata[field] = value;
    return value || "";
  };
  const getDataValue = (field, data) => {
    return objGet(data, field);
  };
  const realName = (name, data = {}) => {
    const base_name = _basePath(name);
    if (typeof base_name === "object" && Array.isArray(base_name) && base_name.length > 1) {
      const realname = base_name.reduce((a, b) => a += `#${b}`, "_formdata_");
      return realname;
    }
    return base_name[0] || name;
  };
  const isRealName = (name) => {
    const reg = /^_formdata_#*/;
    return reg.test(name);
  };
  const rawData = (object = {}, name) => {
    let newData = JSON.parse(JSON.stringify(object));
    let formData = {};
    for (let i in newData) {
      let path = name2arr(i);
      objSet(formData, path, newData[i]);
    }
    return formData;
  };
  const name2arr = (name) => {
    let field = name.replace("_formdata_#", "");
    field = field.split("#").map((v) => isNumber(v) ? Number(v) : v);
    return field;
  };
  const objSet = (object, path, value) => {
    if (typeof object !== "object")
      return object;
    _basePath(path).reduce((o, k, i, _) => {
      if (i === _.length - 1) {
        o[k] = value;
        return null;
      } else if (k in o) {
        return o[k];
      } else {
        o[k] = /^[0-9]{1,}$/.test(_[i + 1]) ? [] : {};
        return o[k];
      }
    }, object);
    return object;
  };
  function _basePath(path) {
    if (Array.isArray(path))
      return path;
    return path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  }
  const objGet = (object, path, defaultVal = "undefined") => {
    let newPath = _basePath(path);
    let val = newPath.reduce((o, k) => {
      return (o || {})[k];
    }, object);
    return !val || val !== void 0 ? val : defaultVal;
  };
  const isNumber = (num) => {
    return !isNaN(Number(num));
  };
  const isBoolean = (bool) => {
    return typeof bool === "boolean";
  };
  const isRequiredField = (rules) => {
    let isNoField = false;
    for (let i = 0; i < rules.length; i++) {
      const ruleData = rules[i];
      if (ruleData.required) {
        isNoField = true;
        break;
      }
    }
    return isNoField;
  };
  const isEqual = (a, b) => {
    if (a === b) {
      return a !== 0 || 1 / a === 1 / b;
    }
    if (a == null || b == null) {
      return a === b;
    }
    var classNameA = toString.call(a), classNameB = toString.call(b);
    if (classNameA !== classNameB) {
      return false;
    }
    switch (classNameA) {
      case "[object RegExp]":
      case "[object String]":
        return "" + a === "" + b;
      case "[object Number]":
        if (+a !== +a) {
          return +b !== +b;
        }
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case "[object Date]":
      case "[object Boolean]":
        return +a === +b;
    }
    if (classNameA == "[object Object]") {
      var propsA = Object.getOwnPropertyNames(a), propsB = Object.getOwnPropertyNames(b);
      if (propsA.length != propsB.length) {
        return false;
      }
      for (var i = 0; i < propsA.length; i++) {
        var propName = propsA[i];
        if (a[propName] !== b[propName]) {
          return false;
        }
      }
      return true;
    }
    if (classNameA == "[object Array]") {
      if (a.toString() == b.toString()) {
        return true;
      }
      return false;
    }
  };
  const _sfc_main$o = {
    name: "uniForms",
    emits: ["validate", "submit"],
    options: {
      virtualHost: true
    },
    props: {
      value: {
        type: Object,
        default() {
          return null;
        }
      },
      modelValue: {
        type: Object,
        default() {
          return null;
        }
      },
      model: {
        type: Object,
        default() {
          return null;
        }
      },
      rules: {
        type: Object,
        default() {
          return {};
        }
      },
      errShowType: {
        type: String,
        default: "undertext"
      },
      validateTrigger: {
        type: String,
        default: "submit"
      },
      labelPosition: {
        type: String,
        default: "left"
      },
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      labelAlign: {
        type: String,
        default: "left"
      },
      border: {
        type: Boolean,
        default: false
      }
    },
    provide() {
      return {
        uniForm: this
      };
    },
    data() {
      return {
        formData: {},
        formRules: {}
      };
    },
    computed: {
      localData() {
        const localVal = this.model || this.modelValue || this.value;
        if (localVal) {
          return deepCopy(localVal);
        }
        return {};
      }
    },
    watch: {
      rules: {
        handler: function(val, oldVal) {
          this.setRules(val);
        },
        deep: true,
        immediate: true
      }
    },
    created() {
      let getbinddata = getApp().$vm.$.appContext.config.globalProperties.binddata;
      if (!getbinddata) {
        getApp().$vm.$.appContext.config.globalProperties.binddata = function(name, value, formName) {
          if (formName) {
            this.$refs[formName].setValue(name, value);
          } else {
            let formVm;
            for (let i in this.$refs) {
              const vm = this.$refs[i];
              if (vm && vm.$options && vm.$options.name === "uniForms") {
                formVm = vm;
                break;
              }
            }
            if (!formVm)
              return formatAppLog("error", "at uni_modules/uni-forms/components/uni-forms/uni-forms.vue:182", "\u5F53\u524D uni-froms \u7EC4\u4EF6\u7F3A\u5C11 ref \u5C5E\u6027");
            formVm.setValue(name, value);
          }
        };
      }
      this.childrens = [];
      this.inputChildrens = [];
      this.setRules(this.rules);
    },
    methods: {
      setRules(rules) {
        this.formRules = Object.assign({}, this.formRules, rules);
        this.validator = new SchemaValidator(rules);
      },
      setValue(key, value) {
        let example = this.childrens.find((child) => child.name === key);
        if (!example)
          return null;
        this.formData[key] = getValue(key, value, this.formRules[key] && this.formRules[key].rules || []);
        return example.onFieldChange(this.formData[key]);
      },
      validate(keepitem, callback) {
        return this.checkAll(this.formData, keepitem, callback);
      },
      validateField(props = [], callback) {
        props = [].concat(props);
        let invalidFields = {};
        this.childrens.forEach((item) => {
          const name = realName(item.name);
          if (props.indexOf(name) !== -1) {
            invalidFields = Object.assign({}, invalidFields, {
              [name]: this.formData[name]
            });
          }
        });
        return this.checkAll(invalidFields, [], callback);
      },
      clearValidate(props = []) {
        props = [].concat(props);
        this.childrens.forEach((item) => {
          if (props.length === 0) {
            item.errMsg = "";
          } else {
            const name = realName(item.name);
            if (props.indexOf(name) !== -1) {
              item.errMsg = "";
            }
          }
        });
      },
      submit(keepitem, callback, type) {
        for (let i in this.dataValue) {
          const itemData = this.childrens.find((v) => v.name === i);
          if (itemData) {
            if (this.formData[i] === void 0) {
              this.formData[i] = this._getValue(i, this.dataValue[i]);
            }
          }
        }
        if (!type) {
          formatAppLog("warn", "at uni_modules/uni-forms/components/uni-forms/uni-forms.vue:289", "submit \u65B9\u6CD5\u5373\u5C06\u5E9F\u5F03\uFF0C\u8BF7\u4F7F\u7528validate\u65B9\u6CD5\u4EE3\u66FF\uFF01");
        }
        return this.checkAll(this.formData, keepitem, callback, "submit");
      },
      async checkAll(invalidFields, keepitem, callback, type) {
        if (!this.validator)
          return;
        let childrens = [];
        for (let i in invalidFields) {
          const item = this.childrens.find((v) => realName(v.name) === i);
          if (item) {
            childrens.push(item);
          }
        }
        if (!callback && typeof keepitem === "function") {
          callback = keepitem;
        }
        let promise;
        if (!callback && typeof callback !== "function" && Promise) {
          promise = new Promise((resolve, reject) => {
            callback = function(valid, invalidFields2) {
              !valid ? resolve(invalidFields2) : reject(valid);
            };
          });
        }
        let results = [];
        let tempFormData = JSON.parse(JSON.stringify(invalidFields));
        for (let i in childrens) {
          const child = childrens[i];
          let name = realName(child.name);
          const result = await child.onFieldChange(tempFormData[name]);
          if (result) {
            results.push(result);
            if (this.errShowType === "toast" || this.errShowType === "modal")
              break;
          }
        }
        if (Array.isArray(results)) {
          if (results.length === 0)
            results = null;
        }
        if (Array.isArray(keepitem)) {
          keepitem.forEach((v) => {
            let vName = realName(v);
            let value = getDataValue(v, this.localData);
            if (value !== void 0) {
              tempFormData[vName] = value;
            }
          });
        }
        if (type === "submit") {
          this.$emit("submit", {
            detail: {
              value: tempFormData,
              errors: results
            }
          });
        } else {
          this.$emit("validate", results);
        }
        let resetFormData = {};
        resetFormData = rawData(tempFormData, this.name);
        callback && typeof callback === "function" && callback(results, resetFormData);
        if (promise && callback) {
          return promise;
        } else {
          return null;
        }
      },
      validateCheck(result) {
        this.$emit("validate", result);
      },
      _getValue: getValue,
      _isRequiredField: isRequiredField,
      _setDataValue: setDataValue,
      _getDataValue: getDataValue,
      _realName: realName,
      _isRealName: isRealName,
      _isEqual: isEqual
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-forms" }, [
      vue.createElementVNode("form", null, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])
    ]);
  }
  var __easycom_4$2 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__scopeId", "data-v-7ae0e404"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-forms/components/uni-forms/uni-forms.vue"]]);
  const _sfc_main$n = {
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
                  formatAppLog("log", "at pages/user/login/login.vue:76", "\u81F3\u5C11\u516D\u4F4D");
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
        $request({ url: "/user/code", method: "GET", data: "" }).then((res) => {
          this.codeUrl = res.data.img;
          this.formData_login.codeID = res.data.uuid;
        }).catch((err) => {
          formatAppLog("log", "at pages/user/login/login.vue:105", "\u9A8C\u8BC1\u7801\u8BF7\u6C42\u5931\u8D25" + err.msg);
        });
      },
      submit() {
        this.$refs.form.validate().then((res) => {
          formatAppLog("log", "at pages/user/login/login.vue:111", "\u8868\u5355\u6570\u636E\u4FE1\u606F\uFF1A", res);
          $request({
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
              uni.setStorageSync("token", res2.data.token);
              uni.showToast({
                title: "\u767B\u5F55\u6210\u529F"
              });
              uni.switchTab({
                url: "/pages/index/index"
              });
            } else if (res2.code == "202") {
              uni.showToast({
                icon: "error",
                title: "\u9A8C\u8BC1\u7801\u9519\u8BEF"
              });
            } else {
              uni.showToast({
                icon: "error",
                title: res2.msg
              });
              formatAppLog("log", "at pages/user/login/login.vue:142", res2.code + " Msg:" + res2.msg);
            }
          }).catch((err) => {
            formatAppLog("log", "at pages/user/login/login.vue:145", err.code + "Msg:" + err.msg);
          });
        }).catch((err) => {
          formatAppLog("log", "at pages/user/login/login.vue:148", "\u63D0\u4EA4\u5931\u8D25");
          formatAppLog("log", "at pages/user/login/login.vue:149", "\u8868\u5355\u9519\u8BEF\uFF1A", err);
        });
      }
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_0$1);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_2$4);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_2$2);
    const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_1$2);
    const _component_uni_group = resolveEasycom(vue.resolveDynamicComponent("uni-group"), __easycom_4$3);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_4$2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "status_bar" }, [
        vue.createCommentVNode(" \u8FD9\u91CC\u662F\u72B6\u6001\u680F ")
      ]),
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { style: { "height": "150rpx" } })
        ]),
        _: 1
      }),
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "avatar margin_auto text_center" }, [
            vue.createElementVNode("text", null, "\u767B \u5F55")
          ])
        ]),
        _: 1
      }),
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", {
            class: "margin_top_50 margin_left_30 margin_right_30",
            style: { "height": "100rpx" }
          }, [
            vue.createVNode(_component_uni_forms, {
              modelValue: $data.formData_login,
              ref: "form",
              rules: $data.rules
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_group, null, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_forms_item, {
                      label: "\u8D26\u53F7",
                      required: "",
                      name: "username"
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_easyinput, {
                          prefixIcon: "contact-filled",
                          type: "text",
                          modelValue: $data.formData_login.username,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.formData_login.username = $event),
                          placeholder: "\u8BF7\u8F93\u5165\u8D26\u53F7"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    vue.createVNode(_component_uni_forms_item, {
                      label: "\u5BC6\u7801",
                      required: "",
                      name: "password"
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_easyinput, {
                          prefixIcon: "locked-filled",
                          type: "password",
                          modelValue: $data.formData_login.password,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData_login.password = $event),
                          placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    vue.createVNode(_component_uni_forms_item, {
                      label: "\u9A8C\u8BC1\u7801",
                      required: "",
                      name: "code"
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_col, { span: 12 }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(_component_uni_easyinput, {
                              type: "text",
                              modelValue: $data.formData_login.code,
                              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.formData_login.code = $event),
                              placeholder: "\u9A8C\u8BC1\u7801(\u70B9\u51FB\u5237\u65B0)"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        }),
                        vue.createVNode(_component_uni_col, { span: 12 }, {
                          default: vue.withCtx(() => [
                            vue.createElementVNode("image", {
                              class: "margin_left_30",
                              style: { "width": "180rpx", "height": "90rpx" },
                              src: $data.codeUrl,
                              onClick: _cache[3] || (_cache[3] = ($event) => $options.getCode())
                            }, null, 8, ["src"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue", "rules"]),
            vue.createElementVNode("button", {
              type: "primary",
              onClick: _cache[4] || (_cache[4] = ($event) => $options.submit())
            }, "\u767B\u5F55"),
            vue.createElementVNode("navigator", {
              url: "/pages/user/register/register",
              class: "a_href",
              style: { "margin-top": "20rpx" }
            }, "\u6CA1\u6709\u8D26\u53F7\uFF1F\u524D\u5F80\u6CE8\u518C")
          ])
        ]),
        _: 1
      })
    ]);
  }
  var PagesUserLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__file", "D:/dachuang/uniapp_client/Client/pages/user/login/login.vue"]]);
  var self_$3;
  const _sfc_main$m = {
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
                  formatAppLog("log", "at pages/user/register/register.vue:76", "\u81F3\u5C11\u516D\u4F4D");
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
                  formatAppLog("log", "at pages/user/register/register.vue:90", "\u4E24\u6B21\u5BC6\u7801\u4E0D\u4E00\u81F4");
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
      self_$3 = this;
    },
    methods: {
      getCode() {
        $request({ url: "/user/code", method: "GET", data: "" }).then((res) => {
          this.codeUrl = res.data.img;
          this.formData_register.codeID = res.data.uuid;
        }).catch((err) => {
          formatAppLog("log", "at pages/user/register/register.vue:119", "\u9A8C\u8BC1\u7801\u8BF7\u6C42\u5931\u8D25" + err.msg);
        });
      },
      relSubmit() {
        formatAppLog("log", "at pages/user/register/register.vue:123", "\u771F\u6B63\u63D0\u4EA4");
        $request({
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
            uni.setStorageSync("token", res.data.token);
            uni.switchTab({
              url: "/pages/index/index"
            });
            uni.showToast({
              title: "\u6CE8\u518C\u6210\u529F"
            });
          } else if (res.code == "202") {
            uni.showToast({
              icon: "error",
              title: "\u9A8C\u8BC1\u7801\u9519\u8BEF"
            });
          } else {
            uni.showToast({
              icon: "error",
              title: res.msg
            });
            formatAppLog("log", "at pages/user/register/register.vue:154", res.code + " Msg:" + res.msg);
          }
        }).catch((err) => {
          formatAppLog("log", "at pages/user/register/register.vue:157", err.code + "Msg:" + err.msg);
        });
      },
      submit() {
        this.$refs.form.validate().then((res) => {
          formatAppLog("log", "at pages/user/register/register.vue:163", "\u8868\u5355\u6570\u636E\u4FE1\u606F\uFF1A", res);
          $request({
            url: "/user/queryUser",
            method: "GET",
            data: { username: this.formData_register.username }
          }).then((res2) => {
            if (res2.code == "200") {
              formatAppLog("log", "at pages/user/register/register.vue:171", "username \u5408\u6CD5");
              self_$3.relSubmit();
            } else {
              uni.showToast({
                icon: "error",
                title: "\u8D26\u53F7\u5DF2\u5B58\u5728\uFF01"
              });
            }
          }).catch((err) => {
            formatAppLog("log", "at pages/user/register/register.vue:180", err);
            formatAppLog("log", "at pages/user/register/register.vue:181", "\u670D\u52A1\u5668 500\uFF01");
          });
        }).catch((err) => {
          formatAppLog("log", "at pages/user/register/register.vue:184", "\u8868\u5355\u9519\u8BEF\uFF1A", err);
        });
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_0$1);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_2$4);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_2$2);
    const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_1$2);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_4$2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "status_bar" }, [
        vue.createCommentVNode(" \u8FD9\u91CC\u662F\u72B6\u6001\u680F ")
      ]),
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { style: { "height": "100rpx" } })
        ]),
        _: 1
      }),
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "avatar margin_auto text_center" }, [
            vue.createElementVNode("text", null, "\u6CE8 \u518C")
          ])
        ]),
        _: 1
      }),
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", {
            class: "margin_top_50 margin_left_50 margin_right_50",
            style: { "height": "100rpx" }
          }, [
            vue.createVNode(_component_uni_forms, {
              modelValue: $data.formData_register,
              ref: "form",
              rules: $data.rules
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_forms_item, {
                  label: "\u8D26\u53F7",
                  required: "",
                  name: "username"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_easyinput, {
                      type: "text",
                      prefixIcon: "contact-filled",
                      modelValue: $data.formData_register.username,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.formData_register.username = $event),
                      placeholder: "\u8D26\u53F7(\u6570\u5B57\u548C\u5B57\u6BCD\u7EC4\u6210)"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_uni_forms_item, {
                  label: "\u5BC6\u7801",
                  required: "",
                  name: "password"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_easyinput, {
                      type: "password",
                      prefixIcon: "locked-filled",
                      modelValue: $data.formData_register.password,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData_register.password = $event),
                      placeholder: "\u5BC6\u7801(\u81F3\u5C116\u4F4D)"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_uni_forms_item, {
                  label: "\u786E\u8BA4\u5BC6\u7801",
                  required: "",
                  name: "verify_password"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_easyinput, {
                      type: "password",
                      prefixIcon: "locked-filled",
                      modelValue: $data.formData_register.verify_password,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.formData_register.verify_password = $event),
                      placeholder: "\u786E\u8BA4\u5BC6\u7801"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_uni_forms_item, {
                  label: "\u9A8C\u8BC1\u7801",
                  required: "",
                  name: "code"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_col, { span: 12 }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_easyinput, {
                          type: "text",
                          modelValue: $data.formData_register.code,
                          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.formData_register.code = $event),
                          placeholder: "\u9A8C\u8BC1\u7801(\u70B9\u51FB\u5237\u65B0)"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    vue.createVNode(_component_uni_col, { span: 12 }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("image", {
                          class: "margin_left_30",
                          style: { "width": "180rpx", "height": "90rpx" },
                          src: $data.codeUrl,
                          onClick: _cache[4] || (_cache[4] = ($event) => $options.getCode())
                        }, null, 8, ["src"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue", "rules"]),
            vue.createElementVNode("button", {
              type: "primary",
              onClick: _cache[5] || (_cache[5] = ($event) => $options.submit())
            }, "\u6CE8\u518C")
          ])
        ]),
        _: 1
      })
    ]);
  }
  var PagesUserRegisterRegister = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__file", "D:/dachuang/uniapp_client/Client/pages/user/register/register.vue"]]);
  var self_$2;
  const _sfc_main$l = {
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
          let date = new Date(time2);
          return date.toLocaleString("zh-CN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          });
        };
      },
      event_type_show: function() {
        return function(type) {
          if (this.category_index != -1) {
            formatAppLog("log", "at pages/events/events.vue:208", type.name == this.categories[this.category_index].name);
            return type.name == this.categories[this.category_index].name;
          } else {
            return true;
          }
        };
      },
      event_level_show: function() {
        return function(level) {
          if (this.level_index != -1) {
            formatAppLog("log", "at pages/events/events.vue:218", level.name == this.levels[this.level_index].name);
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
      $request({
        url: "/type",
        method: "GET"
      }).then((res) => {
        this.categories = res.data;
      }).catch((err) => {
        formatAppLog("log", "at pages/events/events.vue:236", err.code + err.msg);
      });
      $request({
        url: "/level",
        method: "GET"
      }).then((res) => {
        this.levels = res.data;
      }).catch((err) => {
        formatAppLog("log", "at pages/events/events.vue:242", err.code + err.msg);
      });
      $request({
        url: "/event/index",
        method: "GET",
        data: {
          pageNum: this.displayCount
        }
      }).then((res) => {
        this.events = res.data;
      }).catch((err) => {
        formatAppLog("log", "at pages/events/events.vue:251", err.code + err.msg);
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
        formatAppLog("log", "at pages/events/events.vue:262", this.categories[index]);
        this.category_index = index;
        formatAppLog("log", "at pages/events/events.vue:264", this.category_index);
        this.$refs.popup_category.close();
      },
      choseLevel(index) {
        formatAppLog("log", "at pages/events/events.vue:268", this.levels[index]);
        this.level_index = index;
        formatAppLog("log", "at pages/events/events.vue:270", this.level_index);
        this.$refs.popup_level.close();
      },
      clickLoadMore(e) {
        this.status = "loading";
        this.displayCount++;
        $request({
          url: "/event/index",
          method: "GET",
          data: {
            pageNum: this.displayCount
          }
        }).then((res) => {
          this.event_index = this.events.length - 1;
          if (res.data.length > 0) {
            self_$2.appendEvent(res.data);
            this.status = "more";
            self_$2.scrollToItem(this.event_index);
          } else {
            this.status = "nomore";
          }
        }).catch((err) => {
          formatAppLog("log", "at pages/events/events.vue:294", "\u8BF7\u6C42\u9519\u8BEF" + err.code + "Msg\uFF1A" + err.msg);
        });
      },
      search() {
        uni.navigateTo({
          url: "/pages/search_result/search_result?searchText=" + this.searchText + "&showIndex=1"
        });
      },
      appendEvent(newEvents) {
        this.events.push(...newEvents);
      },
      scrollToItem(index) {
        uni.createSelectorQuery().select("#item-" + index).boundingClientRect((res) => {
          uni.pageScrollTo({
            scrollTop: res.top,
            duration: 300
          });
        }).exec();
      }
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_2$4);
    const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_1$2);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_1$1);
    const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_0$1);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_3);
    const _component_uni_load_more = resolveEasycom(vue.resolveDynamicComponent("uni-load-more"), __easycom_2$3);
    const _component_uni_fab = resolveEasycom(vue.resolveDynamicComponent("uni-fab"), __easycom_6$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "fixed_eventNav" }, [
        vue.createVNode(_component_uni_row, null, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", {
              style: { "height": "110rpx" },
              class: "baiyan"
            }, [
              vue.createVNode(_component_uni_col, { span: 20 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", { class: "margin_10" }, [
                    vue.createVNode(_component_uni_easyinput, {
                      type: "text",
                      modelValue: $data.searchText,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.searchText = $event),
                      placeholder: "\u641C\u7D22\u8D5B\u4E8B",
                      clearable: ""
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                _: 1
              }),
              vue.createVNode(_component_uni_col, { span: 4 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", {
                    style: { "width": "100%" },
                    class: "margin_auto"
                  }, [
                    vue.createElementVNode("view", { class: "margin_top_20 margin_left_15" }, [
                      vue.createVNode(_component_uni_icons, {
                        type: "search",
                        size: "28",
                        color: "grey",
                        onClick: $options.search
                      }, null, 8, ["onClick"])
                    ])
                  ])
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        }),
        vue.createCommentVNode(" \u6761\u4EF6\u9009\u9879 "),
        vue.createVNode(_component_uni_row, null, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", {
              style: { "height": "80rpx" },
              class: "baiyan eventNav"
            }, [
              vue.createVNode(_component_uni_col, { span: 12 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", {
                    onClick: _cache[1] || (_cache[1] = ($event) => $options.openPopup(1)),
                    class: "box_radius margin_10 padding_10 aligin_center_item sec_box_shandow"
                  }, [
                    vue.createElementVNode("text", { class: "margin_right_15" }, "\u9009\u62E9\u7C7B\u522B"),
                    vue.createVNode(_component_uni_icons, { type: "list" })
                  ])
                ]),
                _: 1
              }),
              vue.createVNode(_component_uni_col, { span: 12 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", {
                    onClick: _cache[2] || (_cache[2] = ($event) => $options.openPopup(2)),
                    class: "box_radius margin_10 padding_10 aligin_center_item sec_box_shandow"
                  }, [
                    vue.createElementVNode("text", { class: "margin_right_15" }, "\u9009\u62E9\u7EA7\u522B"),
                    vue.createVNode(_component_uni_icons, { type: "settings" })
                  ])
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })
      ]),
      vue.createCommentVNode(" \u6761\u4EF6\u9009\u9879\u9876\u90E8\u5F39\u51FA\u5C42 "),
      vue.createCommentVNode(" \u5206\u7C7B "),
      vue.createVNode(_component_uni_popup, {
        ref: "popup_category",
        backgroundColor: "#fff",
        type: "top"
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", {
            class: "aligin_center_item",
            style: { "height": "50rpx", "font-size": "30rpx", "color": "grey" }
          }, "\u4F60\u5728\u65B0\u589E\u8D5B\u4E8B\u65F6\u53EF\u4EE5\u7533\u8BF7\u65B0\u7684\u5206\u7C7B"),
          vue.createCommentVNode(" \u9ED8\u8BA4\u5168\u90E8 "),
          vue.createElementVNode("view", { class: "popup_content aligin_center_item" }, [
            vue.createElementVNode("view", {
              class: vue.normalizeClass(["fill_width margin_15 popup_item aligin_center_item", { "item_active": $data.category_index == -1 }]),
              onClick: _cache[3] || (_cache[3] = ($event) => $options.choseCategory(-1))
            }, [
              vue.createTextVNode(vue.toDisplayString("\u5168\u90E8") + " "),
              $data.category_index == -1 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "margin_left_30"
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "checkmarkempty",
                  color: "#03dac5",
                  size: "26"
                })
              ])) : vue.createCommentVNode("v-if", true)
            ], 2)
          ]),
          vue.createCommentVNode(" \u6570\u636E\u5E93\u7684\u5206\u7C7B "),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.categories, (type, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "popup_content aligin_center_item",
              key: type.id
            }, [
              vue.createElementVNode("view", {
                class: vue.normalizeClass(["fill_width margin_15 popup_item aligin_center_item", { "item_active": index == $data.category_index }]),
                onClick: ($event) => $options.choseCategory(index)
              }, [
                vue.createTextVNode(vue.toDisplayString(type.name) + " ", 1),
                index == $data.category_index ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "margin_left_30"
                }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "checkmarkempty",
                    color: "#03dac5",
                    size: "26"
                  })
                ])) : vue.createCommentVNode("v-if", true)
              ], 10, ["onClick"])
            ]);
          }), 128))
        ]),
        _: 1
      }, 512),
      vue.createCommentVNode(" \u7EA7\u522B "),
      vue.createVNode(_component_uni_popup, {
        ref: "popup_level",
        backgroundColor: "#fff",
        type: "top"
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", {
            class: "aligin_center_item",
            style: { "height": "50rpx", "font-size": "30rpx", "color": "grey" }
          }, "\u8D5B\u4E8B\u7EA7\u522B"),
          vue.createCommentVNode(" \u9ED8\u8BA4\u5168\u90E8\u7EA7\u522B "),
          vue.createElementVNode("view", { class: "popup_content aligin_center_item" }, [
            vue.createElementVNode("view", {
              class: vue.normalizeClass(["fill_width margin_15 popup_item aligin_center_item", { "item_active": $data.level_index == -1 }]),
              onClick: _cache[4] || (_cache[4] = ($event) => $options.choseLevel(-1))
            }, [
              vue.createTextVNode(vue.toDisplayString("\u5168\u90E8") + " "),
              $data.level_index == -1 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "margin_left_30"
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "checkmarkempty",
                  color: "#03dac5",
                  size: "26"
                })
              ])) : vue.createCommentVNode("v-if", true)
            ], 2)
          ]),
          vue.createCommentVNode(" \u6570\u636E\u5E93\u7684\u7EA7\u522B "),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.levels, (level, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "popup_content aligin_center_item",
              key: level.id
            }, [
              vue.createElementVNode("view", {
                class: vue.normalizeClass(["fill_width margin_15 popup_item aligin_center_item", { "item_active": index == $data.level_index }]),
                onClick: ($event) => $options.choseLevel(index)
              }, [
                vue.createTextVNode(vue.toDisplayString(level.name) + " ", 1),
                index == $data.level_index ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "margin_left_30"
                }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "checkmarkempty",
                    color: "#03dac5",
                    size: "26"
                  })
                ])) : vue.createCommentVNode("v-if", true)
              ], 10, ["onClick"])
            ]);
          }), 128))
        ]),
        _: 1
      }, 512),
      vue.createCommentVNode(" \u5360\u4F4D "),
      vue.createElementVNode("view", { style: { "height": "190rpx" } }),
      vue.createCommentVNode(" \u8D5B\u4E8B\u5361\u7247 "),
      vue.createElementVNode("scroll-view", null, [
        vue.createCommentVNode(" \u8D5B\u4E8B\u5361\u7247 \uFF08\u5361\u7247\u4E2D\u56FE\u7247\u9ED8\u8BA4\u63D0\u4F9B\u51E0\u79CD\uFF09"),
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.events, (event, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            key: event.id
          }, [
            vue.withDirectives(vue.createElementVNode("view", {
              id: "item-" + index,
              class: "margin_top_20 margin_lr_10 box_radius_20 overflowHide baiyan",
              style: { "position": "relative" }
            }, [
              vue.createCommentVNode(" \u8D5B\u4E8B\u72B6\u6001 "),
              vue.createElementVNode("view", {
                style: { "height": "55rpx", "width": "150rpx" },
                class: vue.normalizeClass(["absolute_event_status box_radius_20 aligin_center_item", $options.event_status(event)])
              }, vue.toDisplayString(event.status), 3),
              vue.createCommentVNode(" \u56FE\u7247 "),
              vue.createElementVNode("view", { style: { "height": "230rpx", "width": "100%", "background-color": "antiquewhite" } }, [
                vue.createElementVNode("image", {
                  class: "fill",
                  src: event.avatar
                }, null, 8, ["src"])
              ]),
              vue.createCommentVNode(" \u4FE1\u606F "),
              vue.createElementVNode("view", { class: "margin_lr_10 margin_bt_15" }, [
                vue.createElementVNode("view", { class: "fill_width eventTitle padding_tb_10 overflowHide" }, [
                  vue.createElementVNode("text", null, vue.toDisplayString(event.title), 1)
                ]),
                vue.createCommentVNode(" \u65F6\u95F4 "),
                vue.createElementVNode("view", { class: "fill_width aligin_center_text_left eventTime margin_top_5" }, [
                  vue.createElementVNode("view", {
                    class: "margin_right_10",
                    style: { "color": "black" }
                  }, "\u62A5\u540D\u65F6\u95F4 \uFF1A"),
                  vue.createElementVNode("view", { class: "margin_lr_10" }, vue.toDisplayString($options.formatDate(event.registerAt)), 1),
                  vue.createElementVNode("view", null, "--"),
                  vue.createElementVNode("view", { class: "margin_lr_10" }, vue.toDisplayString($options.formatDate(event.registerEnd)), 1)
                ]),
                vue.createElementVNode("view", { class: "fill_width aligin_center_text_left eventTime margin_top_5" }, [
                  vue.createElementVNode("view", {
                    class: "margin_right_10",
                    style: { "color": "black" }
                  }, "\u7ED3\u675F\u65F6\u95F4 \uFF1A"),
                  vue.createElementVNode("view", { class: "margin_lr_10" }, vue.toDisplayString($options.formatDate(event.progressAt)), 1),
                  vue.createElementVNode("view", null, "--"),
                  vue.createElementVNode("view", { class: "margin_lr_10" }, vue.toDisplayString($options.formatDate(event.progressEnd)), 1)
                ]),
                vue.createElementVNode("view", { class: "fill_width aligin_center_text_left margin_bt_15 event_other" }, [
                  vue.createElementVNode("view", { class: "margin_right_10" }, "\u4E3B\u529E\u65B9\uFF1A"),
                  vue.createElementVNode("view", { class: "margin_left_15" }, vue.toDisplayString(event.company), 1)
                ]),
                vue.createElementVNode("view", { class: "fill_width aligin_center_text_left event_other" }, [
                  vue.createElementVNode("view", null, "\u6536\u85CF\uFF1A " + vue.toDisplayString(event.favoritesNum), 1),
                  vue.createElementVNode("view", { class: "margin_lr_50" }, "|"),
                  vue.createElementVNode("view", null, "\u8BC4\u8BBA\uFF1A" + vue.toDisplayString(event.commentsNum), 1),
                  vue.createElementVNode("view", { class: "margin_lr_50" }, "|"),
                  vue.createElementVNode("view", null, "\u7EA7\u522B\uFF1A" + vue.toDisplayString(event.level.name), 1)
                ])
              ])
            ], 8, ["id"]), [
              [vue.vShow, $options.event_type_show(event.type) && $options.event_level_show(event.level)]
            ])
          ]);
        }), 128)),
        vue.createCommentVNode(" \u52A0\u8F7D\u66F4\u591A "),
        vue.createElementVNode("view", { class: "margin_top_50 aligin_center_item" }, [
          vue.createVNode(_component_uni_load_more, {
            onClickLoadMore: _cache[5] || (_cache[5] = ($event) => $options.clickLoadMore(_ctx.e)),
            status: $data.status,
            color: "#03dac5",
            contentText: $data.contentText,
            iconType: "circle"
          }, null, 8, ["status", "contentText"])
        ])
      ]),
      vue.createCommentVNode(" \u65B0\u589E\u8D5B\u4E8B "),
      vue.createVNode(_component_uni_fab, {
        pattern: $data.pattern,
        horizontal: "right",
        vertical: "bottom"
      }, null, 8, ["pattern"])
    ]);
  }
  var PagesEventsEvents = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__file", "D:/dachuang/uniapp_client/Client/pages/events/events.vue"]]);
  const _sfc_main$k = {
    name: "UniStatusBar",
    data() {
      return {
        statusBarHeight: 20
      };
    },
    mounted() {
      this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + "px";
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      style: vue.normalizeStyle({ height: $data.statusBarHeight }),
      class: "uni-status-bar"
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 4);
  }
  var statusBar = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-f9a87a8e"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar.vue"]]);
  const getVal = (val) => typeof val === "number" ? val + "px" : val;
  const _sfc_main$j = {
    name: "UniNavBar",
    components: {
      statusBar
    },
    emits: ["clickLeft", "clickRight", "clickTitle"],
    props: {
      dark: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ""
      },
      leftText: {
        type: String,
        default: ""
      },
      rightText: {
        type: String,
        default: ""
      },
      leftIcon: {
        type: String,
        default: ""
      },
      rightIcon: {
        type: String,
        default: ""
      },
      fixed: {
        type: [Boolean, String],
        default: false
      },
      color: {
        type: String,
        default: ""
      },
      backgroundColor: {
        type: String,
        default: ""
      },
      statusBar: {
        type: [Boolean, String],
        default: false
      },
      shadow: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: [Boolean, String],
        default: true
      },
      height: {
        type: [Number, String],
        default: 44
      },
      leftWidth: {
        type: [Number, String],
        default: 60
      },
      rightWidth: {
        type: [Number, String],
        default: 60
      },
      stat: {
        type: [Boolean, String],
        default: ""
      }
    },
    computed: {
      themeBgColor() {
        if (this.dark) {
          if (this.backgroundColor) {
            return this.backgroundColor;
          } else {
            return this.dark ? "#333" : "#FFF";
          }
        }
        return this.backgroundColor || "#FFF";
      },
      themeColor() {
        if (this.dark) {
          if (this.color) {
            return this.color;
          } else {
            return this.dark ? "#fff" : "#333";
          }
        }
        return this.color || "#333";
      },
      navbarHeight() {
        return getVal(this.height);
      },
      leftIconWidth() {
        return getVal(this.leftWidth);
      },
      rightIconWidth() {
        return getVal(this.rightWidth);
      }
    },
    mounted() {
      if (uni.report && this.stat && this.title !== "") {
        uni.report("title", this.title);
      }
    },
    methods: {
      onClickLeft() {
        this.$emit("clickLeft");
      },
      onClickRight() {
        this.$emit("clickRight");
      },
      onClickTitle() {
        this.$emit("clickTitle");
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_status_bar = vue.resolveComponent("status-bar");
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["uni-navbar", { "uni-dark": $props.dark, "uni-nvue-fixed": $props.fixed }])
    }, [
      vue.createElementVNode("view", {
        class: vue.normalizeClass(["uni-navbar__content", { "uni-navbar--fixed": $props.fixed, "uni-navbar--shadow": $props.shadow, "uni-navbar--border": $props.border }]),
        style: vue.normalizeStyle({ "background-color": $options.themeBgColor })
      }, [
        $props.statusBar ? (vue.openBlock(), vue.createBlock(_component_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", {
          style: vue.normalizeStyle({ color: $options.themeColor, backgroundColor: $options.themeBgColor, height: $options.navbarHeight }),
          class: "uni-navbar__header"
        }, [
          vue.createElementVNode("view", {
            onClick: _cache[0] || (_cache[0] = (...args) => $options.onClickLeft && $options.onClickLeft(...args)),
            class: "uni-navbar__header-btns uni-navbar__header-btns-left",
            style: vue.normalizeStyle({ width: $options.leftIconWidth })
          }, [
            vue.renderSlot(_ctx.$slots, "left", {}, () => [
              $props.leftIcon.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-navbar__content_view"
              }, [
                vue.createVNode(_component_uni_icons, {
                  color: $options.themeColor,
                  type: $props.leftIcon,
                  size: "20"
                }, null, 8, ["color", "type"])
              ])) : vue.createCommentVNode("v-if", true),
              $props.leftText.length ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: vue.normalizeClass([{ "uni-navbar-btn-icon-left": !$props.leftIcon.length > 0 }, "uni-navbar-btn-text"])
              }, [
                vue.createElementVNode("text", {
                  style: vue.normalizeStyle({ color: $options.themeColor, fontSize: "12px" })
                }, vue.toDisplayString($props.leftText), 5)
              ], 2)) : vue.createCommentVNode("v-if", true)
            ], true)
          ], 4),
          vue.createElementVNode("view", {
            class: "uni-navbar__header-container",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.onClickTitle && $options.onClickTitle(...args))
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              $props.title.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-navbar__header-container-inner"
              }, [
                vue.createElementVNode("text", {
                  class: "uni-nav-bar-text uni-ellipsis-1",
                  style: vue.normalizeStyle({ color: $options.themeColor })
                }, vue.toDisplayString($props.title), 5)
              ])) : vue.createCommentVNode("v-if", true)
            ], true)
          ]),
          vue.createElementVNode("view", {
            onClick: _cache[2] || (_cache[2] = (...args) => $options.onClickRight && $options.onClickRight(...args)),
            class: "uni-navbar__header-btns uni-navbar__header-btns-right",
            style: vue.normalizeStyle({ width: $options.rightIconWidth })
          }, [
            vue.renderSlot(_ctx.$slots, "right", {}, () => [
              $props.rightIcon.length ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                vue.createVNode(_component_uni_icons, {
                  color: $options.themeColor,
                  type: $props.rightIcon,
                  size: "22"
                }, null, 8, ["color", "type"])
              ])) : vue.createCommentVNode("v-if", true),
              $props.rightText.length && !$props.rightIcon.length ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "uni-navbar-btn-text"
              }, [
                vue.createElementVNode("text", {
                  class: "uni-nav-bar-right-text",
                  style: vue.normalizeStyle({ color: $options.themeColor })
                }, vue.toDisplayString($props.rightText), 5)
              ])) : vue.createCommentVNode("v-if", true)
            ], true)
          ], 4)
        ], 4)
      ], 6),
      $props.fixed ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-navbar__placeholder"
      }, [
        $props.statusBar ? (vue.openBlock(), vue.createBlock(_component_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", {
          class: "uni-navbar__placeholder-view",
          style: vue.normalizeStyle({ height: $options.navbarHeight })
        }, null, 4)
      ])) : vue.createCommentVNode("v-if", true)
    ], 2);
  }
  var __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-6bda1a90"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue"]]);
  const _sfc_main$i = {
    data() {
      return {
        searchText: ""
      };
    },
    methods: {
      search() {
        uni.navigateTo({
          url: "/pages/search_result/search_result?searchText=" + this.searchText + "&showIndex=2"
        });
      },
      openFocus() {
        uni.navigateTo({
          url: "/pages/focus/focus"
        });
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_2$4);
    const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_1$2);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_1$1);
    const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_uni_nav_bar, {
        fixed: true,
        height: "80rpx",
        title: "\u540C\u5FD7"
      }),
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", {
            style: { "height": "110rpx" },
            class: "baiyan"
          }, [
            vue.createVNode(_component_uni_col, { span: 20 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "margin_10" }, [
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: $data.searchText,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.searchText = $event),
                    placeholder: "\u641C\u7D22\u7528\u6237",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ])
              ]),
              _: 1
            }),
            vue.createVNode(_component_uni_col, { span: 4 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  style: { "width": "100%" },
                  class: "margin_auto"
                }, [
                  vue.createElementVNode("view", { class: "margin_top_20 margin_left_15" }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "search",
                      size: "28",
                      color: "grey",
                      onClick: $options.search
                    }, null, 8, ["onClick"])
                  ])
                ])
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      }),
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", {
            onClick: _cache[1] || (_cache[1] = (...args) => $options.openFocus && $options.openFocus(...args)),
            style: { "height": "110rpx" },
            class: "border_line_grey_bt_tiny aligin_center_text_left"
          }, [
            vue.createVNode(_component_uni_col, { span: 12 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "aligin_center_text_left" }, [
                  vue.createElementVNode("view", { class: "margin_left_15" }),
                  vue.createVNode(_component_uni_icons, {
                    type: "auth-filled",
                    size: "27",
                    color: "#03dac5"
                  }),
                  vue.createElementVNode("view", { class: "margin_left_30" }, "\u5173\u6CE8")
                ])
              ]),
              _: 1
            }),
            vue.createVNode(_component_uni_col, { span: 12 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "aligin_center_text_right padding_right_30" }, [
                  vue.createVNode(_component_uni_icons, { type: "right" })
                ])
              ]),
              _: 1
            })
          ]),
          vue.createElementVNode("view", {
            onClick: _cache[2] || (_cache[2] = (...args) => $options.openFocus && $options.openFocus(...args)),
            style: { "height": "110rpx" },
            class: "border_line_grey_bt_tiny aligin_center_text_left"
          }, [
            vue.createVNode(_component_uni_col, { span: 12 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "aligin_center_text_left" }, [
                  vue.createElementVNode("view", { class: "margin_left_15" }),
                  vue.createVNode(_component_uni_icons, {
                    type: "auth-filled",
                    size: "27",
                    color: "#F0E68C"
                  }),
                  vue.createElementVNode("view", { class: "margin_left_30" }, "\u7C89\u4E1D")
                ])
              ]),
              _: 1
            }),
            vue.createVNode(_component_uni_col, { span: 12 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "aligin_center_text_right padding_right_30" }, [
                  vue.createVNode(_component_uni_icons, { type: "right" })
                ])
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      }),
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", {
            class: "border_line_grey_bt_tiny fill_width",
            style: { "height": "800rpx" }
          }, [
            vue.createElementVNode("view", {
              style: { "height": "110rpx" },
              class: "aligin_center_text_left"
            }, [
              vue.createVNode(_component_uni_col, { span: 12 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", { class: "aligin_center_text_left" }, [
                    vue.createElementVNode("view", { class: "margin_left_15" }),
                    vue.createVNode(_component_uni_icons, {
                      type: "chatboxes-filled",
                      size: "27",
                      color: "#87CEFA"
                    }),
                    vue.createElementVNode("view", { class: "margin_left_30" }, "\u7CFB\u7EDF\u6D88\u606F")
                  ])
                ]),
                _: 1
              }),
              vue.createVNode(_component_uni_col, { span: 12 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", { class: "aligin_center_text_right padding_right_30" })
                ]),
                _: 1
              })
            ]),
            vue.createElementVNode("view", { class: "baiyan margin_20" })
          ])
        ]),
        _: 1
      })
    ]);
  }
  var PagesMsgMsg = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__file", "D:/dachuang/uniapp_client/Client/pages/msg/msg.vue"]]);
  const _sfc_main$h = {
    name: "UniCard",
    emits: ["click"],
    props: {
      title: {
        type: String,
        default: ""
      },
      subTitle: {
        type: String,
        default: ""
      },
      padding: {
        type: String,
        default: "10px"
      },
      margin: {
        type: String,
        default: "15px"
      },
      spacing: {
        type: String,
        default: "0 10px"
      },
      extra: {
        type: String,
        default: ""
      },
      cover: {
        type: String,
        default: ""
      },
      thumbnail: {
        type: String,
        default: ""
      },
      isFull: {
        type: Boolean,
        default: false
      },
      isShadow: {
        type: Boolean,
        default: true
      },
      shadow: {
        type: String,
        default: "0px 0px 3px 1px rgba(0, 0, 0, 0.08)"
      },
      border: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      onClick(type) {
        this.$emit("click", type);
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["uni-card", { "uni-card--full": $props.isFull, "uni-card--shadow": $props.isShadow, "uni-card--border": $props.border }]),
      style: vue.normalizeStyle({ "margin": $props.isFull ? 0 : $props.margin, "padding": $props.spacing, "box-shadow": $props.isShadow ? $props.shadow : "" })
    }, [
      vue.createCommentVNode(" \u5C01\u9762 "),
      vue.renderSlot(_ctx.$slots, "cover", {}, () => [
        $props.cover ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uni-card__cover"
        }, [
          vue.createElementVNode("image", {
            class: "uni-card__cover-image",
            mode: "widthFix",
            onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick("cover")),
            src: $props.cover
          }, null, 8, ["src"])
        ])) : vue.createCommentVNode("v-if", true)
      ], true),
      vue.renderSlot(_ctx.$slots, "title", {}, () => [
        $props.title || $props.extra ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uni-card__header"
        }, [
          vue.createCommentVNode(" \u5361\u7247\u6807\u9898 "),
          vue.createElementVNode("view", {
            class: "uni-card__header-box",
            onClick: _cache[1] || (_cache[1] = ($event) => $options.onClick("title"))
          }, [
            $props.thumbnail ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "uni-card__header-avatar"
            }, [
              vue.createElementVNode("image", {
                class: "uni-card__header-avatar-image",
                src: $props.thumbnail,
                mode: "aspectFit"
              }, null, 8, ["src"])
            ])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "uni-card__header-content" }, [
              vue.createElementVNode("text", { class: "uni-card__header-content-title uni-ellipsis" }, vue.toDisplayString($props.title), 1),
              $props.title && $props.subTitle ? (vue.openBlock(), vue.createElementBlock("text", {
                key: 0,
                class: "uni-card__header-content-subtitle uni-ellipsis"
              }, vue.toDisplayString($props.subTitle), 1)) : vue.createCommentVNode("v-if", true)
            ])
          ]),
          vue.createElementVNode("view", {
            class: "uni-card__header-extra",
            onClick: _cache[2] || (_cache[2] = ($event) => $options.onClick("extra"))
          }, [
            vue.createElementVNode("text", { class: "uni-card__header-extra-text" }, vue.toDisplayString($props.extra), 1)
          ])
        ])) : vue.createCommentVNode("v-if", true)
      ], true),
      vue.createCommentVNode(" \u5361\u7247\u5185\u5BB9 "),
      vue.createElementVNode("view", {
        class: "uni-card__content",
        style: vue.normalizeStyle({ padding: $props.padding }),
        onClick: _cache[3] || (_cache[3] = ($event) => $options.onClick("content"))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 4),
      vue.createElementVNode("view", {
        class: "uni-card__actions",
        onClick: _cache[4] || (_cache[4] = ($event) => $options.onClick("actions"))
      }, [
        vue.renderSlot(_ctx.$slots, "actions", {}, void 0, true)
      ])
    ], 6);
  }
  var __easycom_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-19622063"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-card/components/uni-card/uni-card.vue"]]);
  const _sfc_main$g = {
    name: "UniSection",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      title: {
        type: String,
        required: true,
        default: ""
      },
      titleFontSize: {
        type: String,
        default: "14px"
      },
      titleColor: {
        type: String,
        default: "#333"
      },
      subTitle: {
        type: String,
        default: ""
      },
      subTitleFontSize: {
        type: String,
        default: "12px"
      },
      subTitleColor: {
        type: String,
        default: "#999"
      },
      padding: {
        type: [Boolean, String],
        default: false
      }
    },
    computed: {
      _padding() {
        if (typeof this.padding === "string") {
          return this.padding;
        }
        return this.padding ? "10px" : "";
      }
    },
    watch: {
      title(newVal) {
        if (uni.report && newVal !== "") {
          uni.report("title", newVal);
        }
      }
    },
    methods: {
      onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-section" }, [
      vue.createElementVNode("view", {
        class: "uni-section-header",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
      }, [
        $props.type ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: vue.normalizeClass(["uni-section-header__decoration", $props.type])
        }, null, 2)) : vue.renderSlot(_ctx.$slots, "decoration", { key: 1 }, void 0, true),
        vue.createElementVNode("view", { class: "uni-section-header__content" }, [
          vue.createElementVNode("text", {
            style: vue.normalizeStyle({ "font-size": $props.titleFontSize, "color": $props.titleColor }),
            class: vue.normalizeClass(["uni-section__content-title", { "distraction": !$props.subTitle }])
          }, vue.toDisplayString($props.title), 7),
          $props.subTitle ? (vue.openBlock(), vue.createElementBlock("text", {
            key: 0,
            style: vue.normalizeStyle({ "font-size": $props.subTitleFontSize, "color": $props.subTitleColor }),
            class: "uni-section-header__content-sub"
          }, vue.toDisplayString($props.subTitle), 5)) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode("view", { class: "uni-section-header__slot-right" }, [
          vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
        ])
      ]),
      vue.createElementVNode("view", {
        class: "uni-section-content",
        style: vue.normalizeStyle({ padding: $options._padding })
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 4)
    ]);
  }
  var __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-f7ca1098"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-section/components/uni-section/uni-section.vue"]]);
  const _sfc_main$f = {
    name: "UniBadge",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: "error"
      },
      inverted: {
        type: Boolean,
        default: false
      },
      isDot: {
        type: Boolean,
        default: false
      },
      maxNum: {
        type: Number,
        default: 99
      },
      absolute: {
        type: String,
        default: ""
      },
      offset: {
        type: Array,
        default() {
          return [0, 0];
        }
      },
      text: {
        type: [String, Number],
        default: ""
      },
      size: {
        type: String,
        default: "small"
      },
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    },
    computed: {
      width() {
        return String(this.text).length * 8 + 12;
      },
      classNames() {
        const {
          inverted,
          type,
          size,
          absolute
        } = this;
        return [
          inverted ? "uni-badge--" + type + "-inverted" : "",
          "uni-badge--" + type,
          "uni-badge--" + size,
          absolute ? "uni-badge--absolute" : ""
        ].join(" ");
      },
      positionStyle() {
        if (!this.absolute)
          return {};
        let w = this.width / 2, h = 10;
        if (this.isDot) {
          w = 5;
          h = 5;
        }
        const x = `${-w + this.offset[0]}px`;
        const y = `${-h + this.offset[1]}px`;
        const whiteList = {
          rightTop: {
            right: x,
            top: y
          },
          rightBottom: {
            right: x,
            bottom: y
          },
          leftBottom: {
            left: x,
            bottom: y
          },
          leftTop: {
            left: x,
            top: y
          }
        };
        const match = whiteList[this.absolute];
        return match ? match : whiteList["rightTop"];
      },
      dotStyle() {
        if (!this.isDot)
          return {};
        return {
          width: "10px",
          minWidth: "0",
          height: "10px",
          padding: "0",
          borderRadius: "10px"
        };
      },
      displayValue() {
        const {
          isDot,
          text,
          maxNum
        } = this;
        return isDot ? "" : Number(text) > maxNum ? `${maxNum}+` : text;
      }
    },
    methods: {
      onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-badge--x" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.text ? (vue.openBlock(), vue.createElementBlock("text", {
        key: 0,
        class: vue.normalizeClass([$options.classNames, "uni-badge"]),
        style: vue.normalizeStyle([$options.positionStyle, $props.customStyle, $options.dotStyle]),
        onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick())
      }, vue.toDisplayString($options.displayValue), 7)) : vue.createCommentVNode("v-if", true)
    ]);
  }
  var __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-7c66581c"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-badge/components/uni-badge/uni-badge.vue"]]);
  const _sfc_main$e = {
    name: "UniListItem",
    emits: ["click", "switchChange"],
    props: {
      direction: {
        type: String,
        default: "row"
      },
      title: {
        type: String,
        default: ""
      },
      note: {
        type: String,
        default: ""
      },
      ellipsis: {
        type: [Number, String],
        default: 0
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      clickable: {
        type: Boolean,
        default: false
      },
      showArrow: {
        type: [Boolean, String],
        default: false
      },
      link: {
        type: [Boolean, String],
        default: false
      },
      to: {
        type: String,
        default: ""
      },
      showBadge: {
        type: [Boolean, String],
        default: false
      },
      showSwitch: {
        type: [Boolean, String],
        default: false
      },
      switchChecked: {
        type: [Boolean, String],
        default: false
      },
      badgeText: {
        type: String,
        default: ""
      },
      badgeType: {
        type: String,
        default: "success"
      },
      badgeStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      rightText: {
        type: String,
        default: ""
      },
      thumb: {
        type: String,
        default: ""
      },
      thumbSize: {
        type: String,
        default: "base"
      },
      showExtraIcon: {
        type: [Boolean, String],
        default: false
      },
      extraIcon: {
        type: Object,
        default() {
          return {
            type: "",
            color: "#000000",
            size: 20,
            customPrefix: ""
          };
        }
      },
      border: {
        type: Boolean,
        default: true
      },
      customStyle: {
        type: Object,
        default() {
          return {
            padding: "",
            backgroundColor: "#FFFFFF"
          };
        }
      },
      keepScrollPosition: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      "customStyle.padding": {
        handler(padding) {
          if (typeof padding == "number") {
            padding += "";
          }
          let paddingArr = padding.split(" ");
          if (paddingArr.length === 1) {
            this.padding = {
              "top": padding,
              "right": padding,
              "bottom": padding,
              "left": padding
            };
          } else if (paddingArr.length === 2) {
            this.padding = {
              "top": padding[0],
              "right": padding[1],
              "bottom": padding[0],
              "left": padding[1]
            };
          } else if (paddingArr.length === 4) {
            this.padding = {
              "top": padding[0],
              "right": padding[1],
              "bottom": padding[2],
              "left": padding[3]
            };
          }
        },
        immediate: true
      }
    },
    data() {
      return {
        isFirstChild: false,
        padding: {
          top: "",
          right: "",
          bottom: "",
          left: ""
        }
      };
    },
    mounted() {
      this.list = this.getForm();
      if (this.list) {
        if (!this.list.firstChildAppend) {
          this.list.firstChildAppend = true;
          this.isFirstChild = true;
        }
      }
    },
    methods: {
      getForm(name = "uniList") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      },
      onClick() {
        if (this.to !== "") {
          this.openPage();
          return;
        }
        if (this.clickable || this.link) {
          this.$emit("click", {
            data: {}
          });
        }
      },
      onSwitchChange(e) {
        this.$emit("switchChange", e.detail);
      },
      openPage() {
        if (["navigateTo", "redirectTo", "reLaunch", "switchTab"].indexOf(this.link) !== -1) {
          this.pageApi(this.link);
        } else {
          this.pageApi("navigateTo");
        }
      },
      pageApi(api) {
        let callback = {
          url: this.to,
          success: (res) => {
            this.$emit("click", {
              data: res
            });
          },
          fail: (err) => {
            this.$emit("click", {
              data: err
            });
          }
        };
        switch (api) {
          case "navigateTo":
            uni.navigateTo(callback);
            break;
          case "redirectTo":
            uni.redirectTo(callback);
            break;
          case "reLaunch":
            uni.reLaunch(callback);
            break;
          case "switchTab":
            uni.switchTab(callback);
            break;
          default:
            uni.navigateTo(callback);
        }
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_1$1);
    const _component_uni_badge = resolveEasycom(vue.resolveDynamicComponent("uni-badge"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass([{ "uni-list-item--disabled": $props.disabled }, "uni-list-item"]),
      style: vue.normalizeStyle({ "background-color": $props.customStyle.backgroundColor }),
      "hover-class": !$props.clickable && !$props.link || $props.disabled || $props.showSwitch ? "" : "uni-list-item--hover",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      !$data.isFirstChild ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: vue.normalizeClass(["border--left", { "uni-list--border": $props.border }])
      }, null, 2)) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", {
        class: vue.normalizeClass(["uni-list-item__container", { "container--right": $props.showArrow || $props.link, "flex--direction": $props.direction === "column" }]),
        style: vue.normalizeStyle({ paddingTop: $data.padding.top, paddingLeft: $data.padding.left, paddingRight: $data.padding.right, paddingBottom: $data.padding.bottom })
      }, [
        vue.renderSlot(_ctx.$slots, "header", {}, () => [
          vue.createElementVNode("view", { class: "uni-list-item__header" }, [
            $props.thumb ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "uni-list-item__icon"
            }, [
              vue.createElementVNode("image", {
                src: $props.thumb,
                class: vue.normalizeClass(["uni-list-item__icon-img", ["uni-list--" + $props.thumbSize]])
              }, null, 10, ["src"])
            ])) : $props.showExtraIcon ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "uni-list-item__icon"
            }, [
              vue.createVNode(_component_uni_icons, {
                customPrefix: $props.extraIcon.customPrefix,
                color: $props.extraIcon.color,
                size: $props.extraIcon.size,
                type: $props.extraIcon.type
              }, null, 8, ["customPrefix", "color", "size", "type"])
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ], true),
        vue.renderSlot(_ctx.$slots, "body", {}, () => [
          vue.createElementVNode("view", {
            class: vue.normalizeClass(["uni-list-item__content", { "uni-list-item__content--center": $props.thumb || $props.showExtraIcon || $props.showBadge || $props.showSwitch }])
          }, [
            $props.title ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: vue.normalizeClass(["uni-list-item__content-title", [$props.ellipsis !== 0 && $props.ellipsis <= 2 ? "uni-ellipsis-" + $props.ellipsis : ""]])
            }, vue.toDisplayString($props.title), 3)) : vue.createCommentVNode("v-if", true),
            $props.note ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 1,
              class: "uni-list-item__content-note"
            }, vue.toDisplayString($props.note), 1)) : vue.createCommentVNode("v-if", true)
          ], 2)
        ], true),
        vue.renderSlot(_ctx.$slots, "footer", {}, () => [
          $props.rightText || $props.showBadge || $props.showSwitch ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: vue.normalizeClass(["uni-list-item__extra", { "flex--justify": $props.direction === "column" }])
          }, [
            $props.rightText ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "uni-list-item__extra-text"
            }, vue.toDisplayString($props.rightText), 1)) : vue.createCommentVNode("v-if", true),
            $props.showBadge ? (vue.openBlock(), vue.createBlock(_component_uni_badge, {
              key: 1,
              type: $props.badgeType,
              text: $props.badgeText,
              "custom-style": $props.badgeStyle
            }, null, 8, ["type", "text", "custom-style"])) : vue.createCommentVNode("v-if", true),
            $props.showSwitch ? (vue.openBlock(), vue.createElementBlock("switch", {
              key: 2,
              disabled: $props.disabled,
              checked: $props.switchChecked,
              onChange: _cache[0] || (_cache[0] = (...args) => $options.onSwitchChange && $options.onSwitchChange(...args))
            }, null, 40, ["disabled", "checked"])) : vue.createCommentVNode("v-if", true)
          ], 2)) : vue.createCommentVNode("v-if", true)
        ], true)
      ], 6),
      $props.showArrow || $props.link ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
        key: 1,
        size: 16,
        class: "uni-icon-wrapper",
        color: "#bbb",
        type: "arrowright"
      })) : vue.createCommentVNode("v-if", true)
    ], 14, ["hover-class"]);
  }
  var __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-296a3d7e"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-list/components/uni-list-item/uni-list-item.vue"]]);
  const _sfc_main$d = {
    name: "uniList",
    "mp-weixin": {
      options: {
        multipleSlots: false
      }
    },
    props: {
      stackFromEnd: {
        type: Boolean,
        default: false
      },
      enableBackToTop: {
        type: [Boolean, String],
        default: false
      },
      scrollY: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: Boolean,
        default: true
      },
      renderReverse: {
        type: Boolean,
        default: false
      }
    },
    created() {
      this.firstChildAppend = false;
    },
    methods: {
      loadMore(e) {
        this.$emit("scrolltolower");
      },
      scroll(e) {
        this.$emit("scroll", e);
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-list uni-border-top-bottom" }, [
      $props.border ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-list--border-top"
      })) : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.border ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "uni-list--border-bottom"
      })) : vue.createCommentVNode("v-if", true)
    ]);
  }
  var __easycom_7 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-5009d455"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-list/components/uni-list/uni-list.vue"]]);
  const _sfc_main$c = {
    data() {
      return {
        icon_color: "",
        user: {}
      };
    },
    onLoad() {
      $request({
        url: "/user/self",
        method: "POST"
      }).then((res) => {
        user = res.data;
      }).catch((err) => {
        formatAppLog("log", "at pages/self/self.vue:88", err.code + err.msg);
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
          uni.navigateTo({
            url: "/pages/self/self_update/self_update?id=" + this.user.id
          });
        } else if (index == 3)
          ;
        else {
          uni.navigateTo({
            url: "/pages/self/self_detail/self_detail?id=" + this.user.id
          });
        }
      },
      openFocus() {
        uni.navigateTo({
          url: "/pages/focus/focus"
        });
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0);
    const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_1$2);
    const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_0$1);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_1$1);
    const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_4$1);
    const _component_uni_section = resolveEasycom(vue.resolveDynamicComponent("uni-section"), __easycom_5);
    const _component_uni_list_item = resolveEasycom(vue.resolveDynamicComponent("uni-list-item"), __easycom_6);
    const _component_uni_list = resolveEasycom(vue.resolveDynamicComponent("uni-list"), __easycom_7);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_uni_nav_bar, {
        fixed: true,
        height: "80rpx",
        title: "\u6211\u7684"
      }),
      vue.createCommentVNode(" \u4E2A\u4EBA\u680F "),
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", {
            class: "margin_15 radious_20",
            style: { "height": "200rpx", "background-color": "aliceblue" }
          }, [
            vue.createVNode(_component_uni_col, { span: 6 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  style: { "height": "200rpx" },
                  class: "aligin_center_item"
                }, [
                  vue.createElementVNode("image", {
                    src: "/static/faces/3-thump.jpg",
                    class: "image_user"
                  })
                ])
              ]),
              _: 1
            }),
            vue.createVNode(_component_uni_col, { span: 11 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  style: { "height": "160rpx" },
                  class: "padding_20"
                }, [
                  vue.createVNode(_component_uni_row, null, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("view", {
                        class: "margin_10",
                        style: { "font-size": "45rpx" }
                      }, [
                        vue.createElementVNode("text", { class: "margin_left_15" }, vue.toDisplayString($data.user.nickname), 1)
                      ])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_uni_row, null, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("view", {
                        class: "margin_10 padding_20",
                        style: { "font-size": "30rpx" }
                      }, [
                        vue.createVNode(_component_uni_col, { span: 12 }, {
                          default: vue.withCtx(() => [
                            vue.createElementVNode("view", {
                              onClick: _cache[0] || (_cache[0] = (...args) => $options.openFocus && $options.openFocus(...args)),
                              "hover-class": "click_nav",
                              class: "font_grey"
                            }, [
                              vue.createElementVNode("text", null, "\u5173\u6CE8 "),
                              vue.createElementVNode("text", null, vue.toDisplayString($data.user.focusNum), 1)
                            ])
                          ]),
                          _: 1
                        }),
                        vue.createVNode(_component_uni_col, { span: 12 }, {
                          default: vue.withCtx(() => [
                            vue.createElementVNode("view", {
                              onClick: _cache[1] || (_cache[1] = (...args) => $options.openFocus && $options.openFocus(...args)),
                              "hover-class": "click_nav",
                              class: "font_grey"
                            }, [
                              vue.createElementVNode("text", null, "\u7C89\u4E1D "),
                              vue.createElementVNode("text", null, vue.toDisplayString($data.user.focusedNum), 1)
                            ])
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  })
                ])
              ]),
              _: 1
            }),
            vue.createVNode(_component_uni_col, { span: 7 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  style: { "height": "200rpx" },
                  class: "aligin_center_item",
                  onClick: _cache[3] || (_cache[3] = ($event) => $options.change())
                }, [
                  vue.createElementVNode("view", {
                    class: "aligin_center_item_left",
                    "hover-class": "click_nav",
                    onClick: _cache[2] || (_cache[2] = ($event) => $options.openPage(4))
                  }, [
                    vue.createElementVNode("text", { class: "margin_right_10" }, "\u4E3B\u9875"),
                    vue.createVNode(_component_uni_icons, {
                      color: $data.icon_color,
                      type: "right"
                    }, null, 8, ["color"])
                  ])
                ])
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      }),
      vue.createCommentVNode(" \u4E2A\u4EBA\u4FE1\u606F\u680F "),
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "border_tb" }, [
            vue.createVNode(_component_uni_section, {
              title: "\u4F7F\u7528\u63D0\u793A",
              type: "line"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_card, {
                  "is-shadow": false,
                  "is-full": ""
                }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("text", { class: "uni-h6" }, "\u4E3A\u4E86\u65B9\u4FBF\u5927\u5BB6\u80FD\u627E\u5230\u5FD7\u540C\u9053\u5408\u7684\u670B\u53CB\uFF0C\u5EFA\u8BAE\u5B8C\u5584\u9662\u6821\u4E13\u4E1A\u548C\u90AE\u7BB1\u7684\u76F8\u5173\u4FE1\u606F\uFF1B\u5982\u6709\u4F7F\u7528\u4F53\u9A8C\u7684\u4E0D\u9002\u8BF7\u70B9\u51FB\u4E0B\u65B9\u5E2E\u52A9\u4E0E\u53CD\u9988\u53D1\u9001\u90AE\u4EF6\u3002")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      }),
      vue.createCommentVNode(" \u76F8\u5173\u9009\u9879 "),
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "margin_top_20" }, [
            vue.createVNode(_component_uni_list, null, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_list_item, {
                  title: "\u6211\u7684\u6536\u85CF",
                  clickable: "",
                  showArrow: "",
                  onClick: _cache[4] || (_cache[4] = ($event) => $options.openPage(1))
                }),
                vue.createVNode(_component_uni_list_item, {
                  title: "\u7F16\u8F91\u8D44\u6599",
                  clickable: "",
                  showArrow: "",
                  onClick: _cache[5] || (_cache[5] = ($event) => $options.openPage(2))
                }),
                vue.createVNode(_component_uni_list_item, {
                  title: "\u8BBE\u7F6E",
                  clickable: "",
                  showArrow: "",
                  onClick: _cache[6] || (_cache[6] = ($event) => $options.openPage(3))
                }),
                vue.createVNode(_component_uni_list_item, {
                  title: "\u5E2E\u52A9\u4E0E\u53CD\u9988",
                  clickable: "",
                  showArrow: ""
                })
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      })
    ]);
  }
  var PagesSelfSelf = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__file", "D:/dachuang/uniapp_client/Client/pages/self/self.vue"]]);
  const _sfc_main$b = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  var PagesTestTest = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__file", "D:/dachuang/uniapp_client/Client/pages/test/test.vue"]]);
  const _sfc_main$a = {
    name: "uniLink",
    props: {
      href: {
        type: String,
        default: ""
      },
      text: {
        type: String,
        default: ""
      },
      download: {
        type: String,
        default: ""
      },
      showUnderLine: {
        type: [Boolean, String],
        default: true
      },
      copyTips: {
        type: String,
        default: "\u5DF2\u81EA\u52A8\u590D\u5236\u7F51\u5740\uFF0C\u8BF7\u5728\u624B\u673A\u6D4F\u89C8\u5668\u91CC\u7C98\u8D34\u8BE5\u7F51\u5740"
      },
      color: {
        type: String,
        default: "#999999"
      },
      fontSize: {
        type: [Number, String],
        default: 14
      }
    },
    computed: {
      isShowA() {
        if ((this.isMail() || this.isTel()) && this._isH5 === true) {
          return true;
        }
        return false;
      }
    },
    created() {
      this._isH5 = null;
    },
    methods: {
      isMail() {
        return this.href.startsWith("mailto:");
      },
      isTel() {
        return this.href.startsWith("tel:");
      },
      openURL() {
        if (this.isTel()) {
          this.makePhoneCall(this.href.replace("tel:", ""));
        } else {
          plus.runtime.openURL(this.href);
        }
      },
      makePhoneCall(phoneNumber) {
        uni.makePhoneCall({
          phoneNumber
        });
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return $options.isShowA ? (vue.openBlock(), vue.createElementBlock("a", {
      key: 0,
      class: vue.normalizeClass(["uni-link", { "uni-link--withline": $props.showUnderLine === true || $props.showUnderLine === "true" }]),
      href: $props.href,
      style: vue.normalizeStyle({ color: $props.color, fontSize: $props.fontSize + "px" }),
      download: $props.download
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, () => [
        vue.createTextVNode(vue.toDisplayString($props.text), 1)
      ], true)
    ], 14, ["href", "download"])) : (vue.openBlock(), vue.createElementBlock("text", {
      key: 1,
      class: vue.normalizeClass(["uni-link", { "uni-link--withline": $props.showUnderLine === true || $props.showUnderLine === "true" }]),
      style: vue.normalizeStyle({ color: $props.color, fontSize: $props.fontSize + "px" }),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.openURL && $options.openURL(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, () => [
        vue.createTextVNode(vue.toDisplayString($props.text), 1)
      ], true)
    ], 6));
  }
  var __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-6c93f7f9"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-link/components/uni-link/uni-link.vue"]]);
  var self_$1;
  const _sfc_main$9 = {
    data() {
      return {
        is_self: true,
        is_focus: false,
        nav_show: false,
        swiperIndex: 0,
        user: {},
        currentUser: {}
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
          let date = new Date(time2);
          return date.toLocaleString("zh-CN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          });
        };
      }
    },
    onLoad(option) {
      formatAppLog("log", "at pages/self/self_detail/self_detail.vue:238", option.id);
      $request({
        url: "/selfById",
        method: "POST",
        data: {
          userId: option.id
        }
      }).then((res) => {
        this.user = res.data;
      }).catch((err) => {
        formatAppLog("log", "at pages/self/self_detail/self_detail.vue:249", err.code + err.msg);
      });
      $request({
        url: "/self",
        method: "POST"
      }).then((res) => {
        this.currentUser = res.data;
      }).catch((err) => {
        formatAppLog("log", "at pages/self/self_detail/self_detail.vue:258", err.code + err.msg);
      });
    },
    onShow() {
      self_$1.judgeSelf();
    },
    created() {
      self_$1 = this;
    },
    onPageScroll() {
      self_$1.nav_fixed_top();
    },
    methods: {
      swiperChage(e) {
        this.swiperIndex = e.detail.current;
        formatAppLog("log", "at pages/self/self_detail/self_detail.vue:274", e.detail.current);
      },
      nav_fixed_top() {
        const query = uni.createSelectorQuery().in(this);
        let tep = 0;
        query.select("#navTop").boundingClientRect((data) => {
          tep = data.top;
          if (tep <= 0) {
            this.nav_show = true;
          } else {
            this.nav_show = false;
          }
        }).exec();
      },
      selfUpdate() {
        uni.navigateTo({
          url: "/pages/self/self_update/self_update"
        });
      },
      judgeSelf() {
        if (this.user.id == this.currentUser.id) {
          this.is_self = true;
        } else {
          this.is_self = false;
        }
        for (let i = 0; i < this.user.focused.length; i++) {
          if (this.currentUser.id == this.user.focused[i].id) {
            this.is_focus = true;
            return;
          }
        }
        this.is_focus = false;
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_1$2);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_1$1);
    const _component_uni_link = resolveEasycom(vue.resolveDynamicComponent("uni-link"), __easycom_2$1);
    const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", {
            style: { "height": "180rpx" },
            class: "aligin_center_text_left border_line_grey_bt"
          }, [
            vue.createVNode(_component_uni_col, { span: 8 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  class: "margin_lr_50",
                  style: { "height": "150rpx", "width": "150rpx", "border-radius": "150rpx" }
                }, [
                  vue.createElementVNode("image", {
                    class: "fill",
                    src: $data.user.avatar
                  }, null, 8, ["src"])
                ])
              ]),
              _: 1
            }),
            vue.createVNode(_component_uni_col, { span: 16 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  class: "padding_right_50 aligin_center_item_right",
                  style: { "height": "180rpx" }
                }, [
                  vue.withDirectives(vue.createElementVNode("button", {
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.selfUpdate && $options.selfUpdate(...args)),
                    class: "margin_none",
                    size: "mini",
                    type: "warn",
                    plain: "true"
                  }, "\u7F16\u8F91", 512), [
                    [vue.vShow, $data.is_self]
                  ]),
                  vue.withDirectives(vue.createElementVNode("button", {
                    class: "margin_none",
                    size: "mini",
                    type: "primary",
                    plain: "true"
                  }, "\u5173\u6CE8", 512), [
                    [vue.vShow, $data.is_focus]
                  ]),
                  vue.withDirectives(vue.createElementVNode("button", {
                    class: "margin_none",
                    size: "mini",
                    disabled: "true"
                  }, "\u5DF2\u5173\u6CE8", 512), [
                    [vue.vShow, $data.is_focus]
                  ])
                ])
              ]),
              _: 1
            })
          ]),
          vue.createElementVNode("view", { class: "margin_bottom_20" }, [
            vue.createElementVNode("view", { class: "margin_lr_50 self_detail_text" }, [
              vue.createElementVNode("view", {
                style: {},
                class: "margin_bt_15 aligin_center_item_left"
              }, vue.toDisplayString($data.user.nickname), 1),
              vue.createElementVNode("view", {
                style: {},
                class: "margin_bt_15 aligin_center_item_left"
              }, vue.toDisplayString($data.user.college), 1),
              vue.createElementVNode("view", {
                style: {},
                class: "margin_bt_15 aligin_center_item_left"
              }, vue.toDisplayString(_ctx.college.major), 1),
              vue.createElementVNode("view", {
                style: {},
                class: "margin_bt_15 aligin_center_item_left"
              }, [
                vue.createVNode(_component_uni_icons, {
                  color: "#808080",
                  type: "mail-open-filled",
                  size: "22"
                }),
                vue.createElementVNode("view", { class: "margin_left_20" }),
                vue.createElementVNode("view", null, vue.toDisplayString($data.user.email), 1)
              ]),
              vue.createElementVNode("view", {
                style: {},
                class: "margin_bt_15 aligin_center_item_left"
              }, [
                vue.createVNode(_component_uni_icons, {
                  color: "#808080",
                  type: "navigate",
                  size: "22"
                }),
                vue.createElementVNode("view", { class: "margin_left_20" }),
                vue.createVNode(_component_uni_link, {
                  href: $data.user.blog,
                  text: $data.user.blog,
                  color: "#03dac5"
                }, null, 8, ["href", "text"])
              ]),
              vue.createElementVNode("view", {
                style: {},
                class: "margin_bt_15 aligin_center_item_left"
              }, [
                vue.createVNode(_component_uni_icons, {
                  color: "#808080",
                  type: "flag",
                  size: "22"
                }),
                vue.createElementVNode("view", { class: "margin_left_20" }),
                vue.createElementVNode("view", null, vue.toDisplayString($data.user.description), 1)
              ])
            ])
          ])
        ]),
        _: 1
      }),
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createCommentVNode(" \u4E0A\u6ED1\u6307\u793A\u7EBF "),
          vue.createElementVNode("view", {
            id: "navTop",
            class: "border_line_grey"
          }),
          vue.createCommentVNode(" \u4E0A\u6ED1\u56FA\u5B9A "),
          vue.withDirectives(vue.createElementVNode("view", { style: { "height": "110rpx" } }, [
            vue.createElementVNode("view", {
              style: { "height": "100rpx", "width": "100%" },
              class: "baiyan fixed"
            }, [
              vue.createVNode(_component_uni_col, { span: 12 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", {
                    class: "aligin_center_item",
                    style: { "height": "90rpx" }
                  }, [
                    vue.createElementVNode("text", {
                      class: vue.normalizeClass(["aligin_center_item height_100per", { "border_line": $data.swiperIndex == 0 }])
                    }, "\u6587\u7AE0", 2)
                  ])
                ]),
                _: 1
              }),
              vue.createVNode(_component_uni_col, { span: 12 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", {
                    class: "aligin_center_item",
                    style: { "height": "90rpx" }
                  }, [
                    vue.createElementVNode("text", {
                      class: vue.normalizeClass(["aligin_center_item height_100per", { "border_line": $data.swiperIndex == 1 }])
                    }, "\u8D5B\u4E8B", 2)
                  ])
                ]),
                _: 1
              })
            ])
          ], 512), [
            [vue.vShow, $data.nav_show]
          ]),
          vue.createCommentVNode(" \u4E0A\u6ED1\u9690\u85CF "),
          vue.withDirectives(vue.createElementVNode("view", { style: { "height": "110rpx" } }, [
            vue.createElementVNode("view", {
              style: { "height": "100rpx", "width": "100%" },
              class: "baiyan"
            }, [
              vue.createVNode(_component_uni_col, { span: 12 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", {
                    class: "aligin_center_item",
                    style: { "height": "90rpx" }
                  }, [
                    vue.createElementVNode("text", {
                      class: vue.normalizeClass(["aligin_center_item height_100per", { "border_line": $data.swiperIndex == 0 }])
                    }, "\u6587\u7AE0", 2)
                  ])
                ]),
                _: 1
              }),
              vue.createVNode(_component_uni_col, { span: 12 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", {
                    class: "aligin_center_item",
                    style: { "height": "90rpx" }
                  }, [
                    vue.createElementVNode("text", {
                      class: vue.normalizeClass(["aligin_center_item height_100per", { "border_line": $data.swiperIndex == 1 }])
                    }, "\u8D5B\u4E8B", 2)
                  ])
                ]),
                _: 1
              })
            ])
          ], 512), [
            [vue.vShow, !$data.nav_show]
          ])
        ]),
        _: 1
      }),
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("swiper", {
            style: { "height": "1200rpx" },
            onChange: _cache[1] || (_cache[1] = (...args) => $options.swiperChage && $options.swiperChage(...args))
          }, [
            vue.createCommentVNode(" \u6587\u7AE0 "),
            vue.createElementVNode("swiper-item", null, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.user.articles, (article, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: _ctx.articles.id
                }, [
                  vue.createCommentVNode(" \u6587\u7AE0\u9884\u89C8\u5361\u7247 "),
                  vue.createElementVNode("view", { class: "border_line_grey_bt margin_top_20 padding_rl_20" }, [
                    vue.createVNode(_component_uni_row, null, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { style: { "height": "75rpx" } }, [
                          vue.createVNode(_component_uni_col, { span: 2 }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("view", {
                                class: "fill aligin_center_text_left",
                                style: { "height": "75rpx" }
                              }, [
                                vue.createElementVNode("image", {
                                  class: "sec_avatar",
                                  src: article.user.avatar
                                }, null, 8, ["src"])
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          vue.createVNode(_component_uni_col, { span: 17 }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("view", {
                                class: "fill aligin_center_text_left",
                                style: { "height": "75rpx", "overflow": "hidden" }
                              }, [
                                vue.createElementVNode("text", null, vue.toDisplayString(article.user.nickname), 1)
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          vue.createVNode(_component_uni_col, { span: 5 }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("view", {
                                class: "fill aligin_center_text_right",
                                style: { "height": "75rpx" }
                              }, [
                                vue.createVNode(_component_uni_icons, { type: "more-filled" }),
                                vue.createElementVNode("text", null, vue.toDisplayString("\xA0"))
                              ])
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 2
                    }, 1024),
                    vue.createVNode(_component_uni_row, null, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { style: { "height": "175rpx" } }, [
                          vue.createVNode(_component_uni_col, { span: 16 }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("view", {
                                class: "fill",
                                style: { "height": "175rpx" }
                              }, [
                                vue.createVNode(_component_uni_row, null, {
                                  default: vue.withCtx(() => [
                                    vue.createElementVNode("view", {
                                      class: "fill padding_top_10",
                                      style: { "height": "110rpx" }
                                    }, [
                                      vue.createElementVNode("view", { class: "fill white-space" }, vue.toDisplayString(article.title), 1)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024),
                                vue.createVNode(_component_uni_row, null, {
                                  default: vue.withCtx(() => [
                                    vue.createElementVNode("view", {
                                      class: "fill aligin_center_text_left",
                                      style: { "height": "60rpx" }
                                    }, [
                                      vue.createElementVNode("view", { class: "sec_message" }, [
                                        vue.createTextVNode(" \u8BC4\u8BBA:"),
                                        vue.createElementVNode("text", null, vue.toDisplayString(article.commentsNum), 1)
                                      ]),
                                      vue.createElementVNode("view", { class: "sec_message" }, [
                                        vue.createTextVNode(" \u70B9\u8D5E:"),
                                        vue.createElementVNode("text", null, vue.toDisplayString(article.likesNum), 1)
                                      ]),
                                      vue.createElementVNode("view", { class: "sec_message" }, vue.toDisplayString($options.formatDate(article.createdTime)), 1)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          vue.createVNode(_component_uni_col, { span: 8 }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("view", {
                                class: "fill aligin_center_item",
                                style: { "height": "175rpx" }
                              }, [
                                vue.createElementVNode("image", {
                                  mode: "scaleToFill",
                                  style: { "height": "160rpx", "width": "220rpx", "border-radius": "8rpx" },
                                  src: article.avatar
                                }, null, 8, ["src"])
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]);
              }), 128))
            ]),
            vue.createCommentVNode(" \u8D5B\u4E8B "),
            vue.createElementVNode("swiper-item", null, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.user.events, (event, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: event.id
                }, [
                  vue.createCommentVNode(" \u8D5B\u4E8B\u5361\u7247 \uFF08\u5361\u7247\u4E2D\u56FE\u7247\u9ED8\u8BA4\u63D0\u4F9B\u51E0\u79CD\uFF09"),
                  vue.createElementVNode("view", {
                    class: "margin_top_20 margin_lr_10 box_radius_20 overflowHide baiyan",
                    style: { "position": "relative" }
                  }, [
                    vue.createCommentVNode(" \u8D5B\u4E8B\u72B6\u6001 "),
                    vue.createElementVNode("view", {
                      style: { "height": "55rpx", "width": "150rpx" },
                      class: vue.normalizeClass(["absolute_event_status box_radius_20 aligin_center_item", $options.event_status(event)])
                    }, vue.toDisplayString(event.status), 3),
                    vue.createCommentVNode(" \u56FE\u7247 "),
                    vue.createElementVNode("view", { style: { "height": "230rpx", "width": "100%", "background-color": "antiquewhite" } }, [
                      vue.createElementVNode("image", {
                        class: "fill",
                        src: event.avatar
                      }, null, 8, ["src"])
                    ]),
                    vue.createCommentVNode(" \u4FE1\u606F "),
                    vue.createElementVNode("view", { class: "margin_lr_10 margin_bt_15" }, [
                      vue.createElementVNode("view", { class: "fill_width eventTitle padding_tb_10 overflowHide" }, [
                        vue.createElementVNode("text", null, vue.toDisplayString(event.title), 1)
                      ]),
                      vue.createCommentVNode(" \u65F6\u95F4 "),
                      vue.createElementVNode("view", { class: "fill_width aligin_center_text_left eventTime margin_top_5" }, [
                        vue.createElementVNode("view", {
                          class: "margin_right_10",
                          style: { "color": "black" }
                        }, "\u62A5\u540D\u65F6\u95F4 \uFF1A"),
                        vue.createElementVNode("view", { class: "margin_lr_10" }, vue.toDisplayString($options.formatDate(event.registerAt)), 1),
                        vue.createElementVNode("view", null, "--"),
                        vue.createElementVNode("view", { class: "margin_lr_10" }, vue.toDisplayString($options.formatDate(event.registerEnd)), 1)
                      ]),
                      vue.createElementVNode("view", { class: "fill_width aligin_center_text_left eventTime margin_top_5" }, [
                        vue.createElementVNode("view", {
                          class: "margin_right_10",
                          style: { "color": "black" }
                        }, "\u7ED3\u675F\u65F6\u95F4 \uFF1A"),
                        vue.createElementVNode("view", { class: "margin_lr_10" }, vue.toDisplayString($options.formatDate(event.progressAt)), 1),
                        vue.createElementVNode("view", null, "--"),
                        vue.createElementVNode("view", { class: "margin_lr_10" }, vue.toDisplayString($options.formatDate(event.progressEnd)), 1)
                      ]),
                      vue.createElementVNode("view", { class: "fill_width aligin_center_text_left margin_bt_15 event_other" }, [
                        vue.createElementVNode("view", { class: "margin_right_10" }, "\u4E3B\u529E\u65B9\uFF1A"),
                        vue.createElementVNode("view", { class: "margin_left_15" }, vue.toDisplayString(event.company), 1)
                      ]),
                      vue.createElementVNode("view", { class: "fill_width aligin_center_text_left event_other" }, [
                        vue.createElementVNode("view", null, "\u6536\u85CF\uFF1A " + vue.toDisplayString(event.favoritesNum), 1),
                        vue.createElementVNode("view", { class: "margin_lr_50" }, "|"),
                        vue.createElementVNode("view", null, "\u8BC4\u8BBA\uFF1A" + vue.toDisplayString(event.commentsNum), 1),
                        vue.createElementVNode("view", { class: "margin_lr_50" }, "|"),
                        vue.createElementVNode("view", null, "\u7EA7\u522B\uFF1A" + vue.toDisplayString(event.level.name), 1)
                      ])
                    ])
                  ])
                ]);
              }), 128))
            ])
          ], 32)
        ]),
        _: 1
      })
    ]);
  }
  var PagesSelfSelf_detailSelf_detail = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__file", "D:/dachuang/uniapp_client/Client/pages/self/self_detail/self_detail.vue"]]);
  var popup = {
    data() {
      return {};
    },
    created() {
      this.popup = this.getParent();
    },
    methods: {
      getParent(name = "uniPopup") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  var en = {
    "uni-popup.cancel": "cancel",
    "uni-popup.ok": "ok",
    "uni-popup.placeholder": "pleace enter",
    "uni-popup.title": "Hint",
    "uni-popup.shareTitle": "Share to"
  };
  var zhHans = {
    "uni-popup.cancel": "\u53D6\u6D88",
    "uni-popup.ok": "\u786E\u5B9A",
    "uni-popup.placeholder": "\u8BF7\u8F93\u5165",
    "uni-popup.title": "\u63D0\u793A",
    "uni-popup.shareTitle": "\u5206\u4EAB\u5230"
  };
  var zhHant = {
    "uni-popup.cancel": "\u53D6\u6D88",
    "uni-popup.ok": "\u78BA\u5B9A",
    "uni-popup.placeholder": "\u8ACB\u8F38\u5165",
    "uni-popup.title": "\u63D0\u793A",
    "uni-popup.shareTitle": "\u5206\u4EAB\u5230"
  };
  var messages = {
    en,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant
  };
  const { t } = initVueI18n(messages);
  const _sfc_main$8 = {
    name: "uniPopupDialog",
    mixins: [popup],
    emits: ["confirm", "close"],
    props: {
      inputType: {
        type: String,
        default: "text"
      },
      value: {
        type: [String, Number],
        default: ""
      },
      placeholder: {
        type: [String, Number],
        default: ""
      },
      type: {
        type: String,
        default: "error"
      },
      mode: {
        type: String,
        default: "base"
      },
      title: {
        type: String,
        default: ""
      },
      content: {
        type: String,
        default: ""
      },
      beforeClose: {
        type: Boolean,
        default: false
      },
      cancelText: {
        type: String,
        default: ""
      },
      confirmText: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        dialogType: "error",
        focus: false,
        val: ""
      };
    },
    computed: {
      okText() {
        return this.confirmText || t("uni-popup.ok");
      },
      closeText() {
        return this.cancelText || t("uni-popup.cancel");
      },
      placeholderText() {
        return this.placeholder || t("uni-popup.placeholder");
      },
      titleText() {
        return this.title || t("uni-popup.title");
      }
    },
    watch: {
      type(val) {
        this.dialogType = val;
      },
      mode(val) {
        if (val === "input") {
          this.dialogType = "info";
        }
      },
      value(val) {
        this.val = val;
      }
    },
    created() {
      this.popup.disableMask();
      if (this.mode === "input") {
        this.dialogType = "info";
        this.val = this.value;
      } else {
        this.dialogType = this.type;
      }
    },
    mounted() {
      this.focus = true;
    },
    methods: {
      onOk() {
        if (this.mode === "input") {
          this.$emit("confirm", this.val);
        } else {
          this.$emit("confirm");
        }
        if (this.beforeClose)
          return;
        this.popup.close();
      },
      closeDialog() {
        this.$emit("close");
        if (this.beforeClose)
          return;
        this.popup.close();
      },
      close() {
        this.popup.close();
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-popup-dialog" }, [
      vue.createElementVNode("view", { class: "uni-dialog-title" }, [
        vue.createElementVNode("text", {
          class: vue.normalizeClass(["uni-dialog-title-text", ["uni-popup__" + $data.dialogType]])
        }, vue.toDisplayString($options.titleText), 3)
      ]),
      $props.mode === "base" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-dialog-content"
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode("text", { class: "uni-dialog-content-text" }, vue.toDisplayString($props.content), 1)
        ], true)
      ])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "uni-dialog-content"
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.withDirectives(vue.createElementVNode("input", {
            class: "uni-dialog-input",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.val = $event),
            type: $props.inputType,
            placeholder: $options.placeholderText,
            focus: $data.focus
          }, null, 8, ["type", "placeholder", "focus"]), [
            [vue.vModelDynamic, $data.val]
          ])
        ], true)
      ])),
      vue.createElementVNode("view", { class: "uni-dialog-button-group" }, [
        vue.createElementVNode("view", {
          class: "uni-dialog-button",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.closeDialog && $options.closeDialog(...args))
        }, [
          vue.createElementVNode("text", { class: "uni-dialog-button-text" }, vue.toDisplayString($options.closeText), 1)
        ]),
        vue.createElementVNode("view", {
          class: "uni-dialog-button uni-border-left",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.onOk && $options.onOk(...args))
        }, [
          vue.createElementVNode("text", { class: "uni-dialog-button-text uni-button-color" }, vue.toDisplayString($options.okText), 1)
        ])
      ])
    ]);
  }
  var __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-6f54520a"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue"]]);
  const _sfc_main$7 = {
    name: "uniPopupMessage",
    mixins: [popup],
    props: {
      type: {
        type: String,
        default: "success"
      },
      message: {
        type: String,
        default: ""
      },
      duration: {
        type: Number,
        default: 3e3
      },
      maskShow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {};
    },
    created() {
      this.popup.maskShow = this.maskShow;
      this.popup.messageChild = this;
    },
    methods: {
      timerClose() {
        if (this.duration === 0)
          return;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.popup.close();
        }, this.duration);
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-popup-message" }, [
      vue.createElementVNode("view", {
        class: vue.normalizeClass(["uni-popup-message__box fixforpc-width", "uni-popup__" + $props.type])
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode("text", {
            class: vue.normalizeClass(["uni-popup-message-text", "uni-popup__" + $props.type + "-text"])
          }, vue.toDisplayString($props.message), 3)
        ], true)
      ], 2)
    ]);
  }
  var __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-38167fe2"], ["__file", "D:/dachuang/uniapp_client/Client/uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.vue"]]);
  var self_;
  const _sfc_main$6 = {
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
      formatAppLog("log", "at pages/self/self_update/self_update.vue:96", option.id);
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
        uni.chooseImage({
          count: 1,
          sizeType: "origin",
          sourceType: "album",
          success: function(res) {
            formatAppLog("log", "at pages/self/self_update/self_update.vue:114", JSON.stringify(res.tempFilePaths));
            formatAppLog("log", "at pages/self/self_update/self_update.vue:115", JSON.stringify(res.tempFiles));
            const tempFilePath = res.tempFilePaths;
            self_.formData.avatar = [tempFilePath];
            self_.avatarSrc = res.tempFilePaths;
            formatAppLog("log", "at pages/self/self_update/self_update.vue:119", JSON.stringify(self_.formData.avatar));
          }
        });
      },
      dialogInputConfirm(value) {
        formatAppLog("log", "at pages/self/self_update/self_update.vue:125", "\u70B9\u51FB\u786E\u8BA4");
        formatAppLog("log", "at pages/self/self_update/self_update.vue:126", value);
        this.msgType = "success";
        this.messageText = "Test";
        this.$refs.message.open();
      },
      dialogInputConfirm2(value) {
        formatAppLog("log", "at pages/self/self_update/self_update.vue:135", "\u70B9\u51FB\u786E\u8BA42");
        formatAppLog("log", "at pages/self/self_update/self_update.vue:136", value);
        self_.dosomething(value);
      },
      dosomething(value) {
        let dialogIndex = this.dialogIndex;
        if (dialogIndex == 2) {
          this.user.college = value;
          formatAppLog("log", "at pages/self/self_update/self_update.vue:143", this.user.college);
        } else if (dialogIndex == 3) {
          this.user.major = value;
          formatAppLog("log", "at pages/self/self_update/self_update.vue:146", this.user.major);
        } else if (dialogIndex == 4) {
          this.user.email = value;
          formatAppLog("log", "at pages/self/self_update/self_update.vue:149", this.user.email);
        } else if (dialogIndex == 5) {
          this.user.blog = value;
          formatAppLog("log", "at pages/self/self_update/self_update.vue:152", this.user.blog);
        } else if (dialogIndex == 6) {
          this.user.description = value;
          formatAppLog("log", "at pages/self/self_update/self_update.vue:156", this.user.description);
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
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_1$2);
    const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_0$1);
    const _component_uni_popup_dialog = resolveEasycom(vue.resolveDynamicComponent("uni-popup-dialog"), __easycom_2);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_3);
    const _component_uni_popup_message = resolveEasycom(vue.resolveDynamicComponent("uni-popup-message"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", {
            style: { "height": "100rpx" },
            class: "border_line_grey_b_tiny align"
          }, [
            vue.createVNode(_component_uni_col, { span: 12 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  class: "aligin_center_item_left fill",
                  style: { "height": "100rpx" }
                }, [
                  vue.createElementVNode("image", {
                    class: "margin_left_50",
                    style: { "height": "80rpx", "width": "80rpx", "border-radius": "80rpx" },
                    src: $data.user.avatar
                  }, null, 8, ["src"])
                ])
              ]),
              _: 1
            }),
            vue.createVNode(_component_uni_col, { span: 12 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  class: "aligin_center_item_right margin_right_50",
                  style: { "height": "100rpx" }
                }, [
                  vue.createElementVNode("button", {
                    class: "margin_none",
                    size: "mini",
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.chooseImage && $options.chooseImage(...args))
                  }, "\u4E0A\u4F20")
                ])
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      }),
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", {
            onClick: _cache[1] || (_cache[1] = ($event) => $options.dialogOpen(1)),
            style: { "height": "100rpx" },
            class: "border_line_grey_b_tiny aligin_center_item_left padding_rl_50"
          }, [
            vue.createElementVNode("view", {
              style: { "width": "50%" },
              class: "margin_right_10"
            }, "\u6635\u79F0\uFF1A"),
            vue.createElementVNode("view", {
              style: { "width": "50%", "color": "grey", "font-size": "30rpx" },
              class: "aligin_center_item_right"
            }, vue.toDisplayString($data.user.nickname), 1)
          ]),
          vue.createElementVNode("view", {
            onClick: _cache[2] || (_cache[2] = ($event) => $options.dialogOpen(2)),
            style: { "height": "100rpx" },
            class: "border_line_grey_b_tiny aligin_center_item_left padding_rl_50"
          }, [
            vue.createElementVNode("view", {
              style: { "width": "50%" },
              class: "margin_right_10"
            }, "\u5B66\u6821\uFF1A"),
            vue.createElementVNode("view", {
              style: { "width": "50%", "color": "grey", "font-size": "30rpx" },
              class: "aligin_center_item_right"
            }, vue.toDisplayString($data.user.college), 1)
          ]),
          vue.createElementVNode("view", {
            onClick: _cache[3] || (_cache[3] = ($event) => $options.dialogOpen(3)),
            style: { "height": "100rpx" },
            class: "border_line_grey_b_tiny aligin_center_item_left padding_rl_50"
          }, [
            vue.createElementVNode("view", {
              style: { "width": "50%" },
              class: "margin_right_10"
            }, "\u4E13\u4E1A\uFF1A"),
            vue.createElementVNode("view", {
              style: { "width": "50%", "color": "grey", "font-size": "30rpx" },
              class: "aligin_center_item_right"
            }, vue.toDisplayString($data.user.major), 1)
          ]),
          vue.createElementVNode("view", {
            onClick: _cache[4] || (_cache[4] = ($event) => $options.dialogOpen(4)),
            style: { "height": "100rpx" },
            class: "border_line_grey_b_tiny aligin_center_item_left padding_rl_50"
          }, [
            vue.createElementVNode("view", {
              style: { "width": "50%" },
              class: "margin_right_10"
            }, "\u90AE\u7BB1\uFF1A"),
            vue.createElementVNode("view", {
              style: { "width": "50%", "color": "grey", "font-size": "30rpx" },
              class: "aligin_center_item_right"
            }, vue.toDisplayString($data.user.email), 1)
          ]),
          vue.createElementVNode("view", {
            onClick: _cache[5] || (_cache[5] = ($event) => $options.dialogOpen(5)),
            style: { "height": "100rpx" },
            class: "border_line_grey_b_tiny aligin_center_item_left padding_rl_50"
          }, [
            vue.createElementVNode("view", {
              style: { "width": "50%" },
              class: "margin_right_10"
            }, "\u4E2A\u4EBA\u535A\u5BA2\uFF1A"),
            vue.createElementVNode("view", {
              style: { "width": "50%", "color": "grey", "font-size": "30rpx" },
              class: "aligin_center_item_right"
            }, vue.toDisplayString($data.user.blog), 1)
          ]),
          vue.createElementVNode("view", {
            onClick: _cache[6] || (_cache[6] = ($event) => $options.dialogOpen(6)),
            class: "border_line_grey_b_tiny aligin_center_item_left padding_rl_50 padding_tb_20"
          }, [
            vue.createElementVNode("view", {
              style: { "width": "50%" },
              class: "margin_right_10"
            }, "\u5EA7\u53F3\u94ED\uFF1A"),
            vue.createElementVNode("view", {
              style: { "width": "50%", "color": "grey", "font-size": "30rpx" },
              class: "aligin_center_item_right"
            }, vue.toDisplayString($data.user.description), 1)
          ]),
          vue.createElementVNode("view", { class: "fill" }, [
            vue.createElementVNode("button", {
              onClick: _cache[7] || (_cache[7] = (...args) => $options.submit && $options.submit(...args)),
              class: "margin_20",
              type: "primary"
            }, "\u4FDD\u5B58\u63D0\u4EA4")
          ])
        ]),
        _: 1
      }),
      vue.createCommentVNode(" \u8F93\u5165\u6846\u793A\u4F8B "),
      vue.createVNode(_component_uni_popup, {
        ref: "inputDialog",
        type: "dialog"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_popup_dialog, {
            ref: "inputClose",
            mode: "input",
            title: "\u8F93\u5165\u5185\u5BB9",
            value: $data.inputDialogValue,
            placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
            onConfirm: $options.dialogInputConfirm
          }, null, 8, ["value", "onConfirm"])
        ]),
        _: 1
      }, 512),
      vue.createCommentVNode(" \u5BF9\u4E8E\u4E0D\u7528\u5F02\u6B65\u8BF7\u6C42\u540E\u7AEF\uFF08nickname\uFF09\u7684\u5176\u4ED6\u5F39\u51FA\u5C42 "),
      vue.createVNode(_component_uni_popup, {
        ref: "inputDialog2",
        type: "dialog"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_popup_dialog, {
            ref: "inputClose2",
            mode: "input",
            title: "\u8F93\u5165\u5185\u5BB9",
            value: $data.inputDialogValue2,
            placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
            onConfirm: $options.dialogInputConfirm2
          }, null, 8, ["value", "onConfirm"])
        ]),
        _: 1
      }, 512),
      vue.createCommentVNode(" \u63D0\u793A\u4FE1\u606F\u5F39\u7A97 "),
      vue.createVNode(_component_uni_popup, {
        ref: "message",
        type: "message"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_popup_message, {
            type: $data.msgType,
            message: $data.messageText,
            duration: 2e3
          }, null, 8, ["type", "message"])
        ]),
        _: 1
      }, 512)
    ]);
  }
  var PagesSelfSelf_updateSelf_update = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "D:/dachuang/uniapp_client/Client/pages/self/self_update/self_update.vue"]]);
  const _sfc_main$5 = {
    data() {
      return {
        contentText: {
          contentdown: "\u67E5\u770B\u66F4\u591A",
          contentrefresh: "\u52A0\u8F7D\u4E2D",
          contentnomore: "\u6CA1\u6709\u66F4\u591A\u4E86"
        },
        status: "more",
        showIndex: 0,
        transType: ["fade", "slide-left"],
        searchText: ""
      };
    },
    onLoad(option) {
      this.searchText = option.searchText;
      this.showIndex = option.showIndex;
    },
    created() {
    },
    methods: {
      back() {
        uni.navigateBack();
      },
      clickLoadMore(e) {
        this.status = "loading";
        this.timer = setTimeout(() => {
          this.status = "nomore";
        }, 1e3);
      },
      touchStart(e) {
        formatAppLog("log", "at pages/search_result/search_result.vue:233", "\u89E6\u6478\u5F00\u59CB");
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
      },
      touchEnd(e) {
        formatAppLog("log", "at pages/search_result/search_result.vue:241", "\u89E6\u6478\u7ED3\u675F");
        let deltaX = e.changedTouches[0].clientX - this.touchStartX;
        let deltaY = e.changedTouches[0].clientY - this.touchStartY;
        if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX >= 0) {
            if (this.showIndex == 0) {
              this.showIndex = 2;
            } else {
              this.showIndex--;
            }
            this.transType = ["fade", "slide-left"];
            formatAppLog("log", "at pages/search_result/search_result.vue:252", "\u5DE6\u6ED1" + this.showIndex);
            formatAppLog("log", "at pages/search_result/search_result.vue:253", "x:" + this.touchStartX + "y:" + this.touchStartY);
          } else {
            this.showIndex = (this.showIndex + 1) % 3;
            this.transType = ["fade", "slide-right"];
            formatAppLog("log", "at pages/search_result/search_result.vue:257", "\u53F3\u6ED1" + this.showIndex);
          }
        } else if (Math.abs(deltaY) > 50 && Math.abs(deltaX) < Math.abs(deltaY)) {
          if (deltaY < 0) {
            formatAppLog("log", "at pages/search_result/search_result.vue:261", "\u4E0A\u6ED1");
          } else {
            formatAppLog("log", "at pages/search_result/search_result.vue:263", "x:" + this.touchStartX + "y:" + this.touchStartY);
            formatAppLog("log", "at pages/search_result/search_result.vue:264", "\u4E0B\u6ED1");
          }
        } else {
          formatAppLog("log", "at pages/search_result/search_result.vue:267", "\u53EF\u80FD\u662F\u8BEF\u89E6\uFF01");
        }
      },
      changeIndex(index) {
        this.showIndex = index;
      },
      gotoDetail() {
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_1$1);
    const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_1$2);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_2$4);
    const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_0$1);
    const _component_uni_load_more = resolveEasycom(vue.resolveDynamicComponent("uni-load-more"), __easycom_2$3);
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_3$1);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "container",
      onTouchstart: _cache[9] || (_cache[9] = (...args) => $options.touchStart && $options.touchStart(...args)),
      onTouchend: _cache[10] || (_cache[10] = (...args) => $options.touchEnd && $options.touchEnd(...args))
    }, [
      vue.createElementVNode("view", { class: "border_line_grey_bt_tiny fixed_eventNav" }, [
        vue.createVNode(_component_uni_row, null, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uni_col, { span: 4 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  class: "aligin_center_item",
                  style: { "height": "100rpx" },
                  onClick: _cache[0] || (_cache[0] = (...args) => $options.back && $options.back(...args))
                }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "arrow-left",
                    color: "#808080",
                    size: "26"
                  })
                ])
              ]),
              _: 1
            }),
            vue.createVNode(_component_uni_col, { span: 20 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  class: "aligin_center_item",
                  style: { "height": "100rpx" }
                }, [
                  vue.createElementVNode("view", {
                    class: "fill_height aligin_center_item",
                    style: { "width": "80%" }
                  }, [
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: $data.searchText,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.searchText = $event),
                      placeholder: "\u641C\u7D22",
                      clearable: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  vue.createElementVNode("view", {
                    class: "fill_height aligin_center_item",
                    style: { "width": "20%" }
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "search",
                      size: "26",
                      color: "#808080"
                    })
                  ])
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        vue.createCommentVNode(" swiper_nav"),
        vue.createElementVNode("view", {
          class: "fill_width aligin_center_item_left",
          style: { "height": "100rpx" }
        }, [
          vue.createElementVNode("view", {
            class: "fill_height aligin_center_item",
            style: { "width": "33%" },
            onClick: _cache[2] || (_cache[2] = ($event) => $options.changeIndex(0))
          }, [
            vue.createElementVNode("text", {
              class: vue.normalizeClass(["padding_tb_20", { "border_line": $data.showIndex == 0 }])
            }, "\u6587\u7AE0", 2)
          ]),
          vue.createElementVNode("view", {
            class: "fill_height aligin_center_item",
            style: { "width": "33%" },
            onClick: _cache[3] || (_cache[3] = ($event) => $options.changeIndex(1))
          }, [
            vue.createElementVNode("text", {
              class: vue.normalizeClass(["padding_tb_20", { "border_line": $data.showIndex == 1 }])
            }, "\u8D5B\u4E8B", 2)
          ]),
          vue.createElementVNode("view", {
            class: "fill_height aligin_center_item",
            style: { "width": "33%" },
            onClick: _cache[4] || (_cache[4] = ($event) => $options.changeIndex(2))
          }, [
            vue.createElementVNode("text", {
              class: vue.normalizeClass(["padding_tb_20", { "border_line": $data.showIndex == 2 }])
            }, "\u7528\u6237", 2)
          ])
        ])
      ]),
      vue.createCommentVNode(" \u5360\u4F4D "),
      vue.createElementVNode("view", { style: { "height": "200rpx" } }),
      vue.createCommentVNode(" \u624B\u52A8swiper "),
      vue.createElementVNode("view", { class: "margin_top_10 margin_lr_10" }, [
        vue.createCommentVNode(" \u6587\u7AE0 "),
        vue.createVNode(_component_uni_transition, {
          modeClass: $data.transType,
          show: $data.showIndex == 0
        }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createElementVNode("view", null, [
              vue.createCommentVNode(" \u6587\u7AE0\u9884\u89C8\u5361\u7247 "),
              vue.createElementVNode("view", { class: "border_line_grey_bt margin_top_20 padding_rl_20" }, [
                vue.createVNode(_component_uni_row, null, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("view", { style: { "height": "75rpx" } }, [
                      vue.createVNode(_component_uni_col, { span: 2 }, {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("view", {
                            class: "fill aligin_center_text_left",
                            style: { "height": "75rpx" }
                          }, [
                            vue.createElementVNode("image", {
                              class: "sec_avatar",
                              src: "/static/logo.png"
                            })
                          ])
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_uni_col, { span: 17 }, {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("view", {
                            class: "fill aligin_center_text_left",
                            style: { "height": "75rpx", "overflow": "hidden" }
                          }, [
                            vue.createElementVNode("text", null, "author")
                          ])
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_uni_col, { span: 5 }, {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("view", {
                            class: "fill aligin_center_text_right",
                            style: { "height": "75rpx" }
                          }, [
                            vue.createVNode(_component_uni_icons, { type: "more-filled" }),
                            vue.createElementVNode("text", null, vue.toDisplayString("\xA0"))
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_uni_row, null, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("view", { style: { "height": "175rpx" } }, [
                      vue.createVNode(_component_uni_col, { span: 16 }, {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("view", {
                            class: "fill",
                            style: { "height": "175rpx" }
                          }, [
                            vue.createVNode(_component_uni_row, null, {
                              default: vue.withCtx(() => [
                                vue.createElementVNode("view", {
                                  class: "fill padding_top_10",
                                  style: { "height": "110rpx" }
                                }, [
                                  vue.createElementVNode("view", { class: "fill white-space" }, "\u6807\u9898")
                                ])
                              ]),
                              _: 1
                            }),
                            vue.createVNode(_component_uni_row, null, {
                              default: vue.withCtx(() => [
                                vue.createElementVNode("view", {
                                  class: "fill aligin_center_text_left",
                                  style: { "height": "60rpx" }
                                }, [
                                  vue.createElementVNode("view", { class: "sec_message" }, [
                                    vue.createTextVNode(" \u8BC4\u8BBA:"),
                                    vue.createElementVNode("text", null, "10")
                                  ]),
                                  vue.createElementVNode("view", { class: "sec_message" }, [
                                    vue.createTextVNode(" \u70B9\u8D5E:"),
                                    vue.createElementVNode("text", null, "10")
                                  ]),
                                  vue.createElementVNode("view", { class: "sec_message" }, "2022-12-03")
                                ])
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_uni_col, { span: 8 }, {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("view", {
                            class: "fill aligin_center_item",
                            style: { "height": "175rpx" }
                          }, [
                            vue.createElementVNode("image", {
                              mode: "scaleToFill",
                              style: { "height": "160rpx", "width": "220rpx", "border-radius": "8rpx" },
                              src: "/static/ad/home2.jpg"
                            })
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                })
              ]),
              vue.createCommentVNode(" \u52A0\u8F7D\u66F4\u591A "),
              vue.createElementVNode("view", { class: "margin_top_50 aligin_center_item" }, [
                vue.createVNode(_component_uni_load_more, {
                  onClickLoadMore: _cache[5] || (_cache[5] = ($event) => $options.clickLoadMore(_ctx.e)),
                  status: $data.status,
                  color: "#03dac5",
                  contentText: $data.contentText,
                  iconType: "circle"
                }, null, 8, ["status", "contentText"])
              ]),
              vue.createCommentVNode(" \u5360\u4F4D "),
              vue.createElementVNode("view", { style: { "height": "1000rpx" } })
            ], 512), [
              [vue.vShow, $data.showIndex == 0]
            ])
          ]),
          _: 1
        }, 8, ["modeClass", "show"]),
        vue.createCommentVNode(" \u8D5B\u4E8B "),
        vue.createVNode(_component_uni_transition, {
          modeClass: $data.transType,
          show: $data.showIndex == 1
        }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createElementVNode("view", null, [
              vue.createCommentVNode(" \u8D5B\u4E8B\u9884\u89C8\u5361\u7247 "),
              vue.createCommentVNode(" \u8D5B\u4E8B\u5361\u7247 \uFF08\u5361\u7247\u4E2D\u56FE\u7247\u9ED8\u8BA4\u63D0\u4F9B\u51E0\u79CD\uFF09"),
              vue.createElementVNode("view", {
                class: "margin_top_20 margin_lr_10 box_radius_20 overflowHide baiyan",
                style: { "position": "relative" }
              }, [
                vue.createCommentVNode(" \u8D5B\u4E8B\u72B6\u6001 "),
                vue.createElementVNode("view", {
                  style: { "height": "55rpx", "width": "150rpx" },
                  class: "absolute_event_status box_radius_20 aligin_center_item status_before"
                }, "\u5DF2\u7ED3\u675F"),
                vue.createCommentVNode(" \u56FE\u7247 "),
                vue.createElementVNode("view", { style: { "height": "230rpx", "width": "100%", "background-color": "antiquewhite" } }, [
                  vue.createElementVNode("image", {
                    class: "fill",
                    src: "/static/ad/ad2.jpg"
                  })
                ]),
                vue.createCommentVNode(" \u4FE1\u606F "),
                vue.createElementVNode("view", { class: "margin_lr_10 margin_bt_15" }, [
                  vue.createElementVNode("view", { class: "fill_width eventTitle padding_tb_10 overflowHide" }, [
                    vue.createElementVNode("text", null, "2023ACM\u7A0B\u5E8F\u8BBE\u8BA1\u7ADE\u8D5B\u4E2D\u56FD\u533A\u9884\u9009\u8D5B")
                  ]),
                  vue.createCommentVNode(" \u65F6\u95F4 "),
                  vue.createElementVNode("view", { class: "fill_width aligin_center_text_left eventTime margin_top_5" }, [
                    vue.createElementVNode("view", {
                      class: "margin_right_10",
                      style: { "color": "black" }
                    }, "\u62A5\u540D\u65F6\u95F4 \uFF1A"),
                    vue.createElementVNode("view", { class: "margin_lr_10" }, "2022-10-2"),
                    vue.createElementVNode("view", null, "--"),
                    vue.createElementVNode("view", { class: "margin_lr_10" }, "2022-10-2")
                  ]),
                  vue.createElementVNode("view", { class: "fill_width aligin_center_text_left eventTime margin_top_5" }, [
                    vue.createElementVNode("view", {
                      class: "margin_right_10",
                      style: { "color": "black" }
                    }, "\u7ED3\u675F\u65F6\u95F4 \uFF1A"),
                    vue.createElementVNode("view", { class: "margin_lr_10" }, "2022-10-2"),
                    vue.createElementVNode("view", null, "--"),
                    vue.createElementVNode("view", { class: "margin_lr_10" }, "2022-10-2")
                  ]),
                  vue.createElementVNode("view", { class: "fill_width aligin_center_text_left margin_bt_15 event_other" }, [
                    vue.createElementVNode("view", { class: "margin_right_10" }, "\u4E3B\u529E\u65B9\uFF1A"),
                    vue.createElementVNode("view", { class: "margin_left_15" }, "\u673A\u6784\u540D\u79F0")
                  ]),
                  vue.createElementVNode("view", { class: "fill_width aligin_center_text_left event_other" }, [
                    vue.createElementVNode("view", null, "\u6536\u85CF\uFF1A " + vue.toDisplayString(0)),
                    vue.createElementVNode("view", { class: "margin_lr_50" }, "|"),
                    vue.createElementVNode("view", null, "\u8BC4\u8BBA\uFF1A" + vue.toDisplayString(0)),
                    vue.createElementVNode("view", { class: "margin_lr_50" }, "|"),
                    vue.createElementVNode("view", null, "\u7EA7\u522B\uFF1A" + vue.toDisplayString("\u5176\u4ED6"))
                  ])
                ])
              ]),
              vue.createCommentVNode(" \u52A0\u8F7D\u66F4\u591A "),
              vue.createElementVNode("view", { class: "margin_top_50 aligin_center_item" }, [
                vue.createVNode(_component_uni_load_more, {
                  onClickLoadMore: _cache[6] || (_cache[6] = ($event) => $options.clickLoadMore(_ctx.e)),
                  status: $data.status,
                  color: "#03dac5",
                  contentText: $data.contentText,
                  iconType: "circle"
                }, null, 8, ["status", "contentText"])
              ]),
              vue.createCommentVNode(" \u5360\u4F4D "),
              vue.createElementVNode("view", { style: { "height": "1000rpx" } })
            ], 512), [
              [vue.vShow, $data.showIndex == 1]
            ])
          ]),
          _: 1
        }, 8, ["modeClass", "show"]),
        vue.createCommentVNode(" \u7528\u6237 "),
        vue.createVNode(_component_uni_transition, {
          modeClass: $data.transType,
          show: $data.showIndex == 2
        }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createElementVNode("view", null, [
              vue.createCommentVNode(" \u7528\u6237\u9884\u89C8\u5361\u7247 "),
              vue.createElementVNode("view", {
                onClick: _cache[7] || (_cache[7] = (...args) => $options.gotoDetail && $options.gotoDetail(...args)),
                class: "border_line_grey_bt_tiny aligin_center_item_left margin_bt_15",
                style: { "height": "130rpx", "border-radius": "10rpx", "overflow": "hidden" }
              }, [
                vue.createElementVNode("view", {
                  class: "fill_height aligin_center_item",
                  style: { "width": "30%" }
                }, [
                  vue.createElementVNode("image", {
                    style: { "height": "100rpx", "width": "100rpx", "border-radius": "50%" },
                    src: "/static/faces/2-thump.jpg"
                  })
                ]),
                vue.createElementVNode("view", {
                  class: "fill_height aligin_center_item_left",
                  style: { "width": "50%" }
                }, [
                  vue.createElementVNode("text", null, "author")
                ]),
                vue.createElementVNode("view", {
                  class: "fill_height aligin_center_item_left",
                  style: { "width": "20%" }
                }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "right",
                    size: "22"
                  })
                ])
              ]),
              vue.createCommentVNode(" \u52A0\u8F7D\u66F4\u591A "),
              vue.createElementVNode("view", { class: "margin_top_50 aligin_center_item" }, [
                vue.createVNode(_component_uni_load_more, {
                  onClickLoadMore: _cache[8] || (_cache[8] = ($event) => $options.clickLoadMore(_ctx.e)),
                  status: $data.status,
                  color: "#03dac5",
                  contentText: $data.contentText,
                  iconType: "circle"
                }, null, 8, ["status", "contentText"])
              ]),
              vue.createCommentVNode(" \u5360\u4F4D "),
              vue.createElementVNode("view", { style: { "height": "1000rpx" } })
            ], 512), [
              [vue.vShow, $data.showIndex == 2]
            ])
          ]),
          _: 1
        }, 8, ["modeClass", "show"])
      ])
    ], 32);
  }
  var PagesSearch_resultSearch_result = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__file", "D:/dachuang/uniapp_client/Client/pages/search_result/search_result.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {
        is_focus: true
      };
    },
    methods: {
      scrollToTop() {
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 300
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", {
        class: "fill_width margin_b0ttom_10",
        style: { "height": "350rpx" }
      }, [
        vue.createElementVNode("image", {
          class: "fill",
          src: "/static/ad/ad1.jpg"
        })
      ]),
      vue.createElementVNode("view", {
        class: "fill_width border_line_grey_b_tiny",
        style: { "height": "160rpx" }
      }, [
        vue.createElementVNode("view", {
          class: "fill_width aligin_center_item_left",
          style: { "height": "70%" }
        }, [
          vue.createElementVNode("view", {
            class: "fill_height aligin_center_item",
            style: { "width": "20%" }
          }, [
            vue.createElementVNode("image", {
              style: { "height": "90rpx", "width": "90rpx", "border-radius": "50%" },
              src: "/static/faces/1-thump.jpg"
            })
          ]),
          vue.createElementVNode("view", {
            class: "fill_height aligin_center_item_left",
            style: { "width": "40%" }
          }, [
            vue.createElementVNode("text", null, "author")
          ]),
          vue.createElementVNode("view", {
            class: "fill_height aligin_center_item",
            style: { "width": "40%" }
          }, [
            vue.withDirectives(vue.createElementVNode("button", {
              class: "margin_none",
              size: "mini",
              type: "primary",
              plain: "true"
            }, "\u5173\u6CE8", 512), [
              [vue.vShow, !$data.is_focus]
            ]),
            vue.withDirectives(vue.createElementVNode("button", {
              class: "margin_none",
              size: "mini",
              disabled: "true"
            }, "\u5DF2\u5173\u6CE8", 512), [
              [vue.vShow, $data.is_focus]
            ])
          ])
        ]),
        vue.createElementVNode("view", {
          class: "fill_width margin_left_40 aligin_center_item_left",
          style: { "height": "30%" }
        }, [
          vue.createElementVNode("text", { class: "time" }, "2023-03-03")
        ])
      ]),
      vue.createCommentVNode(" \u6587\u7AE0 "),
      vue.createElementVNode("view", { class: "margin_20 aligin_center_item sec_title" }, [
        vue.createElementVNode("text", null, "Title")
      ]),
      vue.createElementVNode("view", {
        style: { "height": "200rpx", "background-color": "beige" },
        class: "fill_width"
      }),
      vue.createElementVNode("view", { class: "margin_20 aligin_center_item_left" }, [
        vue.createElementVNode("view", { class: "tag" }, "java")
      ]),
      vue.createCommentVNode(" comments "),
      vue.createElementVNode("view", {
        class: "margin_bt_30 padding_left_20 fill_width aligin_center_item_left border_line_grey_t_tiny",
        style: {}
      }, [
        vue.createVNode(_component_uni_icons, {
          type: "chatboxes",
          color: "#808080"
        }),
        vue.createElementVNode("view", { class: "margin_lr_10" }),
        vue.createElementVNode("text", { style: { "color": "#808080" } }, "comments")
      ]),
      vue.createElementVNode("view", { class: "margin_bt_20" }, [
        vue.createCommentVNode(" \u8BC4\u8BBA\u6761 "),
        vue.createElementVNode("view", { class: "margin_bt_30 border_line_grey_bt_tiny" }, [
          vue.createCommentVNode(" avatar "),
          vue.createElementVNode("view", {
            class: "margin_lr_20 aligin_center_item_left",
            style: { "height": "120rpx" }
          }, [
            vue.createElementVNode("view", {
              class: "fill_height aligin_center_item",
              style: { "width": "18%" }
            }, [
              vue.createElementVNode("image", {
                style: { "height": "85rpx", "width": "85rpx", "border-radius": "50%" },
                src: "/static/faces/3-thump.jpg"
              })
            ]),
            vue.createElementVNode("view", {
              class: "fill_height",
              style: { "width": "82%" }
            }, [
              vue.createElementVNode("view", { class: "fill_width margin_top_20" }, "author"),
              vue.createElementVNode("view", { class: "time fill_width margin_top_10" }, "2023-03-03")
            ])
          ]),
          vue.createCommentVNode(" content "),
          vue.createElementVNode("view", {
            class: "margin_lr_20 aligin_center_item_left",
            style: { "height": "120rpx" }
          }, [
            vue.createElementVNode("view", {
              class: "fill_height aligin_center_item",
              style: { "width": "18%" }
            }),
            vue.createElementVNode("view", {
              class: "fill_height aligin_center_item_left",
              style: { "width": "82%" }
            }, [
              vue.createElementVNode("view", null, "\u4E8C\u6D4B\u79EF\u6781of\u7B2C\u4E09\u798F\u5EFA\u7701\u5730\u65B9\u5C31\u641CID\u98DE\u673A\u4E09\u7B49\u5956\u70E6\u90FD\u70E6\u6B7B\u7ECF\u6D4E\u6CD5")
            ])
          ]),
          vue.createCommentVNode(" icons "),
          vue.createElementVNode("view", {
            class: "margin_lr_20 aligin_center_item_left",
            style: { "height": "80rpx" }
          }, [
            vue.createElementVNode("view", {
              class: "fill_height aligin_center_item",
              style: { "width": "18%" }
            }),
            vue.createElementVNode("view", {
              class: "time fill_height aligin_center_item_left",
              style: { "width": "82%" }
            }, [
              vue.createVNode(_component_uni_icons, {
                type: "heart",
                color: "#808080",
                size: "22"
              }),
              vue.createElementVNode("text", { class: "margin_lr_10" }, "0"),
              vue.createElementVNode("view", { class: "margin_lr_20" }),
              vue.createVNode(_component_uni_icons, {
                type: "chat",
                color: "#808080",
                size: "22"
              }),
              vue.createElementVNode("text", { class: "margin_lr_10" }, "0")
            ])
          ]),
          vue.createCommentVNode(" reply "),
          vue.createElementVNode("view", {
            class: "margin_lr_20 aligin_center_item_left",
            style: { "height": "80rpx" }
          }, [
            vue.createElementVNode("view", {
              class: "fill_height aligin_center_item",
              style: { "width": "18%" }
            }),
            vue.createElementVNode("view", {
              class: "baiyan fill_height aligin_center_item_left",
              style: { "width": "82%", "color": "#03dac5", "font-size": "30rpx" }
            }, [
              vue.createElementVNode("view", { class: "margin_lr_10" }),
              vue.createElementVNode("text", null, vue.toDisplayString(0)),
              vue.createElementVNode("text", null, "\u6761\u56DE\u590D>")
            ])
          ]),
          vue.createCommentVNode(" reply_content "),
          vue.createElementVNode("view", { class: "margin_lr_20 aligin_center_item_left" }, [
            vue.createElementVNode("view", {
              class: "fill_height",
              style: { "width": "5%" }
            }),
            vue.createElementVNode("view", {
              class: "fill_height aligin_center_item_left",
              style: { "width": "95%" }
            }, [
              vue.createCommentVNode(" \u56DE\u590D\u5185\u5BB9\u653E\u8FD9\u513F "),
              vue.createElementVNode("view", null, [
                vue.createElementVNode("view", { class: "aligin_center_item_left padding_tb_5" }, [
                  vue.createElementVNode("text", { style: { "color": "grey", "font-size": "30rpx" } }, "\u56DE\u590D\u5185\u5BB9"),
                  vue.createElementVNode("view", { style: { "margin-left": "500rpx" } }),
                  vue.createVNode(_component_uni_icons, {
                    type: "closeempty",
                    color: "#808080"
                  })
                ]),
                vue.createElementVNode("view", { class: "margin_bt_30" }, [
                  vue.createCommentVNode(" avatar "),
                  vue.createElementVNode("view", {
                    class: "margin_lr_20 aligin_center_item_left",
                    style: { "height": "120rpx" }
                  }, [
                    vue.createElementVNode("view", {
                      class: "fill_height aligin_center_item",
                      style: { "width": "18%" }
                    }, [
                      vue.createElementVNode("image", {
                        style: { "height": "85rpx", "width": "85rpx", "border-radius": "50%" },
                        src: "/static/faces/3-thump.jpg"
                      })
                    ]),
                    vue.createElementVNode("view", {
                      class: "fill_height",
                      style: { "width": "82%" }
                    }, [
                      vue.createElementVNode("view", { class: "fill_width margin_top_20" }, "author"),
                      vue.createElementVNode("view", { class: "time fill_width margin_top_10" }, "2023-03-03")
                    ])
                  ]),
                  vue.createCommentVNode(" content "),
                  vue.createElementVNode("view", {
                    class: "margin_lr_20 aligin_center_item_left",
                    style: { "height": "120rpx" }
                  }, [
                    vue.createElementVNode("view", {
                      class: "fill_height aligin_center_item",
                      style: { "width": "18%" }
                    }),
                    vue.createElementVNode("view", {
                      class: "fill_height aligin_center_item_left",
                      style: { "width": "82%" }
                    }, [
                      vue.createElementVNode("view", null, [
                        vue.createElementVNode("text", { style: { "color": "#03dac5" } }, "@author: "),
                        vue.createTextVNode("\u4E8C\u6D4B\u79EF\u6781of\u7B2C\u4E09\u798F\u5EFA\u7701\u5730\u65B9\u5C31\u641CID\u98DE\u673A\u4E09\u7B49\u5956\u70E6\u90FD\u70E6\u6B7B\u7ECF\u6D4E\u6CD5")
                      ])
                    ])
                  ]),
                  vue.createCommentVNode(" icons "),
                  vue.createElementVNode("view", {
                    class: "margin_lr_20 aligin_center_item_left",
                    style: { "height": "80rpx" }
                  }, [
                    vue.createElementVNode("view", {
                      class: "fill_height aligin_center_item",
                      style: { "width": "18%" }
                    }),
                    vue.createElementVNode("view", {
                      class: "time fill_height aligin_center_item_left",
                      style: { "width": "82%" }
                    }, [
                      vue.createVNode(_component_uni_icons, {
                        type: "heart",
                        color: "#808080",
                        size: "22"
                      }),
                      vue.createElementVNode("text", { class: "margin_lr_10" }, "0"),
                      vue.createElementVNode("view", { class: "margin_lr_20" }),
                      vue.createVNode(_component_uni_icons, {
                        type: "chat",
                        color: "#808080",
                        size: "22"
                      }),
                      vue.createElementVNode("text", { class: "margin_lr_10" }, "0")
                    ])
                  ])
                ])
              ]),
              vue.createCommentVNode(" \u56DE\u590D\u5185\u5BB9\u7ED3\u675F ")
            ])
          ])
        ])
      ]),
      vue.createCommentVNode(" \u5360\u4F4D "),
      vue.createElementVNode("view", { style: { "height": "110rpx" } }),
      vue.createCommentVNode(" footer "),
      vue.createElementVNode("view", {
        class: "fix_foot baiyan aligin_center_item_left",
        style: { "height": "100rpx" }
      }, [
        vue.createElementVNode("view", {
          class: "padding_10 aligin_center_item",
          style: { "height": "100%", "width": "25%" }
        }, [
          vue.createVNode(_component_uni_icons, {
            type: "heart",
            size: "60rpx",
            color: "#808080"
          })
        ]),
        vue.createElementVNode("view", {
          class: "padding_10 aligin_center_item",
          style: { "height": "100%", "width": "25%" }
        }, [
          vue.createVNode(_component_uni_icons, {
            type: "star",
            size: "60rpx",
            color: "#808080"
          })
        ]),
        vue.createElementVNode("view", {
          class: "padding_10 aligin_center_item",
          style: { "height": "100%", "width": "25%" }
        }, [
          vue.createVNode(_component_uni_icons, {
            type: "chat",
            size: "60rpx",
            color: "#808080"
          })
        ]),
        vue.createElementVNode("view", {
          class: "padding_10 aligin_center_item",
          style: { "height": "100%", "width": "25%" },
          onClick: _cache[0] || (_cache[0] = (...args) => $options.scrollToTop && $options.scrollToTop(...args))
        }, [
          vue.createVNode(_component_uni_icons, {
            type: "arrow-up",
            size: "60rpx",
            color: "#808080"
          })
        ])
      ])
    ]);
  }
  var PagesIndexSec_detailSec_detail = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "D:/dachuang/uniapp_client/Client/pages/index/sec_detail/sec_detail.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {
        is_focus: true
      };
    },
    methods: {
      scrollToTop() {
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 300
        });
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", {
        class: "fill_width margin_b0ttom_10",
        style: { "height": "350rpx" }
      }, [
        vue.createElementVNode("image", {
          class: "fill",
          src: "/static/ad/ad1.jpg"
        })
      ]),
      vue.createCommentVNode(" \u6807\u9898 "),
      vue.createElementVNode("view", { class: "margin_20 aligin_center_item sec_title" }, [
        vue.createElementVNode("text", null, "Title")
      ]),
      vue.createElementVNode("view", { class: "border_line_grey_bt_tiny fill_width" }, [
        vue.createElementVNode("view", {
          class: "margin_lr_50 aligin_center_item_left",
          style: { "height": "80rpx" }
        }, [
          vue.createElementVNode("text", { style: { "font-size": "30rpx", "color": "#808080" } }, "\u8D5B\u4E8B\u5206\u4EAB\u8005")
        ]),
        vue.createElementVNode("view", { class: "border_line_grey_b_tiny" }),
        vue.createElementVNode("view", {
          class: "margin_lr_30 aligin_center_item_left",
          style: { "height": "140rpx" }
        }, [
          vue.createElementVNode("view", {
            class: "fill_height aligin_center_item",
            style: { "width": "20%" }
          }, [
            vue.createElementVNode("image", {
              style: { "height": "90rpx", "width": "90rpx", "border-radius": "50%" },
              src: "/static/faces/1-thump.jpg"
            })
          ]),
          vue.createElementVNode("view", {
            class: "fill_height aligin_center_item_left",
            style: { "width": "40%" }
          }, [
            vue.createElementVNode("text", null, "author")
          ]),
          vue.createElementVNode("view", {
            class: "fill_height aligin_center_item",
            style: { "width": "40%" }
          }, [
            vue.withDirectives(vue.createElementVNode("button", {
              class: "margin_none",
              size: "mini",
              type: "primary",
              plain: "true"
            }, "\u5173\u6CE8", 512), [
              [vue.vShow, !$data.is_focus]
            ]),
            vue.withDirectives(vue.createElementVNode("button", {
              class: "margin_none",
              size: "mini",
              disabled: "true"
            }, "\u5DF2\u5173\u6CE8", 512), [
              [vue.vShow, $data.is_focus]
            ])
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "fill_width padding_rl_20" }, [
        vue.createElementVNode("view", {
          class: "margin_15 aligin_center_item_left",
          style: { "height": "80rpx" }
        }, [
          vue.createElementVNode("text", { style: { "font-size": "45rpx", "font-weight": "500", "letter-spacing": "5rpx" } }, "\u7ADE\u8D5B\u8BE6\u60C5")
        ])
      ]),
      vue.createElementVNode("view", { class: "margin_lr_20" }, [
        vue.createCommentVNode(" \u8BE6\u60C5markdown "),
        vue.createElementVNode("view", { style: { "height": "400rpx", "background-color": "antiquewhite" } })
      ]),
      vue.createElementVNode("view", {
        class: "margin_20 baiyan padding_10",
        style: { "font-size": "32rpx" }
      }, [
        vue.createElementVNode("view", { class: "margin_bt_15 aligin_center_item_left" }, [
          vue.createElementVNode("view", null, "\u5206\u7C7B\uFF1A"),
          vue.createElementVNode("view", null, "\u5DE5\u79D1\u7C7B")
        ]),
        vue.createElementVNode("view", { class: "margin_bt_15 aligin_center_item_left" }, [
          vue.createElementVNode("view", null, "\u7EA7\u522B\uFF1A"),
          vue.createElementVNode("view", null, "\u5176\u4ED6")
        ]),
        vue.createElementVNode("view", { class: "aligin_center_text_left margin_top_5" }, [
          vue.createElementVNode("view", { class: "margin_right_10" }, "\u62A5\u540D\u65F6\u95F4 \uFF1A"),
          vue.createElementVNode("view", { class: "margin_lr_10" }, "2022-10-2"),
          vue.createElementVNode("view", null, "--"),
          vue.createElementVNode("view", { class: "margin_lr_10" }, "2022-10-2")
        ]),
        vue.createElementVNode("view", { class: "aligin_center_text_left margin_top_5" }, [
          vue.createElementVNode("view", { class: "margin_right_10" }, "\u7ED3\u675F\u65F6\u95F4 \uFF1A"),
          vue.createElementVNode("view", { class: "margin_lr_10" }, "2022-10-2"),
          vue.createElementVNode("view", null, "--"),
          vue.createElementVNode("view", { class: "margin_lr_10" }, "2022-10-2")
        ]),
        vue.createElementVNode("view", { class: "aligin_center_text_left margin_bt_15" }, [
          vue.createElementVNode("view", { class: "margin_right_10" }, "\u4E3B\u529E\u65B9\uFF1A"),
          vue.createElementVNode("view", { class: "margin_left_15" }, "\u673A\u6784\u540D\u79F0")
        ])
      ]),
      vue.createCommentVNode(" comments "),
      vue.createElementVNode("view", {
        class: "margin_bt_30 padding_left_20 fill_width aligin_center_item_left border_line_grey_t_tiny",
        style: {}
      }, [
        vue.createVNode(_component_uni_icons, {
          type: "chatboxes",
          color: "#808080"
        }),
        vue.createElementVNode("view", { class: "margin_lr_10" }),
        vue.createElementVNode("text", { style: { "color": "#808080" } }, "comments")
      ]),
      vue.createElementVNode("view", { class: "margin_bt_20" }, [
        vue.createCommentVNode(" \u8BC4\u8BBA\u6761 "),
        vue.createElementVNode("view", { class: "margin_bt_30 border_line_grey_bt_tiny" }, [
          vue.createCommentVNode(" avatar "),
          vue.createElementVNode("view", {
            class: "margin_lr_20 aligin_center_item_left",
            style: { "height": "120rpx" }
          }, [
            vue.createElementVNode("view", {
              class: "fill_height aligin_center_item",
              style: { "width": "18%" }
            }, [
              vue.createElementVNode("image", {
                style: { "height": "85rpx", "width": "85rpx", "border-radius": "50%" },
                src: "/static/faces/3-thump.jpg"
              })
            ]),
            vue.createElementVNode("view", {
              class: "fill_height",
              style: { "width": "82%" }
            }, [
              vue.createElementVNode("view", { class: "fill_width margin_top_20" }, "author"),
              vue.createElementVNode("view", { class: "time fill_width margin_top_10" }, "2023-03-03")
            ])
          ]),
          vue.createCommentVNode(" content "),
          vue.createElementVNode("view", {
            class: "margin_lr_20 aligin_center_item_left",
            style: { "height": "120rpx" }
          }, [
            vue.createElementVNode("view", {
              class: "fill_height aligin_center_item",
              style: { "width": "18%" }
            }),
            vue.createElementVNode("view", {
              class: "fill_height aligin_center_item_left",
              style: { "width": "82%" }
            }, [
              vue.createElementVNode("view", null, "\u4E8C\u6D4B\u79EF\u6781of\u7B2C\u4E09\u798F\u5EFA\u7701\u5730\u65B9\u5C31\u641CID\u98DE\u673A\u4E09\u7B49\u5956\u70E6\u90FD\u70E6\u6B7B\u7ECF\u6D4E\u6CD5")
            ])
          ]),
          vue.createCommentVNode(" icons "),
          vue.createElementVNode("view", {
            class: "margin_lr_20 aligin_center_item_left",
            style: { "height": "80rpx" }
          }, [
            vue.createElementVNode("view", {
              class: "fill_height aligin_center_item",
              style: { "width": "18%" }
            }),
            vue.createElementVNode("view", {
              class: "time fill_height aligin_center_item_left",
              style: { "width": "82%" }
            }, [
              vue.createVNode(_component_uni_icons, {
                type: "heart",
                color: "#808080",
                size: "22"
              }),
              vue.createElementVNode("text", { class: "margin_lr_10" }, "0"),
              vue.createElementVNode("view", { class: "margin_lr_20" }),
              vue.createVNode(_component_uni_icons, {
                type: "chat",
                color: "#808080",
                size: "22"
              }),
              vue.createElementVNode("text", { class: "margin_lr_10" }, "0")
            ])
          ]),
          vue.createCommentVNode(" reply "),
          vue.createElementVNode("view", {
            class: "margin_lr_20 aligin_center_item_left",
            style: { "height": "80rpx" }
          }, [
            vue.createElementVNode("view", {
              class: "fill_height aligin_center_item",
              style: { "width": "18%" }
            }),
            vue.createElementVNode("view", {
              class: "baiyan fill_height aligin_center_item_left",
              style: { "width": "82%", "color": "#03dac5", "font-size": "30rpx" }
            }, [
              vue.createElementVNode("view", { class: "margin_lr_10" }),
              vue.createElementVNode("text", null, vue.toDisplayString(0)),
              vue.createElementVNode("text", null, "\u6761\u56DE\u590D>")
            ])
          ]),
          vue.createCommentVNode(" reply_content "),
          vue.createElementVNode("view", { class: "margin_lr_20 aligin_center_item_left" }, [
            vue.createElementVNode("view", {
              class: "fill_height",
              style: { "width": "5%" }
            }),
            vue.createElementVNode("view", {
              class: "fill_height aligin_center_item_left",
              style: { "width": "95%" }
            }, [
              vue.createCommentVNode(" \u56DE\u590D\u5185\u5BB9\u653E\u8FD9\u513F "),
              vue.createElementVNode("view", null, [
                vue.createElementVNode("view", { class: "aligin_center_item_left padding_tb_5" }, [
                  vue.createElementVNode("text", { style: { "color": "grey", "font-size": "30rpx" } }, "\u56DE\u590D\u5185\u5BB9"),
                  vue.createElementVNode("view", { style: { "margin-left": "500rpx" } }),
                  vue.createVNode(_component_uni_icons, {
                    type: "closeempty",
                    color: "#808080"
                  })
                ]),
                vue.createElementVNode("view", { class: "margin_bt_30" }, [
                  vue.createCommentVNode(" avatar "),
                  vue.createElementVNode("view", {
                    class: "margin_lr_20 aligin_center_item_left",
                    style: { "height": "120rpx" }
                  }, [
                    vue.createElementVNode("view", {
                      class: "fill_height aligin_center_item",
                      style: { "width": "18%" }
                    }, [
                      vue.createElementVNode("image", {
                        style: { "height": "85rpx", "width": "85rpx", "border-radius": "50%" },
                        src: "/static/faces/3-thump.jpg"
                      })
                    ]),
                    vue.createElementVNode("view", {
                      class: "fill_height",
                      style: { "width": "82%" }
                    }, [
                      vue.createElementVNode("view", { class: "fill_width margin_top_20" }, "author"),
                      vue.createElementVNode("view", { class: "time fill_width margin_top_10" }, "2023-03-03")
                    ])
                  ]),
                  vue.createCommentVNode(" content "),
                  vue.createElementVNode("view", {
                    class: "margin_lr_20 aligin_center_item_left",
                    style: { "height": "120rpx" }
                  }, [
                    vue.createElementVNode("view", {
                      class: "fill_height aligin_center_item",
                      style: { "width": "18%" }
                    }),
                    vue.createElementVNode("view", {
                      class: "fill_height aligin_center_item_left",
                      style: { "width": "82%" }
                    }, [
                      vue.createElementVNode("view", null, [
                        vue.createElementVNode("text", { style: { "color": "#03dac5" } }, "@author: "),
                        vue.createTextVNode("\u4E8C\u6D4B\u79EF\u6781of\u7B2C\u4E09\u798F\u5EFA\u7701\u5730\u65B9\u5C31\u641CID\u98DE\u673A\u4E09\u7B49\u5956\u70E6\u90FD\u70E6\u6B7B\u7ECF\u6D4E\u6CD5")
                      ])
                    ])
                  ]),
                  vue.createCommentVNode(" icons "),
                  vue.createElementVNode("view", {
                    class: "margin_lr_20 aligin_center_item_left",
                    style: { "height": "80rpx" }
                  }, [
                    vue.createElementVNode("view", {
                      class: "fill_height aligin_center_item",
                      style: { "width": "18%" }
                    }),
                    vue.createElementVNode("view", {
                      class: "time fill_height aligin_center_item_left",
                      style: { "width": "82%" }
                    }, [
                      vue.createVNode(_component_uni_icons, {
                        type: "heart",
                        color: "#808080",
                        size: "22"
                      }),
                      vue.createElementVNode("text", { class: "margin_lr_10" }, "0"),
                      vue.createElementVNode("view", { class: "margin_lr_20" }),
                      vue.createVNode(_component_uni_icons, {
                        type: "chat",
                        color: "#808080",
                        size: "22"
                      }),
                      vue.createElementVNode("text", { class: "margin_lr_10" }, "0")
                    ])
                  ])
                ])
              ]),
              vue.createCommentVNode(" \u56DE\u590D\u5185\u5BB9\u7ED3\u675F ")
            ])
          ])
        ])
      ]),
      vue.createCommentVNode(" \u5360\u4F4D "),
      vue.createElementVNode("view", { style: { "height": "110rpx" } }),
      vue.createCommentVNode(" footer "),
      vue.createElementVNode("view", {
        class: "fix_foot baiyan aligin_center_item_left",
        style: { "height": "100rpx" }
      }, [
        vue.createElementVNode("view", {
          class: "padding_10 aligin_center_item",
          style: { "height": "100%", "width": "33%" }
        }, [
          vue.createVNode(_component_uni_icons, {
            type: "star",
            size: "60rpx",
            color: "#808080"
          })
        ]),
        vue.createElementVNode("view", {
          class: "padding_10 aligin_center_item",
          style: { "height": "100%", "width": "33%" }
        }, [
          vue.createVNode(_component_uni_icons, {
            type: "chat",
            size: "60rpx",
            color: "#808080"
          })
        ]),
        vue.createElementVNode("view", {
          class: "padding_10 aligin_center_item",
          style: { "height": "100%", "width": "33%" },
          onClick: _cache[0] || (_cache[0] = (...args) => $options.scrollToTop && $options.scrollToTop(...args))
        }, [
          vue.createVNode(_component_uni_icons, {
            type: "arrow-up",
            size: "60rpx",
            color: "#808080"
          })
        ])
      ])
    ]);
  }
  var PagesEventsEvent_detailEvent_detail = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "D:/dachuang/uniapp_client/Client/pages/events/event_detail/event_detail.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        showIndex: 0,
        transType: ["fade", "slide-left"],
        contentText: {
          contentdown: "\u67E5\u770B\u66F4\u591A",
          contentrefresh: "\u52A0\u8F7D\u4E2D",
          contentnomore: "\u6CA1\u6709\u66F4\u591A\u4E86"
        },
        status: "more",
        user_focus: [],
        user_focused: []
      };
    },
    onLoad() {
      $request({
        url: "/user/self",
        method: "POST"
      }).then((res) => {
        user_focus = res.data.focus;
        user_focused = res.data.focused;
      }).catch((err) => {
      });
    },
    created() {
    },
    methods: {
      touchStart(e) {
        formatAppLog("log", "at pages/focus/focus.vue:117", "\u89E6\u6478\u5F00\u59CB");
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
      },
      touchEnd(e) {
        formatAppLog("log", "at pages/focus/focus.vue:125", "\u89E6\u6478\u7ED3\u675F");
        let deltaX = e.changedTouches[0].clientX - this.touchStartX;
        let deltaY = e.changedTouches[0].clientY - this.touchStartY;
        if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX >= 0) {
            if (this.showIndex == 0) {
              this.showIndex = 1;
            } else {
              this.showIndex--;
            }
            this.transType = ["fade", "slide-left"];
            formatAppLog("log", "at pages/focus/focus.vue:136", "\u5DE6\u6ED1" + this.showIndex);
            formatAppLog("log", "at pages/focus/focus.vue:137", "x:" + this.touchStartX + "y:" + this.touchStartY);
          } else {
            this.showIndex = (this.showIndex + 1) % 2;
            this.transType = ["fade", "slide-right"];
            formatAppLog("log", "at pages/focus/focus.vue:141", "\u53F3\u6ED1" + this.showIndex);
          }
        } else if (Math.abs(deltaY) > 50 && Math.abs(deltaX) < Math.abs(deltaY)) {
          if (deltaY < 0) {
            formatAppLog("log", "at pages/focus/focus.vue:145", "\u4E0A\u6ED1");
          } else {
            formatAppLog("log", "at pages/focus/focus.vue:147", "x:" + this.touchStartX + "y:" + this.touchStartY);
            formatAppLog("log", "at pages/focus/focus.vue:148", "\u4E0B\u6ED1");
          }
        } else {
          formatAppLog("log", "at pages/focus/focus.vue:151", "\u53EF\u80FD\u662F\u8BEF\u89E6\uFF01");
        }
      },
      changeIndex(index) {
        this.showIndex = index;
      },
      goToDetail(id) {
        uni.navigateTo({
          url: "/pages/self/self_detail/self_detail?id=" + id
        });
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_0$1);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_1$1);
    const _component_uni_load_more = resolveEasycom(vue.resolveDynamicComponent("uni-load-more"), __easycom_2$3);
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_3$1);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "container",
      onTouchstart: _cache[4] || (_cache[4] = (...args) => $options.touchStart && $options.touchStart(...args)),
      onTouchend: _cache[5] || (_cache[5] = (...args) => $options.touchEnd && $options.touchEnd(...args))
    }, [
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createCommentVNode(" swiper_nav"),
          vue.createElementVNode("view", {
            class: "fill_width aligin_center_item_left fixed_eventNav",
            style: { "height": "100rpx" }
          }, [
            vue.createElementVNode("view", {
              class: "fill_height aligin_center_item",
              style: { "width": "50%" },
              onClick: _cache[0] || (_cache[0] = ($event) => $options.changeIndex(0))
            }, [
              vue.createElementVNode("text", {
                class: vue.normalizeClass(["padding_tb_20", { "border_line": $data.showIndex == 0 }])
              }, "\u5173\u6CE8", 2)
            ]),
            vue.createElementVNode("view", {
              class: "fill_height aligin_center_item",
              style: { "width": "50%" },
              onClick: _cache[1] || (_cache[1] = ($event) => $options.changeIndex(1))
            }, [
              vue.createElementVNode("text", {
                class: vue.normalizeClass(["padding_tb_20", { "border_line": $data.showIndex == 1 }])
              }, "\u7C89\u4E1D", 2)
            ])
          ]),
          vue.createCommentVNode(" \u5360\u4F4D "),
          vue.createElementVNode("view", { style: { "height": "100rpx" } })
        ]),
        _: 1
      }),
      vue.createCommentVNode(" \u624B\u52A8swiper "),
      vue.createElementVNode("view", { class: "margin_top_10 margin_lr_10" }, [
        vue.createVNode(_component_uni_transition, {
          modeClass: $data.transType,
          show: $data.showIndex == 0
        }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createElementVNode("view", null, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.user_focus, (user2, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: user2.id
                }, [
                  vue.createCommentVNode(" \u7528\u6237\u9884\u89C8\u5361\u7247 "),
                  vue.createElementVNode("view", {
                    onClick: ($event) => $options.goToDetail(user2.id),
                    class: "border_line_grey_bt_tiny aligin_center_item_left margin_bt_15",
                    style: { "height": "130rpx", "border-radius": "10rpx", "overflow": "hidden" }
                  }, [
                    vue.createElementVNode("view", {
                      class: "fill_height aligin_center_item",
                      style: { "width": "30%" }
                    }, [
                      vue.createElementVNode("image", {
                        style: { "height": "100rpx", "width": "100rpx", "border-radius": "50%" },
                        src: user2.avatar
                      }, null, 8, ["src"])
                    ]),
                    vue.createElementVNode("view", {
                      class: "fill_height aligin_center_item_left",
                      style: { "width": "50%" }
                    }, [
                      vue.createElementVNode("text", null, vue.toDisplayString(user2.nickname), 1)
                    ]),
                    vue.createElementVNode("view", {
                      class: "fill_height aligin_center_item_left",
                      style: { "width": "20%" }
                    }, [
                      vue.createVNode(_component_uni_icons, {
                        type: "right",
                        size: "22"
                      })
                    ])
                  ], 8, ["onClick"])
                ]);
              }), 128)),
              vue.createCommentVNode(" \u52A0\u8F7D\u66F4\u591A "),
              vue.createElementVNode("view", { class: "margin_top_50 aligin_center_item" }, [
                vue.createVNode(_component_uni_load_more, {
                  onClickLoadMore: _cache[2] || (_cache[2] = ($event) => _ctx.clickLoadMore(_ctx.e)),
                  status: $data.status,
                  color: "#03dac5",
                  contentText: $data.contentText,
                  iconType: "circle"
                }, null, 8, ["status", "contentText"])
              ]),
              vue.createCommentVNode(" \u5360\u4F4D "),
              vue.createElementVNode("view", { style: { "height": "1000rpx" } })
            ], 512), [
              [vue.vShow, $data.showIndex == 0]
            ])
          ]),
          _: 1
        }, 8, ["modeClass", "show"]),
        vue.createCommentVNode(" \u7528\u6237 "),
        vue.createVNode(_component_uni_transition, {
          modeClass: $data.transType,
          show: $data.showIndex == 1
        }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createElementVNode("view", null, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.user_focused, (user2, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: user2.id
                }, [
                  vue.createCommentVNode(" \u7528\u6237\u9884\u89C8\u5361\u7247 "),
                  vue.createElementVNode("view", {
                    onClick: ($event) => $options.goToDetail(user2.id),
                    class: "border_line_grey_bt_tiny aligin_center_item_left margin_bt_15",
                    style: { "height": "130rpx", "border-radius": "10rpx", "overflow": "hidden" }
                  }, [
                    vue.createElementVNode("view", {
                      class: "fill_height aligin_center_item",
                      style: { "width": "30%" }
                    }, [
                      vue.createElementVNode("image", {
                        style: { "height": "100rpx", "width": "100rpx", "border-radius": "50%" },
                        src: user2.avatar
                      }, null, 8, ["src"])
                    ]),
                    vue.createElementVNode("view", {
                      class: "fill_height aligin_center_item_left",
                      style: { "width": "50%" }
                    }, [
                      vue.createElementVNode("text", null, vue.toDisplayString(user2.nickname), 1)
                    ]),
                    vue.createElementVNode("view", {
                      class: "fill_height aligin_center_item_left",
                      style: { "width": "20%" }
                    }, [
                      vue.createVNode(_component_uni_icons, {
                        type: "right",
                        size: "22"
                      })
                    ])
                  ], 8, ["onClick"])
                ]);
              }), 128)),
              vue.createCommentVNode(" \u52A0\u8F7D\u66F4\u591A "),
              vue.createElementVNode("view", { class: "margin_top_50 aligin_center_item" }, [
                vue.createVNode(_component_uni_load_more, {
                  onClickLoadMore: _cache[3] || (_cache[3] = ($event) => _ctx.clickLoadMore(_ctx.e)),
                  status: $data.status,
                  color: "#03dac5",
                  contentText: $data.contentText,
                  iconType: "circle"
                }, null, 8, ["status", "contentText"])
              ]),
              vue.createCommentVNode(" \u5360\u4F4D "),
              vue.createElementVNode("view", { style: { "height": "1000rpx" } })
            ], 512), [
              [vue.vShow, $data.showIndex == 1]
            ])
          ]),
          _: 1
        }, 8, ["modeClass", "show"])
      ])
    ], 32);
  }
  var PagesFocusFocus = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "D:/dachuang/uniapp_client/Client/pages/focus/focus.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        showIndex: 0,
        transType: ["fade", "slide-left"],
        contentText: {
          contentdown: "\u67E5\u770B\u66F4\u591A",
          contentrefresh: "\u52A0\u8F7D\u4E2D",
          contentnomore: "\u6CA1\u6709\u66F4\u591A\u4E86"
        },
        status: "more"
      };
    },
    created() {
    },
    methods: {
      touchStart(e) {
        formatAppLog("log", "at pages/favorites/favorites.vue:97", "\u89E6\u6478\u5F00\u59CB");
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
      },
      touchEnd(e) {
        formatAppLog("log", "at pages/favorites/favorites.vue:105", "\u89E6\u6478\u7ED3\u675F");
        let deltaX = e.changedTouches[0].clientX - this.touchStartX;
        let deltaY = e.changedTouches[0].clientY - this.touchStartY;
        if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX >= 0) {
            if (this.showIndex == 0) {
              this.showIndex = 1;
            } else {
              this.showIndex--;
            }
            this.transType = ["fade", "slide-left"];
            formatAppLog("log", "at pages/favorites/favorites.vue:116", "\u5DE6\u6ED1" + this.showIndex);
            formatAppLog("log", "at pages/favorites/favorites.vue:117", "x:" + this.touchStartX + "y:" + this.touchStartY);
          } else {
            this.showIndex = (this.showIndex + 1) % 2;
            this.transType = ["fade", "slide-right"];
            formatAppLog("log", "at pages/favorites/favorites.vue:121", "\u53F3\u6ED1" + this.showIndex);
          }
        } else if (Math.abs(deltaY) > 50 && Math.abs(deltaX) < Math.abs(deltaY)) {
          if (deltaY < 0) {
            formatAppLog("log", "at pages/favorites/favorites.vue:125", "\u4E0A\u6ED1");
          } else {
            formatAppLog("log", "at pages/favorites/favorites.vue:127", "x:" + this.touchStartX + "y:" + this.touchStartY);
            formatAppLog("log", "at pages/favorites/favorites.vue:128", "\u4E0B\u6ED1");
          }
        } else {
          formatAppLog("log", "at pages/favorites/favorites.vue:131", "\u53EF\u80FD\u662F\u8BEF\u89E6\uFF01");
        }
      },
      changeIndex(index) {
        this.showIndex = index;
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_0$1);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_1$1);
    const _component_uni_load_more = resolveEasycom(vue.resolveDynamicComponent("uni-load-more"), __easycom_2$3);
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_3$1);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "container",
      onTouchstart: _cache[6] || (_cache[6] = (...args) => $options.touchStart && $options.touchStart(...args)),
      onTouchend: _cache[7] || (_cache[7] = (...args) => $options.touchEnd && $options.touchEnd(...args))
    }, [
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createCommentVNode(" swiper_nav"),
          vue.createElementVNode("view", {
            class: "fill_width aligin_center_item_left fixed_eventNav",
            style: { "height": "100rpx" }
          }, [
            vue.createElementVNode("view", {
              class: "fill_height aligin_center_item",
              style: { "width": "50%" },
              onClick: _cache[0] || (_cache[0] = ($event) => $options.changeIndex(0))
            }, [
              vue.createElementVNode("text", {
                class: vue.normalizeClass(["padding_tb_20", { "border_line": $data.showIndex == 0 }])
              }, "\u6587\u7AE0", 2)
            ]),
            vue.createElementVNode("view", {
              class: "fill_height aligin_center_item",
              style: { "width": "50%" },
              onClick: _cache[1] || (_cache[1] = ($event) => $options.changeIndex(1))
            }, [
              vue.createElementVNode("text", {
                class: vue.normalizeClass(["padding_tb_20", { "border_line": $data.showIndex == 1 }])
              }, "\u8D5B\u4E8B", 2)
            ])
          ]),
          vue.createCommentVNode(" \u5360\u4F4D "),
          vue.createElementVNode("view", { style: { "height": "100rpx" } })
        ]),
        _: 1
      }),
      vue.createCommentVNode(" \u624B\u52A8swiper "),
      vue.createElementVNode("view", { class: "margin_top_10 margin_lr_10" }, [
        vue.createVNode(_component_uni_transition, {
          modeClass: $data.transType,
          show: $data.showIndex == 0
        }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createElementVNode("view", null, [
              vue.createCommentVNode(" \u7528\u6237\u9884\u89C8\u5361\u7247 "),
              vue.createElementVNode("view", {
                onClick: _cache[2] || (_cache[2] = (...args) => _ctx.gotoDetail && _ctx.gotoDetail(...args)),
                class: "border_line_grey_bt_tiny aligin_center_item_left margin_bt_15",
                style: { "height": "130rpx", "border-radius": "10rpx", "overflow": "hidden" }
              }, [
                vue.createElementVNode("view", {
                  class: "fill_height aligin_center_item",
                  style: { "width": "30%" }
                }, [
                  vue.createElementVNode("image", {
                    style: { "height": "100rpx", "width": "100rpx", "border-radius": "50%" },
                    src: "/static/faces/2-thump.jpg"
                  })
                ]),
                vue.createElementVNode("view", {
                  class: "fill_height aligin_center_item_left",
                  style: { "width": "50%" }
                }, [
                  vue.createElementVNode("text", null, "author")
                ]),
                vue.createElementVNode("view", {
                  class: "fill_height aligin_center_item_left",
                  style: { "width": "20%" }
                }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "right",
                    size: "22"
                  })
                ])
              ]),
              vue.createCommentVNode(" \u52A0\u8F7D\u66F4\u591A "),
              vue.createElementVNode("view", { class: "margin_top_50 aligin_center_item" }, [
                vue.createVNode(_component_uni_load_more, {
                  onClickLoadMore: _cache[3] || (_cache[3] = ($event) => _ctx.clickLoadMore(_ctx.e)),
                  status: $data.status,
                  color: "#03dac5",
                  contentText: $data.contentText,
                  iconType: "circle"
                }, null, 8, ["status", "contentText"])
              ]),
              vue.createCommentVNode(" \u5360\u4F4D "),
              vue.createElementVNode("view", { style: { "height": "1000rpx" } })
            ], 512), [
              [vue.vShow, $data.showIndex == 0]
            ])
          ]),
          _: 1
        }, 8, ["modeClass", "show"]),
        vue.createCommentVNode(" \u7528\u6237 "),
        vue.createVNode(_component_uni_transition, {
          modeClass: $data.transType,
          show: $data.showIndex == 1
        }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createElementVNode("view", null, [
              vue.createCommentVNode(" \u7528\u6237\u9884\u89C8\u5361\u7247 "),
              vue.createElementVNode("view", {
                onClick: _cache[4] || (_cache[4] = (...args) => _ctx.gotoDetail && _ctx.gotoDetail(...args)),
                class: "border_line_grey_bt_tiny aligin_center_item_left margin_bt_15",
                style: { "height": "130rpx", "border-radius": "10rpx", "overflow": "hidden" }
              }, [
                vue.createElementVNode("view", {
                  class: "fill_height aligin_center_item",
                  style: { "width": "30%" }
                }, [
                  vue.createElementVNode("image", {
                    style: { "height": "100rpx", "width": "100rpx", "border-radius": "50%" },
                    src: "/static/faces/2-thump.jpg"
                  })
                ]),
                vue.createElementVNode("view", {
                  class: "fill_height aligin_center_item_left",
                  style: { "width": "50%" }
                }, [
                  vue.createElementVNode("text", null, "author")
                ]),
                vue.createElementVNode("view", {
                  class: "fill_height aligin_center_item_left",
                  style: { "width": "20%" }
                }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "right",
                    size: "22"
                  })
                ])
              ]),
              vue.createCommentVNode(" \u52A0\u8F7D\u66F4\u591A "),
              vue.createElementVNode("view", { class: "margin_top_50 aligin_center_item" }, [
                vue.createVNode(_component_uni_load_more, {
                  onClickLoadMore: _cache[5] || (_cache[5] = ($event) => _ctx.clickLoadMore(_ctx.e)),
                  status: $data.status,
                  color: "#03dac5",
                  contentText: $data.contentText,
                  iconType: "circle"
                }, null, 8, ["status", "contentText"])
              ]),
              vue.createCommentVNode(" \u5360\u4F4D "),
              vue.createElementVNode("view", { style: { "height": "1000rpx" } })
            ], 512), [
              [vue.vShow, $data.showIndex == 1]
            ])
          ]),
          _: 1
        }, 8, ["modeClass", "show"])
      ])
    ], 32);
  }
  var PagesFavoritesFavorites = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/dachuang/uniapp_client/Client/pages/favorites/favorites.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/user/login/login", PagesUserLoginLogin);
  __definePage("pages/user/register/register", PagesUserRegisterRegister);
  __definePage("pages/events/events", PagesEventsEvents);
  __definePage("pages/msg/msg", PagesMsgMsg);
  __definePage("pages/self/self", PagesSelfSelf);
  __definePage("pages/test/test", PagesTestTest);
  __definePage("pages/self/self_detail/self_detail", PagesSelfSelf_detailSelf_detail);
  __definePage("pages/self/self_update/self_update", PagesSelfSelf_updateSelf_update);
  __definePage("pages/search_result/search_result", PagesSearch_resultSearch_result);
  __definePage("pages/index/sec_detail/sec_detail", PagesIndexSec_detailSec_detail);
  __definePage("pages/events/event_detail/event_detail", PagesEventsEvent_detailEvent_detail);
  __definePage("pages/focus/focus", PagesFocusFocus);
  __definePage("pages/favorites/favorites", PagesFavoritesFavorites);
  const _sfc_main = {
    globalData: {},
    onLaunch: function() {
      formatAppLog("log", "at App.vue:7", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:10", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:13", "App Hide");
    }
  };
  var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/dachuang/uniapp_client/Client/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(uni.VueShared, Vue);
