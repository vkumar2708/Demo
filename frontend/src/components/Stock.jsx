import { useState } from "react";
import axios from "axios";

export default function Stock() {
  const [symbol, setSymbol] = useState("AAPL");
  const [price, setPrice] = useState("");

  const fetchStock = async () => {
    const res = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=YOUR_API_KEY`
    );
    setPrice(res.data.c);
  };

  return (
    <div className="glass">
      <h2>Stock Price</h2>
      <input value={symbol} onChange={e => setSymbol(e.target.value)} />
      <button onClick={fetchStock}>Get Price</button>
      <h3>{price}</h3>
    </div>
  );
}