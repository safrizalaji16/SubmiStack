# 🧩 SubmiStack

> A modern digital submission management system with authentication, user management, file uploads, and activity logging.

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Roles & Permissions](#-roles--permissions)
- [Development Scripts](#-development-scripts)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

SubmiStack is a comprehensive submission management system designed to digitalize and streamline data submission processes. The platform features robust authentication, user management, file uploads via ImageKit, and detailed activity logging.

The project consists of two main components:
- **Backend**: Built with NestJS, Prisma ORM, and PostgreSQL
- **Frontend**: Powered by React 19, Vite, and TailwindCSS

## ✨ Features

- 🔐 **Authentication & Authorization**: JWT-based auth with role-based access control (RBAC)
- 👥 **User Management**: Complete CRUD operations for user accounts
- 📤 **File Upload**: Integrated with ImageKit for efficient file handling
- 📊 **Submission System**: Create, read, update, and delete submissions
- 📝 **Activity Logging**: Comprehensive logging of all submission activities
- 📚 **API Documentation**: Auto-generated Swagger UI documentation
- 🍪 **Cookie-based Sessions**: Secure session management
- 🎨 **Modern UI**: Responsive design with TailwindCSS

## 🛠️ Tech Stack

### Backend

| Component | Technology |
|-----------|-----------|
| Framework | NestJS |
| ORM | Prisma |
| Database | PostgreSQL |
| Authentication | JWT + Cookies |
| File Upload | Multer + ImageKit |
| Logging | Winston (nest-winston) |
| Documentation | Swagger UI |

### Frontend

| Component | Technology |
|-----------|-----------|
| Framework | React 19 |
| Bundler | Vite |
| Router | React Router v7 |
| State Management | React Hooks + react-use |
| Styling | TailwindCSS |
| Alerts | SweetAlert2 |
| Cookie Management | js-cookie |

## 📁 Project Structure

### Backend Structure

```
backend/
├── dist/                          # Compiled output
├── node_modules/
├── prisma/
│   ├── migrations/                # Database migrations
│   └── schema.prisma              # Database schema
├── src/
│   ├── auth/                      # Authentication module
│   ├── common/                    # Common utilities
│   ├── dto/                       # Data Transfer Objects
│   ├── file/                      # File upload module
│   ├── helpers/                   # Helper functions
│   ├── middlewares/               # Custom middlewares
│   ├── seeds/                     # Database seeders
│   ├── submission/                # Submission module
│   ├── submission-log/            # Activity logging module
│   ├── user/                      # User management module
│   ├── app.module.ts              # Root module
│   └── main.ts                    # Application entry point
├── test/                          # Test files
├── .env                          # Environment variables
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── nest-cli.json
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
```

### Frontend Structure

```
frontend/
├── node_modules/
├── public/                        # Static assets
├── src/
│   ├── assets/                    # Images, fonts, etc.
│   ├── components/                # Reusable components
│   ├── hooks/                     # Custom React hooks
│   ├── layouts/                   # Layout components
│   ├── libs/                      # Utility libraries
│   ├── pages/                     # Page components
│   ├── services/                  # API service clients
│   ├── main.jsx                   # Application entry point
│   └── index.html                 # HTML template
├── .env                          # Environment variables
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## 🚀 Installation

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/SubmiStack.git
cd SubmiStack
```

### 2. Environment Setup

**Backend `.env` file:**

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/submistack"
JWT_SECRET="yoursecretkey"
IMAGEKIT_PUBLIC_KEY="your_public_key"
IMAGEKIT_PRIVATE_KEY="your_private_key"
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_endpoint"
PORT=3000
```

**Frontend `.env` file:**

```env
VITE_API_URL="http://localhost:3000/api"
```

### 3. Install Dependencies & Run

**Backend:**

```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```

The backend will be available at `http://localhost:3000`

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📚 API Documentation

Swagger UI is automatically generated and available at:

```
http://localhost:3000/api#/
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/auth/admin/login` | Login admin | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |
| GET | `/api/auth/logout` | Logout user | ✅ |

### User Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/users` | Get all users (with filters) | ✅ | Admin |
| POST | `/api/users` | Create user | ✅ | Admin |
| GET | `/api/users/{id}` | Get user by ID | ✅ | Admin |
| PUT | `/api/users/{id}` | Update user | ✅ | Admin |
| DELETE | `/api/users/{id}` | Delete user | ✅ | Admin |

**Query Parameters for GET /api/users:**
- `search`: Search by name or email
- `role`: Filter by role (user, admin, superAdmin)

### Submission Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/submissions` | Get all submissions | ✅ |
| POST | `/api/submissions` | Create submission | ✅ |
| GET | `/api/submissions/{id}` | Get submission by ID | ✅ |
| PUT | `/api/submissions/{id}` | Update submission | ✅ |
| DELETE | `/api/submissions/{id}` | Delete submission | ✅ |

### Submission Log Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/submission-logs` | Get all logs | ✅ |
| POST | `/api/submission-logs` | Create log entry | ✅ |

### File Upload Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/files/uploads` | Upload file (ImageKit) | ✅ |

## 🗄️ Database Schema

### Core Entities

#### User
Stores user account information including credentials and roles.

#### Submission
Represents submission records created by users, with attached images.

#### SubmissionLog
Tracks all CRUD operations performed on submissions for audit purposes.

#### Image
Stores metadata for uploaded files via ImageKit.

### Relationships

- User → Submission (One-to-Many)
- Submission → Image (One-to-Many)
- Submission → SubmissionLog (One-to-Many)

## 🔒 Roles & Permissions

| Role | Description | Permissions |
|------|-------------|-------------|
| **superAdmin** | Full system control | All endpoints |
| **admin** | Limited administrative access | CRUD User, CRUD Submission |
| **user** | Regular user | Submit, view own submissions |

## 💻 Development Scripts

### Backend

```bash
npm run start:dev      # Start in watch mode
npm run migrate        # Run Prisma migrations
npm run migrate:reset  # Reset database and migrations
npm run lint           # Check code linting
npm run build          # Build for production
```

### Frontend

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Check code linting
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is **UNLICENSED** - See the LICENSE file for details.

## 👨‍💻 Authors

**SubmiStack Dev Team**

- Version: 0.0.1
- Contact: safrizalaji16@gmail.com
- Repository: [https://github.com/yourusername/SubmiStack](https://github.com/yourusername/SubmiStack)

---

Made with ❤️ using NestJS and React