# API Specification & Integration Standards (API.md)

## Project: Citadel Productions & Attikus Ebenhack Portfolio
**Document Status:** Approved API Source of Truth  
**Author:** Senior Backend Architect & API Integration Engineer  
**Version:** 2.0 (React + GSAP Modernization)  
**Parent Documents:** [PRD.md](file:///d:/LAB-S/attikus-portfolio/PRD.md) | [ARCHITECTURE.md](file:///d:/LAB-S/attikus-portfolio/ARCHITECTURE.md) | [DATABASE.md](file:///d:/LAB-S/attikus-portfolio/DATABASE.md)  

---

## 1. Overview & Architectural Conventions

This document defines all internal serverless endpoints and external integration standards for the Citadel Productions portfolio.

### 1.1 Core Conventions
- **Transport:** HTTPS only.
- **Data Format:** JSON for all payloads (`application/json`).
- **Timestamp Standard:** ISO 8601 (`YYYY-MM-DDTHH:mm:ss.sssZ`).
- **HTTP Status Codes:**
  - `200 OK` / `201 Created` for successful responses.
  - `400 Bad Request` for schema validation failures.
  - `429 Too Many Requests` when rate limits are breached.
  - `500 Internal Server Error` for upstream provider dispatch failures.

---

## 2. Internal API Endpoints

### 2.1 Production Brief & Inquiry Submission

- **Endpoint:** `POST /api/inquire`
- **Purpose:** Receives client inquiries from the interactive Production Brief Estimator and dispatches notifications to Citadel Productions management.
- **Authentication:** Public with Honeypot verification & IP Rate Limiting.

#### Request Headers
```http
POST /api/inquire HTTP/1.1
Host: attikus-portfolio-ten.vercel.app
Content-Type: application/json
Accept: application/json
```

#### Request Body Schema (Zod Validation)
```json
{
  "clientName": "David Fincher",
  "clientEmail": "dfincher@anonymouscontent.com",
  "companyOrArtist": "Anonymous Content",
  "projectType": "commercial",
  "estimatedTimeline": "1-3_months",
  "budgetTier": "$50k-$100k",
  "deliverables": [
    "Broadcast 60s Master",
    "Digital 30s / 15s Cutdowns",
    "Color Grading & Finishing"
  ],
  "projectNotes": "Automotive nighttime narrative campaign in Nashville.",
  "websiteConfirmField": ""
}
```

*Note: `websiteConfirmField` is an invisible honeypot field. If non-empty, the request is immediately dropped with a silent `200 OK` to defeat spambots without signaling detection.*

#### Successful Response (`201 Created`)
```json
{
  "success": true,
  "message": "Production brief successfully dispatched to Citadel Productions.",
  "inquiryId": "inq_78f1a23e-b87c-47d3-9bc2-3c1e2d456789",
  "submittedAt": "2026-10-19T21:45:00.000Z"
}
```

#### Error Response: Validation Failure (`400 Bad Request`)
```json
{
  "success": false,
  "error": "ValidationFailed",
  "message": "Invalid client email address provided.",
  "details": [
    {
      "field": "clientEmail",
      "issue": "String does not match required email regex format."
    }
  ]
}
```

---

## 3. Rate Limiting & Abuse Prevention

To protect Citadel Productions' communication channels from spam and denial-of-service attempts:

| Protection Mechanism | Policy | Enforcement Action |
| :--- | :--- | :--- |
| **IP Sliding Window** | Maximum 5 brief submissions per IP per 10-minute window. | Returns `429 Too Many Requests` with `Retry-After: 600`. |
| **Payload Size Ceiling** | Maximum $15\text{KB}$ request body. | Immediate HTTP `413 Payload Too Large`. |
| **Honeypot Trap** | Form field `websiteConfirmField` hidden via CSS off-screen. | Bot submission silently acknowledged, discarded before email dispatch. |

---

## 4. External Services & Third-Party Integrations

### 4.1 Video Hosting & 4K Streaming (Vimeo Pro / YouTube)
- **Purpose:** Serve high-bitrate 4K showreels, teasers for *The Mutiny*, and commercial spots without hosting bandwidth saturation.
- **Pattern:** **Facade Embed Pattern**:
  - Initial state displays a lightweight, high-resolution WebP poster frame.
  - Iframe is only instantiated when the visitor clicks the play trigger.
  - Embed parameters enforce clean cinematic viewing: `controls=1&autoplay=1&dnt=1&color=e5a95d` (no related videos or advertising overlays).

### 4.2 Lead Dispatch Notification (Resend / Formspree)
- **Purpose:** Route verified client inquiries directly to Attikus Ebenhack's secure production inbox.
- **Security:** Dispatch API keys (`RESEND_API_KEY`) are strictly held in Vercel environment variables and never bundled client-side.

---

## 5. Required Environment Variables

All configuration is managed via Vercel Project Environment Variables:

```bash
# Serverless Email Dispatcher
RESEND_API_KEY=re_live_xxxxxxxxxxxxxxxxxxxxxxxx
NOTIFICATION_RECIPIENT_EMAIL=attikus@citadelproductions.co

# Security & CORS
NEXT_PUBLIC_SITE_URL=https://attikus-portfolio-ten.vercel.app
ALLOWED_ORIGIN=https://attikus-portfolio-ten.vercel.app

# Optional Phase 2 Database (Supabase)
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOi...
```

---

## 6. Fault Tolerance & Data Privacy

1. **Graceful Fallback:** If the upstream mail provider is temporarily degraded, the serverless endpoint logs the structured inquiry JSON to Vercel runtime logs so no prospective client lead is ever lost.
2. **Client-Side Notification:** If network connectivity fails, the frontend displays a direct backup mail link (`attikus@citadelproductions.co`) alongside the saved brief parameters.
