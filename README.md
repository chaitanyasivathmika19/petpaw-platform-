# Pet Adoption and Accessories Management System (MSWD Project) - MERN Stack Web Development Academic Project
## 📌 Overview  
This repository contains both the **frontend** and **backend** of the MSWD project inside a single repo.  
It follows a client-server architecture:  
- **Frontend (`frontendmswd`)** → React.js app for UI  
- **Backend (`backendmswd`)** → Node.js + Express + MongoDB for APIs  

---

## 🚀 Features  
- 🔐 User authentication & authorization  
- 📊 Data management with MongoDB  
- 🎨 Responsive React frontend  
- ⚡ REST APIs for communication between frontend and backend  

---

## 🛠️ Tech Stack  
- **Frontend**: React.js, Bootstrap  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Version Control**: Git + GitHub  

---

## 📂 Project Structure  

/ (root)  
│── backendmswd/              # Express + MongoDB backend  
│   ├── server.js             # Main server entry point  
│   ├── routes/               # API routes (pets, users, auth)  
│   ├── models/               # Mongoose models (Pet, User, Adoption)  
│   ├── controllers/          # Request handlers  
│   ├── config/               # Database & environment config  
│   ├── mailsenddemo.js       # Email sending demo (Nodemailer)  
│   └── package.json          # Backend dependencies  
│  
│── frontendmswd/             # React frontend  
│   ├── public/               # Static files (index.html, favicon)  
│   ├── src/                  # React source code  
│   │   ├── components/       # Reusable UI components  
│   │   ├── pages/            # Pages (Home, Adopt, Login, Profile)  
│   │   ├── App.js            # Main React component  
│   │   └── index.js          # Entry point  
│   └── package.json          # Frontend dependencies  
│  
│── README.md                 # Documentation  
│── .gitignore                # Git ignored files  


## ⚙️ Installation & Setup  

### 1️⃣ Clone Repository  
```bash
git clone https://github.com/your-username/pet-adoption.git
cd pet-adoption

### 2️⃣ Backend Setup
```bash
cd backendmswd
npm install


### Create .env file inside backendmswd/ with:

PORT=5000
MONGO_URI=mongodb://localhost:27017/petadoption
JWT_SECRET=yourSecretKey
EMAIL_USER=yourEmail@gmail.com
EMAIL_PASS=yourEmailPassword
