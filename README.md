# 🧑‍🤝‍🧑 Real-Time Collaboration Whiteboard

A real-time whiteboard app built for remote teams that works smoothly across all devices and adapts to internet speeds. Draw together, see each other's locations, and collaborate without lag.

---

## 🚀 Features

- 🎨 **Real-time Drawing**: Draw with teammates using the HTML5 Canvas API.
- 🌐 **Network Adaptive Quality**: Drawing adjusts based on internet speed using the **Network Information API**.
- 📍 **Location Display**: Shows user location (with permission) via the **Geolocation API**.
- ⚡ **Fast Sync**: Smooth real-time collaboration using **Socket.IO**.
- 🧠 **Smart Canvas Loading** *(Coming Soon)*: Loads canvas sections dynamically using **Intersection Observer API**.
- ⏱️ **Background Task Handling** *(Coming Soon)*: Manages sync operations without UI lag using the **Background Tasks API**.

---

## 🧩 Tech Stack

- **Frontend**: React, Tailwind CSS, Canvas API
- **Backend**: Node.js, Express, Socket.IO
- **APIs Used**:
  - Canvas API
  - Network Information API
  - Geolocation API

---

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/realtime-whiteboard.git
   cd realtime-whiteboard


Install dependencies

cd client && npm install
cd ../server && npm install
Add environment variables
In /server/.env:

PORT=5000
Run the application

# In one terminal
cd server
npm start

# In another terminal
cd ../client
npm run dev
Visit: http://localhost:5173

🔐 Permissions Used
Geolocation: To display user locations on the session panel.

Network Info: To optimize drawing quality based on bandwidth.

💡 Future Enhancements
Canvas zoom and pan with smart section loading

Background sync jobs with Background Tasks API

User session saving and recovery

Authentication and user roles

