# Oryx-Compare 🪙

**Oryx-Compare** is a web application that compares Bitcoin (BTC) prices across multiple on-ramp providers to help users find the **cheapest option in real time**.

---

## 🚀 Features

- 🔍 Compare BTC prices from multiple providers
- ⚡ Real-time price fetching
- 🏆 Highlights the cheapest provider automatically
- 🎨 Clean, modern UI with subtle animations
- 🖥️ Local Express backend (no third-party AirCode dependency)



## 🛠 Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express
- Axios

## 📂 Project Structure

.
├── backend/ # Express backend
│ ├── index.js
│ ├── providers.js
│ └── package.json
├── src/ # React frontend
│ ├── App.tsx
│ ├── AmountInput.tsx
│ ├── ResultRow.tsx
│ └── index.css
├── public/
├── package.json
└── README.md



## ⚙️ Local Setup

### 1️⃣ Clone the repository

git clone https://github.com/vardhan399/Oryx-Compare.git
cd Oryx-Compare
2️⃣ Install frontend dependencies
bash
npm install
3️⃣ Start frontend
bash

npm run dev
4️⃣ Setup backend
bash
Copy code
cd backend
npm install
node index.js

Backend runs on:
http://localhost:5000
Frontend runs on:
http://localhost:5173
📌 Notes
This project is for educational and experimental purposes
Prices may vary based on provider APIs and region
No financial advice intended
📜 License
MIT License

👤 Author
Anurag Vardhan
GitHub: @vardhan399
