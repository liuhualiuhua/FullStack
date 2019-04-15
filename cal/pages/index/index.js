//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    screenData: "0",
    lastIsOptSymbol: false,
    arr: [],
    logs: []
  },
  onLoad: function() {

  },
  onShareAppMessage(res) {
    return {
      title: '可以分享计算结果的简约计算器',
      path: '/pages/index/index',
    }
  },
  setScreenData(data) {
    if (data == "" || data == "－") {
      data = 0;
    }
    this.setData({
      "screenData": data
    });
  },
  // 退格操作
  backOperation() {
    if (this.data.arr.length == 0) {
      return
    }
    this.data.arr.pop();
    var data = this.data.screenData;
    data = data.substring(0, data.length - 1);
    this.setScreenData(data)
  },
  // 正负号操作
  minusOperation() {
    if (this.data.arr.length == 0) {
      return
    }
    var data = this.data.screenData;
    var firstChar = data.charAt(0);
    // 反转正、负号
    if (firstChar == "－") {
      data = data.substr(1);
      //首位抽出
      this.data.arr.shift();
    } else {
      data = "－" + data;
      //首位推入
      this.data.arr.unshift("－");
    }
    this.setScreenData(data)
  },
  // 等于操作
  equalOperation() {
    if (this.data.arr.length == 0) {
      return
    }
    var data = this.data.screenData;
    // 判断最后一个字符，如果不是数字，则返回
    var lastChar = data.charAt(data.length - 1);
    if (isNaN(lastChar)) {
      return;
    }
    var num = "";
    var lastOperator = "";
    var arr = this.data.arr;
    var optarr = [];
    for (var i in arr) {
      if (isNaN(arr[i]) == false || arr[i] == "." || arr[i] == "toggle") {
        // 如果是数字，或者“.”、“-”，则累加进num字符串
        num += arr[i];
      } else {
        // 剩下的是+-*/四则运算符
        lastOperator = arr[i];
        // 先推入数字
        optarr.push(num);
        // 再推入操作符
        optarr.push(arr[i]);
        // 清空num字符串，在下次循环中使用
        num = "";
      }
    }
    if (num) {
      optarr.push(Number(num))
    }
    var result = Number(optarr[0])
    // console.log(result);
    for (var i = 1; i < optarr.length; i = i + 2) {
      if (optarr[i] == "＋") {
        // 加
        result += Number(optarr[i + 1]);
      } else if (optarr[i] == "-") {
        // 减
        result -= Number(optarr[i + 1]);
      } else if (optarr[i] == "*") {
        // 乘
        result *= Number(optarr[i + 1]);
      } else if (optarr[i] == "÷") {
        // 除
        result /= Number(optarr[i + 1]);
      }
    }
    // 存储历史记录
    this.data.logs.push(data + " = " + result);
    wx.setStorageSync("calclogs", this.data.logs);
    // 将本次计算结果存储进arr数组，以备下次计算
    this.data.arr.length = 0;
    this.data.arr.push(result);
    this.setScreenData(result + "")
  },
  numAndOtherOperation(symbol) {
    const numOperateSymbols = {
      "＋": "+",
      "－": "-",
      "×": "*",
      "÷": "/",
      ".": "."
    }
    if (numOperateSymbols[symbol]) { //如果是运算符号+-*/.
      // 如果上次输入了运算符号，则返回，避免重复单击运算符号
      if (this.data.lastIsOptSymbol || this.data.screenData == 0) {
        return;
      }
    }
    var sd = this.data.screenData;
    var data;
    if (sd == 0) {
      data = symbol;
    } else {
      data = sd + symbol;
    }
    this.data.arr.push(symbol);
    this.setScreenData(data)
    this.data.lastIsOptSymbol = numOperateSymbols[symbol]
  },
  tapSymbolBtn(e) {
    var symbol = e.target.dataset.symbol;
    if (undefined == symbol) {
      return
    }
    switch (symbol) {
      case "back":
        //退格←
        this.backOperation()
        break
      case "clear":
        //清屏
        this.setScreenData("")
        this.data.arr.length = 0;
        break
      case "toggle":
        //正负号+/-
        this.minusOperation()
        break
      case "=":
        //等于＝
        this.equalOperation()
        break
      default:
        this.numAndOtherOperation(symbol)
    }
  }
})