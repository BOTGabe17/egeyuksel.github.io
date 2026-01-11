document.addEventListener("DOMContentLoaded", () => {

  /* ================= MANŞET ================= */

  const hTrack = document.querySelector(".headline-track");
  const hCards = document.querySelectorAll(".headline-card");
  const hLeft = document.querySelector(".headline .left");
  const hRight = document.querySelector(".headline .right");

  let hIndex = 1;
  hTrack.style.transform = `translateX(-${hIndex * 100}%)`;

  function moveHeadline() {
    hTrack.style.transition = "transform 0.35s linear";
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
  const visible = 3;
  const cloneCount = visible;
  let aIndex = cloneCount;

  function updateTransform() {
    const cardWidth = aCards[0].getBoundingClientRect().width;
    const gap = parseInt(getComputedStyle(aTrack).gap) || 0;
    aTrack.style.transform = `translateX(-${aIndex * (cardWidth + gap)}px)`;
  }

  updateTransform();

  function move() {
    aTrack.style.transition = "transform 0.35s ease";
    updateTransform();
  }

  aRight.onclick = () => {
    aIndex++;
    move();
    if (aIndex === aCards.length - cloneCount) {
      setTimeout(() => {
        aTrack.style.transition = "none";
        aIndex = cloneCount;
        updateTransform();
      }, 360);
    }
  };

  aLeft.onclick = () => {
    aIndex--;
    move();
    if (aIndex === 0) {
      setTimeout(() => {
        aTrack.style.transition = "none";
        aIndex = aCards.length - cloneCount * 2;
        updateTransform();
      }, 360);
    }
  };

  window.addEventListener("resize", updateTransform);
});

