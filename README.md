# MEVN 



# Backend

Backend untuk proyek MEVN menggunakan Node.js, Express, dan MongoDB.

## Instalasi dan Persiapan Database

1. **Instal MongoDB**
   Pastikan MongoDB telah terinstal di sistem Anda. Jika belum, unduh dan instal dari [MongoDB Official Website](https://www.mongodb.com/try/download/community).

2. **Jalankan MongoDB**
   ```sh
   mongod
   ```

3. **Buat Database dan Collections**
   Masuk ke MongoDB shell:
   ```sh
   mongo
   ```
   Buat database `todo_list`:
   ```sh
   use todo_list
   ```
   Buat collections:
   ```sh
   db.createCollection("labels")
   db.createCollection("categories")
   ```

4. **Import Data ke Collections**
   Jalankan perintah berikut untuk mengimpor data dari file JSON:
   ```sh
   mongoimport --db todo_list --collection labels --file db/labels.json --jsonArray
   mongoimport --db todo_list --collection categories --file db/categories.json --jsonArray
   ```

## Menjalankan Backend

1. **Masuk ke Folder Backend**
   ```sh
   cd backend
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Jalankan Server**
   ```sh
   npm start
   ```
   Server akan berjalan di `http://localhost:5000`

## API Endpoints

### Register User
- **Endpoint:** `POST http://localhost:5000/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```

### Login User
- **Endpoint:** `POST http://localhost:5000/login`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "your-jwt-token"
  }
  ```

### Akses CRUD Todo List
Semua permintaan ke **Todo List API** harus menyertakan **Authorization Header** dengan token dari login.

- **Headers:**
  ```json
  {
    "Authorization": "Bearer your-jwt-token"
  }
  ```

Sekarang backend siap digunakan! 🚀

# FRONTEND



