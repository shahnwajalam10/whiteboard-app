# 🧑‍🤝‍🧑 Real-Time Collaboration Whiteboard

A powerful, real-time whiteboard application designed for seamless collaboration among remote teams. Draw together, track team locations, and enjoy a lag-free experience optimized for all devices and network conditions.

---

## ✨ Key Features

- **🎨 Real-Time Drawing**: Collaborate instantly with teammates using the HTML5 Canvas API for smooth, responsive drawing.
- **🌐 Adaptive Quality**: Automatically adjusts drawing quality based on internet speed with the Network Information API.
- **📍 User Location Display**: View team members' locations (with permission) using the Geolocation API.
- **⚡ Instant Sync**: Achieve seamless real-time collaboration powered by Socket.IO.
- **🧠 Smart Canvas Loading** *(Planned)*: Dynamically load canvas sections for better performance using the Intersection Observer API.
- **⏱️ Background Sync** *(Planned)*: Handle synchronization tasks efficiently without UI lag using the Background Tasks API.

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, HTML5 Canvas API
- **Backend**: Node.js, Express, Socket.IO
- **APIs**:
  - HTML5 Canvas API for drawing
  - Network Information API for adaptive quality
  - Geolocation API for location sharing

---

## 📦 Setup & Installation

Follow these steps to get the whiteboard up and running locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/realtime-whiteboard.git
   cd realtime-whiteboard

2. **Install Dependencies**
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../backend
npm install


3. **Set Environment Variables**
   Create a .env file in the /server directory with the following:
   PORT=5000

4. **Run the Application**
   # Start the server
   cd backend
   node server.js
   
  # Start the client (in a new terminal)
  cd ../frontend
  npm run dev

5. **Access the App**
    Open your browser and navigate to:
   🌐 http://localhost:5173

🔐 Permissions
Geolocation: Used to display team members' locations in the session panel (requires user consent).
Network Information: Optimizes drawing quality based on available bandwidth.

🚀 Future Enhancements
Enhanced Canvas Controls: Add zoom and pan functionality with smart section loading.
Background Sync Jobs: Implement efficient synchronization using the Background Tasks API.
Session Persistence: Save and recover user sessions for seamless rejoining.
Authentication & Roles: Introduce user authentication and role-based access for enhanced collaboration.

📬 Contact
For questions or feedback, reach out via GitHub Issues or connect with us on Linkdin.

Happy collaborating! 🎉
     







