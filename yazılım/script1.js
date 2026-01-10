document.addEventListener("DOMContentLoaded", () => {

  /* MANŞET */
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
      }, 350);
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
      }, 350);
    }
  };

  /* YAZARLAR */
  const aTrack = document.querySelector(".authors-track");
  const aCards = document.querySelectorAll(".author-card");
  const aLeft = document.querySelector(".authors .left");
  const aRight = document.querySelector(".authors .right");

  let aIndex = 1;
  const visible = 3;

  aTrack.style.transform = `translateX(-${(aIndex * 100) / visible}%)`;

  function moveAuthors() {
    aTrack.style.transition = "transform 0.35s linear";
    aTrack.style.transform = `translateX(-${(aIndex * 100) / visible}%)`;
  }

  aRight.onclick = () => {
    aIndex++;
    moveAuthors();
    if (aIndex === aCards.length - visible) {
      setTimeout(() => {
        aTrack.style.transition = "none";
        aIndex = 1;
        aTrack.style.transform = `translateX(-${(aIndex * 100) / visible}%)`;
      }, 350);
    }
  };

  aLeft.onclick = () => {
    aIndex--;
    moveAuthors();
    if (aIndex === 0) {
      setTimeout(() => {
        aTrack.style.transition = "none";
        aIndex = aCards.length - visible - 1;
        aTrack.style.transform = `translateX(-${(aIndex * 100) / visible}%)`;
      }, 350);
    }
  };

});
