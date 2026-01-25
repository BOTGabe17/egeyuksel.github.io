const ITEMS_PER_PAGE = 7;
let currentPage = 1;
let collected = []; 
document.addEventListener("DOMContentLoaded", () => {

const input = document.getElementById("headerSearch");
const results = document.getElementById("headerSearchResults");
const btn = document.getElementById("searchBtn");

const articles = ["haber1.html", "haber2.html", "haber3.html","haber4.html","tuncer_yazi1.html","tuncer_yazi2.html","tuncer_yazi3.html","tuncer_yazi4.html","tuncer_yazi5.html","tuncer_yazi6.html"];
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
// TARİH
  function normalizeAuthor(name) {
  return name
    .toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/\s+/g, "")
    .trim();
}

  input.addEventListener("keydown", e => {
  if (e.key === "Enter") btn.click();
  });


  function extractDescription(doc) {
  // 1️⃣ Özel açıklama (meta description)
  const metaDesc = doc
    .querySelector('meta[name="description"]')
    ?.getAttribute("content")
    ?.trim();

  if (metaDesc) return metaDesc;

  // 2️⃣ İlk paragraf
  const firstP = doc.querySelector("p");
  if (!firstP) return "";

  const text = firstP.textContent.trim();
  if (text.length <= 150) return text;

  // 3️⃣ Kelime bölmeden kısalt
  let cut = text.slice(0, 150);
  cut = cut.slice(0, cut.lastIndexOf(" "));

  return cut + "...";
}

function getExcerpt(text, maxLength) {
  if (!text) return "";

  if (text.length <= maxLength) return text;

  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");

  return cut.slice(0, lastSpace) + "...";
}


  function parseTurkishDate(dateStr) {
  if (!dateStr) return null;

  const months = {
    ocak: 0,
    şubat: 1,
    mart: 2,
    nisan: 3,
    mayıs: 4,
    haziran: 5,
    temmuz: 6,
    ağustos: 7,
    eylül: 8,
    ekim: 9,
    kasım: 10,
    aralık: 11
  };

  const parts = dateStr
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ");

  if (parts.length < 3) return null;

  const day = parseInt(parts[0], 10);
  const month = months[parts[1]];
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || month === undefined || isNaN(year)) return null;

  return new Date(year, month, day);
}


// --- Yazar kutu---
 // 🔹 Bu sayfanın yazarı
  const pageAuthor = document
    .querySelector('meta[name="author"]')
    ?.getAttribute("content")
    ?.trim();

  const container = document.getElementById("authorArticles");

  if (!pageAuthor || !container) {
    console.warn("Author script çalışmadı:", pageAuthor, container);
    return;
  }

  // 🔹 Normalize (Türkçe, tire, boşluk derdi bitsin diye)
  function normalize(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replaceAll("-", " ")
      .trim();
  }

async function loadAuthorArticles() {
  const collected = [];

  for (const url of articles) {
    try {
      const res = await fetch(url);
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");

      // 🔹 Sadece köşe yazısı
      const type = doc.querySelector('meta[name="yazi-turu"]')?.getAttribute("content") || "";
      if (type !== "kose-yazisi") continue;

      // 🔹 Yazar kontrolü
      const metaAuthor = doc.querySelector('meta[name="author"]')?.getAttribute("content") || "";
      if (normalizeAuthor(metaAuthor) !== normalizeAuthor(pageAuthor)) continue;

      // 🔹 Başlık
      const title = doc.querySelector("h1.news-title")?.textContent.trim() ||
                    doc.querySelector("h1.article-title")?.textContent.trim() || "Başlıksız";

      // 🔹 Tarih
      const dateText = doc.querySelector(".article-date")?.textContent.trim() || "";
      const dateObj = parseTurkishDate(dateText);

      // 🔹 Açıklama
      const description = extractDescription(doc);

      collected.push({
        title,
        url,
        date: dateObj,
        dateText,
        description
      });

    } catch (e) {
      console.error("Köşe yazısı okunamadı:", url, e);
    }
  }

  // 🔹 Tarihe göre sıralama (yeni üstte)
  collected.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date - a.date;
  });

  renderPage(collected);
  renderPagination(collected);

  window.addEventListener("resize", () => {
    renderPage(collected);
  });
}



const isMobile = window.innerWidth <= 768;
function renderPage(items) {
  container.innerHTML = "";

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const isMobile = window.innerWidth <= 768;
  const maxLen = isMobile ? 70 : 150;

  items.slice(start, end).forEach(item => {
    const desc = getExcerpt(item.description, maxLen);

    createAuthorArticleCard(
      item.title,
      item.url,
      item.dateText,
      desc
    );
  });
}
function getPagesWithDots(current, total) {
  const pages = [];

  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  pages.push(1);

  if (current <= 3) {
    pages.push(2, 3, 4, "…", total);
    return pages;
  }

  if (current >= total - 2) {
    pages.push("…", total - 3, total - 2, total - 1, total);
    return pages;
  }

  pages.push("…", current - 1, current, current + 1, "…", total);
  return pages;
}

function renderPagination(items) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  // ◀ PREV
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "‹";
  prevBtn.disabled = currentPage === 1;
  prevBtn.style.opacity = currentPage === 1 ? "0.4" : "1";

  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(items);
      renderPagination(items);
    }
  };

  pagination.appendChild(prevBtn);

  // SAYFA NUMARALARI
  const pages = getSmartPages(currentPage, totalPages);

  pages.forEach(p => {
    if (p === "...") {
      const span = document.createElement("span");
      span.textContent = "...";
      span.style.padding = "0 6px";
      pagination.appendChild(span);
      return;
    }

    const btn = document.createElement("button");
    btn.textContent = p;

    if (p === currentPage) btn.classList.add("active");

    btn.onclick = () => {
      currentPage = p;
      renderPage(items);
      renderPagination(items);
    };

    pagination.appendChild(btn);
  });

  // ▶ NEXT
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "›";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.style.opacity = currentPage === totalPages ? "0.4" : "1";

  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPage(items);
      renderPagination(items);
    }
  };

  pagination.appendChild(nextBtn);
}
function getSmartPages(current, total) {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, 4, "...", total];
  }

  if (current >= total - 2) {
    return [1, "...", total - 3, total - 2, total - 1, total];
  }

  return [1, "...", current - 1, current, current + 1, "...", total];
}

  function createAuthorArticleCard(title, url, dateText, description) {
  if (!container) return;

  const card = document.createElement("div");
  card.className = "article-card";

  card.innerHTML = `
    <div class="article-text">
      <h3>${title}</h3>
      <p>${description}</p>
      <span class="article-date">${dateText || ""}</span>
    </div>
  `;

  // 🔹 Tıklayınca yönlendir
  card.addEventListener("click", () => {
    window.location.href = url;
  });

  // 🔹 Hover efekti (cursor pointer)
  card.style.cursor = "pointer";

  container.appendChild(card);
}



  loadAuthorArticles();
  
});
