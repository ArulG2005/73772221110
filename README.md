# 📦 URL Shortener

A simple Node.js-based URL shortener that allows users to generate shortened URLs with customizable shortcodes and optional expiration time. Includes a built-in logger using Winston.

---

## 🛠 Features

- Generate short URLs from original links
- Support for custom shortcodes (or auto-generated)
- Set expiration time (default: **30 minutes**)
- Redirects to original URL using shortcode
- Logs stored in `logger/app.log` using Winston

---

## 📁 Project Structure

url-shortener/
├── backend/
│ ├── controllers/
│ │ └── urlController.js
│ ├── models/
│ │ └── UrlModel.js
│ ├── routes/
│ │ └── urlRoutes.js
│ └── server.js
├── logger/
│ ├── logger.js
│ └── app.log
├── package.json
└── README.md

🧰 Built With
Node.js

Express.js

MongoDB + Mongoose

Winston (for logging)
