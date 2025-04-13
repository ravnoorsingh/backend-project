# HTTP Crash Course - Understanding HTTP Basics

## Introduction
Here we will cover an HTTP crash course that's essential for both frontend and backend developers. 

### Key Topics:
- HTTP vs HTTPS
- Client-Server Model
- Headers and Methods
- Status Codes

---

## HTTP vs HTTPS
- **HTTP**: Data is sent in clear text (e.g., "ABC" is received as "ABC").
- **HTTPS**: Data is encrypted for security. Even if intercepted, it's unreadable without decryption.
- Most discussions still refer to "HTTP" for convenience.

---

## Client-Server Model
- **Client**: Sends requests (e.g., mobile app, browser).
- **Server**: Responds to requests (e.g., backend API).
- Communication happens over the network using standardized rules (protocols).

---

## URL, URI, URN
- **URL (Uniform Resource Locator)**: Identifies the location of a resource (e.g., `https://example.com`).
- **URI (Uniform Resource Identifier)**: A broader term covering both URLs and URNs.
- **URN (Uniform Resource Name)**: A persistent identifier (e.g., `urn:isbn:0451450523`).

---

## HTTP Headers
Headers are metadata sent with requests/responses in key-value pairs (e.g., `Content-Type: application/json`).

### Types of Headers:
1. **Request Headers**: Sent by the client (e.g., `User-Agent`, `Authorization`).
2. **Response Headers**: Sent by the server (e.g., `Cache-Control`, `Set-Cookie`).
3. **Representation Headers**: Describe data format (e.g., `Content-Encoding: gzip`).
4. **Payload Headers**: Carry actual data (e.g., `email: user@example.com`).

### Common Headers:
- `Accept`: Specifies response format (e.g., `application/json`).
- `User-Agent`: Identifies the client (e.g., browser, Postman).
- `Authorization`: Carries tokens (e.g., `Bearer <JWT_TOKEN>`).
- `Cookie`: Stores session data.
- `Cache-Control`: Manages caching (e.g., `max-age=3600`).

---

## HTTP Methods
Methods define the operation to be performed on a resource.

### Common Methods:
1. **GET**: Retrieve a resource (e.g., fetch user details).
2. **POST**: Create a resource (e.g., add a new user).
3. **PUT**: Replace a resource (e.g., update entire user data).
4. **PATCH**: Partially update a resource (e.g., update user email).
5. **DELETE**: Remove a resource (e.g., delete a user).

### Less Common Methods:
- **HEAD**: Fetch only headers (no body).
- **OPTIONS**: List supported methods for a resource.
- **TRACE**: Debugging (echoes the request).

---

## HTTP Status Codes
Status codes indicate the result of a request.

### Categories:
1. **1xx (Informational)**: Request received (e.g., `100 Continue`).
2. **2xx (Success)**: Request processed successfully (e.g., `200 OK`, `201 Created`).
3. **3xx (Redirection)**: Resource moved (e.g., `301 Moved Permanently`).
4. **4xx (Client Error)**: Invalid request (e.g., `400 Bad Request`, `404 Not Found`).
5. **5xx (Server Error)**: Server failed (e.g., `500 Internal Server Error`).

### Common Codes:
- `200 OK`: Standard success response.
- `201 Created`: Resource created successfully.
- `400 Bad Request`: Invalid client input.
- `401 Unauthorized`: Missing/wrong credentials.
- `404 Not Found`: Resource doesn’t exist.
- `500 Internal Server Error`: Server-side failure.

---

## Key Takeaways
- HTTP is foundational for web communication.
- Headers carry metadata for requests/responses.
- Methods define actions on resources.
- Status codes standardize responses.

---

### Next Steps
- Practice with tools like Postman.
- Explore backend controllers and APIs.
- Stay curious about networking concepts!

---

# HTTP Crash Course: A Comprehensive Guide

## Table of Contents
- [Introduction to HTTP](#introduction-to-http)
- [HTTP vs HTTPS](#http-vs-https)
- [Client-Server Model](#client-server-model)
- [URL, URI, and URN](#url-uri-and-urn)
- [HTTP Headers](#http-headers)
- [HTTP Methods](#http-methods)
- [HTTP Status Codes](#http-status-codes)
- [Request and Response Structure](#request-and-response-structure)
- [HTTP Authentication](#http-authentication)
- [Cookies and Sessions](#cookies-and-sessions)
- [Caching Mechanisms](#caching-mechanisms)
- [Content Negotiation](#content-negotiation)
- [Cross-Origin Resource Sharing (CORS)](#cross-origin-resource-sharing-cors)
- [HTTP/2 and HTTP/3](#http2-and-http3)
- [Tools for HTTP Debugging](#tools-for-http-debugging)
- [Key Takeaways](#key-takeaways)
- [References and Further Reading](#references-and-further-reading)

## Introduction to HTTP

HTTP (Hypertext Transfer Protocol) is the foundation of data communication on the World Wide Web. Developed by Tim Berners-Lee at CERN in 1989, it has evolved from a simple protocol for document exchange to a complex system supporting dynamic, interactive web applications.

### Key Characteristics:

- **Stateless Protocol**: Each request from client to server must contain all information needed to understand the request, as the server doesn't store session state between requests.
- **Application Layer Protocol**: Operates at the application layer of the OSI model, sitting on top of TCP/IP.
- **Text-Based**: HTTP messages are human-readable, facilitating debugging and development.
- **Request-Response Cycle**: Communication follows a request-response pattern where clients initiate requests and servers respond.

### Evolution:

- **HTTP/0.9 (1991)**: Single-line protocol with only GET method
- **HTTP/1.0 (1996)**: Added headers, status codes, and other methods
- **HTTP/1.1 (1997)**: Introduced persistent connections, chunked transfers, and more
- **HTTP/2 (2015)**: Binary protocol with multiplexing and header compression
- **HTTP/3 (2022)**: Uses QUIC transport protocol instead of TCP for improved performance

## HTTP vs HTTPS

### HTTP (Hypertext Transfer Protocol)

HTTP transmits data in plain text, making it vulnerable to eavesdropping and man-in-the-middle attacks.

**Example HTTP Request:**
```
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
```

If intercepted, all details including headers, cookies, and form data are visible to attackers.

### HTTPS (HTTP Secure)

HTTPS adds a layer of encryption using TLS (Transport Layer Security) or its predecessor SSL (Secure Sockets Layer). 

**Key Benefits:**
1. **Data Encryption**: All communication is encrypted, preventing eavesdropping
2. **Data Integrity**: Prevents modification of data in transit
3. **Authentication**: Verifies server identity using digital certificates

**How HTTPS Works:**
1. **TLS Handshake**: Client and server establish a secure connection
   - Server presents its SSL/TLS certificate
   - Client verifies certificate authenticity through Certificate Authorities (CAs)
   - Both parties negotiate encryption algorithms and generate session keys
2. **Encrypted Communication**: Data is encrypted using symmetric encryption with the session key

**Example Scenario:**
- With HTTP: User sends login credentials as "username=admin&password=secret123"
- With HTTPS: Same data is encrypted to something like "A7Bf9#$3jL@5pQ2zX8..."

**HTTPS Indicators:**
- Browser URL bar shows a padlock icon
- URL begins with "https://" instead of "http://"
- Sites may display security badges or EV (Extended Validation) certificate indicators

### Performance Considerations

While historically HTTPS had performance overhead, modern optimizations like HSTS, OCSP stapling, and HTTP/2 (which requires encryption) have actually made HTTPS faster than HTTP in many real-world scenarios.

## Client-Server Model

The client-server model defines the fundamental relationship in HTTP communication.

### The Client

The client initiates requests to the server. Examples include:

- **Web Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Apps**: Native applications making API calls
- **IoT Devices**: Smart home devices, sensors
- **Scripts/Programs**: Using libraries like Requests (Python), Axios (JavaScript), or cURL

**Client Responsibilities:**
1. Formulating correct HTTP requests
2. Managing cookies and local storage
3. Handling authentication
4. Processing and rendering responses
5. Implementing caching as directed by server

### The Server

The server listens for client requests and delivers appropriate responses. Examples include:

- **Web Servers**: Nginx, Apache, IIS
- **Application Servers**: Node.js, Tomcat, Unicorn
- **API Gateways**: Kong, Amazon API Gateway, Apigee
- **CDNs**: Cloudflare, Akamai, Fastly

**Server Responsibilities:**
1. Authentication and authorization
2. Processing request parameters
3. Business logic execution
4. Database interactions
5. Response formatting
6. Caching and performance optimization

### Communication Flow

Here's a detailed example of the client-server interaction when accessing a website:

1. **DNS Resolution**: Client resolves domain (example.com) to IP address
2. **TCP Connection**: Client establishes TCP connection with server (usually port 80 for HTTP, 443 for HTTPS)
3. **TLS Handshake**: For HTTPS, client and server perform TLS handshake
4. **HTTP Request**: Client sends HTTP request
5. **Server Processing**: 
   - Server parses request
   - Executes appropriate code (routing to controllers)
   - Queries databases if needed
   - Assembles response
6. **HTTP Response**: Server returns response with status code, headers, and content
7. **Client Processing**: Client processes response (e.g., browser renders HTML)
8. **Additional Requests**: Client makes additional requests for linked resources (images, CSS, JavaScript)

### Statelessness and Its Implications

HTTP is fundamentally stateless, meaning each request-response cycle is independent. This creates challenges for applications requiring user sessions or multi-step processes.

Solutions include:
- **Cookies**: Small data pieces stored on client
- **Session IDs**: Server-stored sessions referenced by client cookies
- **JWT Tokens**: Self-contained authentication tokens
- **Local/Session Storage**: Client-side browser storage
- **Hidden Form Fields**: Maintaining state across form submissions

## URL, URI, and URN

Understanding the differences between URL, URI, and URN is crucial for HTTP communication.

### URL (Uniform Resource Locator)

A URL specifies both the resource location and the mechanism to retrieve it.

**URL Structure:**
```
scheme://authority/path?query#fragment
```

**Components:**
- **Scheme**: Protocol (http, https, ftp, mailto, file, etc.)
- **Authority**: Domain name/IP address and optional port (example.com:8080)
- **Path**: Resource path (/blog/articles/123)
- **Query**: Parameters (?id=123&sort=desc)
- **Fragment**: Specific section within resource (#section2)

**Example URLs:**
- `https://www.example.com:443/products/electronics?category=laptops&sort=price-asc#specifications`
- `http://api.weather.com/forecast/daily?city=newyork&units=metric`
- `file:///C:/Users/username/Documents/file.txt`
- `mailto:user@example.com?subject=Hello`

### URI (Uniform Resource Identifier)

URI is the superclass of both URLs and URNs. Any string that identifies a resource is a URI.

**Example URIs:**
- `https://example.com/products/123` (also a URL)
- `urn:isbn:0451450523` (a URN, not a URL)
- `tel:+1-816-555-1212` (a URI scheme for telephone numbers)
- `/products/electronics` (a relative URI, needs context)

### URN (Uniform Resource Name)

URNs identify resources by name in a given namespace, without specifying how to access them.

**URN Structure:**
```
urn:namespace:identifier
```

**Example URNs:**
- `urn:isbn:0451450523` (identifies a book by ISBN)
- `urn:uuid:6e8bc430-9c3a-11d9-9669-0800200c9a66` (identifies resource with UUID)
- `urn:ietf:rfc:2648` (identifies IETF RFC document)

### Practical Distinctions

Think of these terms as:
- **URI**: The general concept of an identifier (like "vehicle")
- **URL**: A location-based identifier (like "car at 123 Main St")
- **URN**: A persistent name-based identifier (like "VIN:1HGCM82633A004352")

## HTTP Headers

HTTP headers provide crucial metadata about requests and responses, influencing how messages are processed.

### Types of Headers

#### Request Headers
Sent by the client to provide context about the request and client capabilities.

**Common Request Headers:**

| Header | Purpose | Example |
|--------|---------|---------|
| `Host` | Specifies domain name | `Host: api.example.com` |
| `User-Agent` | Identifies client software | `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36` |
| `Accept` | Preferred response formats | `Accept: application/json, text/html` |
| `Accept-Language` | Preferred languages | `Accept-Language: en-US,en;q=0.9,es;q=0.8` |
| `Accept-Encoding` | Supported compression | `Accept-Encoding: gzip, deflate, br` |
| `Authorization` | Authentication credentials | `Authorization: Bearer eyJhbGciOiJIUz...` |
| `Cookie` | Stored cookies | `Cookie: sessionid=abc123; user_pref=dark_mode` |
| `Referer` | Previous page URL | `Referer: https://www.google.com/search?q=example` |
| `If-Modified-Since` | Conditional request | `If-Modified-Since: Wed, 21 Oct 2015 07:28:00 GMT` |
| `Content-Type` | Request body format | `Content-Type: application/json` |
| `Content-Length` | Request body size in bytes | `Content-Length: 348` |

#### Response Headers
Sent by the server to provide information about the response.

**Common Response Headers:**

| Header | Purpose | Example |
|--------|---------|---------|
| `Server` | Server software identifier | `Server: nginx/1.18.0` |
| `Content-Type` | Response format | `Content-Type: application/json; charset=utf-8` |
| `Content-Length` | Response size in bytes | `Content-Length: 1024` |
| `Set-Cookie` | Sets cookies on client | `Set-Cookie: sessionid=abc123; Path=/; HttpOnly` |
| `Cache-Control` | Caching directives | `Cache-Control: max-age=3600, public` |
| `Expires` | Content expiration date | `Expires: Wed, 21 Oct 2025 07:28:00 GMT` |
| `Last-Modified` | Resource last modified | `Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT` |
| `ETag` | Resource version identifier | `ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"` |
| `Location` | Redirect target URL | `Location: https://example.com/new-page` |
| `Access-Control-Allow-Origin` | CORS permissions | `Access-Control-Allow-Origin: https://trusted-site.com` |

#### Representation Headers
Describe the format and encoding of the message body.

**Common Representation Headers:**

| Header | Purpose | Example |
|--------|---------|---------|
| `Content-Type` | Media type and charset | `Content-Type: text/html; charset=UTF-8` |
| `Content-Encoding` | Compression algorithm | `Content-Encoding: gzip` |
| `Content-Language` | Natural language | `Content-Language: en-US` |
| `Content-Length` | Size in bytes | `Content-Length: 348` |

#### Payload Headers
Carry information about the message body.

**Common Payload Headers:**

| Header | Purpose | Example |
|--------|---------|---------|
| `Content-Range` | Partial content range | `Content-Range: bytes 200-1000/67589` |
| `Content-Disposition` | Display instructions | `Content-Disposition: attachment; filename="report.pdf"` |
| `Content-Security-Policy` | Security policies | `Content-Security-Policy: default-src 'self'` |

### Custom Headers

Developers can create custom headers, typically prefixed with `X-` (though this convention is now discouraged).

**Examples:**
- `X-Request-ID: 7b44ce3a-83c2-4fa9-a7f6-a833bd5fc71c`
- `X-Rate-Limit-Remaining: 42`
- `X-Powered-By: PHP/7.4.1`

### Practical Header Examples

#### Complete HTTP Request with Headers:
```
GET /api/users/123 HTTP/1.1
Host: api.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: application/json
Accept-Language: en-US,en;q=0.9
Accept-Encoding: gzip, deflate, br
Referer: https://example.com/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Cookie: session=abc123; preference=dark
Cache-Control: no-cache
If-None-Match: "e0023aa4f"
```

#### Complete HTTP Response with Headers:
```
HTTP/1.1 200 OK
Date: Mon, 15 Apr 2025 12:28:53 GMT
Server: nginx/1.18.0
Content-Type: application/json; charset=utf-8
Content-Length: 218
Cache-Control: max-age=3600, public
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Access-Control-Allow-Origin: *
X-Request-ID: 7b44ce3a-83c2-4fa9-a7f6-a833bd5fc71c

{"id": 123, "name": "John Doe", "email": "john@example.com", "role": "admin"}
```

## HTTP Methods

HTTP methods define the action to be performed on a resource identified by a URL.

### Primary HTTP Methods

#### GET

Used to retrieve data from a specified resource without modifying it.

**Characteristics:**
- Idempotent (multiple identical requests have same effect as one)
- Safe (does not change server state)
- Can be cached
- May be bookmarked
- Parameters sent in URL query string
- Has length limitations (URL size limits)

**Examples:**
```
GET /api/products HTTP/1.1
Host: example.com
```

```
GET /api/products?category=electronics&sort=price-asc HTTP/1.1
Host: example.com
```

**Common Use Cases:**
- Retrieving web pages
- Fetching API resources
- Downloading files
- Search queries

#### POST

Used to submit data to be processed to a specified resource, often creating a new resource.

**Characteristics:**
- Not idempotent (multiple identical requests may create multiple resources)
- Not safe (changes server state)
- Not typically cached
- Cannot be bookmarked (safely)
- Data sent in request body
- No size limitations for data

**Example:**
```
POST /api/products HTTP/1.1
Host: example.com
Content-Type: application/json
Content-Length: 123

{
  "name": "Wireless Headphones",
  "price": 99.99,
  "category": "electronics",
  "inStock": true
}
```

**Common Use Cases:**
- Form submissions
- Creating new resources
- File uploads
- Authentication

#### PUT

Used to update a resource by replacing it entirely with the provided data.

**Characteristics:**
- Idempotent
- Not safe
- Data sent in request body
- Replaces entire resource

**Example:**
```
PUT /api/products/123 HTTP/1.1
Host: example.com
Content-Type: application/json
Content-Length: 157

{
  "id": 123,
  "name": "Noise-Cancelling Wireless Headphones",
  "price": 149.99,
  "category": "electronics",
  "inStock": true,
  "features": ["Bluetooth 5.0", "40h battery"]
}
```

**Common Use Cases:**
- Updating resources when providing complete replacement
- Uploading files to specific URL
- Creating resources with client-specified ID

#### PATCH

Used to apply partial modifications to a resource.

**Characteristics:**
- Not guaranteed to be idempotent
- Not safe
- Data sent in request body
- Updates only specified fields

**Example:**
```
PATCH /api/products/123 HTTP/1.1
Host: example.com
Content-Type: application/json
Content-Length: 45

{
  "price": 129.99,
  "inStock": false
}
```

**Common Use Cases:**
- Updating specific fields of a resource
- Making partial changes to large resources
- Status updates

#### DELETE

Used to remove a specified resource.

**Characteristics:**
- Idempotent
- Not safe
- May have a request body (uncommon)

**Example:**
```
DELETE /api/products/123 HTTP/1.1
Host: example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Common Use Cases:**
- Removing resources
- Soft deletions (often implemented as PATCH)
- Cleaning up temporary resources

### Less Common HTTP Methods

#### HEAD

Similar to GET but returns only headers without the response body.

**Example:**
```
HEAD /api/products/123 HTTP/1.1
Host: example.com
```

**Common Use Cases:**
- Checking if resource exists
- Testing URL validity before large download
- Checking for resource updates

#### OPTIONS

Used to describe communication options for the target resource.

**Example:**
```
OPTIONS /api/products HTTP/1.1
Host: example.com
```

**Example Response:**
```
HTTP/1.1 200 OK
Allow: GET, POST, HEAD, OPTIONS
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

**Common Use Cases:**
- CORS preflight requests
- API discovery
- Server capabilities exploration

#### TRACE

Echo back the received request for debugging.

**Example:**
```
TRACE /api/test HTTP/1.1
Host: example.com
X-Custom-Header: test-value
```

**Common Use Cases:**
- Debugging proxy servers
- Testing request modifications by intermediaries
- Generally disabled in production for security reasons

### Method Comparison

| Method  | Idempotent | Safe | Cacheable | Request Body | Response Body | Common Status Codes |
|---------|------------|------|-----------|--------------|---------------|---------------------|
| GET     | Yes        | Yes  | Yes       | No           | Yes           | 200, 404           |
| POST    | No         | No   | Rarely    | Yes          | Optional      | 201, 400, 409      |
| PUT     | Yes        | No   | No        | Yes          | Optional      | 200, 204, 404      |
| PATCH   | Typically No | No | No        | Yes          | Optional      | 200, 204, 404      |
| DELETE  | Yes        | No   | No        | Rarely       | Optional      | 204, 404           |
| HEAD    | Yes        | Yes  | Yes       | No           | No            | 200, 404           |
| OPTIONS | Yes        | Yes  | No        | No           | Yes           | 200                |
| TRACE   | Yes        | Yes  | No        | No           | Yes           | 200                |

## HTTP Status Codes

Status codes are three-digit numbers that provide standardized information about the result of an HTTP request.

### 1xx (Informational)
Indicates a provisional response, with the client needing to wait for the final response.

| Code | Name | Description | Example Use Case |
|------|------|-------------|-----------------|
| 100 | Continue | Server has received request headers and client should proceed with body | Large file uploads |
| 101 | Switching Protocols | Server is switching protocols as requested | WebSocket handshake |
| 102 | Processing | Server has received request but is still processing (WebDAV) | Long-running operations |
| 103 | Early Hints | Server is sending some response headers early | Resource preloading |

### 2xx (Success)
Indicates the request was successfully received, understood, and accepted.

| Code | Name | Description | Example Use Case |
|------|------|-------------|-----------------|
| 200 | OK | Standard success response | Successful GET request |
| 201 | Created | Resource created successfully | Successful POST creating resource |
| 202 | Accepted | Request accepted but processing not completed | Asynchronous operations |
| 204 | No Content | Request succeeded, no content to return | Successful DELETE |
| 206 | Partial Content | Server delivering only part of resource | Range requests for large files |

### 3xx (Redirection)
Indicates further action needs to be taken to complete the request.

| Code | Name | Description | Example Use Case |
|------|------|-------------|-----------------|
| 300 | Multiple Choices | Multiple options for the resource | Content negotiation |
| 301 | Moved Permanently | Resource permanently relocated | Site restructuring |
| 302 | Found (Temporary Redirect) | Resource temporarily located elsewhere | Temporary maintenance |
| 303 | See Other | Response found at different URI | Form submission result |
| 304 | Not Modified | Resource not modified since last request | Conditional requests with If-Modified-Since |
| 307 | Temporary Redirect | Same as 302 but preserves HTTP method | Temporary rerouting |
| 308 | Permanent Redirect | Same as 301 but preserves HTTP method | Permanent rerouting |

### 4xx (Client Error)
Indicates the request contains errors or cannot be fulfilled.

| Code | Name | Description | Example Use Case |
|------|------|-------------|-----------------|
| 400 | Bad Request | Server cannot process due to client error | Malformed request syntax |
| 401 | Unauthorized | Authentication required | Missing/invalid credentials |
| 403 | Forbidden | Server understood but refuses to authorize | Valid auth but insufficient permissions |
| 404 | Not Found | Resource not found | Non-existent URL |
| 405 | Method Not Allowed | Method not allowed for resource | PUT on read-only resource |
| 406 | Not Acceptable | Server can't produce response matching Accept headers | Content negotiation failure |
| 409 | Conflict | Request conflicts with current state | Concurrent edits |
| 410 | Gone | Resource permanently removed | Deleted content |
| 413 | Payload Too Large | Request body too large | File upload exceeding limits |
| 415 | Unsupported Media Type | Media format not supported | Invalid Content-Type |
| 422 | Unprocessable Entity | Request semantically incorrect | Validation errors |
| 429 | Too Many Requests | User sent too many requests | Rate limiting |

### 5xx (Server Error)
Indicates the server failed to fulfill a valid request.

| Code | Name | Description | Example Use Case |
|------|------|-------------|-----------------|
| 500 | Internal Server Error | Generic server error | Unhandled exceptions |
| 501 | Not Implemented | Server doesn't support request functionality | Unsupported HTTP method |
| 502 | Bad Gateway | Server as gateway received invalid response | Proxy errors |
| 503 | Service Unavailable | Server temporarily unavailable | Maintenance/overload |
| 504 | Gateway Timeout | Server as gateway timed out | Backend service timeout |
| 507 | Insufficient Storage | Server cannot store data needed to complete request | Disk full |
| 511 | Network Authentication Required | Client needs to authenticate for network access | Captive portals |

### Status Code Examples

#### Successful API Request Flow:
1. Client makes request
2. Server responds with `200 OK` and requested data

```
GET /api/users/123 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1...

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 218

{
  "id": 123,
  "name": "Jane Smith",
  "email": "jane@example.com"
}
```

#### Resource Creation Flow:
1. Client sends data to create resource
2. Server creates resource and responds with `201 Created`

```
POST /api/articles HTTP/1.1
Host: api.example.com
Content-Type: application/json
Content-Length: 156

{
  "title": "Understanding HTTP Status Codes",
  "content": "HTTP status codes are three-digit numbers..."
}

HTTP/1.1 201 Created
Location: /api/articles/456
Content-Type: application/json
Content-Length: 195

{
  "id": 456,
  "title": "Understanding HTTP Status Codes",
  "created": "2025-04-13T10:15:30Z"
}
```

#### Authentication Error Flow:
1. Client makes request without valid authentication
2. Server responds with `401 Unauthorized`

```
GET /api/admin/settings HTTP/1.1
Host: api.example.com

HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="api.example.com"
Content-Type: application/json
Content-Length: 83

{
  "error": "authentication_required",
  "message": "Please provide valid credentials"
}
```

#### Resource Not Found Flow:
1. Client requests non-existent resource
2. Server responds with `404 Not Found`

```
GET /api/products/999 HTTP/1.1
Host: api.example.com

HTTP/1.1 404 Not Found
Content-Type: application/json
Content-Length: 92

{
  "error": "resource_not_found",
  "message": "Product with ID 999 does not exist"
}
```

## Request and Response Structure

HTTP messages follow a standardized structure that enables communication between clients and servers.

### HTTP Request Structure

A complete HTTP request consists of:

1. **Start Line**: Method, URI, and HTTP version
2. **Headers**: Key-value pairs providing metadata
3. **Empty Line**: Indicates end of headers
4. **Body**: Optional data (for POST, PUT, PATCH)

#### Example HTTP Request:
```
POST /api/users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Length: 98
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: application/json

{
  "name": "John Smith",
  "email": "john@example.com",
  "role": "editor"
}
```

### HTTP Response Structure

A complete HTTP response consists of:

1. **Status Line**: HTTP version, status code, and reason phrase
2. **Headers**: Key-value pairs providing metadata
3. **Empty Line**: Indicates end of headers
4. **Body**: Optional data containing the response content

#### Example HTTP Response:
```
HTTP/1.1 201 Created
Date: Sun, 13 Apr 2025 14:28:53 GMT
Server: nginx/1.18.0
Content-Type: application/json
Content-Length: 157
Location: /api/users/45678
Set-Cookie: session=abc123; Path=/; HttpOnly; Secure
Cache-Control: no-cache

{
  "id": 45678,
  "name": "John Smith",
  "email": "john@example.com",
  "role": "editor",
  "created_at": "2025-04-13T14:28:53Z"
}
```

### Common Content Types

The `Content-Type` header specifies the format of the request or response body:

| Content Type | Description | Example Use Case |
|--------------|-------------|-----------------|
| `application/json` | JSON format | API data exchange |
| `application/xml` | XML format | Legacy system integration |
| `application/x-www-form-urlencoded` | Form data | Simple form submissions |
| `multipart/form-data` | Form data with files | File uploads |
| `text/html` | HTML document | Web pages |
| `text/plain` | Plain text | Simple text responses |
| `text/css` | CSS stylesheet | Web styling |
| `application/javascript` | JavaScript code | Web interactivity |
| `application/pdf` | PDF document | Document downloads |
| `image/jpeg`, `image/png` | Image formats | Image display/upload |

### Request Examples by Common Scenarios

#### JSON API Request:
```
POST /api/orders HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Length: 165

{
  "customer_id": 12345,
  "items": [
    {"product_id": 101, "quantity": 2},
    {"product_id": 204, "quantity": 1}
  ],
  "shipping_address": "123 Main St"
}
```

#### Form Submission:
```
POST /login HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 42

username=johnsmith&password=secret&remember=true
```

#### File Upload:
```
POST /upload HTTP/1.1
Host: example.com
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Length: 554

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="report.pdf"
Content-Type: application/pdf

(binary data)
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="description"

Monthly sales report
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

### Response Examples by Content Type

#### HTML Response:
```
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 217

<!DOCTYPE html>
<html>
<head>
  <title>Welcome</title>
</head>
<body>
  <h1>Welcome to Our Website</h1>
  <p>Thank you for visiting.</p>
</body>
</html>
```

#### JSON Response:
```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 234

{
  "users": [
    {"id": 101, "name": "Alice", "role": "admin"},
    {"id": 102, "name": "Bob", "role": "editor"},
    {"id": 103, "name": "Charlie", "role": "viewer"}
  ],
  "total": 3,
  "page": 1,
  "per_page": 10
}
```

#### File Download Response:
```
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="report.pdf"
Content-Length: 58329

(binary data)
```

#### Error Response:
```
HTTP/1.1 400 Bad Request
Content-Type: application/json
Content-Length: 160

{
  "error": "validation_error",
  "message": "The request was invalid",
  "details": [
    {"field": "email", "error": "must be a valid email address"}
  ]
}
```

## HTTP Authentication 

### Basic Authentication

The simplest authentication scheme, sending credentials in base64 encoding (not encrypted).

**How It Works:**
1. Server returns `401 Unauthorized` with `WWW-Authenticate: Basic realm="User Visible Realm"` header
2. Client sends credentials in `Authorization: Basic {credentials}` header
3. Credentials format: Base64 encoding of `username:password`

**Example Flow:**
```
GET /api/protected-resource HTTP/1.1
Host: api.example.com

HTTP/1.1 401 Unauthorized
WWW-Authenticate: Basic realm="API Access"
Content-Type: text/plain
Content-Length: 29

Authentication is required.

GET /api/protected-resource HTTP/1.1
Host: api.example.com
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 42

{"message": "Access to protected resource"}
```

**Security Considerations:**
- Not secure over HTTP (credentials sent as easily decodable base64)
- Should only be used with HTTPS
- No built-in mechanism for token expiration
- Often used for simple APIs, development environments, or intranet applications

### Digest Authentication

A more secure alternative to Basic Authentication that avoids sending passwords in clear text.

**How It Works:**
1. Server sends challenge with nonce value
2. Client computes MD5 hash of username, password, nonce, HTTP method, and requested URI
3. Client sends hash to server for verification

**Example Flow:**
```
GET /api/protected-resource HTTP/1.1
Host: api.example.com

HTTP/1.1 401 Unauthorized
WWW-Authenticate: Digest realm="API Access",
                  qop="auth",
                  nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093",
                  opaque="5ccc069c403ebaf9f0171e9517f40e41"

GET /api/protected-resource HTTP/1.1
Host: api.example.com
Authorization: Digest username="john",
               realm="API Access",
               nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093",
               uri="/api/protected-resource",
               qop=auth,
               nc=00000001,
               cnonce="0a4f113b",
               response="6629fae49393a05397450978507c4ef1",
               opaque="5ccc069c403ebaf9f0171e9517f40e41"
```

**Security Considerations:**
- More secure than Basic Authentication
- Still recommended to use with HTTPS
- More complex to implement
- Less commonly used in modern web applications

### Bearer Token Authentication

Used primarily for OAuth 2.0 and JWT implementations, involving tokens instead of credentials.

**How It Works:**
1. Client obtains token from authentication server
2. Client includes token in `Authorization: Bearer {token}` header
3. Server validates token and grants access

**Example Flow:**
```
POST /oauth/token HTTP/1.1
Host: auth.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=password&username=john&password=secret&client_id=client123

HTTP/1.1 200 OK
Content-Type: application/json

{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}

GET /api/protected-resource HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

HTTP/1.1 200 OK
Content-Type: application/json

{"message": "Access granted to protected resource"}
```

**Security Considerations:**
- Token-based (no password transmission after initial authentication)
- Supports expiration, scopes, and delegation
- Should be used with HTTPS
- Widely used in modern web APIs
- Self-contained JWTs can include user details and permissions

### API Keys

Simple authentication for public APIs, typically sent in query string, headers, or as part of request body.

**Example Usage:**
```
GET /api/weather?api_key=abc123def456 HTTP/1.1
Host: api.weatherservice.com

GET /api/stocks HTTP/1.1
Host: api.stockservice.com
X-API-Key: abc123def456
```

**Security Considerations:**
- Simple to implement and use
- Less secure than OAuth
- No standard format
- Best suited for public APIs with low security requirements
- Should be used with HTTPS

### OAuth 2.0

Authorization framework that enables third-party applications to obtain limited access to a user's account.

**Key Concepts:**
- **Resource Owner**: The user who owns the data
- **Client**: The application requesting access
- **Authorization Server**: Issues tokens
- **Resource Server**: Hosts protected resources
- **Access Token**: Credential used to access protected resources
- **Refresh Token**: Credential used to obtain new access tokens

**Common OAuth 2.0 Flows:**

1. **Authorization Code Flow**:
   - Most secure flow for server-side applications
   - Involves redirect to authorization server and back to client

2. **Implicit Flow**:
   - Simplified flow for browser-based applications
   - No authorization code, direct access token

3. **Client Credentials Flow**:
   - For machine-to-machine authentication
   - No user involvement

4. **Resource Owner Password Credentials Flow**:
   - Direct username/password exchange
   - Limited use cases where trusted first-party applications

**Example Authorization Code Flow:**
```
1. Authorization Request:
GET /oauth/authorize?
  client_id=client123&
  redirect_uri=https://app.example.com/callback&
  response_type=code&
  scope=read write&
  state=xyz123 HTTP/1.1
Host: auth.example.com

2. Authorization Response (redirected to client):
HTTP/1.1 302 Found
Location: https://app.example.com/callback?code=SplxlOBeZQQYbYS6WxSbIA&state=xyz123

3. Token Request:
POST /oauth/token HTTP/1.1
Host: auth.example.com
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {base64(client_id:client_secret)}

grant_type=authorization_code&
code=SplxlOBeZQQYbYS6WxSbIA&
redirect_uri=https://app.example.com/callback

4. Token Response:
HTTP/1.1 200 OK
Content-Type: application/json

{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "tGzv3JOkF0XG5Qx2TlKWIA",
  "scope": "read write"
}
```

**Security Considerations:**
- Industry standard for API authorization
- Supports various authentication flows for different use cases
- Complex to implement properly
- Requires careful security configuration
- Must be used with HTTPS

### JWT (JSON Web Tokens)

Compact, self-contained tokens for securely transmitting information between parties.

**Structure:**
- **Header**: Algorithm and token type
- **Payload**: Claims (e.g., user ID, permissions)
- **Signature**: Signed with a secret key

**Example JWT:**
```
// Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1680123456,
  "exp": 1680127056
}

// The encoded JWT
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTY4MDEyMzQ1NiwiZXhwIjoxNjgwMTI3MDU2fQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Security Considerations:**
- Self-contained (reduces database lookups)
- Can include expiration and permissions
- Must be validated on server side
- Should be short-lived
- Should be used with HTTPS
- Vulnerable if secret key is compromised

### Authentication Comparison

| Method | Complexity | Security | Use Cases | Token Storage |
|--------|------------|----------|-----------|--------------|
| Basic | Low | Low | Development, Internal APIs | N/A |
| Digest | Medium | Medium | Legacy Systems | N/A |
| API Keys | Low | Medium | Public APIs, Simple Services | Database |
| Bearer Tokens | Medium | High | Modern Web APIs | Database or JWT |
| OAuth 2.0 | High | High | Third-party Integration | Database |
| JWT | Medium | High | Stateless Authentication | Self-contained |

## Cookies and Sessions

Cookies are small pieces of data stored on the client, enabling stateful interactions in the stateless HTTP protocol.

### Cookie Basics

**How Cookies Work:**
1. Server sends `Set-Cookie` header in response
2. Browser stores cookie
3. Browser includes cookie in subsequent requests to the same domain via `Cookie` header

**Example Cookie Flow:**
```
HTTP/1.1 200 OK
Content-Type: text/html
Set-Cookie: user_id=abc123; Path=/; Expires=Wed, 13 Apr 2026 10:00:00 GMT; HttpOnly; Secure

GET /dashboard HTTP/1.1
Host: example.com
Cookie: user_id=abc123
```

### Cookie Attributes

| Attribute | Description | Example |
|-----------|-------------|---------|
| `Domain` | Specifies which domains can receive the cookie | `Domain=example.com` |
| `Path` | Limits cookie to specific paths | `Path=/store` |
| `Expires` | Sets expiration date | `Expires=Wed, 13 Apr 2026 10:00:00 GMT` |
| `Max-Age` | Sets lifetime in seconds | `Max-Age=3600` |
| `HttpOnly` | Prevents JavaScript access | `HttpOnly` |
| `Secure` | Restricts to HTTPS only | `Secure` |
| `SameSite` | Controls cross-site requests | `SameSite=Strict` |

### Cookie Types

#### Session Cookies
- No `Expires` or `Max-Age` attribute
- Deleted when browser is closed
- Used for temporary storage during user visit

#### Persistent Cookies
- Include `Expires` or `Max-Age` attribute
- Remain after browser closes
- Used for longer-term preferences, authentication

#### First-Party Cookies
- Set by the domain the user is visiting
- Used for core functionality

#### Third-Party Cookies
- Set by domains other than the one being visited
- Used for tracking, analytics, ads
- Increasingly restricted by browsers

### Session Management

HTTP sessions maintain state across multiple requests, typically implemented with cookies.

**Server-Side Sessions:**
1. Server creates session and generates session ID
2. Session ID sent to client via cookie
3. Client includes session ID in subsequent requests
4. Server retrieves session data from database/cache

**Example Session Flow:**
```
// User logs in
POST /login HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded

username=john&password=secret

// Server responds with session cookie
HTTP/1.1 302 Found
Location: /dashboard
Set-Cookie: SESSIONID=5fa8d2b9c4e3a1d7; Path=/; HttpOnly; Secure

// Subsequent request includes session cookie
GET /dashboard HTTP/1.1
Host: example.com
Cookie: SESSIONID=5fa8d2b9c4e3a1d7

// Server looks up session data and personalizes response
```

### JWT vs. Server Sessions

| Aspect | Cookie-Based Sessions | JWT Authentication |
|--------|----------------------|-------------------|
| Storage | Server database/cache | Client side |
| Scalability | Requires shared session store | Good for microservices |
| Security | Session ID is meaningless if intercepted | Contains encoded user data |
| Revocation | Easy (delete server-side session) | Challenging (requires blacklist) |
| Size | Small cookie with session ID | Larger token with encoded data |
| Performance | Database lookup required | No server lookup needed |

### Cookie Security Best Practices

1. **Use `HttpOnly` Flag**: Prevents JavaScript access, mitigating XSS attacks
2. **Use `Secure` Flag**: Restricts cookies to HTTPS connections
3. **Implement `SameSite` Attribute**: Controls when cookies are sent with cross-site requests
   - `Strict`: Only sent to the originating site
   - `Lax`: Sent during navigation to the origin site
   - `None`: Sent in all contexts (requires `Secure`)
4. **Set Appropriate Expiration**: Minimize persistence of sensitive cookies
5. **Use Path and Domain Restrictions**: Limit cookie scope to necessary areas
6. **Rotate Session IDs**: Generate new IDs after authentication or privilege changes
7. **Implement CSRF Protection**: Use anti-CSRF tokens for sensitive operations

## Caching Mechanisms

HTTP caching improves performance by storing and reusing previously fetched resources.

### Cache Types

#### Browser Cache
- Local cache in user's browser
- Controlled by HTTP headers
- Reduces network requests and improves load times

#### Proxy Cache
- Intermediate cache between client and server
- Serves multiple users
- Common in corporate networks and ISPs

#### CDN (Content Delivery Network)
- Distributed cache on edge servers
- Geographically positioned near users
- Optimizes delivery of static assets

### Cache Control Headers

#### `Cache-Control` Header
The primary mechanism for defining caching policies.

**Common Directives:**

| Directive | Description | Example |
|-----------|-------------|---------|
| `no-store` | Don't cache at all | `Cache-Control: no-store` |
| `no-cache` | Validate before using cache | `Cache-Control: no-cache` |
| `private` | Only browser can cache | `Cache-Control: private` |
| `public` | Any cache can store | `Cache-Control: public` |
| `max-age` | Maximum cache lifetime in seconds | `Cache-Control: max-age=3600` |
| `s-maxage` | Shared cache max age | `Cache-Control: s-maxage=86400` |
| `must-revalidate` | Check staleness before using | `Cache-Control: must-revalidate` |
| `stale-while-revalidate` | Use stale while fetching fresh | `Cache-Control: stale-while-revalidate=60` |

**Example Combinations:**
```
Cache-Control: private, max-age=3600
Cache-Control: public, max-age=86400, must-revalidate
Cache-Control: no-cache, no-store, must-revalidate
```

#### Legacy Cache Headers

**`Expires` Header**:
Sets a specific expiration date/time.
```
Expires: Wed, 13 Apr 2026 10:00:00 GMT
```

**`Pragma` Header**:
Older cache control mechanism.
```
Pragma: no-cache
```

### Conditional Requests

Allow clients to validate cached resources before downloading again.

#### `ETag` Header
Entity tag uniquely identifying a specific version of a resource.

**Example Flow:**
```
// Initial request
GET /api/products/123 HTTP/1.1
Host: api.example.com

// Response with ETag
HTTP/1.1 200 OK
Content-Type: application/json
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Cache-Control: max-age=3600

{"id": 123, "name": "Smartphone", "price": 599.99}

// Later request with validation
GET /api/products/123 HTTP/1.1
Host: api.example.com
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"

// Response if unchanged
HTTP/1.1 304 Not Modified
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Cache-Control: max-age=3600
```

#### `Last-Modified` Header
Indicates when the resource was last changed.

**Example Flow:**
```
// Initial request
GET /api/articles/456 HTTP/1.1
Host: api.example.com

// Response with Last-Modified
HTTP/1.1 200 OK
Content-Type: application/json
Last-Modified: Wed, 10 Apr 2025 15:00:00 GMT
Cache-Control: max-age=3600

{"id": 456, "title": "HTTP Caching", "content": "..."}

// Later request with validation
GET /api/articles/456 HTTP/1.1
Host: api.example.com
If-Modified-Since: Wed, 10 Apr 2025 15:00:00 GMT

// Response if unchanged
HTTP/1.1 304 Not Modified
Last-Modified: Wed, 10 Apr 2025 15:00:00 GMT
Cache-Control: max-age=3600
```

### Caching Strategies

#### Caching Static Assets
Resources that rarely change (images, CSS, JS files):
```
Cache-Control: public, max-age=31536000, immutable
```

#### Caching API Responses
Dynamic data with moderate update frequency:
```
Cache-Control: private, max-age=300
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
```

#### Non-Cacheable Content
Sensitive or constantly changing data:
```
Cache-Control: no-store
```

#### Mixed Caching Strategy
Different policies for different resources:
- HTML: `Cache-Control: no-cache`
- CSS/JS: `Cache-Control: public, max-age=31536000, immutable`
- API data: `Cache-Control: private, max-age=300, stale-while-revalidate=60`

### Cache Busting

Techniques to force clients to download new versions of cached resources:

1. **Versioned URLs**:
   - `styles.css` → `styles.v2.css` or `styles.css?v=2`
   - Forces new resource fetch when version changes

2. **Content-based Hashing**:
   - `main.js` → `main.8e4f3a.js`
   - Filename includes hash of content, changing only when content changes

3. **Purge/Invalidate Cache**:
   - CDN APIs to force cache removal
   - More complex but avoids URL changes

## Content Negotiation

Content negotiation allows clients and servers to agree on the most appropriate content format.

### Negotiation Methods

#### Server-Driven Negotiation
Client expresses preferences, server makes the final decision.

**Common Negotiable Aspects:**
- Media Type (format)
- Language
- Character encoding
- Compression

#### Agent-Driven Negotiation
Server provides options, client makes the final choice.

### Content Negotiation Headers

#### `Accept` Header
Specifies preferred media types.

**Format:**
- MIME types with optional quality values (`q`)
- Higher `q` value (0 to 1) indicates higher preference

**Examples:**
```
Accept: application/json
Accept: text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8
```

**Server Response:**
```
HTTP/1.1 200 OK
Content-Type: application/json
Vary: Accept

{"name": "Example", "type": "JSON response"}
```

#### `Accept-Language` Header
Specifies preferred languages.

**Examples:**
```
Accept-Language: en-US
Accept-Language: en-US,en;q=0.9,fr;q=0.8
```

**Server Response:**
```
HTTP/1.1 200 OK
Content-Language: en-US
Vary: Accept-Language

Content in American English
```

#### `Accept-Encoding` Header
Specifies supported compression algorithms.

**Examples:**
```
Accept-Encoding: gzip
Accept-Encoding: gzip, deflate, br
```

**Server Response:**
```
HTTP/1.1 200 OK
Content-Encoding: gzip
Vary: Accept-Encoding

(compressed content)
```

#### `Accept-Charset` Header
Specifies preferred character encodings.

**Examples:**
```
Accept-Charset: utf-8
Accept-Charset: utf-8, iso-8859-1;q=0.5
```

### The `Vary` Header

Indicates which request headers were used for content negotiation.

**Purpose:**
- Instructs caches to store different versions based on specified headers
- Prevents serving wrong cached content to different clients

**Examples:**
```
Vary: Accept
Vary: Accept-Language, Accept-Encoding
Vary: User-Agent
```

### Negotiation Examples

#### Format Negotiation:
```
// Client requesting JSON
GET /api/users/123 HTTP/1.1
Host: api.example.com
Accept: application/json

// Server responds with JSON
HTTP/1.1 200 OK
Content-Type: application/json
Vary: Accept

{"id": 123, "name": "John Smith"}

// Different client requesting XML
GET /api/users/123 HTTP/1.1
Host: api.example.com
Accept: application/xml

// Server responds with XML
HTTP/1.1 200 OK
Content-Type: application/xml
Vary: Accept

<user>
  <id>123</id>
  <name>John Smith</name>
</user>
```

#### Language Negotiation:
```
// Client requesting English
GET /about HTTP/1.1
Host: example.com
Accept-Language: en-US,en;q=0.9

// Server responds with English content
HTTP/1.1 200 OK
Content-Language: en
Vary: Accept-Language

Welcome to our website!

// Different client requesting French
GET /about HTTP/1.1
Host: example.com
Accept-Language: fr-FR,fr;q=0.9

// Server responds with French content
HTTP/1.1 200 OK
Content-Language: fr
Vary: Accept-Language

Bienvenue sur notre site web !
```

## Cross-Origin Resource Sharing (CORS)

CORS is a security feature that controls how web pages in one domain can request resources from another domain.

### Same-Origin Policy

The same-origin policy restricts how a document or script from one origin can interact with resources from another origin.

**Origins match when these components are identical:**
- Protocol (http vs. https)
- Domain (example.com)
- Port (80, 443, etc.)

**Examples:**
- `https://example.com` and `https://example.com/page2` → Same origin
- `https://example.com` and `http://example.com` → Different origin (protocol)
- `https://example.com` and `https://api.example.com` → Different origin (domain)
- `https://example.com` and `https://example.com:8080` → Different origin (port)

### CORS Headers

#### `Access-Control-Allow-Origin`
Specifies which origins can access the resource.

**Examples:**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Origin: https://trusted-site.com
```

#### `Access-Control-Allow-Methods`
Specifies allowed HTTP methods.

**Example:**
```
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

#### `Access-Control-Allow-Headers`
Specifies allowed request headers.

**Example:**
```
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
```

#### `Access-Control-Expose-Headers`
Specifies which response headers are accessible to JavaScript.

**Example:**
```
Access-Control-Expose-Headers: Content-Length, X-Request-ID
```

#### `Access-Control-Allow-Credentials`
Indicates whether request can include user credentials.

**Example:**
```
Access-Control-Allow-Credentials: true
```

#### `Access-Control-Max-Age`
Specifies how long preflight results can be cached.

**Example:**
```
Access-Control-Max-Age: 3600
```

### CORS Request Types

#### Simple Requests
Requests that don't trigger a preflight check:
- Methods: GET, HEAD, POST
- Headers: Only allowed simple headers
- Content-Type: Only application/x-www-form-urlencoded, multipart/form-data, or text/plain

**Example Flow:**
```
// Client request from https://app.com to https://api.example.com
GET /api/data HTTP/1.1
Host: api.example.com
Origin: https://app.com

// Server response
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://app.com
Content-Type: application/json

{"message": "CORS simple request successful"}
```

#### Preflighted Requests
Requests that first send an OPTIONS request to check permissions:
- Uses methods other than GET, HEAD, POST
- Sets custom headers
- Uses Content-Type other than allowed simple types

**Example Flow:**
```
// Preflight request
OPTIONS /api/users HTTP/1.1
Host: api.example.com
Origin: https://app.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Content-Type, Authorization

// Preflight response
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 3600

// Actual request (only sent if preflight succeeds)
PUT /api/users HTTP/1.1
Host: api.example.com
Origin: https://app.com
Content-Type: application/json
Authorization: Bearer token123

{"name": "Updated Name"}

// Actual response
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://app.com
Content-Type: application/json

{"id": 123, "name": "Updated Name"}
```

#### Requests with Credentials
Requests that include cookies, HTTP authentication, or client-side certificates.

**Example Flow:**
```
// Client request with credentials
GET /api/user-profile HTTP/1.1
Host: api.example.com
Origin: https://app.com
Cookie: session=abc123

// Server response allowing credentials
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://app.com
Access-Control-Allow-Credentials: true
Content-Type: application/json

{"id": 123, "name": "John Smith"}
```

### Common CORS Errors

#### "No 'Access-Control-Allow-Origin' header"
Most common CORS error, occurs when server doesn't include proper CORS headers.

**Error Message:**
```
Access to fetch at 'https://api.example.com/data' from origin 'https://app.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**Solution:**
Add appropriate CORS headers on server.

#### "Method not allowed by CORS"
Occurs when the HTTP method isn't included in `Access-Control-Allow-Methods`.

**Error Message:**
```
Access to fetch at 'https://api.example.com/data' from origin 'https://app.com' has been blocked by CORS policy: Method DELETE is not allowed by Access-Control-Allow-Methods.
```

**Solution:**
Update `Access-Control-Allow-Methods` header on server.

#### "Header not allowed by CORS"
Occurs when a request header isn't included in `Access-Control-Allow-Headers`.

**Error Message:**
```
Access to fetch at 'https://api.example.com/data' from origin 'https://app.com' has been blocked by CORS policy: Request header field x-custom-header is not allowed by Access-Control-Allow-Headers.
```

**Solution:**
Update `Access-Control-Allow-Headers` header on server.

## HTTP/2 and HTTP/3

HTTP has evolved to meet increasing demands for web performance.

### HTTP/1.1 Limitations

- **One request per connection**: Head-of-line blocking
- **Plain text headers**: Verbose and repetitive
- **Uncompressed headers**: Bandwidth inefficiency
- **Client-initiated requests only**: Server can't push resources

### HTTP/2 Features

Released in 2015, HTTP/2 addresses HTTP/1.1 limitations while maintaining compatibility.

#### Binary Protocol
- Binary instead of text
- More efficient parsing
- Less error-prone

#### Multiplexing
- Multiple requests/responses over single connection
- Eliminates head-of-line blocking
- Reduces latency

**Example Flow:**
With HTTP/1.1, resources must be requested sequentially or with multiple connections:
```
GET /index.html → wait → GET /style.css → wait → GET /script.js → wait → GET /image.jpg
```

With HTTP/2, all requests can be sent simultaneously over one connection:
```
GET /index.html
GET /style.css     } All sent concurrently 
GET /script.js     } over single connection
GET /image.jpg
```

#### Header Compression (HPACK)
- Compresses headers
- Tracks previously sent headers
- Reduces overhead dramatically

**Example:**
HTTP/1.1 headers (uncompressed):
```
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Host: example.com
Accept: text/html,application/xhtml+xml
Accept-Language: en-US,en;q=0.9
Accept-Encoding: gzip, deflate, br
```

HTTP/2 (with HPACK compression):
- First request: Sends full headers
- Subsequent requests: Sends only changes or references to the header table

#### Server Push
- Server can proactively send resources
- Reduces round trips
- Improves page load times

**Example Flow:**
```
Client: GET /index.html
Server: *Sends index.html*
        *Proactively pushes style.css and script.js*
        PUSH_PROMISE /style.css
        PUSH_PROMISE /script.js
        *Sends style.css*
        *Sends script.js*
```

#### Stream Prioritization
- Assigns priority to resources
- Optimizes delivery order
- Improves perceived performance

### HTTP/3 Features

Released in 2022, HTTP/3 further improves performance, especially on unreliable networks.

#### QUIC Transport Protocol
- Built on UDP instead of TCP
- Reduces connection establishment time
- Improved congestion control

**Key Advantage:**
TCP requires a full handshake before data transfer, while QUIC combines transport and encryption handshakes:
- TCP+TLS: 2-3 round trips before data flow
- QUIC: 1 round trip before data flow

#### Connection Migration
- Maintains connections across network changes
- Ideal for mobile devices switching networks
- Prevents connection drops

#### Independent Streams
- No head-of-line blocking at transport level
- Lost packets only affect their specific stream
- Better performance on lossy networks

#### Improved Security
- Encryption by default
- More secure handshake
- Protection against certain attacks

### Comparison

| Feature | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---------|----------|--------|--------|
| Protocol | Text | Binary | Binary |
| Transport | TCP | TCP | UDP (QUIC) |
| Connections | Multiple | Single | Single |
| Multiplexing | No | Yes | Yes |
| Header Compression | No | Yes (HPACK) | Yes (QPACK) |
| Server Push | No | Yes | Yes |
| Prioritization | Basic | Advanced | Advanced |
| Default Encryption | Optional | Optional (but common) | Required |
| Connection Migration | No | No | Yes |
| Initial Latency | High | Medium | Low |

## Tools for HTTP Debugging

Several tools can help understand, test, and debug HTTP communications.

 