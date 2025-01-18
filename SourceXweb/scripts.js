// Redirection to login page if not logged in
if (!localStorage.getItem('isLoggedIn') && !window.location.href.includes('login.html')) {
    window.location.href = 'login.html';
}

// Login Functionality
const loginForm = document.getElementById('login-form');
const verificationForm = document.getElementById('verification-form');
const sendCodeBtn = document.getElementById('send-code-btn');
const verifyBtn = document.getElementById('verify-btn');
let generatedCode;

// Generate random 6-digit code
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Simulate sending verification code
if (sendCodeBtn) {
    sendCodeBtn.addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert('Please enter both Gmail and Password.');
            return;
        }

        generatedCode = generateVerificationCode();
        alert(`Verification code sent to ${email}: ${generatedCode}`);
        loginForm.classList.add('hidden');
        verificationForm.classList.remove('hidden');
    });
}

// Verify code and login
if (verifyBtn) {
    verifyBtn.addEventListener('click', () => {
        const enteredCode = document.getElementById('verification-code').value;
        if (enteredCode === generatedCode) {
            localStorage.setItem('isLoggedIn', 'true');
            alert('Login successful!');
            window.location.href = 'index.html';
        } else {
            alert('Invalid verification code. Please try again.');
        }
    });
}