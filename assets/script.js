let arrow = document.querySelector(".arrow");
let berjalan = document.querySelector("#berjalan");
let nav = document.querySelector(".nav");
let arr = ["Backend Development", "Penetration Testing"];
const form = document.forms["galihap-contact-form"];
const btnKirim = document.querySelector(".btn-kirim");
const btnLoading = document.querySelector(".btn-loading");
const myAlert = document.querySelector(".my-alert");
const myAlert2 = document.querySelector(".my-alert2");
let munculDelay = 80; // Delay muncul dalam milidetik
let hilangDelay = 100; // Delay menghilang dalam milidetik
let currentIndex = 0;
let karakterIndex = 0;
const scriptURL =
  "https://script.google.com/macros/s/AKfycbz_sB8gb_4w7mcsZ0SJSh18QXQyA0zSyf_Eei1jRSpHJwfrxlQtDhURqiTBXyPG3EFT/exec"; // Silakan ganti milik Anda sendiri.
const img_skillset = document.querySelectorAll(".img-skillset");
const certificates = document.querySelectorAll(".certificates");
const educations = document.querySelectorAll(".educations");
const navLinks = document.querySelectorAll(".nav-link");
const menuToggle = document.getElementById("navbarNav");
let db;
const request = indexedDB.open("db_komentar", 2);

// Buat database dan tabel
request.onupgradeneeded = function (event) {
  db = event.target.result;
  let objectStore = db.createObjectStore("users", {
    keyPath: "id",
    autoIncrement: true,
  });

  objectStore.createIndex("nama", "nama", { unique: false });
  objectStore.createIndex("email", "email", { unique: true });
  objectStore.createIndex("pesan", "pesan", { unique: false });
};

// Handle error dan success saat membuka database
request.onsuccess = (event) => {
  db = event.target.result;
  console.log(`Indexed DB - Successfully`);
};

request.onerror = (event) => {
  console.error(`Oops error saat membuat indexedDB : ${event}`);
};

// Fungsi menambahkan data indexed DB
function addData(db, nama, email, pesan) {
  let transaction = db.transaction(["users"], "readwrite");
  let objectStore = transaction.objectStore("users");

  let user = { nama: nama, email: email, pesan: pesan };
  let addRequest = objectStore.add(user);

  addRequest.onsuccess = function () {
    console.log("Data berhasil ditambahkan");

    getData();
  };
}

// Fungsi untuk mengambil dan menampilkan data Indexed DB
function getData() {
  let transaction = db.transaction(["users"], "readonly");
  let object_store = transaction.objectStore("users");
  let requestObjStore = object_store.openCursor();

  requestObjStore.onerror = function (event) {
    console.error(`Error fetching data : ${event}`);
  };

  requestObjStore.onsuccess = function (event) {
    let cursor = event.target.result;
    if (cursor) {
      let key = cursor.primaryKey;
      let value = cursor.value;
      console.log(key, value);
      cursor.continue();
    }
  };
}

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load("particles-js", "assets/particles.json", function () {
  console.log("callback - particles.js config loaded");
});

let owl = $(".owl-carousel");
owl.owlCarousel({
  items: 7,
  loop: true,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: true,
    },
    600: {
      items: 2,
      nav: false,
    },
    1000: {
      items: 3,
      nav: true,
      loop: true,
    },
  },
});

$(".play").on("click", function () {
  owl.trigger("play.owl.autoplay", [1000]);
});
$(".stop").on("click", function () {
  owl.trigger("stop.owl.autoplay");
});

gsap.from(".particles", { duration: 1, y: -100, opacity: 0 });

VanillaTilt.init(document.querySelector(".img"), {
  max: 30,
  speed: 400,
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Jika menggunakan Bootstrap 5
    const bsCollapse = new bootstrap.Collapse(menuToggle, {
      toggle: false,
    });
    bsCollapse.hide(); // Tutup navbar
  });
});

img_skillset.forEach((img, i) => {
  img.dataset.aos = "fade-down";
  img.dataset.aosDelay = i * 50;
  img.dataset.aosDuration = 1000;
});

educations.forEach((education, i) => {
  education.dataset.aos = "fade-down";
  education.dataset.aosDelay = i * 50;
  education.dataset.aosDuration = 1000;
});

certificates.forEach((certificate, i) => {
  certificate.dataset.aos = "fade-down";
  certificate.dataset.aosDelay = i * 50;
  certificate.dataset.aosDuration = 1000;
});

AOS.init();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let nama = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let pesan = document.getElementById("message").value;

  if (db) {
    addData(db, nama, email, pesan);
  } else {
    console.error("Database belum siap.");
  }

  btnLoading.classList.toggle("d-none");
  btnKirim.classList.toggle("d-none");
  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
    mode: "no-cors",
  })
    .then((response) => {
      btnLoading.classList.toggle("d-none");
      btnKirim.classList.toggle("d-none");

      myAlert.classList.toggle("d-none");

      form.reset();

      setTimeout(function () {
        myAlert.classList.toggle("d-none");
      }, 3000);
    })
    .catch((error) => {
      myAlert2.classList.toggle("d-none");

      setTimeout(function () {
        btnLoading.classList.toggle("d-none");
        btnKirim.classList.toggle("d-none");
      }, 100);

      setTimeout(function () {
        myAlert2.classList.toggle("d-none");
      }, 3000);
    });
});

window.addEventListener("scroll", function () {
  // Cek scroll
  let scrollPosition = window.scrollY;

  if (scrollPosition >= 598) {
    nav.classList.add("show");
  } else if (scrollPosition <= 0) {
    nav.classList.remove("show");
  }
});

function teksBerjalan() {
  if (karakterIndex < arr[currentIndex].length) {
    berjalan.innerHTML += arr[currentIndex].charAt(karakterIndex);
    karakterIndex++;
    setTimeout(teksBerjalan, munculDelay);
  } else {
    if (arr[currentIndex] == arr[0]) {
      setTimeout(hapusTeks, 300);
    }
    if (arr[currentIndex] == arr[1]) {
      setTimeout(hapusTeks, 300);
    }
  }
}

function hapusTeks() {
  if (karakterIndex >= 0) {
    let teks = arr[currentIndex].substring(0, karakterIndex);
    berjalan.innerHTML = teks;
    karakterIndex--;
    setTimeout(hapusTeks, 50);
  } else {
    currentIndex = (currentIndex + 1) % arr.length;
    setTimeout(teksBerjalan, munculDelay);
  }
}

teksBerjalan();
