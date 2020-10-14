<template>
  <el-input
    v-model="showVal"
    type="text"
    :placeholder="placeholder"
    :disabled="disabled"
    @focus="focusHandler"
    @blur="blurHandler"
    @input="replaceNoNumber"
  />
</template>

<script>
/**
 * @author yyb
 * @desc 数字输入组件，可以输入整数和小数，靠精度来区分，整数精度为0，小数精度大于0，不支持负数
 */
export default {
  name: "CrabNumber",
  model: { event: "input", prop: "value" },
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    // 精度，默认输入整数
    precision: {
      type: Number,
      default: 0
    },
    // 最大可输入长度
    maxlength: {
      type: Number,
      default: 9
    },
    // 提示
    placeholder: {
      type: String,
      default: "请输入"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 输入最大值
    inputMax: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {
      showVal: ""
    };
  },
  watch: {
    value(val) {
      this.showVal = val;
    }
  },
  created() {
    this.showVal = this.value;
  },
  methods: {
    focusHandler(event) {
      const val = event.target.value;
      if (val === "0") {
        this.showVal = "";
      }
    },
    blurHandler(event) {
      const val = Number(event.target.value);
      if (val === "") {
        this.showVal = "";
      }
    },
    replaceNoNumber(inputValue) {
      const _this = this;
      if (_this.precision > 0) {
        // 清除“数字”和“.”以外的字符
        inputValue = inputValue.replace(/[^\d.]/g, "");
        // 只保留第一个. 清除多余的;算法：把第一个点替换成其他的，把其他的点替换掉，然后把第一个点还原
        inputValue = inputValue
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", ".");
      } else {
        // 清除“数字”以外的字符
        inputValue = inputValue.replace(/[^\d]/g, "");
      }
      // 保留小数位数
      switch (_this.precision) {
        case 1:
          inputValue = inputValue.replace(/^(\d+)\.(\d).*$/, "$1.$2");
          break;
        case 2:
          inputValue = inputValue.replace(/^(\d+)\.(\d{2}).*$/, "$1.$2");
          break;
        case 3:
          inputValue = inputValue.replace(/^(\d+)\.(\d{3}).*$/, "$1.$2");
          break;
        case 4:
          inputValue = inputValue.replace(/^(\d+)\.(\d{4}).*$/, "$1.$2");
          break;
        default:
          break;
      }
      // 首位不能为.
      if (inputValue.indexOf(".") === 0) {
        inputValue = inputValue.substring(1);
      }
      // 整数首位不能为0
      if (
        inputValue.length >= 2 &&
        inputValue.indexOf(".") !== 1 &&
        inputValue[0] === "0"
      ) {
        inputValue = inputValue.substring(1);
      }
      // 去掉超过最大长度的数字
      if (inputValue.length > _this.maxlength) {
        inputValue = inputValue.substring(0, _this.maxlength);
      }
      // 没有输入则为0
      if (!inputValue) {
        inputValue = "";
      }
      // 判断是否超过最大值
      if (_this.inputMax) {
        inputValue = Number(inputValue);
        if (inputValue >= _this.inputMax) {
          inputValue = _this.inputMax;
        }
      }
      _this.$emit("input", inputValue);
      _this.$nextTick(() => {
        // 避免重复赋值，如果是全数字输入，监听器会赋值，如果非数字输入，监听器不会改变，无法达到替换效果
        if (inputValue !== _this.showVal) {
          _this.showVal = inputValue;
        }
      });
    }
  }
};
</script>
