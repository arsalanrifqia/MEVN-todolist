# Backend

## Teknologi yang dipakai ##
Project is created with:
* Node version: v18.13.0
* NPM version: V8.19.3
* Express.js
* MongoDb

# Configurasi Backend 
1. buka folder backend/src dan install semua dependency
    `npm install` 
2. buka file .env.example dan ubah variabel sesuai keinginan anda (opsional)
3. dan simpan file .env.example dengan .env

# Configurasi Database 
1. pastikan anda sudah menginstall mongoDb lokal (MongoDb Compass)
2. buat database bernama `todo_db`
3. buat collection dengan nama `labels`
4. kemudian import data dari `db/labels.json`
5. buat collection dengan nama `categories`
6. kemudian import data dari `db/categories.json`

# Endpoint
* GET http://localhost:5000/ → Landing Page
* POST http://localhost:5000/register → Tambah user/ Register
* POST http://localhost:5000/login → Login
* POST http://localhost:5000/api/tasks → Tambah task
* GET http://localhost:5000/api/tasks → Ambil semua task
* PUT http://localhost:5000/api/tasks/:id → Edit task
* DELETE http://localhost:5000/api/tasks/:id → Hapus task
