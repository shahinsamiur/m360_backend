---
#  THANK YOU SO MUCH

Thank you very much for giving me the opportunity to work on this task and for taking the time to review it.

I am grateful for your time and consideration, and I would be happy to discuss the implementation, design decisions, or possible improvements if needed.


**— samiur Shahin**
---

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Knex.js
- Multer (file uploads)
- Joi (validation)
- JWT (authentication)
- ESLint & Prettier

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/<repository-name>.git
cd <repository-name>
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Configuration

Create a .env file in the root directory (DO NOT commit this file).

Copy the example file:

```bash
cp .env.example .env
```

### 4️⃣ Database Setup

Create the database manually:

```bash
CREATE DATABASE hr_db;
```

```bash
npx knex migrate:latest
```

```bash
npx knex seed:run
```

### 5️⃣ Start the Server

```bash
npm run dev
```
