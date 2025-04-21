const authButton = document.querySelector("#authButton");
const formTitle = document.querySelector("#form-title");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const authSwitch = document.querySelector("#authSwitch");
const authForm = document.querySelector("#authForm");

let signIn = true;

// Use event delegation so it works after innerHTML change
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "switchForm") {
    switchAuthForm();
  }
});

authForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = {
    username: signIn ? undefined : username.value,
    email: email.value,
    password: password.value,
  };

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (signIn) {
    const existingUser = users.find(
      (u) => u.email === email.value && u.password === password.value
    );

    if (existingUser) {
      localStorage.setItem("onlineUser", JSON.stringify(existingUser));
      window.location.href = "../html/kireeye-home.html";
    } else {
      alert("Invalid credentials");
    }
  } else {
    const existingUser = users.find(
      (u) => u.username === username.value || u.email === email.value
    );

    if (existingUser) {
      alert("User already exists");
      return;
    }

    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match");
      return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered successfully");

    // Save email and password for auto-fill when switching to sign-in
    localStorage.setItem("lastUsedEmail", email.value);
    localStorage.setItem("lastUsedPassword", password.value);

    switchAuthForm(); // Switch back to sign in
  }
});

function switchAuthForm() {
  signIn = !signIn;

  if (signIn) {
    authButton.textContent = "Sign In";
    formTitle.textContent = "Sign In";
    username.style.display = "none";
    confirmPassword.style.display = "none";
    username.value = "";
    confirmPassword.value = "";
    email.value = localStorage.getItem("lastUsedEmail") || "";
    password.value = localStorage.getItem("lastUsedPassword") || "";
    authSwitch.innerHTML = `New to Kireeye? <a href="#" id="switchForm">Register now</a>`;
  } else {
    authButton.textContent = "Sign Up";
    formTitle.textContent = "Sign Up";
    username.style.display = "block";
    confirmPassword.style.display = "block";
    authSwitch.innerHTML = `Already have an account? <a href="#" id="switchForm">Sign in</a>`;
  }
}
