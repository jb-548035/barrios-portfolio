document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const fullNameInput = document.querySelector('input[placeholder="John Doe"]');
    const emailInput = document.querySelector('input[placeholder="name@example.com"]');
    const passwordInput = document.getElementById('password');
    const reqLength = document.getElementById('req-length');
    const reqNumber = document.getElementById('req-number');

    // Live Password Validation Logic
    passwordInput.addEventListener('input', () => {
        const value = passwordInput.value;

        // Check length
        if (value.length >= 8) {
            reqLength.classList.replace('invalid', 'valid');
            reqLength.innerText = '✓ At least 8 characters';
        } else {
            reqLength.classList.add('invalid');
            reqLength.innerText = '● At least 8 characters';
        }

        // Check for number
        if (/\d/.test(value)) {
            reqNumber.classList.replace('invalid', 'valid');
            reqNumber.innerText = '✓ At least 1 number';
        } else {
            reqNumber.classList.add('invalid');
            reqNumber.innerText = '● At least 1 number';
        }
    });

    // Form Submission & Validation
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        const isFullNameValid = fullNameInput.value.trim() !== '';
        const isEmailValid = emailInput.value.trim() !== '' && emailInput.checkValidity();
        const isPasswordValid = passwordInput.value.length >= 8 && /\d/.test(passwordInput.value);

        if (!isFullNameValid || !isEmailValid || !isPasswordValid) {
            alert("Please fill out all fields correctly!");
            return;
        }

        // If all fields are valid, redirect to index.html
        window.location.href = 'index.html';
    });
});