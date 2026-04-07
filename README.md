# full_stack
# Financial Advisory Platform

A full-stack web application that provides AI-powered financial advice, EMI calculations, and SIP investment recommendations.

## Features

- **AI Advisor**: Get personalized financial advice based on your income and expenses
  - If expenses < 75%: Recommends 10% SIP investment
  - If expenses 75-100%: Suggests debt clearing and 5% SIP investment
  
- **EMI Calculator**: Calculate monthly EMI for loans
- **SIP Calculator**: Plan your systematic investment plan
- **EMI vs SIP Comparison**: Compare different investment strategies
- **Stock Analysis**: Track and analyze stock performance
- **User Authentication**: Secure login system
- **History Tracking**: View your calculation history

## Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios (for API calls)

**Backend:**
- Node.js
- Express.js
- MongoDB (for user data and history)

## Project Structure
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
├── backend/
│ ├── routes/
│ │ ├── ai.js (AI advice logic)
│ │ ├── auth.js (Authentication)
│ │ └── history.js (History management)
│ ├── models/
│ │ ├── User.js
│ │ └── History.js
│ ├── middleware/
│ │ └── authMiddleware.js
│ ├── server.js
│ └── package.json
└── README.md

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vkumar2708/Demo.git
   cd Demo

Backend Setup
cd backend
npm install
node server.js

Server runs on http://localhost:5000

Frontend Setup
cd frontend
npm install
npm start

App runs on http://localhost:3000

Usage
Create an account or login
Enter your income and expenses
Get AI-powered financial advice
Use calculators for EMI and SIP planning
View your calculation history
API Endpoints
POST /api/ai - Get financial advice
POST /api/auth/login - User login
POST /api/auth/register - User registration
GET /api/history - Get user history
Future Enhancements
Mobile app support
Real-time stock data integration
Advanced portfolio analysis
Investment recommendations based on risk profile
License
MIT
