# express node js rest api implemention

# 🧩 REST API in Node.js with MongoDB & Docker

A fully containerized **RESTful API** built using **Node.js**, **Express**, and **MongoDB**, packaged with **Docker** and **Docker Compose** for easy deployment and testing.

---

## 🚀 Features

* REST API with **Node.js + Express**
* **JWT authentication**
* CRUD operations for **Users** and **Posts**
* **MongoDB** integration using Mongoose
* **File Upload** support
* **Dockerized** for consistent environments
* **Postman Collection** for API testing

---

## 🧰 Tech Stack

| Layer            | Technology             |
| ---------------- | ---------------------- |
| Backend          | Node.js, Express       |
| Database         | MongoDB                |
| Authentication   | JWT (JSON Web Token)   |
| Containerization | Docker, Docker Compose |
| API Testing      | Postman                |

---

## 📁 Project Structure

```
restApiNode/
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── src/
│   ├── app.js
│   ├── routes/
│   │   ├── user.js
│   │   └── posts.js
│   └── models/
│       ├── User.js
│       └── Post.js
└── data/                   <-- MongoDB data volume
```

---

## ⚙️ Setup & Run (Using Docker)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/jeevan520/restApiNode.git
cd restApiNode
```

### 2️⃣ Build and Start Containers

Make sure **Docker** is installed and running.
Then execute:

```bash
docker-compose up --build
```

This will:

* Build the Node.js image from the Dockerfile
* Pull the official **MongoDB 5** image
* Start both containers:

  * `my-node-app` (API service)
  * `mongo` (MongoDB database)

### 3️⃣ Verify Containers

```bash
docker ps
```

You should see both `my-node-app` and `mongo` running.

### 4️⃣ Access the API

API will be available at:

```
http://localhost:5500
```

---

## 🐳 Docker Configuration

### docker-compose.yml

```yaml
version: '3'
services:
  app:
    container_name: my-node-app
    build: .
    ports:
      - '5500:5500'
    depends_on:
      - mongo
  mongo:
    container_name: mongo
    image: mongo:5
    volumes:
      - ./data:/data/db
    ports:
      - '27017:27017'
```

### Dockerfile

```dockerfile
FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
```

---

## 🧠 Useful Docker Commands

| Command                      | Description                |
| ---------------------------- | -------------------------- |
| `docker-compose up --build`  | Build and start containers |
| `docker-compose down`        | Stop and remove containers |
| `docker ps`                  | List running containers    |
| `docker logs my-node-app`    | View Node.js logs          |
| `docker exec -it mongo bash` | Access MongoDB shell       |

---

## 🧪 API Testing with Postman

You can easily test all endpoints using the **Postman Collection** included in this repository:

**File:** `Rest_Express_apis.postman_collection.json`

### 📥 Import Steps

1. Open **Postman**
2. Click **Import**
3. Choose the JSON collection file from the project
4. The API requests will be imported automatically

---

## 📍 API Endpoints

### 👤 **User APIs**

| Method   | Endpoint                | Description                | Auth |
| -------- | ----------------------- | -------------------------- | ---- |
| `POST`   | `/api/user/register`    | Register a new user        | ❌    |
| `POST`   | `/api/user/login`       | Login user & get JWT token | ❌    |
| `GET`    | `/api/user/getUser/:id` | Get a user by ID           | ✅    |
| `PUT`    | `/api/user/updateUser`  | Update user details        | ✅    |
| `DELETE` | `/api/user/delete/:id`  | Delete a user by ID        | ✅    |
| `POST`   | `/api/user/getUsers`    | Get all users              | ✅    |

### 📝 **Post APIs**

| Method   | Endpoint            | Description         | Auth |
| -------- | ------------------- | ------------------- | ---- |
| `GET`    | `/api/posts/`       | Get all posts       | ✅    |
| `GET`    | `/api/posts/lookUP` | Example lookup      | ✅    |
| `PATCH`  | `/api/posts/:id`    | Update a post by ID | ✅    |
| `DELETE` | `/api/posts/:id`    | Delete a post by ID | ✅    |

### 📤 **File Upload API**

| Method | Endpoint      | Description        | Auth |
| ------ | ------------- | ------------------ | ---- |
| `POST` | `/api/upload` | Upload user avatar | ✅    |

---

## 🧾 Example Workflow (Postman)

### 1️⃣ Register User

`POST http://localhost:5500/api/user/register`

```json
{
  "name": "priya",
  "email": "priya@gmail.com",
  "password": "sripriya"
}
```

### 2️⃣ Login

`POST http://localhost:5500/api/user/login`

```json
{
  "email": "priya@gmail.com",
  "password": "sripriya"
}
```

Response:

```json
{
  "accessToken": "your-jwt-token"
}
```

### 3️⃣ Use Token for Authenticated Requests

In Postman, add this header to protected routes:

```
auth-token: your-jwt-token
```

Now you can test:

* `/api/posts/`
* `/api/user/getUsers`
* `/api/upload`

---

## 🗂️ Data Persistence

MongoDB data is stored locally in:

```
./data
```

This ensures data remains even after the containers are stopped or rebuilt.

---

## 💬 Contributing

Contributions and improvements are welcome!
Feel free to **fork**, **open issues**, or **submit pull requests**.

---

## 👨‍💻 Author

**Jeevan**
🔗 [GitHub Profile](https://github.com/jeevan520)

---

## 🏷️ License

This project is open-source and available under the [MIT License](LICENSE).
