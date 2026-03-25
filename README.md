# 👥 User Directory Dashboard

A professional Frontend application built using **React**, **Vite**, and **Tailwind CSS** that allows users to explore, search, and analyze a directory of users with a clean and interactive interface. Developed as part of the **BuyerForeSight Frontend Engineer Assessment**.

---

## 🚀 Live Demo & Links
- **Live Website:** https://your-live-link.vercel.app/
- **Source Code:** https://github.com/your-username/user-directory-dashboard

---

## ✨ Key Features
- **User Dashboard:** Displays all users in a structured table/grid format with Name, Email, Phone, and Company.
- **Smart Search:** Real-time filtering by Name and Email (case-insensitive).
- **Dynamic Sorting:** Sort users by Name and Company (ascending/descending toggle).
- **User Detail View:** Click on any user to view complete profile details.
- **Seamless Navigation:** Fast routing with React Router (SPA experience).
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop.

---

## 🛠️ Tech Stack
- **Frontend:** React.js (Functional Components, Hooks)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **API:** JSONPlaceholder
- **Optimization:** useMemo for performance

---

## 📁 Project Structure
```text
user-directory-dashboard/
├── src/
│   ├── components/        # Reusable UI Components (SearchBar, Table)
│   ├── pages/             # Main Pages (Dashboard, UserDetails)
│   ├── services/          # API logic (userService.js)
│   ├── App.jsx            # Routing configuration
│   ├── main.jsx           # Entry point
│   └── index.css          # Tailwind styles
├── package.json
└── README.md

```
---

## ⚙️ Local Setup Instructions
1. Clone the Repository
```text
git clone https://github.com/your-username/user-directory-dashboard.git
cd user-directory-dashboard
```
3. Install Dependencies
```text
npm install
```
5. Run Development Server
```text
npm run dev
```

👉 The application will be available at: http://localhost:5173
---

## 📡 API Endpoint

GET https://jsonplaceholder.typicode.com/users

---

## 💎 Design & Development Highlights
Clean Architecture: Used service layer to separate API logic from UI
Performance Optimization: Implemented useMemo for search & sorting
Modern UI: Built with Tailwind CSS for clean and professional design
User Experience: Smooth navigation and interactive table UI
Scalable Code: Component-based reusable structure

---
## 🧪 Future Enhancements
Pagination for large datasets
Advanced filters (Company, Location)
Dark mode support
Unit testing (Jest / RTL)
API caching & optimization

---
## 👩‍💻 Author
Sirapu Sravya
