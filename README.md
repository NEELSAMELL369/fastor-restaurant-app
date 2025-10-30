# <h1 align=center>fastor-restaurant-app</h1>

<p align="center" >
Discover nearby restaurants, personalize restaurant images with the Fastor logo, and share them instantly — all from a smooth, installable PWA experience with simple OTP login.
</p>

<p align="center">
  <a href="https://dash-forge-two.vercel.app">
    <img src="https://img.shields.io/badge/Frontend-Live%20Demo-blue?style=for-the-badge&logo=react" alt="Frontend Live Demo">
  </a>
  <a href="https://fastor-restaurant-app.onrender.com/api">
    <img src="https://img.shields.io/badge/Backend-Live%20API-green?style=for-the-badge&logo=node.js" alt="Backend Live API">
  </a>
</p>


---

## 🚀 Features

- 📱 **Mobile OTP Login** – Simple country code + mobile number login flow  
- 🌍 **Nearby Restaurants** – Automatically fetches restaurants using Geolocation API  
- 🔍 **Search by City** – Search restaurants manually by city name  
- 🖼️ **Restaurant Detail Page** – View restaurant image, name, and logo overlay  
- 🏷️ **Draggable Logo Overlay** – Move Fastor logo freely before sharing  
- 📤 **Share Image** – Share restaurant image with logo using the Web Share API  
- ⚡ **Responsive Design** – Built with Tailwind CSS for modern, mobile-friendly UI  

---

## 🧩 Tech Stack

### Frontend:
- **React.js (Vite or CRA)**
- **Tailwind CSS**
- **React Router DOM**
- **Axios**
- **html-to-image**

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/fastor-restaurant-app.git
cd fastor-restaurant-app
```
---

### 2. Install Dependencies
```
npm install
```
----

### 3. Configure API Base URL

Check the file:
src/utils/api.js

 Make sure the backend base URL points to your hosted server:

export const API = axios.create({
  baseURL: "https://fastor-restaurant-app.onrender.com/api",
});

### 4. Run the App
```
npm run dev
```


#### 🌐 **Mock Endpoints**

| Endpoint | Description | Example Query |
|-----------|--------------|----------------|
| `/api/nearby` | Returns neary by resturant | `?city=Mumbai` -- ?lat=latitude&lng=longitude |
| `/api/restaurants/:id` | Returns Single resturant by Id | 


---

## 📂 Folder Structure

```
src/
 ├── components/
 │    └── CountrySelect.jsx
 ├── pages/
 │    ├── Login.jsx
 │    ├── OTP.jsx
 │    ├── RestaurantList.jsx
 │    └── RestaurantDetail.jsx
 ├── utils/
 │    └── api.js
 ├── App.jsx
 └── main.jsx






