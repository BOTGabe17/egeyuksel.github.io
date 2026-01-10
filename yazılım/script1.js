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

  let headlineIndex = 0;

  function updateHeadline() {
    titleEl.textContent = headlines[headlineIndex].title;
    descEl.textContent = headlines[headlineIndex].desc;
  }

  bigLeft.addEventListener("click", () => {
    headlineIndex = (headlineIndex - 1 + headlines.length) % headlines.length;
    updateHeadline();
  });

  bigRight.addEventListener("click", () => {
    headlineIndex = (headlineIndex + 1) % headlines.length;
    updateHeadline();
  });

  updateHeadline();


  /* === YAZARLAR === */
  const track = document.querySelector(".authors-track");
  const authorLeft = document.querySelector(".authors .arrow.left");
  const authorRight = document.querySelector(".authors .arrow.right");

  const total = document.querySelectorAll(".author-card").length;
  let authorIndex = 0;

  function updateAuthors() {
    track.style.transform = `translateX(-${authorIndex * 300}px)`;
  }

  authorLeft.addEventListener("click", () => {
    authorIndex = (authorIndex - 1 + total) % total;
    updateAuthors();
  });

  authorRight.addEventListener("click", () => {
    authorIndex = (authorIndex + 1) % total;
    updateAuthors();
  });

});

