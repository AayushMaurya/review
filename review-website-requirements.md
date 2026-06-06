# Saturday Mission Debrief Website

## Objective

Create a fun, playful post-mission review website that acts as a sequel to the existing Saturday Planner website.

The tone should match the original website:

- Light-hearted
- Slightly dramatic
- Self-aware
- Mission / report themed
- Playful callbacks
- Mobile-first design

The website should feel like a mission debrief rather than a survey.

---

# Theme

Saturday Mission Debrief

The Saturday has already happened.

The purpose of the website is to collect feedback while keeping the experience entertaining.

---

# Opening Screen

Title:

Saturday Mission Debrief

Body:

Mission Accomplished.

The Saturday has officially concluded.

The planning department now requires
a short debrief report.

Don't worry.

This is definitely not a performance review.

Button:

Begin Debrief

---

# Question 1

Type: Slider

Question:

How would you rate the mission?

Scale:

1 → We survived.

10 → Worth repeating.

Store numeric value.

---

# Question 2

Type: Multi Select Cards

Question:

What were the highlights of the mission?

(Select all that apply)

Options:

🍳 Making Lunch

💬 Conversations

🍽️ Eating

😄 Random Moments

🏠 My House

✨ Something Else

Multiple selections allowed.

Store selected options as array.

---

# Question 3

Type: Slider

Question:

As an independent food critic,

how would you rate my cooking?

Scale:

1 → Kitchen Emergency

5 → Edible

10 → Open a Restaurant Immediately

Small note below slider:

This review may be used
for future bragging purposes.

Store numeric value.

---

# Question 4

Type: Single Select Cards

Question:

How successful was the Bhakri Mission?

Options:

🫓 Surprisingly Good

🫓 Better Than Expected

🫓 We Did Our Best

🫓 Let's Not Discuss It

Store selected option.

---

# Question 5

Type: Multi Select Cards

Question:

Looking back...

what did we miss?

(Select all that apply)

Options:

☕ Coffee

🍨 Dessert

🚶 A Walk

🎸 Music

📸 Photos

Nothing

Small note below options:

I know coffee is one.

You don't need to remind me.

Store selected options as array.

---

# Submission

After Question 5:

Show a submit button.

Text:

Generate Mission Report

---

# API Integration

When user submits:

POST

https://aayush10m.free.beeceptor.com/response

Content-Type:

application/json

Payload example:

{
  "missionRating": 9,
  "highlights": [
    "Making Lunch",
    "Conversations",
    "Eating"
  ],
  "cookingRating": 8,
  "bhakriReview": "Surprisingly Good",
  "missedThings": [
    "Coffee",
    "Photos"
  ],
  "submittedAt": "2026-06-06T12:34:56Z"
}

Requirements:

- Use fetch()
- Await response
- Handle errors gracefully
- If API fails, still allow user to continue
- Log error in console
- Never block report generation because of API failure

---

# Analysis Screen

After submit:

Display fake loading sequence.

Animate text changes every 1.5 seconds.

Messages:

Analyzing report...

Reviewing cooking scores...

Evaluating bhakri quality...

Cross-checking random moments...

Investigating missing coffee...

Consulting experts...

(There are no experts.)

Generating final report...

Duration:
~8–10 seconds total.

---

# Final Report Screen

Title:

MISSION REPORT

Content:

Status:
Successful

Lunch:
Completed

Bhakri:
Completed

Coffee:
Missing

Overall Verdict:
Would Recommend.

Add a fun visual mission badge.

Show mission-complete style animation.

Button:

View Internal Notes

---

# Secret Internal Notes Flow

Screen 1:

INTERNAL NOTES

---

Screen 1:

The missing coffee issue
remains unresolved.

Button:
Continue

---

Screen 2:

Let's have it next time then.

Button:
Continue

---

Screen 3:

I finished 1st season of The Office.

Button:
Continue

---

Final Screen

Case Closed.

For now.

Small text:

End of Report.

Button:

Close File

---

# Design Requirements

Use same visual language as original website.

Maintain:

- Soft shadows
- Rounded cards
- Smooth animations
- Mobile-first layout
- Friendly typography

Desktop:

Cards may appear in rows.

Mobile:

Cards stack naturally.

---

# Technical Requirements

Plain HTML/CSS/JavaScript.

No frameworks required.

No backend required.

All responses sent via fetch POST request.

Website should work when hosted on GitHub Pages.

Use local assets only.

No external runtime dependencies.
