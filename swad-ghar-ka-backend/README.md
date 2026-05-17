# 🍛 Swad Ghar Ka — Spring Boot Backend

Complete backend for the Swad Ghar Ka food website.
Built with **Spring Boot 3**, **Spring Security (JWT)**, **JPA**, and **MySQL**.

---

## 📁 Project Structure

```
swad-ghar-ka-backend/
├── src/main/java/com/swadgharka/
│   ├── SwadGharKaApplication.java      ← Entry point
│   ├── config/
│   │   ├── SecurityConfig.java         ← JWT security rules
│   │   └── CorsConfig.java             ← Allow frontend requests
│   ├── controller/
│   │   ├── AuthController.java         ← /api/auth (register, login)
│   │   ├── MenuController.java         ← /api/menu
│   │   ├── ContactController.java      ← /api/contact
│   │   └── OrderController.java        ← /api/orders
│   ├── model/
│   │   ├── User.java
│   │   ├── MenuItem.java
│   │   ├── ContactMessage.java
│   │   └── Order.java
│   ├── repository/                     ← JPA database queries
│   ├── security/
│   │   ├── JwtUtil.java                ← JWT token generation/validation
│   │   └── JwtFilter.java             ← Token verification per request
│   └── resources/
│       └── application.properties     ← DB + JWT config
├── frontend-integration/
│   └── api.js                          ← Copy to your frontend project
├── database_setup.sql                  ← Run once in MySQL
└── pom.xml
```

---

## ✅ API Endpoints

| Method | URL | Description | Auth Required |
|--------|-----|-------------|---------------|
| POST | /api/auth/register | Register a new user | No |
| POST | /api/auth/login | Login, get JWT token | No |
| GET | /api/auth/profile | Get logged-in user info | Yes |
| GET | /api/menu | Get all menu items | No |
| GET | /api/menu/category/{cat} | Filter by category | No |
| GET | /api/menu/{id} | Get single item | No |
| GET | /api/menu/veg | Get veg items only | No |
| POST | /api/menu | Add menu item (Admin) | Admin |
| PUT | /api/menu/{id} | Update item (Admin) | Admin |
| DELETE | /api/menu/{id} | Delete item (Admin) | Admin |
| POST | /api/contact | Submit contact form | No |
| GET | /api/contact | View all messages (Admin) | Admin |
| POST | /api/orders | Place order | No |
| GET | /api/orders/my/{email} | My order history | Yes |
| GET | /api/orders/{id} | Track order by ID | No |
| PUT | /api/orders/{id}/status | Update order status | Admin |

---

# 🚀 STEP-BY-STEP SETUP GUIDE

---

## STEP 1 — Install Required Software

Make sure you have these installed on your computer:

1. **Java 17+**
   - Download: https://www.oracle.com/java/technologies/downloads/#java17
   - Verify: Open CMD/Terminal → type `java -version`

2. **Maven**
   - Download: https://maven.apache.org/download.cgi
   - Verify: `mvn -version`

3. **MySQL**
   - Download: https://dev.mysql.com/downloads/mysql/
   - Or use XAMPP (has MySQL built in)
   - Verify: Open MySQL Workbench or run `mysql -u root -p`

4. **VS Code or IntelliJ IDEA** (recommended IDE)
   - IntelliJ: https://www.jetbrains.com/idea/download/ (Community is free)

---

## STEP 2 — Setup MySQL Database

1. Open MySQL Workbench (or any MySQL client)

2. Run this command to create the database:
   ```sql
   CREATE DATABASE swadgharka_db;
   ```

3. Open the file `database_setup.sql` from this project
   and run it in MySQL Workbench — this will seed all menu items!

---

## STEP 3 — Configure application.properties

Open this file:
```
src/main/resources/application.properties
```

Update these values with your MySQL credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/swadgharka_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD_HERE
```

---

## STEP 4 — Run the Backend Locally

### Option A: Using IntelliJ IDEA
1. Open IntelliJ → File → Open → select this folder
2. Wait for Maven to download dependencies
3. Click the green ▶ Run button on `SwadGharKaApplication.java`
4. You should see: `Swad Ghar Ka Backend Started!`

### Option B: Using VS Code
1. Install Extension: "Extension Pack for Java" from VS Code marketplace
2. Open this folder in VS Code
3. Press `Ctrl + Shift + P` → "Java: Run Java"
4. Or open terminal and run: `mvn spring-boot:run`

### Option C: Using Command Line / Terminal
```bash
cd swad-ghar-ka-backend
mvn clean install
mvn spring-boot:run
```

✅ Backend is now running at: **http://localhost:8080**

---

## STEP 5 — Test the Backend APIs

Open your browser or use Postman (https://www.postman.com/downloads/):

### Test 1: Register a user
```
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "name": "Samarth",
  "email": "samarth@example.com",
  "password": "test123",
  "phone": "9876543210"
}
```
Expected: `{ "success": true, "message": "Registration successful!" }`

### Test 2: Login
```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "samarth@example.com",
  "password": "test123"
}
```
Expected: `{ "success": true, "token": "eyJhbGci..." }`

### Test 3: Get Menu
```
GET http://localhost:8080/api/menu
```
Expected: List of all menu items

---

## STEP 6 — Connect Frontend to Backend

1. Copy the file `frontend-integration/api.js` to your frontend project folder

2. In `application.properties`, make sure CORS allows your frontend URL:
   ```properties
   # Already configured in CorsConfig.java
   # Your frontend: https://swad-ghar-ka-website-by-samarth.onrender.com
   ```

3. In `api.js`, set the correct URL:
   ```javascript
   // For local testing:
   const API_BASE_URL = "http://localhost:8080";
   
   // After deploying to Render:
   const API_BASE_URL = "https://your-backend-name.onrender.com";
   ```

4. Add `<script src="api.js"></script>` to your HTML pages

5. Use the functions in your HTML — examples are at the bottom of `api.js`

---

## STEP 7 — Deploy Backend to Render (Free Hosting)

### 7A. Push code to GitHub
```bash
git init
git add .
git commit -m "Initial backend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/swad-ghar-ka-backend.git
git push -u origin main
```

### 7B. Setup MySQL on Render (or use PlanetScale - free)

**Option 1: PlanetScale (Recommended — free MySQL)**
1. Go to https://planetscale.com → Sign up
2. Create new database → `swadgharka`
3. Get connection string from "Connect" → Java
4. Copy the URL, username, password

**Option 2: Render PostgreSQL**
1. On Render dashboard → New → PostgreSQL
2. Get connection details
3. Change dialect in `application.properties` to PostgreSQL

### 7C. Deploy on Render
1. Go to https://render.com → Sign up / Login
2. Click **New** → **Web Service**
3. Connect your GitHub repo
4. Configure:
   - **Name**: `swad-ghar-ka-backend`
   - **Environment**: Java
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/swad-ghar-ka-backend-1.0.0.jar`
   - **Plan**: Free

5. Add **Environment Variables** (click "Environment"):
   ```
   SPRING_DATASOURCE_URL      = jdbc:mysql://your-planetscale-url/swadgharka
   SPRING_DATASOURCE_USERNAME = your_username
   SPRING_DATASOURCE_PASSWORD = your_password
   JWT_SECRET                 = SwadGharKaSuperSecretKeyForJWT2024!!
   ```

6. Click **Create Web Service**
7. Wait ~5 minutes for deployment
8. Your API will be at: `https://swad-ghar-ka-backend.onrender.com`

### 7D. Update Frontend
1. In `api.js`, change:
   ```javascript
   const API_BASE_URL = "https://swad-ghar-ka-backend.onrender.com";
   ```
2. Redeploy your frontend on Render

---

## 🎉 You're Done!

Your complete stack:
- **Frontend**: https://swad-ghar-ka-website-by-samarth.onrender.com
- **Backend**: https://swad-ghar-ka-backend.onrender.com
- **Database**: MySQL (PlanetScale or Render)

---

## 🔐 Admin Login

Email: `admin@swadgharka.com`
Password: `admin123`

(Created by database_setup.sql)

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| `Connection refused` | Make sure MySQL is running |
| `Access denied for user` | Check username/password in application.properties |
| `Port 8080 already in use` | Change `server.port=8081` in application.properties |
| CORS error in browser | Make sure your frontend URL is in CorsConfig.java |
| `Table not found` | Spring creates tables automatically — just run the app once |
