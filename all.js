let data = [];
const url =
  "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json";
const cardArea = document.querySelector(".card-area");
const filter = document.querySelector(".result-area");
let dataNum = document.querySelector(".dataNum");
let str = "";

function getData() {
  // console.log(axios);
  axios.get(url).then(function (response) {
    // console.log("資料有回傳了");
    data = response.data.data;
    // console.log(data);
    init();
    renderData(data);
  });
}
getData();

// 初始化邏輯
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
    // console.log(str);
    cardArea.innerHTML = str;
  });
}
init();

// 搜尋篩選邏輯
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
    if (value.trim() == "" || value === "請選擇景點地區") {
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
  obj.name = ticketName.value.trim();
  obj.imgUrl = imgUrl.value.trim();
  obj.area = area.value;
  obj.price = Number(price.value);
  obj.group = Number(group.value);
  obj.rate = Number(rate.value);
  obj.description = description.value.trim();
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

// console.log(data);
