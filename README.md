# TimeZone – Secure E-Commerce Web Application

**TimeZone** is an e-commerce web application built for the Secure Web Application Development assignment. It allows users to purchase watches securely, view their order history, and manage their orders. The project focuses on **security, authentication, and access control**, following OWASP Top 10 best practices.

---

## Features

- User authentication and logout using **OIDC protocol** with Auth0
- Display authenticated user's profile information (username, name, email, contact number, country).
- Place orders with the following details:
  - Date of purchase (on or after current date, excluding Sundays)
  - Preferred delivery time (10 AM, 11 AM, 12 PM)
  - Delivery location (district selection)
  - Product selection from predefined list
  - Quantity and optional message
- View all past and upcoming orders.
- Access control: users can only view/manage their own orders.
- Mitigation of **OWASP Top 10 vulnerabilities** including XSS, injection, CSRF, and authentication bypass.

---

## Technology Stack

- **Frontend:** React with Vite
- **Backend:** Express.js (Node.js)
- **Database:** MongoDB
- **Authentication:** OpenID Connect (OIDC) via Auth0
- **Security:** HTTPS, secure environment variables

---

## Prerequisites

- Node.js >= 18
- npm >= 9
- MongoDB (local or Atlas instance)
- Access to a cloud-based IdP (Auth0, Asgardeo, Okta, etc.)

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <https://github.com/Buddhikamadumali/Secure-E-commerce-site>
cd timezone

2. Backend Setup
cd server
npm install
```


Create a .env file in the backend folder with the following sample values:
```bash
PORT=3000
MONGO_URI=secret mongo uri
CLIENT_URL=http://localhost:5174

IDP_CLIENT_ID=client_id
IDP_CLIENT_SECRET=client_secret
IDP_ISSUER=https://idp-domain
IDP_CALLBACK_URL=http://localhost:5000/callback
SESSION_SECRET=your_random_secret
````

3. Frontend Setup
 ````bash
cd client
npm install
````

5. Run the Application

Backend
```bash
cd server
node server.js
````

Backend runs at: https://localhost:3000

Frontend
```bash
cd client
npm run dev
````


Frontend runs at: https://localhost:5174

Database Setup

- If using local MongoDB:

- mongo
- use watches databse
- db.createCollection("orders")


Security Considerations

- Parameterized queries with Mongoose to prevent NoSQL injection.

- Input sanitization to prevent XSS attacks.

- HTTPS enforced for secure communication.

- Tokens validated on the backend to prevent broken access control.

- Environment variables used for sensitive data, excluded from GitHub.

- CORS configured to allow only trusted origins.

Usage

- Open the frontend in your browser.

- Click Login to authenticate via the Auth0.

- View your profile information.

- Place orders and select delivery details.

- View your past orders.

- Logout securely through the Auth0.

Challenges & Learning

- Understanding and implementing OIDC authentication.

- Ensuring proper access control using access tokens.

- Mitigating OWASP Top 10 vulnerabilities.

- Managing frontend-backend communication securely.

Links

- GitHub Repository: (https://github.com/Buddhikamadumali/Secure-E-commerce-site)

- Blog Post: https://medium.com/@buddhikamadumali4/building-a-secure-e-commerce-web-application-my-assignment-experience-f89837d6c65f


