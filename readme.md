# ⚙️ Event Management Server (Express + MongoDB)

This is the **backend** of the Event Management Web Application built with **Express.js**, **MongoDB** 
It handles event creation, validation, and data storage.  
Used alongside the React + Firebase **frontend** for a full-stack MERN solution.

---

## 🌐 Live API

🔗 **Base URL:** (https://future-box-server.vercel.app/)


---

## 🚀 Features

- RESTful API using **Express.js**
- MongoDB database
- Event model with validation
- Prevents adding past dates for events
- CORS enabled for frontend connection
- Organized folder structure for scalability
- Environment variables via `.env`

---

## 🧩 Event Model Structure

Each event document includes the following fields:

| Field | Type | Required | Description |
|--------|------|-----------|-------------|
| `title` | String | ✅ | Event title |
| `description` | String | ✅ | Event details |
| `eventType` | String | ✅ | Dropdown (Cleanup / Plantation / Donation / etc.) |
| `thumbnail` | String | ✅ | Event image URL |
| `location` | String | ✅ | Event venue |
| `date` | Date | ✅ | Must be a **future date** |
| `creatorEmail` | String | ✅ | Email of user who created event |

---

