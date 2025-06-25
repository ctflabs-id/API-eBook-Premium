# API eBook Premium - Akses Buku Berbayar via IDOR

> Web CTF Challenge | by [ctflabs-id](https://github.com/ctflabs-id)


---

## 📖 Scenario

Anda adalah pentester yang ditugaskan mengaudit API layanan eBook premium. Sistem ini menggunakan Express.js dengan autentikasi JWT. Meskipun memerlukan login, terdapat kerentanan dimana user bisa mengakses eBook berbayar milik user lain dengan memodifikasi claim JWT.

---

## 🎯 Challenge Overview
**Target:** `http://api-ebook-premium.local:4000`<br>
**Vulnerability:** Insecure Direct Object Reference (IDOR) via JWT Claim Manipulation<br>
**Objective:** Dapatkan akses ke eBook premium dengan ID 1337 dan ekstrak flag dari kontennya.<br>
**Difficulty:** ⭐⭐⭐☆☆ (Intermediate)

---
## 🛠️ Setup Instructions

Prerequisites:

    Node.js v16+
    MongoDB
    JWT tool (optional)

Langkah-langkah:

  1. Clone repository ini
```bash
git clone https://github.com/ctflabs-id/API-eBook-Premium.git
cd API-eBook-Premium
```
  2. Install dependencies
```bash
npm install express jsonwebtoken mongoose body-parser
```
  3. Pastikan MongoDB Berjalan
  4. Start Server
```bash
node index.js
```
  5. Server akan berjalan di http://localhost:4000

---

## 💡 Hints
    🔑 Dapatkan token JWT valid terlebih dahulu via endpoint /login
    🔍 Gunakan tools seperti jwt.io untuk inspeksi/decode token
    ✏️ Modifikasi claim userId pada JWT untuk mendapatkan akses ke eBook premium
    📌 eBook target memiliki ID 1337
    🚩 Flag ada dalam content eBook premium

---

## 🎓 Tujuan Tantangan Ini
  1. Memahami kerentanan IDOR pada sistem berbasis JWT
  2. Belajar teknik manipulasi claim JWT
  3. Memahami pentingnya validasi kepemilikan resource di server
  4. Praktik eksploitasi authorization flaw pada REST API

---

## ⚠️ Disclaimer

Challenge ini dibuat hanya untuk edukasi dan simulasi keamanan siber. Jangan gunakan teknik serupa terhadap sistem yang tidak kamu miliki atau tidak diizinkan.

---
<details><summary><h2>🏆 Solusi yang Diharapkan - (Spoiler Allert)</h2></summary>

Peserta harus:


    
</details>

---

## 🤝 Kontribusi Pull request & issue welcome via: ctflabs-id/Perpustakaan-Hantu-CTF
## 🧠 Maintained by:
```
GitHub: @ctflabs-id
Website: ctflabsid.my.id
```



