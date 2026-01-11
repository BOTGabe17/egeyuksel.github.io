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

   const track = document.querySelector(".authors-track");
  const cards = Array.from(track.children);
  const left = document.querySelector(".authors .left");
  const right = document.querySelector(".authors .right");

  let index = 0;

  function getCardWidth() {
    return cards[0].getBoundingClientRect().width +
      parseInt(getComputedStyle(track).gap);
  }

  function update() {
    track.style.transform = `translateX(-${index * getCardWidth()}px)`;
  }

  right.onclick = () => {
    index++;
    if (index >= cards.length) {
      index = 0;
      track.style.transition = "none";
      update();
      requestAnimationFrame(() => {
        track.style.transition = "transform 0.35s ease";
        index = 1;
        update();
      });
    } else {
      update();
    }
  };

  left.onclick = () => {
    index--;
    if (index < 0) {
      index = cards.length - 1;
      track.style.transition = "none";
      update();
      requestAnimationFrame(() => {
        track.style.transition = "transform 0.35s ease";
        index--;
        update();
      });
    } else {
      update();
    }
  };

  window.addEventListener("resize", update);
});

