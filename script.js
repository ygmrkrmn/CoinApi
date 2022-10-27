let selectedItem;
let buyAmount;
let buyPiece;
let buyTotal = 0;
let sellAmount;
let profit;
let sellPiece;
let sellTotal = 0;
let temp = "";
let coin = [];
let coins = [];

//api key ile çekme işlemi
function getCoinValue(type) {
  //istekten sonra then fonctionun içine girer
  fetch(
    "https://rest.coinapi.io/v1/exchangerate/" +
      type.text +
      "/USD?apikey=75998E50-A05E-4948-ADB7-C18B85872EAB"
  )
    .then((response) => response.json())
    .then((data) => {
      let asd = `
        <label>${data.rate}</label>
        `;
      document.getElementById("mevcutfiyat").innerHTML = asd;
      console.log(data);
      selectedItem = data.asset_id_base;
      buyAmount = data.rate;
      temp = data;
    });
}
//satın alma fonksiyonum
function buyCoin() {
  buyPiece = parseFloat(document.getElementById("buyAmount").value);
  buyTotal = parseFloat(buyPiece) * parseFloat(buyAmount);
  document.getElementById("coinTable");
  const td = ` 
                    
                    <td class="name">${selectedItem}</td>
                    <td class="amount">${buyAmount}</td> 
                    <td class="piece">${buyPiece}</td> 
                    <td id="buyPiece">${buyTotal}</td> 
                    <button type="button" class="btn btn-secondary" id="modal" onclick="openModel()" >Sat</button>
                    
  `;
  const tr = document.createElement("tr");
  tr.innerHTML = td;
  document.getElementById("coinTable").appendChild(tr);
  document.getElementById("mevcutfiyat").value;
  document.getElementById("buyPiece").innerHTML =
    parseFloat(buyPiece) * parseFloat(buyAmount);
}
//satın al a tıkladığımda modal açılıyor
function openModel() {
  var directory = new bootstrap.Modal(document.getElementById("directory"), {
    keyboard: false,
  });
  directory.show();
}
//satma fonksiyonum
function sell() {
  coins =
    JSON.parse(localStorage.getItem("coins")) == undefined
      ? []
      : JSON.parse(localStorage.getItem("coins"));
  buyPiece = parseFloat(document.getElementById("buyAmount").value);
  sellAmount = parseFloat(document.getElementById("sellAmount").value);
  if (sellPiece > buyPiece) {
    alert("Paranız Yeterli Değil!");
  }
  //toplama çıkartma işlemlerim
  sellPiece = parseFloat(document.getElementById("sellAmount").value);
  sellTotal = parseFloat(sellPiece) * parseFloat(buyAmount);
  profit = buyTotal - sellTotal;
  document.getElementById("briefTable");
  const sell = ` 
    <td class="name">${selectedItem}</td>
    <td class="amount">${buyAmount}</td>
    <td class="piece">${sellPiece}</td> 
    <td id="sellTotal">${sellTotal}</td>
    <td id="profit">${profit}</td>

     `;
  //coins'in içine push ettim
  coins.push({
    name: selectedItem,
    price: buyAmount,
    piece: sellPiece,
    total: sellTotal,
    profitt: profit,
  });

  localStorage.setItem("coins", JSON.stringify(coins));
  const tr = document.createElement("tr");
  tr.innerHTML = sell;
  document.getElementById("briefTable").appendChild(tr);
  //isim,adet,fiyat,toplam kısmını coinlist dizisi içine çekiyorum
  let coinList = [
    {
      adı: temp.asset_id_base,
      fiyat: temp.rate,
      adet: sellPiece,
      toplam: sellTotal,
      karzarar: profit,
    },
  ];
  const storage = JSON.parse(localStorage.getItem("coinList"));
  if (storage === null) {
    coin.push(coinList);
    localStorage.setItem("coin", JSON.stringify(coin));
  } else {
    coinList = JSON.parse(localStorage.getItem("coinList"));
    coin.push(coinList);
    localStorage.setItem("coin", JSON.stringify(coinList));
  }
}

//sayfa yenilenince işlem geçmişinden silinmemesi için
window.onload = function () {
  //coins'in içi boşşa if
  let coins =
    JSON.parse(localStorage.getItem("coins")) == undefined
      ? []
      : JSON.parse(localStorage.getItem("coins"));
  //silinmesin istediğim tablo,veriler
  coins.forEach((val) => {
    var sell = ` 
    <td class="name">${val.name}</td>
    <td class="amount">${val.price}</td>
    <td class="piece">${val.piece}</td> 
    <td id="sellTotal">${val.total}</td>
    <td id="profit">${val.profitt}</td>
     `;
    const tr = document.createElement("tr");
    tr.innerHTML = sell;
    document.getElementById("briefTable").appendChild(tr);
  });
};
