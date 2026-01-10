document.addEventListener("DOMContentLoaded", function () {

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

  function updateHeadline() {
    titleEl.textContent = headlines[index].title;
    descEl.textContent = headlines[index].desc;
  }

  bigLeft.addEventListener("click", () => {
    index = (index - 1 + headlines.length) % headlines.length;
    updateHeadline();
  });

  bigRight.addEventListener("click", () => {
    index = (index + 1) % headlines.length;
    updateHeadline();
  });

  updateHeadline();

  /* === YAZARLAR === */
  document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".authors-track");
  const left = document.querySelector(".authors .arrow.left");
  const right = document.querySelector(".authors .arrow.right");

  const total = document.querySelectorAll(".author-card").length;
  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 300}px)`;
  }

  left.addEventListener("click", () => {
    index = (index - 1 + total) % total;
    update();
  });

  right.addEventListener("click", () => {
    index = (index + 1) % total;
    update();
  });
});

});
