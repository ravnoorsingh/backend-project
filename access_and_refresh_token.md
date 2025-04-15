# 🔐 Access Token Expiry and Refresh Flow in Frontend-Backend Authentication

## ✅ What Happens When Access Token Expires

- When an **Access Token** expires, any request to a protected route will return a **401 Unauthorized** error.
- The frontend should then try to use a **Refresh Token** to obtain a **new Access Token**.
- If the Refresh Token is valid, the backend issues a new Access Token, allowing the user session to continue without forcing a login again.

---

## 🤔 Where Does the Refresh Token Come From?

The **Refresh Token is stored on the frontend** when the user first logs in or signs up. This is how the frontend has access to it when needed.

### 📦 Common Places to Store the Refresh Token:

| Method                      | Pros                                    | Cons                              |
|-----------------------------|-----------------------------------------|-----------------------------------|
| **1. HttpOnly Cookie**      | Secure (not accessible via JavaScript)  | Must be handled by backend        |
| **2. Local Storage**        | Easy to access in JS                    | Vulnerable to XSS attacks         |
| **3. Session Storage**      | Temporary (cleared on tab close)        | Also vulnerable to XSS attacks    |

---

## 🔁 Typical Refresh Flow

1. Access Token expires → request returns **401 Unauthorized**
2. Frontend detects this and:
    - Reads the **Refresh Token** from storage
    - Sends it to the **`/auth/refresh`** endpoint
3. Backend:
    - Verifies the Refresh Token (matches against DB or validates secret)
    - Issues a **new Access Token** (and possibly a new Refresh Token)
4. Frontend stores the new Access Token and retries the original request

---

## 🔐 Bonus Security Notes

- Refresh Tokens are usually long-lived and may also be stored server-side (e.g., in a database) for:
    - **Revocation**
    - **Audit logs**
- Refresh Tokens **should not be sent with every request**, only when necessary (e.g., after a 401 or during proactive refreshing).
- On logout, both Access and Refresh Tokens should be removed from:
    - Frontend (localStorage/sessionStorage/cookies)
    - Backend (if stored in DB)

---

## ✅ Summary

> The frontend has access to the Refresh Token because it stores it after initial login. When the Access Token expires, the frontend sends the Refresh Token to the backend for validation. If it's valid, a new Access Token is issued, and the session continues smoothly.