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

\\\
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/
│   ├── routes/
│   │   ├── ai.js (AI advice logic)
│   │   ├── auth.js (Authentication)
│   │   └── history.js (History management)
│   ├── models/
│   │   ├── User.js
│   │   └── History.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   └── package.json
└── README.md
\\\

## Installation

1. **Clone the repository**
   \\\ash
   git clone https://github.com/vkumar2708/Demo.git
   cd Demo
   \\\

2. **Backend Setup**
   \\\ash
   cd backend
   npm install
   node server.js
   \\\
   Server runs on \http://localhost:5000\

3. **Frontend Setup**
   \\\ash
   cd frontend
   npm install
   npm start
   \\\
   App runs on \http://localhost:3000\

## Usage

1. Create an account or login
2. Enter your income and expenses
3. Get AI-powered financial advice
4. Use calculators for EMI and SIP planning
5. View your calculation history

## API Endpoints

- \POST /api/ai\ - Get financial advice based on income and expenses
- \POST /api/auth/login\ - User login
- \POST /api/auth/register\ - User registration
- \GET /api/history\ - Get user calculation history

## AI Advisor Logic

- **If Expense Ratio < 75%**: "Great! Your expenses are only XX.XX% of your income. You can invest ₹YYYY.YY (10% of your monthly income) in SIP for long-term wealth creation."
- **If Expense Ratio 75-100%**: "Your expenses are XX.XX% of your income, which is a bit more. Cut down expenses on unnecessary things. If you have any debts, clear them first. After that, you can start investing ₹YYYY.YY (5% of your income)."
- **Otherwise**: Build emergency fund or balance EMI and SIP investments.

## Future Enhancements

- Mobile app support
- Real-time stock data integration
- Advanced portfolio analysis
- Investment recommendations based on risk profile
- Multi-language support

## License

MIT

## Author

vkumar2708

## Contact

Email: 1mv23is118@sirmvit.edu
