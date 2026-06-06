# google-sheet-integration.md

# Goal

Replace the Beeceptor integration with a Google Sheets integration.

All review responses should be stored automatically in a Google Sheet.

The website remains fully static and hosted on GitHub Pages.

Architecture:

Review Website
↓
Google Apps Script Web App
↓
Google Sheet

---

# Data To Store

Store one row per submission.

Columns:

Timestamp

Mission Rating

Highlights

Cooking Rating

Bhakri Review

Missed Things

User Agent

Page Version

---

# Google Sheet Structure

Create a Google Sheet named:

Saturday Mission Debrief Responses

Create the following header row:

| Timestamp | Mission Rating | Highlights | Cooking Rating | Bhakri Review | Missed Things | User Agent | Page Version |

Each form submission should append a new row.

---

# Google Apps Script Setup

Create a new Apps Script project.

Code should expose:

doPost(e)

Requirements:

1. Parse JSON body.

2. Extract:

* missionRating
* highlights
* cookingRating
* bhakriReview
* missedThings
* userAgent
* pageVersion

3. Open target Google Sheet.

4. Append a row.

5. Return success response.

Example response:

{
"success": true
}

---

# Example Stored Values

Timestamp:
2026-06-07T10:15:00Z

Mission Rating:
9

Highlights:
Making Lunch, Conversations, Eating

Cooking Rating:
8

Bhakri Review:
Surprisingly Good

Missed Things:
Coffee, Photos

User Agent:
Mozilla/5.0 ...

Page Version:
1.0

---

# Frontend Changes

Remove Beeceptor integration.

Replace endpoint with:

GOOGLE_APPS_SCRIPT_URL

Store as constant.

Example:

const API_URL = "https://script.google.com/macros/s/AKfycbyCW2oXrVdgckX3whOrjz1qPz5oEOZwoYWf9Z6t48win0OVtbv0xbvAUyrdRmQYhZcA/exec";

---

# Payload

On submission:

{
missionRating: missionRating,
highlights: selectedHighlights,
cookingRating: cookingRating,
bhakriReview: bhakriReview,
missedThings: missedThings,
userAgent: navigator.userAgent,
pageVersion: "1.0",
submittedAt: new Date().toISOString()
}

---

# Fetch Request

Use fetch().

Method:
POST

Headers:
Content-Type: application/json

Body:
JSON.stringify(payload)

---

# Error Handling

If request fails:

* Log error
* Continue showing mission report
* Never block the user

The review experience should complete successfully even if the API call fails.

---

# Success Handling

No visible success message required.

Submission should immediately continue to:

Analyzing report...

Reviewing cooking scores...

Evaluating bhakri quality...

Cross-checking random moments...

Investigating missing coffee...

Consulting experts...

(There are no experts.)

Generating final report...

---

# Compatibility

Must work from GitHub Pages.

Must work on mobile browsers.

No backend server required.

No third-party libraries required.
