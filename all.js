// let data = [
//   {
//     id: 0,
//     name: "肥宅心碎賞櫻3日",
//     imgUrl:
//       "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
//     area: "高雄",
//     price: 1400,
//     group: 87,
//     rate: 10,
//     description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
//   },
//   {
//     id: 1,
//     name: "貓空纜車雙程票",
//     imgUrl:
//       "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     area: "台北",
//     price: 240,
//     group: 99,
//     rate: 2,
//     description:
//       "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
//   },
//   {
//     id: 2,
//     name: "台中谷關溫泉會1日",
//     imgUrl:
//       "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     area: "台中",
//     price: 1765,
//     group: 20,
//     rate: 7,
//     description:
//       "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
//   },
// ];

let data = [];
const url =
  "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json";

function getData() {
  console.log(axios);
  axios.get(url).then(function (response) {
    // console.log("資料有回傳了");
    data = response.data.data;
    // console.log(data);
    init();
    renderData(data);
  });
}
getData();

const cardArea = document.querySelector(".card-area");

function init() {
  // 卡片內容排序邏輯
  let str = "";
  data.forEach(function (item, index) {
    // console.log(item);
    let content = `<div class="card">
            <div class="card-img">
              <a href="#"
                ><img
                  src="${item.imgUrl}"
                  alt="${item.area}旅遊照片"
              /></a>
              <div class="cardTagArea label-md">${item.area}</div>
              <div class="cardTagRate fs-md">${item.rate}</div>
            </div>
            <div class="card-body">
              <div class="card-title"><a href="#" class="label-md">${item.name}</a></div>
              <div class="card-content">
                ${item.description}
              </div>
              <div class="card-footer">
                <div class="card-footer-content">
                  <i class="bi bi-exclamation-circle-fill"></i>
                  <p class="label-sm">剩下最後 ${item.group} 組</p>
                </div>
                <p class="label-sm">TWD<span class="label-xl">$${item.price}</span></p>
              </div>
            </div>
          </div>`;
    str += content;
    console.log(str);
    cardArea.innerHTML = str;
  });
}
init();

// 搜尋篩選邏輯
const filter = document.querySelector(".result-area");
let dataNum = document.querySelector(".dataNum");
let str = "";

function renderData() {
  filter.addEventListener("change", function (e) {
    //console.log(e.target.value);
    if (e.target.value === undefined) {
      console.log("空");
      return;
    }
    let str = ""; // 讓字串內容在每次搜尋時初始化

    let searchTime = 0; // 要讓搜尋筆數也能正確顯示，同理也需要設定變數
    let searchResult = "0";

    data.forEach(function (item, index) {
      if (e.target.value === item.area) {
        let content = `<div class="card">
            <div class="card-img">
              <a href="#"
                ><img
                  src="${item.imgUrl}"
                  alt="${item.area}旅遊照片"
              /></a>
              <div class="cardTagArea label-md">${item.area}</div>
              <div class="cardTagRate fs-md">${item.rate}</div>
            </div>
            <div class="card-body">
              <div class="card-title"><a href="#" class="label-md">${item.name}</a></div>
              <div class="card-content">
                ${item.description}
              </div>
              <div class="card-footer">
                <div class="card-footer-content">
                  <i class="bi bi-exclamation-circle-fill"></i>
                  <p class="label-sm">剩下最後 ${item.group} 組</p>
                </div>
                <p class="label-sm">TWD<span class="label-xl">$${item.price}</span></p>
              </div>
            </div>
          </div>`;
        str += content;
        searchTime += 1;
        searchResult = `<span class="dataNum">${searchTime}</span>`;
      } else if (e.target.value == "全部") {
        str += `<div class="card">
            <div class="card-img">
              <a href="#"
                ><img
                  src="${item.imgUrl}"
                  alt="${item.area}旅遊照片"
              /></a>
              <div class="cardTagArea label-md">${item.area}</div>
              <div class="cardTagRate fs-md">${item.rate}</div>
            </div>
            <div class="card-body">
              <div class="card-title"><a href="#" class="label-md">${item.name}</a></div>
              <div class="card-content">
                ${item.description}
              </div>
              <div class="card-footer">
                <div class="card-footer-content">
                  <i class="bi bi-exclamation-circle-fill"></i>
                  <p class="label-sm">剩下最後 ${item.group} 組</p>
                </div>
                <p class="label-sm">TWD<span class="label-xl">$${item.price}</span></p>
              </div>
            </div>
          </div>`;
        searchTime += 1;
        searchResult = `<span class="dataNum">${searchTime}</span>`;
      }
    });
    // 查無資料邏輯
    if (searchTime == 0) {
      let content = `<div class="card-area-none">
      <p class="H1">查無此關鍵字，請重新選取</p>
      <img
        src="https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/no_found.png?raw=true"
        alt="no_found"
      />
    </div>`;
      str += content;
    }
    cardArea.innerHTML = str;
    dataNum.innerHTML = searchResult;
  });
}

// 新增旅遊資料邏輯

const ticketName = document.querySelector("#name");
const imgUrl = document.querySelector("#imgUrl");
const area = document.querySelector("#area");
const price = document.querySelector("#price");
const group = document.querySelector("#group");
const rate = document.querySelector("#rate");
const description = document.querySelector("#description");
const btn = document.querySelector(".btn");
const alertMessages = document.querySelectorAll(".alert-message");
const formInputs = [
  // 驗證表單
  ticketName,
  imgUrl,
  area,
  price,
  group,
  rate,
  description,
];
let maxId = data.length - 1;
let idNum = maxId;

btn.addEventListener("click", function (e) {
  e.preventDefault();

  let obj = {};

  // 驗證表單空欄
  alertMessages.forEach((item) => {
    item.innerHTML = "";
  });
  let isFormValid = true; // 驗證是否為空
  formInputs.forEach((item, index) => {
    const value = item.value;
    if (value.trim() == "") {
      alertMessages[index].innerHTML = `
                <i class="bi bi-exclamation-circle-fill"></i>
                <p class="fs-sm">此欄必填！</p>
            `;
      isFormValid = false;
    }
  });
  if (!isFormValid) {
    return;
  }

  idNum += 1;
  obj.id = idNum;
  obj.name = ticketName.value;
  obj.imgUrl = imgUrl.value;
  obj.area = area.value;
  obj.price = price.value;
  obj.group = group.value;
  obj.rate = rate.value;
  obj.description = description.value;

  // 驗證表單空欄 <-如果用querySelector寫只會驗證到第一欄，但要驗證所有欄位
  // if (
  //   name.value == "" ||
  //   imgUrl.value == "" ||
  //   area.value == "" ||
  //   price.value == "" ||
  //   group.value == "" ||
  //   rate.value == "" ||
  //   description == ""
  // ) {
  //   alertMessage.innerHTML = `
  //             <img src="./img/alert.svg" alt="alert-icon">
  //             <p class="fs-sm">此欄必填！</p>
  //             `;
  //   return;
  // }
  // alertMessage.innerHTML = "";

  data.push(obj);
  init();
  ticketName.value = "";
  imgUrl.value = "";
  area.value = "";
  price.value = "";
  group.value = "";
  rate.value = "";
  description.value = "";
});

// console.log(data); 檢查用
