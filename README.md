<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=32&duration=3000&pause=1000&color=10B981&center=true&vCenter=true&width=600&lines=SpendWise+%F0%9F%92%B0;Personal+Finance+Tracker;React+%E2%80%A2+Express+%E2%80%A2+PostgreSQL" alt="Typing SVG" />

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:10B981,100:0a0f1a&height=180&section=header&text=&fontSize=0" width="100%"/>

**A full-stack personal finance tracker — track income, expenses, and spending habits at a glance.**

![React](https://img.shields.io/badge/React-19.2.7-10b981?style=for-the-badge&logo=react&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="500">

</div>

---

## ✨ Overview

SpendWise is a client-server personal finance web app. Users add transactions, watch dashboards update in real time, and manage settings — all backed by a modular Express API and a PostgreSQL database.

```
Client (React — Port 3000)
   Pages → Components → API Layer (fetch)
                ↓
        HTTP /api/* requests
                ↓
Server (Express — Port 5000)
   Routes → Controllers → Queries → PostgreSQL Pool
                ↓
     PostgreSQL Database (spendwise)
```

<div align="center">

| Layer | Technology | Role |
|:---:|:---:|:---|
| 🎨 Frontend | React 19 + React Router 7 | SPA with 3 pages: Dashboard, Transactions, Settings |
| ⚙️ Backend | Express 5 (Node.js) | RESTful JSON API — modular route/controller/query design |
| 🗄️ Database | PostgreSQL | Relational storage for users, transactions, categories, settings |
| 🔀 Proxy | CRA dev proxy | Forwards `/api` calls from `:3000` → `:5000` |

</div>

---

## 🚀 Features

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&duration=2500&pause=800&color=9CA3AF&center=false&vCenter=true&width=700&lines=%F0%9F%93%8A+Live+dashboard+with+income%2Fexpense%2Fbalance+stats;%F0%9F%92%B8+Full+transaction+CRUD+with+filters+%26+pagination;%F0%9F%93%88+Monthly+bar+charts+%26+category+donut+charts+(Recharts);%F0%9F%93%A5+CSV+export+of+transactions;%F0%9F%8E%A8+Dark%2FLight+theme+%2B+high-contrast+mode;%E2%9A%99%EF%B8%8F+Configurable+currency%2C+timezone+%26+notifications" alt="Features Typing SVG" />

---

## 🧱 Tech Stack

<details>
<summary><strong>🖥️ Server Dependencies</strong></summary>

| Package | Version | Purpose |
|---|---|---|
| `express` | ^5.2.1 | HTTP server framework |
| `pg` | ^8.21.0 | PostgreSQL client (connection pool) |
| `cors` | ^2.8.6 | Cross-Origin Resource Sharing |
| `dotenv` | ^17.4.2 | Loads `.env` into `process.env` |
| `morgan` | ^1.10.1 | HTTP request logger |
| `nodemon` | ^3.1.14 | Dev auto-restart on file change |

</details>

<details>
<summary><strong>💻 Client Dependencies</strong></summary>

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.2.7 | UI library |
| `react-dom` | ^19.2.7 | React DOM rendering |
| `react-router-dom` | ^7.18.0 | Client-side routing |
| `react-icons` | ^5.6.0 | Feather (`Fi*`) icon set |
| `recharts` | ^3.8.1 | Bar & Pie charts |
| `react-scripts` | 5.0.1 | Create React App toolchain |

</details>

---

## 📁 Project Structure

<details>
<summary><strong>Click to expand full directory tree</strong></summary>

```
SpendWise/
├── client/                        # React frontend
│   ├── public/
│   └── src/
│       ├── api/                   # API client functions
│       │   ├── analyticsApi.js
│       │   ├── categoriesApi.js
│       │   ├── settingsApi.js
│       │   └── transactionsApi.js
│       ├── components/
│       │   ├── dashboard/
│       │   │   ├── CategoryChart.jsx
│       │   │   ├── MonthlyChart.jsx
│       │   │   ├── RecentTransactions.jsx
│       │   │   └── StatCard.jsx
│       │   ├── layout/
│       │   │   ├── AppLayout.jsx
│       │   │   ├── Sidebar.jsx
│       │   │   └── TopBar.jsx
│       │   ├── settings/
│       │   │   ├── AppearancePanel.jsx
│       │   │   ├── DataExport.jsx
│       │   │   ├── GeneralSettings.jsx
│       │   │   └── SecurityPanel.jsx
│       │   └── transactions/
│       │       ├── AddTransactionModal.jsx
│       │       ├── FilterBar.jsx
│       │       ├── Pagination.jsx
│       │       ├── SpendBreakdown.jsx
│       │       └── TransactionRow.jsx
│       ├── pages/
│       │   ├── DashboardPage.jsx
│       │   ├── TransactionsPage.jsx
│       │   └── SettingsPage.jsx
│       ├── styles/
│       │   └── globals.css        # Design tokens & themes
│       ├── utils/
│       │   ├── categoryIcons.js
│       │   ├── formatCurrency.js
│       │   └── formatDate.js
│       ├── App.jsx
│       └── index.js
│
└── server/                        # Express backend
    ├── config/
    │   ├── db.js                  # PostgreSQL pool setup
    │   └── database.sql           # Schema + seed data
    ├── middleware/
    │   ├── errorHandler.js
    │   └── requestLogger.js
    ├── modules/
    │   ├── analytics/
    │   ├── categories/
    │   ├── settings/
    │   └── transactions/
    ├── utils/
    │   ├── apiResponse.js
    │   └── csvExporter.js
    ├── .env
    ├── app.js
    ├── server.js
    └── package.json
```

</details>

---

## 🗄️ Database Schema

<div align="center">

5 PostgreSQL tables power SpendWise:

</div>

<details>
<summary><strong>👤 users</strong></summary>

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY, `gen_random_uuid()` |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password_hash | VARCHAR(255) | NOT NULL |
| full_name | VARCHAR(255) | NOT NULL |
| avatar_url | TEXT | — |
| created_at / updated_at | TIMESTAMPTZ | DEFAULT NOW() |

</details>

<details>
<summary><strong>🏷️ categories</strong></summary>

| Column | Type | Constraints |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| name | VARCHAR(100) | UNIQUE, NOT NULL |
| icon_name | VARCHAR(50) | — |
| color | VARCHAR(7) | hex color |
| type | VARCHAR(10) | CHECK: `income` \| `expense` \| `both` |

</details>

<details>
<summary><strong>💳 transactions</strong></summary>

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY |
| user_id | UUID | FK → users(id), ON DELETE CASCADE |
| category_id | INTEGER | FK → categories(id) |
| type | VARCHAR(10) | CHECK: `income` \| `expense` |
| amount | NUMERIC(12,2) | NOT NULL, CHECK > 0 |
| description | VARCHAR(255) | NOT NULL |
| notes | TEXT | — |
| transaction_date | DATE | NOT NULL |
| created_at / updated_at | TIMESTAMPTZ | DEFAULT NOW() |

</details>

<details>
<summary><strong>⚙️ settings</strong></summary>

| Column | Type | Default |
|---|---|---|
| id | UUID | PRIMARY KEY |
| user_id | UUID | FK → users(id), UNIQUE |
| currency | VARCHAR(10) | `USD` |
| timezone | VARCHAR(50) | `UTC` |
| theme | VARCHAR(10) | `dark` |
| push_notifications | BOOLEAN | `true` |
| email_reports | BOOLEAN | `false` |
| high_contrast | BOOLEAN | `false` |

</details>

<details>
<summary><strong>📱 user_devices</strong></summary>

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY |
| user_id | UUID | FK → users(id), ON DELETE CASCADE |
| device_name | VARCHAR(100) | NOT NULL |
| device_token | TEXT | NOT NULL |
| is_active | BOOLEAN | DEFAULT true |
| last_used_at / registered_at | TIMESTAMPTZ | — |

</details>

> **Seed data:** 1 test user · 13 default categories (with emoji, color, type) · 12 sample transactions · 1 default settings row.

---

## 🔌 API Reference

<div align="center">

| Method | Endpoint | Description |
|:---:|---|---|
| `GET` | `/` | Health check — API version |
| `GET` | `/api/health` | Health check with timestamp |
| `GET` | `/api/transactions` | Paginated list (filters: type, month, year, category_id, page, limit) |
| `GET` | `/api/transactions/export` | Download CSV |
| `GET` | `/api/transactions/:id` | Get single transaction |
| `POST` | `/api/transactions` | Create transaction |
| `PUT` | `/api/transactions/:id` | Update transaction |
| `DELETE` | `/api/transactions/:id` | Delete transaction |
| `GET` | `/api/analytics/summary` | Income / expense / net balance |
| `GET` | `/api/analytics/monthly` | Monthly income vs expense |
| `GET` | `/api/analytics/categories` | Category breakdown (%) |
| `GET` | `/api/analytics/breakdown` | Alias of `/categories` |
| `GET` | `/api/categories` | List categories (`?type=income\|expense`) |
| `GET` | `/api/categories/:id` | Single category |
| `GET` | `/api/settings` | Current user settings |
| `PUT` | `/api/settings` | Update / upsert settings |

</div>

**Standard success response**

```json
{
  "success": true,
  "message": "Descriptive message",
  "data": { },
  "meta": { "page": 1, "total": 12, "totalPages": 2, "limit": 10 }
}
```

**Standard error response**

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error description"
}
```

> ⚠️ All endpoints currently use a **hardcoded `TEST_USER_ID`** — real authentication is planned for a future phase.

---

## 🎨 Design System

<div align="center">

**Dark theme (default)** — toggle to light via `[data-theme="light"]` on `<html>`

| Token | Value | Usage |
|---|:---:|---|
| `--color-bg` | `#0a0f1a` | Page background |
| `--color-surface` | `#111827` | Cards, sidebar, modals |
| `--color-surface-2` | `#1f2937` | Inputs, table rows |
| `--color-surface-3` | `#374151` | Hover states |
| `--color-primary` | `#10b981` | Brand green |
| `--color-income` | `#10b981` | Income green |
| `--color-expense` | `#ef4444` | Expense red |
| `--color-text` | `#f9fafb` | Main text |
| `--color-text-muted` | `#9ca3af` | Subtitles |

<img src="https://img.shields.io/badge/-%2310b981-10b981?style=flat-square" alt="primary"/> <img src="https://img.shields.io/badge/-%230a0f1a-0a0f1a?style=flat-square" alt="bg"/> <img src="https://img.shields.io/badge/-%23ef4444-ef4444?style=flat-square" alt="expense"/> <img src="https://img.shields.io/badge/-%23111827-111827?style=flat-square" alt="surface"/>

</div>

---

## 🖼️ Pages at a Glance

| Page | Highlights |
|---|---|
| 📊 **Dashboard** | 3 stat cards (Income/Expense/Balance) · Monthly bar chart · Category donut chart · Recent transactions — all fetched in parallel via `Promise.all` |
| 💳 **Transactions** | Filter by All/Income/Expense · 7 per page pagination · Create/Edit/Delete · Auto-refresh |
| ⚙️ **Settings** | General prefs, appearance/theme, data export, security panel |

---

## 🏁 Getting Started

### Prerequisites
![Node](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v14+-336791?style=flat-square&logo=postgresql&logoColor=white)
![npm](https://img.shields.io/badge/npm-latest-CB3837?style=flat-square&logo=npm&logoColor=white)

### 1️⃣ Database Setup
```bash
# Create the database
psql -U postgres -c "CREATE DATABASE spendwise;"

# Run schema + seed script
psql -U postgres -d spendwise -f server/config/database.sql
```

### 2️⃣ Server Setup
```bash
cd server
npm install
# Edit .env with your PostgreSQL credentials
npm run dev
# → http://localhost:5000
```

### 3️⃣ Client Setup
```bash
cd client
npm install
npm start
# → http://localhost:3000  (proxies /api to :5000)
```

### 🔐 Environment Variables — `server/.env`

| Variable | Example | Description |
|---|---|---|
| `DB_USER` | `postgres` | PostgreSQL username |
| `DB_PASSWORD` | `****` | PostgreSQL password |
| `DB_HOST` | `localhost` | Database host |
| `DB_PORT` | `5432` | Database port |
| `DB_NAME` | `spendwise` | Database name |
| `PORT` | `5000` | Server port |
| `NODE_ENV` | `development` | Environment mode |
| `TEST_USER_ID` | `00000000-...-000001` | Temporary hardcoded user |

> 🚨 **Never commit `.env`** — ensure it's listed in `.gitignore`.

### 📜 Available Scripts

| Command | Location | Description |
|---|---|---|
| `npm run dev` | `server/` | Start with nodemon (hot reload) |
| `npm start` | `server/` | Start with node (production) |
| `npm start` | `client/` | Start React dev server |
| `npm run build` | `client/` | Build production bundle |
| `npm test` | `client/` | Run test suite |

---

<div align="center">

### 🛠️ Built With

![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Express.js](https://img.shields.io/badge/-Express.js-000000?style=flat-square&logo=express)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)
![Recharts](https://img.shields.io/badge/-Recharts-22B5BF?style=flat-square)
![React Router](https://img.shields.io/badge/-React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0f1a,100:10B981&height=120&section=footer" width="100%"/>

*Made with 💸 for people who actually want to know where their money went.*

</div>
