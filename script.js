// 다크모드 토글
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  document.getElementById("theme-toggle").textContent = isLight
    ? "dark"
    : "light";
});

// 초기 언어 상태 확인 (localStorage에서)
let currentLang = localStorage.getItem("lang") || "ko";
document.body.classList.add(`lang-${currentLang}`);
document.getElementById("lang-toggle").textContent =
  currentLang === "ko" ? "EN" : "KO";

// 언어 전환 버튼 이벤트
const langToggleBtn = document.getElementById("lang-toggle");
langToggleBtn.addEventListener("click", () => {
  currentLang = currentLang === "ko" ? "en" : "ko";

  // 버튼 텍스트 변경
  langToggleBtn.textContent = currentLang === "ko" ? "EN" : "KO";

  // 클래스 적용
  document.body.classList.remove("lang-ko", "lang-en");
  document.body.classList.add(`lang-${currentLang}`);

  // localStorage에 저장
  localStorage.setItem("lang", currentLang);
});

// 탑버튼 + 스크롤 이벤트
const scrollContainer = document.querySelector(".container");
const topBtn = document.getElementById("top-button");
const topBar = document.querySelector(".top-bar");
let lastScrollY = 0;

scrollContainer.addEventListener("scroll", () => {
  const currentScroll = scrollContainer.scrollTop;

  // 탑버튼 표시 여부
  if (currentScroll > 300) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }

  // 내릴 때 top-bar 숨기고, 올릴 때 보이게
  if (currentScroll > lastScrollY && currentScroll > 100) {
    topBar.classList.add("hide");
  } else {
    topBar.classList.remove("hide");
  }

  lastScrollY = currentScroll;
});

// top버튼 클릭 시 위로 부드럽게 이동
topBtn.addEventListener("click", () => {
  scrollContainer.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// 마우스가 위쪽 80px 근처 오면 top-bar 다시 보이게
document.addEventListener("mousemove", (e) => {
  if (e.clientY < 80) {
    topBar.classList.remove("hide");
  }
});

let hideTimer = null;

document.addEventListener("mousemove", (e) => {
  // 메인 섹션에 있는지 확인
  const inMain = scrollContainer.scrollTop < window.innerHeight * 0.5;

  // 메인에 있으면 항상 보이게
  if (inMain) {
    topBar.classList.remove("hide");
    return;
  }

  if (e.clientY < 80) {
    topBar.classList.remove("hide");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      topBar.classList.add("hide");
    }, 800);
  }
});

// codeRain.js
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("codeRain");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = "01<>/{}[]()=+constletfunction;".split("");
  const fontSize = 18;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function draw() {
    const isLight = document.body.classList.contains("light");

    ctx.fillStyle = isLight ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff88";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 40);

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});
