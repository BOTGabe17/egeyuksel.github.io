document.addEventListener("DOMContentLoaded", function() {
    var sesliButon = document.getElementById("sesli-buton");
    var butonResim = document.getElementById("buton-resim");
    var ses = new Audio("Turks_jingle_AoE2_DE.ogg");
  
    sesliButon.addEventListener("click", function() {
      if (ses.paused) {
        ses.play();
        sesliButon.classList.add("playing");
        butonResim.src = "https://raw.githubusercontent.com/BOTGabe17/egeyuksel.github.io/main/dur.png";
      } else {
        ses.pause();
        ses.currentTime = 0; // Sesin başa dönmesini sağlar
        sesliButon.classList.remove("playing");
        butonResim.src = "https://raw.githubusercontent.com/BOTGabe17/egeyuksel.github.io/main/oynat.png";
      }
    });
  
    ses.addEventListener("ended", function() {
      sesliButon.classList.remove("playing");
      butonResim.src = "https://raw.githubusercontent.com/BOTGabe17/egeyuksel.github.io/main/oynat.png";
    });
  });
