const MAX_NEWS = 6;
const authors = [
    { name: "Mehmed Tuncer", url: "mehmet_tuncer.html", photo: "" },
    { name: "Mehmed Bera Ertuğrul", url: "yazar-mehmed-bera-ertugrul.html", photo: "" },
    { name: "Mehmed Adem Uyar", url: "yazar-mehmed-adem-uyar.html", photo: "" },
    { name: "Ahmed Emre Uğur", url: "yazar-ahmed-emre-ugur.html", photo: "" },
    { name: "Mehmed Sıddık Arvas", url: "yazar-mehmed-siddik-arvas.html", photo: "" }
  ];

  const articles = [
    "tuncer_yazi1.html","tuncer_yazi2.html","tuncer_yazi3.html",
    "tuncer_yazi4.html","tuncer_yazi5.html","tuncer_yazi6.html"
  ];
  
document.addEventListener("DOMContentLoaded", async () => {
  const NEWS_CONTAINER = document.querySelector(".news-grid");
  const TRACK = document.querySelector(".authors-track");

  // Yazar ve makale listesi
  const authors = [
    { name: "Mehmed Tuncer", url: "mehmet_tuncer.html", photo: "mehmet_tuncer_deneme1.png" },
    { name: "Mehmed Bera Ertuğrul", url: "mehmed_bera_ertugrul.html", photo: "" },
    { name: "Mehmed Adem Uyar", url: "mehmed_adem_uyar.html", photo: "" },
    { name: "Ahmed Emre Uğur", url: "ahmed_emre_ugur.html", photo: "" },
    { name: "Mehmed Sıddık Arvas", url: "mehmed_siddik_arvas.html", photo: "" }
  ];

  const articles = [
    "haber1.html","haber2.html","haber3.html","haber4.html",
    "haber5.html","haber6.html","haber7.html",
    "tuncer_yazi1.html","tuncer_yazi2.html","tuncer_yazi3.html",
    "tuncer_yazi4.html","tuncer_yazi5.html","tuncer_yazi6.html"
  ];

  function normalizeText(text){
    return text?.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()||"";
  }

  function parseTurkishDate(dateStr){
    const months={ocak:0,şubat:1,mart:2,nisan:3,mayıs:4,haziran:5,temmuz:6,ağustos:7,eylül:8,ekim:9,kasım:10,aralık:11};
    if(!dateStr) return null;
    const parts=dateStr.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").split(" ");
    if(parts.length<3) return null;
    const day=parseInt(parts[0],10);
    const month=months[parts[1]];
    const year=parseInt(parts[2],10);
    if(isNaN(day)||month===undefined||isNaN(year)) return null;
    return new Date(year,month,day);
  }
  // -------------------- MANŞET SLIDER --------------------
  const hTrack = document.querySelector(".headline-track");
  const hCards = document.querySelectorAll(".headline-card");
  const hLeft = document.querySelector(".headline .left");
  const hRight = document.querySelector(".headline .right");

  if(hTrack){
    let hIndex = 1;
    hTrack.style.transform = `translateX(-${hIndex*100}%)`;
    function moveHeadline(){ hTrack.style.transition="transform 0.25s ease"; hTrack.style.transform=`translateX(-${hIndex*100}%)`; }

    hRight.onclick = ()=>{
      hIndex++; moveHeadline();
      if(hIndex===hCards.length-1){
        setTimeout(()=>{ hTrack.style.transition="none"; hIndex=1; hTrack.style.transform=`translateX(-${hIndex*100}%)`; },300);
      }
    };
    hLeft.onclick = ()=>{
      hIndex--; moveHeadline();
      if(hIndex===0){
        setTimeout(()=>{ hTrack.style.transition="none"; hIndex=hCards.length-2; hTrack.style.transform=`translateX(-${hIndex*100}%)`; },300);
      }
    };
  }

  // -------------------- GÜNDEM HABERLERİ --------------------
  async function loadNews(){
    if(!NEWS_CONTAINER) return;
    const collected=[];
    for(const url of articles){
      try{
        const res=await fetch(url);
        const html=await res.text();
        const doc=new DOMParser().parseFromString(html,"text/html");

        const type=doc.querySelector('meta[name="yazi-turu"]')?.getAttribute("content")||"haber";
        if(type!=="haber") continue;

        const dateStr=doc.querySelector(".article-date")?.textContent?.trim()||"";
        const dateObj=parseTurkishDate(dateStr);
        if(!dateObj) continue;

        const title=doc.querySelector(".news-title")?.textContent?.trim()||
                    doc.querySelector(".article-title")?.textContent?.trim()||"Başlıksız";
        const img=doc.querySelector("figure.main-image img")?.src||"https://placehold.co/300x150";

        collected.push({title,url,date:dateObj,img});
      }catch(e){console.warn("Haber okunamadı:",url);}
    }

    collected.sort((a,b)=>b.date-a.date);
    const latest=collected.slice(0,MAX_NEWS);

    NEWS_CONTAINER.innerHTML="";
    latest.forEach(item=>{
      const card=document.createElement("div");
      card.className="news-card";
      card.innerHTML=`
        <div class="news-image"><img src="${item.img}" alt="${item.title}"></div>
        <div class="news-title">${item.title}</div>
      `;
      card.addEventListener("click",()=>window.location.href=item.url);
      NEWS_CONTAINER.appendChild(card);
    });
  }

  // -------------------- YAZAR KUTULARI --------------------
  async function renderAuthors(){
    if(!TRACK) return;
    TRACK.innerHTML="";
    for(const author of authors){
      let lastArticle=null;
      for(const url of articles){
        try{
          const res=await fetch(url);
          const html=await res.text();
          const doc=new DOMParser().parseFromString(html,"text/html");

          const metaAuthor=doc.querySelector('meta[name="author"]')?.getAttribute("content")||"";
          const yaziTuru=doc.querySelector('meta[name="yazi-turu"]')?.getAttribute("content")||"";

          if(normalizeText(metaAuthor)!==normalizeText(author.name)) continue;
          if(yaziTuru!=="kose-yazisi") continue;

          const dateStr=doc.querySelector(".article-date")?.textContent?.trim()||"";
          const dateObj=parseTurkishDate(dateStr);
          if(!dateObj) continue;

          const title=doc.querySelector(".news-title")?.textContent?.trim()||
                      doc.querySelector(".article-title")?.textContent?.trim()||"Başlıksız";

          if(!lastArticle||dateObj>lastArticle.date) lastArticle={title,url,date:dateObj};
        }catch(e){console.warn("Yazar yazısı okunamadı:",url);}
      }

      if(lastArticle){
        const card=document.createElement("div");
        card.className="author-card";
        card.innerHTML=`
          <div class="author-photo">
            <img src="${author.photo||'https://placehold.co/150x150'}" alt="${author.name}">
          </div>
          <h3>${author.name}</h3>
          <p>${lastArticle.title}</p>
        `;
        card.addEventListener("click",()=>window.location.href=author.url);
        TRACK.appendChild(card);
      }
    }
  } 
  
  

  await loadNews();
  await renderAuthors();
});

document.addEventListener("DOMContentLoaded", () => {

  const authors = document.querySelector(".authors");
  if (!authors) return;

  const track = authors.querySelector(".authors-track");
  const left = authors.querySelector(".arrow.left");
  const right = authors.querySelector(".arrow.right");

  let index = 0;
  let cards = [];

  function getVisibleCount() {
    if (window.innerWidth <= 400) return 1;
    if (window.innerWidth <= 800) return 2;
    return 3;
  }

  function update() {
    if (!cards.length) return;

    const visible = getVisibleCount();
    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(getComputedStyle(track).gap) || 0;

    track.style.transform =
      `translateX(-${index * (cardWidth + gap)}px)`;

    // ok durumları
    left.classList.toggle("disabled", index === 0);
    right.classList.toggle(
      "disabled",
      index >= cards.length - visible
    );
  }

  left.addEventListener("click", () => {
    if (index > 0) {
      index--;
      update();
    }
  });

  right.addEventListener("click", () => {
    const visible = getVisibleCount();
    if (index < cards.length - visible) {
      index++;
      update();
    }
  });

  window.addEventListener("resize", () => {
    const visible = getVisibleCount();
    index = Math.min(index, cards.length - visible);
    index = Math.max(index, 0);
    update();
  });

  // KARTLAR SONRADAN YÜKLENDİĞİ İÇİN
  const observer = new MutationObserver(() => {
    cards = Array.from(track.querySelectorAll(".author-card"));
    update();
  });

  observer.observe(track, { childList: true });

});

























document.addEventListener("DOMContentLoaded", () => {
  // önce normalizeText fonksiyonu tanımlı olmalı
  function normalizeText(text){
    return text?.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()||"";
  }

  const input = document.getElementById("headerSearch");
  const results = document.getElementById("headerSearchResults");
  const btn = document.getElementById("searchBtn");

const articles = ["haber1.html", "haber2.html", "haber3.html","haber4.html",, "haber5.html","haber6.html","haber7.html","tuncer_yazi1.html","tuncer_yazi2.html","tuncer_yazi3.html","tuncer_yazi4.html","tuncer_yazi5.html","tuncer_yazi6.html"];
const authors = [
  { name: "Mehmed Tuncer", url: "mehmet_tuncer.html" },
  { name: "Mehmed Bera Ertuğrul", url: "yazar-mehmed-bera-ertugrul.html" },
  { name: "Mehmed Adem Uyar", url: "yazar-mehmed-adem-uyar.html" },
  { name: "Ahmed Emre Uğur", url: "yazar-ahmed-emre-ugur.html" },
  { name: "Mehmed Sıddık Arvas", url: "yazar-mehmed-siddik-arvas.html" }
];

// --- Yardımcı Fonksiyon ---
function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function hasValidMatch(text, query) {
  text = normalizeText(text);
  query = normalizeText(query);

  if (text.includes(query)) return true;

  const words = text.split(/\s+/);
  for (let i = 0; i <= query.length - 3; i++) {
    const slice = query.slice(i, i + 3);
    for (const word of words) {
      if (word.includes(slice) && word.includes(query)) {
        return true;
      }
    }
  }
  return false;
}

// --- Canlı Arama ---
async function getMatches(query) {
  const matches = [];

  // ----- MAKALELER -----
  for (const url of articles) {
    try {
      const res = await fetch(url);
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");

      const title =
        doc.querySelector(".news-title")?.textContent || "";
      const title1 =
      doc.querySelector(".article-title")?.textContent || "";

      const metaKeywords =
        doc.querySelector("meta[name='keywords']")?.getAttribute("content") || "";

      if (hasValidMatch(title + " " + title1 + " " + metaKeywords, query)) {
        matches.push({
          title,
          title1,
          url,
          type: "article"
        });
      }

    } catch (e) {
      console.error("Haber yüklenemedi:", url, e);
    }
  }

  // ----- YAZARLAR -----
  for (const author of authors) {
    if (hasValidMatch(author.name, query)) {
      matches.push({
        title: author.name,
        url: author.url,
        type: "author"
      });
    }
  }

  return matches;
}

if (!input || !results || !btn) return;

input.addEventListener("input", async () => {
  const query = input.value.trim();
  results.innerHTML = "";

  if (query.length < 3) {
    results.style.display = "block";

    if (query.length > 0) {
      const kalan = 3 - query.length;
      const li = document.createElement("li");
      li.textContent = `Lütfen ${kalan} karakter daha girin.`;
      li.style.fontStyle = "italic";
      li.style.color = "#555";
      li.style.cursor = "default";
      results.appendChild(li);
    }

    return;
  }

  const matches = await getMatches(query);

  if (matches.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Aradığınız kriterlere uygun sonuç bulunamadı.";
    li.style.fontStyle = "italic";
    li.style.color = "#555";
    results.appendChild(li);
    results.style.display = "block";
    return;
  }

  for (const m of matches) {
    const li = document.createElement("li");
   const text = m.title || m.title1 || "";

    li.textContent =
    m.type === "author" ? `✍️ ${text}` : text;

    li.onclick = () => window.location.href = m.url;
    results.appendChild(li);
  }

  results.style.display = "block";
});

  btn.addEventListener("click", () => {
  const query = input.value.trim();
  if (query.length < 3)
    window.location.href = `arama_saife.html?query=negatif`;
  else
    window.location.href = `arama_saife.html?query=${encodeURIComponent(query)}`;
  });

  input.addEventListener("keydown", e => {
  if (e.key === "Enter") btn.click();
  });

});