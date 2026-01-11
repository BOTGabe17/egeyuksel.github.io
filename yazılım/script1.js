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
  const left = document.querySelector(".authors .left");
  const right = document.querySelector(".authors .right");

  let cards = Array.from(track.children);
  const gap = parseInt(getComputedStyle(track).gap);

  // clone first & last
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cards.length - 1].cloneNode(true);

  track.appendChild(firstClone);
  track.insertBefore(lastClone, cards[0]);

  cards = Array.from(track.children);

  let index = 1;

  function cardWidth() {
    return cards[0].getBoundingClientRect().width + gap;
  }

  function update(animate = true) {
    track.style.transition = animate ? "transform 0.35s ease" : "none";
    track.style.transform = `translateX(-${index * cardWidth()}px)`;
  }

  update(false);

  right.onclick = () => {
    index++;
    update();

    if (index === cards.length - 1) {
      setTimeout(() => {
        index = 1;
        update(false);
      }, 350);
    }
  };

  left.onclick = () => {
    index--;
    update();

    if (index === 0) {
      setTimeout(() => {
        index = cards.length - 2;
        update(false);
      }, 350);
    }
  };

  window.addEventListener("resize", () => update(false));
});

