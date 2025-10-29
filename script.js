// 
// ===== SELECT ELEMENTS =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const navLinks2 = document.querySelectorAll('.nav-links a');
const checkBox = document.getElementById('check');
const typingText = document.getElementById('typing-text');
const form = document.getElementById('myForm');
const toggleBtn = document.getElementById('mode-toggle');
const body = document.body;
const yearSpan = document.getElementById('year');

// ===== VARIABLES =====
const words = ["Hli_Sham", "Hlina Shambel", "Computer Science Student"];
let wordIndex = 0;
let letterIndex = 0;
let currentWord = '';
let isDeleting = false;
let typeSpeed = 150;

// ===== TYPING EFFECT =====
function type() {
  if (wordIndex >= words.length) wordIndex = 0;
  currentWord = words[wordIndex];

  if (!isDeleting) {
    typingText.textContent = currentWord.slice(0, letterIndex + 1);
    letterIndex++;
    if (letterIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
  } else {
    typingText.textContent = currentWord.slice(0, letterIndex - 1);
    letterIndex--;
    if (letterIndex === 0) {
      isDeleting = false;
      wordIndex++;
    }
  }
  setTimeout(type, isDeleting ? typeSpeed / 2 : typeSpeed);
}
type();

// ===== STICKY HEADER & ACTIVE LINK ON SCROLL =====
window.onscroll = () => {
  const header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);

  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      document
        .querySelector('header nav a[href*=' + id + ']')
        .classList.add('active');
    }
  });
};

// ===== CLOSE NAV MENU WHEN LINK CLICKED =====
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    checkBox.checked = false;
  });
});

// ===== FORM VALIDATION =====
form.addEventListener('submit', function (event) {
  event.preventDefault();
  let valid = true;

  const fullName = document.getElementById('full_name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const phoneError = document.getElementById('phoneError');
  const successText = document.getElementById('sucess');

  // Reset previous messages
  nameError.textContent = '';
  emailError.textContent = '';
  phoneError.textContent = '';
  successText.textContent = '';

  // Patterns
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const phonePattern = /^[0-9]{10,13}$/;

  // Validation
  if (fullName === '') {
    nameError.textContent = 'Please enter your full name.';
    valid = false;
  }
  if (!emailPattern.test(email)) {
    emailError.textContent = 'Please enter a valid email.';
    valid = false;
  }
  if (phone && !phonePattern.test(phone)) {
    phoneError.textContent = 'Phone number must be 10–13 digits.';
    valid = false;
  }

  if (valid) {
    successText.textContent='Form submitted successfully!';
    form.reset();
  }
});
form.addEventListener("reset", function () {
  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("phoneError").textContent = "";
  // document.getElementById('sucess').textContent="";
});

// ===== DARK/LIGHT MODE TOGGLE =====
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  toggleBtn.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
});

// ===== AUTO YEAR UPDATE =====
yearSpan.textContent = new Date().getFullYear();
