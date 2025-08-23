
# Authentication Flow

![Authentication Flow](../../../public/refresh-token-flow.png)

## 1️⃣ Client login

* User logs in with email/password.
* Server responds with **two tokens**:

  * `accessToken` → short-lived (e.g., 15 minutes)
  * `refreshToken` → long-lived (e.g., 7 days)
* Client stores `accessToken` in memory or local storage, `refreshToken` in an httpOnly cookie or secure storage.

## 2️⃣ Accessing protected routes

* Client sends `accessToken` in `Authorization: Bearer <token>` header.
* Server verifies it:

  * ✅ If valid → allow request.
  * ❌ If expired → respond with `401 Unauthorized` (access token expired).

### 3️⃣ Refresh access token

* When client gets `401` due to expired access token, it calls **refresh route** (e.g., `POST /auth/refresh`) with the `refreshToken`.
* Server verifies the refresh token:

  * ✅ If valid → issue **new access token** (and optionally a new refresh token).
  * ❌ If invalid/expired → ask user to login again.

### 4️⃣ Update client

* Client receives new tokens and retries the original request with the new `accessToken`.

#### Notes

* **Refresh token route is separate** because you don’t want to expose your login credentials every time.
* `accessToken` is short-lived so if it leaks, the damage is limited.
* `refreshToken` is long-lived and stored more securely.
* Typically, refresh tokens are rotated every time they are used.

---

Here’s a practical example of how the **client** can call `/auth/refresh` using the **refresh token**. The “client” could be a browser, mobile app, or even Postman.

### **1. Using `fetch` in JavaScript (browser or frontend)**

```ts
async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await fetch('http://localhost:5000/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }), // <-- refresh token sent here
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to refresh token');
    }

    // new tokens
    const { accessToken, refreshToken: newRefreshToken } = data.data;
    console.log('New Access Token:', accessToken);
    console.log('New Refresh Token:', newRefreshToken);

    // save them to localStorage or cookies
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    return data.data;
  } catch (err) {
    console.error(err);
    // optionally force user to login again
  }
}
```

### **2. Using Postman**

* Set method to **POST**.
* URL: `http://localhost:5000/api/auth/refresh`
* Body → `raw` → JSON:

```json
{
  "token": "YOUR_REFRESH_TOKEN_HERE"
}
```

* Send the request.
* You’ll get a JSON response like:

```json
{
  "ok": true,
  "data": {
    "accessToken": "newAccessTokenHere",
    "refreshToken": "newRefreshTokenHere"
  }
}
```

### **3. Notes**

* The **refresh token** must be stored securely on the client side (HTTP-only cookie or secure storage).
* This call must be made **before making a request with an expired access token**.
* If the refresh token itself expires, the user must **log in again**.
