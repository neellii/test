// modal pop up
const modal = document.querySelector(".modal");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.querySelector(".cancel-btn");
const modalBackground = document.querySelector(".modal-background");

openBtn.addEventListener("click", function () {
  modalBackground.style.display = "block";
  document.body.classList.add("no-scroll");
});

closeBtn.addEventListener("click", function () {
  modalBackground.style.display = "none";
  document.body.classList.remove("no-scroll");
});

window.addEventListener("click", function (event) {
  if (event.target === modalBackground) {
    modalBackground.style.display = "none";
    document.body.classList.remove("no-scroll");
  }
});

// image uploaded preview
const imageUploader = document.getElementById("img-input");
const imagePreview = document.getElementById("img-preview");
const imageDelete = document.querySelector(".delete-preview");

function showImage() {
  let reader = new FileReader();
  reader.readAsDataURL(imageUploader.files[0]);
  reader.onload = function (e) {
    imagePreview.classList.add("img-show");
    imagePreview.src = e.target.result;
    imageDelete.style.display = "initial";
  };
}

imageDelete.addEventListener("click", () => {
  imagePreview.src = "";
  imageUploader.value = "";
  imageDelete.style.display = "none";
  imagePreview.classList.remove("img-show");
});

imageUploader.addEventListener("change", showImage);

// tel number mask
window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll(".tel"), function (input) {
    let keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);

      const pos = this.selectionStart;

      if (pos < 3) event.preventDefault();

      let matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) : a;
        });

      i = new_value.indexOf("_");

      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i);
      }

      let reg = matrix
        .substring(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");

      reg = new RegExp("^" + reg + "$");

      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      ) {
        this.value = new_value;
      }
      if (event.type == "blur" && this.value.length < 5) {
        this.value = "";
      }
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });
});
