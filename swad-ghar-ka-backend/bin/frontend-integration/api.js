// =====================================================
//  Swad Ghar Ka - Frontend API Integration
//  Add this file to your frontend project as: api.js
//  Then include in your HTML: <script src="api.js"></script>
// =====================================================

// ⚠️ Change this to your deployed backend URL on Render
const API_BASE_URL = "http://localhost:8080";
// When deployed: const API_BASE_URL = "https://swad-ghar-ka-backend.onrender.com";

// =====================================================
// AUTH FUNCTIONS
// =====================================================

/**
 * Register a new user
 * Call from your sign-in / register page
 */
async function registerUser(name, email, password, phone = "") {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, phone })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Registration error:", error);
        return { success: false, message: "Network error. Please try again." };
    }
}

/**
 * Login a user — saves token to localStorage on success
 * Call from your sign-in page
 */
async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (data.success && data.token) {
            // Save to localStorage so other pages can use it
            localStorage.setItem("sgk_token", data.token);
            localStorage.setItem("sgk_name", data.name);
            localStorage.setItem("sgk_email", data.email);
            localStorage.setItem("sgk_role", data.role);
        }

        return data;
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, message: "Network error. Please try again." };
    }
}

/**
 * Logout — clears local storage
 */
function logoutUser() {
    localStorage.removeItem("sgk_token");
    localStorage.removeItem("sgk_name");
    localStorage.removeItem("sgk_email");
    localStorage.removeItem("sgk_role");
    window.location.href = "signin.html";
}

/**
 * Check if user is logged in
 */
function isLoggedIn() {
    return localStorage.getItem("sgk_token") !== null;
}

/**
 * Get saved user name
 */
function getCurrentUserName() {
    return localStorage.getItem("sgk_name") || "Guest";
}

// =====================================================
// MENU FUNCTIONS
// =====================================================

/**
 * Get all available menu items
 * Use on: home.html, menu page
 */
async function getAllMenuItems() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/menu`);
        return await response.json();
    } catch (error) {
        console.error("Menu fetch error:", error);
        return [];
    }
}

/**
 * Get menu items by category
 * category: "Breakfast", "Lunch", "Dinner", "Snacks", "Dessert", "Drinks"
 */
async function getMenuByCategory(category) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/menu/category/${category}`);
        return await response.json();
    } catch (error) {
        console.error("Menu category fetch error:", error);
        return [];
    }
}

// =====================================================
// CONTACT FUNCTIONS
// =====================================================

/**
 * Submit contact form
 * Use on: contact.html
 */
async function submitContactForm(name, email, phone, message) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone, message })
        });
        return await response.json();
    } catch (error) {
        console.error("Contact submit error:", error);
        return { success: false, message: "Network error. Please try again." };
    }
}

// =====================================================
// ORDER FUNCTIONS
// =====================================================

/**
 * Place an order (Rush Hours feature)
 * Use on: rush.html
 */
async function placeOrder(orderData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
        });
        return await response.json();
    } catch (error) {
        console.error("Order placement error:", error);
        return { success: false, message: "Network error. Please try again." };
    }
}

/**
 * Get current user's orders
 * Requires login
 */
async function getMyOrders() {
    const email = localStorage.getItem("sgk_email");
    if (!email) return [];

    try {
        const response = await fetch(`${API_BASE_URL}/api/orders/my/${email}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("sgk_token")}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Order fetch error:", error);
        return [];
    }
}

// =====================================================
// USAGE EXAMPLES (Copy-paste into your HTML pages)
// =====================================================

/*
-------------------------------------------------------
  signin.html — REGISTER FORM EXAMPLE
-------------------------------------------------------
<form id="registerForm">
  <input type="text"     id="name"     placeholder="Full Name" />
  <input type="email"    id="email"    placeholder="Email" />
  <input type="password" id="password" placeholder="Password" />
  <input type="tel"      id="phone"    placeholder="Phone" />
  <button type="button" onclick="handleRegister()">Register</button>
</form>

<script src="api.js"></script>
<script>
  async function handleRegister() {
    const name     = document.getElementById("name").value;
    const email    = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone    = document.getElementById("phone").value;

    const result = await registerUser(name, email, password, phone);
    alert(result.message);
    if (result.success) window.location.href = "signin.html";
  }
</script>

-------------------------------------------------------
  signin.html — LOGIN FORM EXAMPLE
-------------------------------------------------------
<form id="loginForm">
  <input type="email"    id="loginEmail"    placeholder="Email" />
  <input type="password" id="loginPassword" placeholder="Password" />
  <button type="button" onclick="handleLogin()">Login</button>
</form>

<script src="api.js"></script>
<script>
  async function handleLogin() {
    const email    = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const result = await loginUser(email, password);
    if (result.success) {
      alert("Welcome back, " + result.name + "!");
      window.location.href = "home.html";
    } else {
      alert(result.message);
    }
  }
</script>

-------------------------------------------------------
  contact.html — CONTACT FORM EXAMPLE
-------------------------------------------------------
<form id="contactForm">
  <input type="text"  id="cName"    placeholder="Your Name" />
  <input type="email" id="cEmail"   placeholder="Your Email" />
  <input type="tel"   id="cPhone"   placeholder="Phone Number" />
  <textarea           id="cMessage" placeholder="Your Message"></textarea>
  <button type="button" onclick="handleContact()">Send Message</button>
</form>

<script src="api.js"></script>
<script>
  async function handleContact() {
    const name    = document.getElementById("cName").value;
    const email   = document.getElementById("cEmail").value;
    const phone   = document.getElementById("cPhone").value;
    const message = document.getElementById("cMessage").value;

    const result = await submitContactForm(name, email, phone, message);
    alert(result.message);
  }
</script>

-------------------------------------------------------
  home.html — DISPLAY MENU ITEMS DYNAMICALLY
-------------------------------------------------------
<div id="menuContainer"></div>

<script src="api.js"></script>
<script>
  async function loadMenu() {
    const items = await getAllMenuItems();
    const container = document.getElementById("menuContainer");

    items.forEach(item => {
      container.innerHTML += `
        <div class="menu-card">
          <img src="${item.imageUrl}" alt="${item.name}" />
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <span>₹${item.price}</span>
          <span>${item.isVeg ? "🟢 Veg" : "🔴 Non-Veg"}</span>
          <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})">
            Add to Cart
          </button>
        </div>
      `;
    });
  }

  window.onload = loadMenu;
</script>
*/
