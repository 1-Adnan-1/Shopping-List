// //* Düzenleme
let editFlag = false; //* Düzenleme modunda olup olmadığını belirtir.
let editElement; //* Düzenleme yapılan öğeyi temsil eder.
let editID = ""; //*düzenleme yapılan öğenin kimliği.

// * HTML Element seçme
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");

// ! Fonksiyonlar
//* Ekrana bildirim bastıracak fonksiyon.
const displayAlert = (text, action) => {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
};
//* Varsayılan değere dönderir.
const setBackToDefault = () => {
  grocery.value = "";
  editFlag = false;
  submitBtn.textContent = "Ekle";
};

const addItem = (e) => {
  e.preventDefault(); // * sayfanın yenilenmesini engelledim.
  const value = grocery.value; //*inputa girilen değeri aldım.
  const id = new Date().getTime().toString; //* Benzersiz id oluşturdum.

  //* inputun içi boş değilse ve düzenleme modunda değilse.
  if (value !== "" && !editFlag) {
    const element = document.createElement("article"); //* yeni"article" oluştur
    let attr = document.createAttribute("data-id"); //* yeni veri kimliği oluş
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item"); //* class ekledim

    element.innerHTML = `
         <p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fa-solid fa-pen-to-square"></i>
           </button>
             <button type="button" class="delete-btn">
                 <i class="fa-solid fa-trash"></i>
            </button>
       </div>
    `;

    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);
    list.appendChild(element);
    displayAlert("başarıyla Eklenildi", "success");
    //* Varsayılan değere dönderecek.
    setBackToDefault();
    addToLocalStorage(id, value);
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value; //* güncelleyeceğim elemanın içeriği değişir.
    displayAlert("Başarıyla Değiştirildi", "success");
    //* Varsayılan değere dönderecek.
    setBackToDefault();
  }
}; //* silme butonuna tıklanıldığında çalışır.
const deleteItem = (e) => {
  const element = e.target.parentElement.parentElement.parentElement;
  console.log(element);
  list.removeChild(element); //* "article" etiketini list alanından kaldırdık.
  displayAlert("Başarıyla Kaldırıldı", "danger"); //*kaldırıldı bildirimi verir.
};

const editItem = (e) => {
  const element = e.target.parentElement.parentElement.parentElement;
  editElement = e.target.parentElement.parentElement.previousElementSibling;
  // * düzenleme yapacağım etiketi seçtim ^
  grocery.value = editElement.innerText; //* etiketin içeriğini inputa aktardık.
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "Düzenle"; //* düzenle butonuna ekle butonu düzenle olsun
};

const clearItems = () => {
  const items = document.querySelectorAll(".grocery-item");
  //* listede etiket varmı
  if (items.length > 0) {
    items.forEach((item) => list.removeChild(item)); //*Foreacg= içeride bulunan elemanı dönüp herbir öğeyi listeden kaldırdım
  }

  displayAlert("Liste Boş", "danger");
};
 // Yerel depoya öğe ekleme.
// const addToLocalStorage = (id, value) => {
//   const grocery = { id, value };
//   let items = getLocalStorage();
 // items.push(grocery);
//   console.log(items);
//   localStorage.setItem("list", JSON.stringify(items));
// };
 // * yerel depodan öğeleri aldım.
// function getLocalStorage() {
//   return localStorage.getItem("list")
//     ? JSON.parse(localStorage.getItem("list"))
//     : [];
// }



//! Olay İzleyici

// * Form gönderildiğinde addItem çalışır.
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);
// window.addEventListener("DOMContentLoaded", setupItems);
