# 🎬 QuickShow

**QuickShow** is a movie ticket booking web app built using **React**, **Firebase**, and **Tailwind CSS**. It includes a fully functional user booking experience and a secure admin dashboard for managing shows and viewing analytics.

---

## 🔗 Live Site

https://movie-booking-app-cbfe3.web.app

---

## ⚙️ Tech Stack

- **React.js**
- **Tailwind CSS**
- **Firebase**
  - Auth (admin login)
  - Firestore (bookings & shows)
  - Storage (poster uploads)
  - Cloud Functions (email confirmation - WIP)
- **Framer Motion** (animations)
- **Resend.com** (email API)

---

## 👥 Features

### User Panel:
- Browse movies with poster, genre, runtime & ratings
- Book tickets with dynamic seat layout (max 5 seats)
- Select show date and time (max 2 slots per show)
- View and delete your bookings
- Payment status toggle (`Pay Now`)
- *(Coming soon)* Email confirmation after booking

### Admin Panel:
- Login with secure credentials
- Add shows for any listed movie
- Set price and date-time slots
- View total bookings, revenue, and active shows
- See bookings and show list in table format

---

## 🧪 Running Locally

```bash
git clone https://github.com/Tiwari0808/movie-booking-client
cd quickshow
npm install
npm run dev

