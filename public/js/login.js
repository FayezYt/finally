// Create floating particles
const particles = document.getElementById('particles');
for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.opacity = Math.random().toFixed(2);
    particles.appendChild(particle);
}

// User authentication
const users = [
    { username: 'admin', password: 'admin', name: 'Jamal Zurba' },
    { username: '4', password: '4', name: 'طالب ابو الحشيش' },
    { username: '2', password: '2', name: 'يوسف خطاطبة' },
    { username: '3', password: '3', name: 'عبيدة نوفل' },
    { username: '14', password: '14', name: 'صفوان دويكات' },
    { username: '15', password: '15', name: 'محمد البسلط' }
];

const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.toLowerCase();
    const password = document.getElementById("password").value;

    const user = users.find(u => u.username.toLowerCase() === username && u.password === password);

    if (!user) {
        loginError.classList.remove("hidden");
        loginError.classList.add("shake");
        document.querySelector('.welcome-container').classList.add('shake');

        setTimeout(() => {
            loginError.classList.remove("shake");
            document.querySelector('.welcome-container').classList.remove('shake');
        }, 500);
    } else {
        document.querySelector('.welcome-container').classList.add('success');
        setTimeout(() => {
            localStorage.setItem("last_username", user.name);
            window.location.href = "welcome.html";
        }, 300);
    }
});
