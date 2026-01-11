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
  const cards = document.querySelectorAll(".author-card");
  const left = document.querySelector(".authors .left");
  const right = document.querySelector(".authors .right");

  const visible = 3;
  const cloneCount = visible;

  let index = cloneCount;

  function update() {
    track.style.transform = `translateX(-${(index * 100) / visible}%)`;
  }

  update();

  right.onclick = () => {
    index++;
    track.style.transition = "transform 0.35s ease";
    update();

    if (index === cards.length - cloneCount) {
      setTimeout(() => {
        track.style.transition = "none";
        index = cloneCount;
        update();
      }, 350);
    }
  };

  left.onclick = () => {
    index--;
    track.style.transition = "transform 0.35s ease";
    update();

    if (index === 0) {
      setTimeout(() => {
        track.style.transition = "none";
        index = cards.length - cloneCount * 2;
        update();
      }, 350);
    }
  };
});

