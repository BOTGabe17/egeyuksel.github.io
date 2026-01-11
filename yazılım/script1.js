document.addEventListener("DOMContentLoaded", () => {

  /* ================= MANŞET ================= */

  const hTrack = document.querySelector(".headline-track");
  const hCards = document.querySelectorAll(".headline-card");
  const hLeft = document.querySelector(".headline .left");
  const hRight = document.querySelector(".headline .right");

  let hIndex = 1;
  hTrack.style.transform = `translateX(-${hIndex * 100}%)`;

  function moveHeadline() {
    hTrack.style.transition = "transform 0.25s linear";
    hTrack.style.transform = `translateX(-${hIndex * 100}%)`;
  }

  hRight.onclick = () => {
    hIndex++;
    moveHeadline();

    if (hIndex === hCards.length - 1) {
      setTimeout(() => {
        hTrack.style.transition = "none";
        hIndex = 1;
        hTrack.style.transform = `translateX(-${hIndex * 100}%)`;
      }, 300);
    }
  };

  hLeft.onclick = () => {
    hIndex--;
    moveHeadline();

    if (hIndex === 0) {
      setTimeout(() => {
        hTrack.style.transition = "none";
        hIndex = hCards.length - 2;
        hTrack.style.transform = `translateX(-${hIndex * 100}%)`;
      }, 300);
    }
  };

  /* ================= YAZARLAR ================= */

  const aTrack = document.querySelector(".authors-track");
  const aCards = document.querySelectorAll(".author-card");
  const aLeft = document.querySelector(".authors .left");
  const aRight = document.querySelector(".authors .right");

  const visible = 3;          // Aynı anda görünen kart sayısı
  const cloneCount = visible; // Baş ve sondaki klon sayısı

  let aIndex = cloneCount;

  // Gap değerini CSS’den al
  const gap = parseInt(getComputedStyle(aTrack).gap) || 0;

  function updateAuthorsTransform() {
    const cardWidth = aCards[0].offsetWidth;
    aTrack.style.transform = `translateX(-${aIndex * (cardWidth + gap)}px)`;
  }

  updateAuthorsTransform(); // Başlangıçta konum

  function moveAuthors() {
    aTrack.style.transition = "transform 0.25s linear";
    updateAuthorsTransform();
  }

  aRight.onclick = () => {
    aIndex++;
    moveAuthors();

    if (aIndex === aCards.length - cloneCount) {
      setTimeout(() => {
        aTrack.style.transition = "none";
        aIndex = cloneCount;
        updateAuthorsTransform();
      }, 300);
    }
  };

  aLeft.onclick = () => {
    aIndex--;
    moveAuthors();

    if (aIndex === 0) {
      setTimeout(() => {
        aTrack.style.transition = "none";
        aIndex = aCards.length - cloneCount * 2;
        updateAuthorsTransform();
      }, 300);
    }
  };

  // Responsive durumlarda kart boyutu değişirse tekrar hesapla
  window.addEventListener("resize", () => {
    updateAuthorsTransform();
  });

});
