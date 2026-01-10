/* BÜYÜK MANŞET */
const headlines = [
  {
    title: "Büyük Manşet Başlığı",
    desc: "Alt açıklama metni burada durur."
  },
  {
    title: "İkinci Büyük Manşet",
    desc: "Ülke gündeminde sıcak gelişmeler."
  },
  {
    title: "Üçüncü Büyük Manşet",
    desc: "Ekonomi ve siyaset iç içe."
  }
];

let headlineIndex = 0;

const headlineTitle = document.querySelector(".headline-content h1");
const headlineDesc = document.querySelector(".headline-content p");
const headlineArrows = document.querySelectorAll(".big-headline .arrow");

headlineArrows[0].addEventListener("click", () => {
  headlineIndex = (headlineIndex - 1 + headlines.length) % headlines.length;
  updateHeadline();
});

headlineArrows[1].addEventListener("click", () => {
  headlineIndex = (headlineIndex + 1) % headlines.length;
  updateHeadline();
});

function updateHeadline() {
  headlineTitle.textContent = headlines[headlineIndex].title;
  headlineDesc.textContent = headlines[headlineIndex].desc;
}

/* YAZARLAR */
const authors = [
  {
    name: "Ahmet Yılmaz",
    last: "Ekonomi nereye gidiyor?"
  },
  {
    name: "Mehmet Kaya",
    last: "Siyasetin perde arkası
