# VolunTrack Backend

Express REST API starter for the VolunTrack React frontend.

## Important: current storage mode

This version runs immediately in **in-memory demo mode**, so you can explore the API before creating MongoDB Atlas. Data is reset when the server restarts. A Mongoose connection helper and example schemas are included for the later database step, but the API currently uses the in-memory store. Do not use demo mode for real users or production data.

## Requirements

- Node.js 18 or newer
- npm

## Run it

1. Extract this ZIP.
2. Open the `voluntrack-backend` folder in VS Code.
3. Open a terminal in that folder and run:

   ```bash
   npm install
   ```

4. Copy `.env.example` to `.env` and keep the defaults for now. Replace `JWT_SECRET` with a long random value.
5. Start the API:

   ```bash
   npm run dev
   ```

6. Visit `http://localhost:5000/api/health`. Expected response includes `"status": "ok"`.

## Demo accounts

| Role | Email | Password |
|---|---|---|
| Volunteer | `volunteer@demo.com` | `password123` |
| NGO | `ngo@demo.com` | `password123` |
| Admin | `admin@demo.com` | `admin123` |

Demo users are created in memory with hashed passwords at startup. They are for local testing only.

## API overview

All routes are prefixed with `/api`.

- `GET /health` — API health
- `POST /auth/register` — volunteer registration
- `POST /auth/login` — login and receive a JWT
- `GET /auth/me` — current signed-in user (Bearer token)
- `GET /ngos` — list verified NGOs
- `GET /ngos/:id` — NGO details
- `POST /ngos/applications` — submit NGO application
- `GET /events` — list events (supports `?category=Environment` and `?search=beach`)
- `GET /events/:id` — event details
- `POST /events` — create event (NGO role)
- `PATCH /events/:id` — update event (owning NGO or admin)
- `DELETE /events/:id` — delete event (owning NGO or admin)
- `GET /registrations/mine` — registrations for current volunteer
- `POST /events/:id/register` — register for an event (volunteer role)
- `DELETE /events/:id/register` — cancel own registration
- `GET /events/:id/registrations` — event registrations (owning NGO or admin)
- `POST /registrations/:id/check-in` — check in (NGO/admin)
- `POST /registrations/:id/check-out` — check out and calculate hours (NGO/admin)
- `GET /attendance/mine` — own attendance history and hours
- `GET /funding` — funding records (NGO/admin)
- `POST /funding` — add a funding record (NGO/admin)
- `GET /notifications` — notifications for current user
- `PATCH /notifications/:id/read` — mark notification read
- `PATCH /notifications/read-all` — mark all notifications read
- `GET /admin/summary` — platform summary (admin)
- `GET /admin/ngo-applications` — pending NGO applications (admin)
- `PATCH /admin/ngo-applications/:id` — approve/reject NGO application (admin)

## Test a protected route

After login, copy the `token` from the response and send it in a request header:

```text
Authorization: Bearer YOUR_TOKEN
```

You can test with Postman, Thunder Client, or curl.

## Frontend connection status

Your current frontend ZIP uses localStorage mock APIs. This backend is a separate, ready-to-run API; the frontend will continue to use its local demo data until we update `frontend/src/services/api.js` and the auth context to call these endpoints. We should do that integration as a separate, testable step so the existing UI stays intact.

## Next step: MongoDB Atlas

When you create Atlas, we will migrate the API service layer to use the Mongoose models, then add the URI to `.env` and test persistence. **Adding `MONGO_URI` alone does not switch data storage yet.** Never commit `.env` or share database passwords publicly.
