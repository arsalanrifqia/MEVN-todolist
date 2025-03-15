# MEVN 



# Backend

Backend untuk proyek MEVN menggunakan Node.js, Express, dan MongoDB.

versi:
* Node version: v18.13.0
* NPM version: V8.19.3
* Express.js
* MongoDb

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
   Buat database `todo_db`:
   ```sh
   use todo_db
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
2. **Buka file `.env.example` dan ubah variabel sesuai keinginan anda (opsional)**

3. **Dan simpan file `.env.example` dengan nama `.env`**

4. **Install Dependencies**
   ```sh
   npm install
   ```

5. **Jalankan Server**
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
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt-token-anda"
  }
  ```

### Akses CRUD Todo List

## API Endpoints
Semua endpoint harus menyertakan **Authorization Header** dengan token dari login.

- **Headers:**
  ```json
  {
    "Authorization": "Bearer your-jwt-token"
  }
  ```

### 1. Membuat Task
**Endpoint:**
```
POST /api/tasks
```
**Header:**
```
Authorization: Bearer <token>
Content-Type: application/json
```
**Body:**
```json
{
    "title": "Nama Task",
    "description": "Deskripsi Task",
    "status": "todo", // (opsional) Nilai: "todo", "in progress", "completed"
    "due_date": "2025-03-20T00:00:00.000Z", // (opsional)
    "category_id": "id-kategori", // (opsional)
    "labels": ["id-label","id-label2"] // (opsional) bisa memilih lebih dari 1
}
```
**Response:**
```json
{
    "_id": "id-user",
    "title": "Nama Task",
    "description": "Deskripsi Task",
    "status": "todo",
    "due_date": "2025-03-20T00:00:00.000Z",
    "category_id": "id-kategori",
    "labels": ["id-label","id-label2"],
    "created_at": "2025-03-10T08:00:00.000Z",
    "updated_at": "2025-03-10T08:00:00.000Z"
}
```

---
### 2. Mendapatkan Semua Task Pengguna
**Endpoint:**
```
GET /api/tasks
```
**Header:**
```
Authorization: Bearer <token>
```
**Response:**
```json
[
    {
        "_id": "id-task",
        "user_id": "id-user",
        "title": "Nama Task",
        "description": "Deskripsi Task",
        "status": "todo",
        "due_date": "2025-03-20T00:00:00.000Z",
        "category_id": "id-kategori",
        "labels": ["id-label","id-label2"],
        "created_at": "2025-03-10T08:00:00.000Z",
        "updated_at": "2025-03-10T08:00:00.000Z"
    }
]
```

---
### 3. Memperbarui Task
**Endpoint:**
```
PUT /api/tasks/:id
```
**Header:**
```
Authorization: Bearer <token>
Content-Type: application/json
```
**Body:**
```json
{
    "title": "Nama Task Baru", // (opsional)
    "description": "Deskripsi Task Baru", // (opsional)
    "status": "todo", // (opsional)
    "due_date": "2025-03-20T00:00:00.000Z", // (opsional)
    "category_id": "id-kategori", // (opsional)
    "labels": ["id-label","id-label2"] // (opsional) bisa memilih lebih dari 1
}
```
**Response:**
```json
{
    "_id": "id-task",
    "user_id": "id-user",
    "title": "Nama Task Baru",
    "description": "Deskripsi Task Baru",
    "status": "in progress",
    "due_date": "2025-03-20T00:00:00.000Z",
    "category_id": "id-kategori",
    "labels": ["id-labels","id-label2"],
    "created_at": "2025-03-10T08:00:00.000Z",
    "updated_at": "2025-03-10T08:10:00.000Z"
}
```

---
### 4. Menghapus Task
**Endpoint:**
```
DELETE /api/tasks/:id
```
**Header:**
```
Authorization: Bearer <token>
```
**Response:**
```json
{
    "message": "Task berhasil dihapus"
}
```

---
## Error Handling
| Kode | Pesan |
|------|---------------------------------------------------|
| 400  | Bad Request (Data tidak valid) |
| 401  | Unauthorized (Token tidak valid atau tidak dikirim) |
| 403  | Forbidden (Pengguna tidak berhak mengakses task ini) |
| 404  | Not Found (Task tidak ditemukan) |
| 500  | Internal Server Error |


# FRONTEND



