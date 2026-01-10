/* === BÜYÜK MANŞET === */
const bigHeadline = document.querySelector(".big-headline");
const bigLeft = bigHeadline.querySelector(".arrow.left");
const bigRight = bigHeadline.querySelector(".arrow.right");

const titleEl = bigHeadline.querySelector("h1");
const descEl = bigHeadline.querySelector("p");

const headlines = [
  { title: "Birinci Manşet", desc: "Birinci açıklama" },
  { title: "İkinci Manşet", desc: "İkinci açıklama" },
  { title: "Üçüncü Manşet", desc: "Üçüncü açıklama" }
];

let index = 0;

bigLeft.addEventListener("click", () => {
  index = (index - 1 + headlines.length) % headlines.length;
  updateHeadline();
});

bigRight.addEventListener("click", () => {
  index = (index + 1) % headlines.length;
  updateHeadline();
});

function updateHeadline() {
  titleEl.textContent = headlines[index].title;
  descEl.textContent = headlines[index].desc;
}

/* === YAZARLAR === */
const authors = document.querySelector(".authors");
const authorLeft = authors.querySelector(".arrow.left");
const authorRight = authors.querySelector(".arrow.right");

authorLeft.addEventListener("click", () => {
  console.log("Yazarlar sola");
});

authorRight.addEventListener("click", () => {
  console.log("Yazarlar sağa");
});
