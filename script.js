let inputRub = document.getElementById("rub");
let inputUsd = document.getElementById("usd");

// inputRub.addEventListener("input", () => {
//   let request = new XMLHttpRequest();
//   // методы
//   // request.open(method, url, async, login, pass)

//   request.open("GET", "./current.json");
//   request.setRequestHeader("Content-type", "application/json; charset=utf-8");
//   // request.send(body); при методе post

//   // request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   request.send();

//   //свойства

//   // status - http код ответа сервера (404)
//   // statusText - текстовое описание ответа от сервера (ok, not found)
//   // responseText - текст ответа сервера / response
//   // readyState - состояние объекта XMLHttpRequest (4 результат работы)

//   request.addEventListener("readystatechange", function () {
//     if (request.readyState === 4 && request.status == 200) {
//       let data = JSON.parse(request.response);

//       inputUsd.value = inputRub.value / data.usd;
//     } else {
//       inputUsd.value = "Что-то пошло не так!";
//     }
//   });
// });

const convertValute = (url) => {
  return new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.onload = function () {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        let error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };
    request.onerror = function () {
      reject(new Error("Network Error"));
    };
    request.send();
  });
};
inputRub.addEventListener("input", () => {
  convertValute("./current.json").then((response) => {
    let data = JSON.parse(response);

    inputUsd.value = inputRub.value / data.usd;
  }),
    (error) => console.log(error);
});
