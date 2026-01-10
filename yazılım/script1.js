document.addEventListener("DOMContentLoaded", function () {

  /* =======================
     BÜYÜK MANŞET
     ======================= */
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


  /* =======================
     YAZARLAR – INFINITE SLIDER
     ======================= */
  const track = document.querySelector(".authors-track");
  const left = document.querySelector(".authors .arrow.left");
  const right = document.querySelector(".authors .arrow.right");

  const cards = document.querySelectorAll(".author-card");
  const cardWidth = 300;

  let index = 1;

  // başlangıç pozisyonu
  track.style.transform = `translateX(-${index * cardWidth}px)`;

  function move(withTransition = true) {
    track.style.transition = withTransition ? "transform 0.3s ease" : "none";
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  right.addEventListener("click", () => {
    index++;
    move(true);

    if (index === cards.length - 1) {
      setTimeout(() => {
        index = 1;
        move(false);
      }, 300);
    }
  });

  left.addEventListener("click", () => {
    index--;
    move(true);

    if (index === 0) {
      setTimeout(() => {
        index = cards.length - 2;
        move(false);
      }, 300);
    }
  });

});
