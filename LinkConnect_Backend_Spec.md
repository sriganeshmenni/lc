# LinkConnect — Professional Backend Specification

> Complete, production-ready backend specification for the LinkConnect placement registration platform.
> Generated from project documentation (BACKEND_SETUP.md, PROJECT_STRUCTURE.md, QUICK_START.md, README.md).

---

## Table of Contents

1. Overview
2. Technology Stack
3. Project Structure
4. Environment Variables
5. Database Models
6. Middleware
7. Services & Endpoints
   - Authentication
   - User Management
   - Link Management
   - Submission Management
   - Analytics
   - Export
8. Functional Requirements
9. Security Requirements
10. DevOps & Deployment
11. Testing Strategy
12. API Documentation & Examples
13. Export & File Uploads
14. Implementation Checklist
15. Next Steps & Deliverables

---

## 1. Overview

LinkConnect is a college placement registration platform that enables students to register for placement/internship opportunities by submitting proof (screenshots), allows faculty to create and manage links, and gives admins full control and analytics. This document defines the full backend requirements: models, routes, controllers, middleware, security, deployment, and testing.

---

## 2. Technology Stack

- **Runtime:** Node.js (v16+)
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **ORM/ODM:** Mongoose
- **Auth:** JWT (access tokens), bcrypt for password hashing
- **File Uploads:** Multer (local or S3 integration)
- **Exports:** ExcelJS or CSV
- **Security / Utilities:** dotenv, cors, helmet, express-rate-limit
- **Optional Monitoring:** Sentry, Prometheus + Grafana, Datadog
- **CI/CD:** GitHub Actions / GitLab CI / CircleCI

---

## 3. Project Structure

```
linkconnect-backend/
├── server.js
├── package.json
├── .env
├── .gitignore
├── config/
│   └── database.js
├── models/
│   ├── User.js
│   ├── Link.js
│   ├── Submission.js
│   └── LoginStat.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── linkController.js
│   ├── submissionController.js
│   └── analyticsController.js
├── routes/
│   ├── auth.js
│   ├── users.js
│   ├── links.js
│   ├── submissions.js
│   ├── analytics.js
│   └── export.js
├── middleware/
│   ├── auth.js
│   └── roleCheck.js
├── utils/
│   └── fileUpload.js
└── uploads/         # optional, .gitignored
```

---

## 4. Environment Variables

Create a `.env` file (do **not** commit to source control):

```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=strong_random_secret_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
AWS_S3_BUCKET=optional_bucket_name
AWS_ACCESS_KEY_ID=optional_key
AWS_SECRET_ACCESS_KEY=optional_secret
```

---

## 5. Database Models

### 5.1 User Model

Fields:
- `_id`: ObjectId
- `name`: String, required
- `email`: String, required, unique, indexed
- `password`: String (hashed), required
- `role`: String, enum ['admin','faculty','student'], required
- `rollNumber`: String, required for role `student`
- `active`: Boolean, default true
- `lastLogin`: Date
- `loginHistory`: Array of `{ timestamp: Date, ipAddress: String }`
- `createdAt`, `updatedAt`: Dates

Methods:
- `comparePassword(candidatePassword)`: bcrypt compare
- `pre('save')`: hash password when modified

### 5.2 Link Model

Fields:
- `_id`: ObjectId
- `title`: String, required
- `url`: String, required
- `shortUrl`: String, unique, indexed
- `deadline`: Date
- `description`: String
- `createdBy`: ObjectId (ref Users)
- `createdByEmail`: String
- `active`: Boolean, default true
- `registrations`: Number, default 0
- `createdAt`, `updatedAt`: Dates

### 5.3 Submission Model

Fields:
- `_id`: ObjectId
- `linkId`: ObjectId (ref Links), required
- `studentId`: ObjectId (ref Users), required
- `studentName`: String
- `studentEmail`: String
- `rollNumber`: String
- `screenshot`: String (file path or S3 URL), required
- `status`: String, enum ['pending','completed','verified'], default 'completed'
- `submittedAt`: Date
- `verifiedBy`: ObjectId (ref Users, optional)
- `verifiedAt`: Date (optional)

### 5.4 LoginStat Model

Fields:
- `_id`: ObjectId
- `date`: Date (indexed)
- `totalLogins`: Number
- `roleBreakdown`: { admin: Number, faculty: Number, student: Number }
- `uniqueUsers`: [ObjectId]

---

## 6. Middleware

### 6.1 `auth.js`
- Extract token from `Authorization: Bearer <token>`
- Verify JWT using `JWT_SECRET`
- Attach `req.user = { id, email, role }`
- Return 401 on missing/invalid token

### 6.2 `roleCheck.js`
- Accept allowed roles (e.g., `roleCheck('admin', 'faculty')`)
- If `req.user.role` not in allowed roles return 403

### 6.3 Other Middleware
- `helmet()` for secure headers
- `cors()` limited to `FRONTEND_URL`
- `express-rate-limit` on `/api/*`
- `express.json({ limit: '10mb' })`
- Input validation using `express-validator` or `joi`

---

## 7. Services & Endpoints

> All endpoints are prefixed with `/api`

### 7.1 Authentication Service

- `POST /api/auth/register`
  - Body: `{ name, email, password, role, rollNumber? }`
  - Validations: email format, password strength, role enum
  - Actions: create user, hash password
  - Response: success message

- `POST /api/auth/login`
  - Body: `{ email, password, role }`
  - Actions: find user by email+role, verify password, check `active`, update `lastLogin` & `loginHistory`, return JWT
  - Response: `{ token, user }`

- `GET /api/auth/me`
  - Auth: required
  - Actions: return current user profile

### 7.2 User Management (Admin)

- `GET /api/users` — Query params: `role?`, `page?`, `limit?`, `search?`
- `GET /api/users/:id`
- `PUT /api/users/:id` — Update user (admin only)
- `DELETE /api/users/:id` — Soft or hard delete
- `PUT /api/users/:id/toggle-status` — Activate/deactivate account
- `GET /api/users/export` — Export users (Excel/CSV)

### 7.3 Link Management (Faculty/Admin)

- `GET /api/links` — List (with `active`, `expired`, `createdBy` filters)
- `GET /api/links/:id`
- `POST /api/links` — Create link
  - Auto-generate `shortUrl` if not provided
- `PUT /api/links/:id` — Update link
- `DELETE /api/links/:id` — Delete or soft-delete
- `GET /api/links/export` — Export links

### 7.4 Submission Management

- `POST /api/submissions`
  - Body: `{ linkId, studentId (or from token), screenshot (multipart/form-data) }`
  - Actions: save screenshot (local/S3), create submission, increment `link.registrations`
- `GET /api/submissions/student/:studentId` — Student's submissions
- `GET /api/submissions/link/:linkId` — Submissions for a link (faculty/admin)
- `PUT /api/submissions/:id/verify` — Mark verified (faculty/admin)
- `GET /api/submissions/export` — Export submissions

### 7.5 Analytics (Admin)

- `GET /api/analytics/stats` — Overview totals
- `GET /api/analytics/logins?from=&to=` — Login trends
- `GET /api/analytics/users/role/:role` — Users by role
- `GET /api/analytics/links` — Link & registration metrics

### 7.6 Export Endpoints (Admin)

- `GET /api/export/users`
- `GET /api/export/users/role/:role`
- `GET /api/export/links`
- `GET /api/export/submissions`
- `GET /api/export/logins`

Implementation note: streams large exports to avoid memory spikes, use `exceljs` or CSV streaming.

---

## 8. Functional Requirements

- Role-based UI with RBAC enforced in backend
- Students can only view active links and their own submissions
- Faculty can create/edit links they own and view submissions for those links
- Admin can view and manage everything
- Short URL generation (collision-resistant)
- Deadlines enforce visibility (links with past deadlines are not "active")
- Submission screenshots validated for type/size
- All date fields stored in UTC
- Consistent API error format `{ success: false, message: '', errors: [...] }`

---

## 9. Security Requirements

- Hash passwords with bcrypt (salt rounds >= 10)
- Use HTTPS in production
- JWT tokens signed with strong `JWT_SECRET`, short expiry recommended (e.g., 15m access + refresh token)
- Rate-limit sensitive endpoints (auth, submission upload)
- Validate and sanitize all inputs to prevent injection/XSS
- CORS allow only trusted origins
- Avoid storing secrets in source control; use environment variables or secret manager
- Implement server-side file type checks and size limits for uploads
- Optional: 2FA for admin accounts

---

## 10. DevOps & Deployment

### Environments
- `development`, `staging`, `production`

### CI/CD
- Lint → Tests → Build → Deploy
- Use Docker for consistent runtime
- Build images and deploy to Render/Heroku/AWS ECS/Fargate

### Observability
- Logs (structured JSON) to centralized logging (ELK / Datadog)
- Error tracking via Sentry
- Metrics + dashboard via Prometheus & Grafana

### Backups & Database
- Use MongoDB Atlas automated backups
- Create indexes on `email`, `role`, `createdAt`, `shortUrl`, `linkId`

---

## 11. Testing Strategy

- Unit tests (Jest) for controllers and services
- Integration tests using Supertest (API endpoints)
- End-to-end tests (Cypress) for critical flows (register/login, create link, submit)
- Static analysis with ESLint and Prettier
- Security scanning: dependency-check, Snyk

---

## 12. API Documentation & Examples

- Provide OpenAPI/Swagger documentation (`/api/docs`)
- Include example requests and responses for each route
- Provide Postman collection for quick testing

### Sample: Login Request

```
POST /api/auth/login
Content-Type: application/json
Body:
{
  "email": "student@college.edu",
  "password": "Test@123",
  "role": "student"
}
```

Response:
```
{
  "token": "<jwt>",
  "user": {
    "id": "...",
    "name": "Student Name",
    "email": "student@college.edu",
    "role": "student",
    "rollNumber": "CS2023001"
  }
}
```

---

## 13. Export & File Uploads

### File Uploads
- Use `multer` for multipart handling
- Validate mime types (image/png, image/jpeg) and file size (e.g., <= 5MB)
- Store files locally (for simple deployments) or push to S3/R2 for production
- Use unique filenames (uuid + original extension)

### Exporting Data
- Use `exceljs` for XLSX and `csv-writer` for CSV
- Stream results to client (avoid buffering large files)
- Protect endpoints behind admin role check

---

## 14. Implementation Checklist

- [ ] Implement `server.js` with common middleware (helmet, cors, rate-limiter)
- [ ] Create `config/database.js` to connect to MongoDB
- [ ] Implement Mongoose models (User, Link, Submission, LoginStat)
- [ ] Implement auth routes & controllers (register, login, me)
- [ ] Implement users routes & controllers (admin features)
- [ ] Implement links routes & controllers
- [ ] Implement submissions routes & controllers (file uploads)
- [ ] Implement analytics & export routes
- [ ] Add unit & integration tests
- [ ] Add API documentation (Swagger)
- [ ] Setup CI/CD pipeline
- [ ] Prepare Dockerfile and deployment scripts
- [ ] Monitor and backup database

---

## 15. Next Steps & Deliverables

If you want, I can produce any of the following **immediately**:

- Full backend boilerplate (complete `server.js`, routes, controllers, models, middleware)
- A ready-to-run Git repository structure
- Dockerfile, `docker-compose.yml`, and deployment notes
- Swagger/OpenAPI JSON and Postman collection
- Unit & integration test skeletons (Jest + Supertest)
- Excel/CSV export and Multer file upload implementation

---

### Contact / Notes

This specification was assembled from provided project docs and adjusted to be production-ready. If you'd like the backend code generated as a downloadable repo or a single `.zip` with complete implementation, tell me which deliverable you'd like next.

---

*Generated on: 2025-12-05 (Asia/Kolkata timezone)*
