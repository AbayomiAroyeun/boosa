const logoPath = "image/logo.jpg";
const otherImages = [
  "image/yomi.jpg", "image/bosun.png", "image/mojisola.jpg",
  "image/muideen.jpg", "image/tayo.jpg", "image/logo.jpg",
];

const birthdayMembers = [
  { name: "Omotayo Oketayo", day: 26, month: 4, image: "image/tayo.gif" },
  { name: "Abayomi Aroyeun", day: 22, month: 9, image: "image/fatimah.gif" },
  { name: "Adigun Muidee", day: 31, month: 6, image: "image/keji.gif" }, // Fixed
  { name: "Niyi Odebunmi", day: 9, month: 10, image: "image/femi.gif" },
  { name: "Tubosun Olusanya", day: 16, month: 3, image: "image/rotimi.gif" },
  { name: "Ademola Adebesin", day: 29, month: 5, image: "image/ademola.gif" },
  { name: "Bukky Adenuga", day: 28, month: 1, image: "image/tunde.gif" },
  { name: "Mojisola Fagbemi", day: 21, month: 5, image: "image/Abayomi.jpg" },
  { name: "Omolola Adesanmi", day: 9, month: 1, image: "image/dada.jpg" },
  { name: "Bukkola Aguda", day: 4, month: 9, image: "image/quazeem.jpg" },
  { name: "Akeem", day: 26, month: 7, image: "image/toyin.jpg" },
  { name: "Segun Anipupo", day: 17, month: 7, image: "image/qudrat.gif" }
];

const memberNames = [
  "Omotayo Oketayo (President) (1995 set)" ,
  "Abayomi Aroyeun (1995 set)",
  "Adigun Muideen (1995 set)",
  "Niyi Odebunmi (1995 set)",
  "Tubosun Olusanya (1995 set)",
  "Bukky Adenuga (1995 set)",
  "Mojisola Fagbemi (Nee ) (1995 set)",
  "Bukkola Aguda (1995 set)",
  "Omolola Adesanmi (1995 set)",
  "Akeen (1995 set)",
  "Quazeem Ashiru (1995 set)",
  "Deji Soyebo (1995 set - Of Blessed Memeory)",
  "Ibukun (1995 set)",
  "Segun Anipupo (1995 set)",
  "Gbenga Famakinwa (1995 set)",
  "Gbemisola Adedeji",
  "Dapo Opadokun (1995 set)",
  "Dauda Kasali (1995 set)",
  "Aboaba Olusola (1995 set)",
  

];

const isTesting = false;
const testDate = new Date(2025, 4, 30); // May 30

let lastIndex = -1;

function getCurrentTime() {
  return isTesting ? testDate : new Date();
}

function getTodayBirthday() {
  const now = getCurrentTime();
  const day = now.getDate();
  const month = now.getMonth();
  return birthdayMembers.find(member => member.day === day && member.month === month);
}

function updateTopImage() {
  const logoImg = document.getElementById("logo-img");
  const now = getCurrentTime();
  const hour = now.getHours();

  if (hour < 4) {
    logoImg.src = logoPath;
  } else {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * otherImages.length);
    } while (randomIndex === lastIndex && otherImages.length > 1);
    lastIndex = randomIndex;
    logoImg.src = otherImages[randomIndex];
  }
}

function updateWelcomeSection() {
  const welcomeDiv = document.getElementById("Welcome");
  const birthday = getTodayBirthday();
  if (birthday) {
    welcomeDiv.style.animation = "none";
    welcomeDiv.style.backgroundImage = `url('${birthday.image}')`;
    welcomeDiv.innerHTML = `<h3>We celebrate you today,<br>${birthday.name.toUpperCase()}! <br> Igba Odun, Odun kan ni O. <br> Happy Birthday</h3>`;
  } else {
    welcomeDiv.style.animation = "slideshow 20s infinite";
    welcomeDiv.innerHTML = `<h2>Welcome Home !!!</h2>`;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  updateTopImage();
  updateWelcomeSection();

  setInterval(() => {
    const now = getCurrentTime();
    if (now.getHours() >= 16 && now.getHours() <= 23) {
      updateTopImage();
    }
    updateWelcomeSection();
  }, 5000);

  // Member toggle logic
  const showBtn = document.getElementById("show-members-btn");
  const memberList = document.getElementById("members-list");
  let isVisible = false;

  showBtn.addEventListener("click", () => {
    isVisible = !isVisible;
    if (isVisible) {
      memberList.style.display = "block";
      showBtn.textContent = "Hide the Members";

      const sortedNames = [...memberNames].sort((a, b) => a.localeCompare(b));
      memberList.innerHTML = "";
      sortedNames.forEach(name => {
        const li = document.createElement("li");
        li.textContent = name;
        memberList.appendChild(li);
      });
    } else {
      memberList.style.display = "none";
      showBtn.textContent = "See the Members";
    }
  });
});

