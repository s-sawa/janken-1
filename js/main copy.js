const meter = document.getElementById("meter");
let count = 0;
let stockPrice = 3000;
let cash = 50000;
let holdingNumber = 0;
let arryStock = [];
let newArryStock = [];
let firstElement = 0;
let totalBalance = 0;

//買いボタンの処理
$(".buyButton").on("click", function () {
  if (cash > stockPrice) {
    balance = cash - stockPrice;
    cash -= stockPrice;
    // 購入した時の株価を配列に格納
    arryStock.push(stockPrice);
    holdingNumber += 1;
    $(".after-balance").html(balance);
    $(".holdingNumber").html(holdingNumber);
  } else {
    alert("現金が足りません！");
  }
});
// 売りボタンの処理
$(".sellButton").on("click", function () {
  if (holdingNumber > 0) {
    holdingNumber -= 1;
    $(".holdingNumber").html(holdingNumber);
    firstElement = arryStock.shift();
    cash += firstElement;
    balance = balance + firstElement;
    $(".after-balance").html(balance);
    //   alert(holdingNumber);
  } else {
    alert("株を持っていません！");
  }
});

// 総資産計算
setInterval(() => {
  count++;
  //   $(".now_stock").html(count);
  // 現在株価表示
  //   $(".now_stock").html(stockPrice);
  totalBalance = holdingNumber * stockPrice + cash;
  $(".total-balance").html(totalBalance);
  if (count > meter.max) {
    // $(".now-stock").html("stockPrice");
    count = 0;
    let min = Math.floor(-0.1 * stockPrice);
    let max = Math.floor(0.1 * stockPrice);
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    stockPrice += randomNumber;
    $(".now_stock").html(stockPrice);
    $(".change").html(`前日比${randomNumber}`);
    //保有株に増減値を反映
    arryStock = arryStock.map((value) => {
      return value + randomNumber;
    });
  }
  meter.value = count;
}, 1000);
