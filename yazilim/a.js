document.addEventListener("DOMContentLoaded", () => {

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

