import React, { useState, useEffect } from "react";
import "./PaymentsApp.css";

import {
  CreditCard,
  Send,
  History,
  User,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

export default function PaymentsApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [balance, setBalance] = useState(5420.5);
  const [transactions, setTransactions] = useState([]);
  const [data, setData] = useState(null);

  // Card states
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Backend fetch
  const fetchBackend = async () => {
    try {
      const res = await fetch("http://localhost:3000/data");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchBackend();
  }, []);

  //  Handle Card Payment
  const handleCardPayment = () => {
    if (!cardNumber || !expiry || !cvv) {
      alert("Please fill all card details");
      return;
    }

    const newTransaction = {
      id: transactions.length + 1,
      type: "sent",
      name: "Card Payment",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setTransactions([newTransaction, ...transactions]);
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setActiveTab("home");
  };

  //  Home Screen
  const renderHome = () => (
    <div className="homeScreen">
      <div className="balanceCard">
        <p className="balanceLabel">Total Balance</p>
        <h1 className="balanceAmount">${balance.toFixed(2)}</h1>
      </div>
    </div>
  );

  //  Send Screen (Card UI)
  const renderSend = () => (
    <div className="sendScreen">
      <h1 className="sendTitle">Card Payment</h1>

      <div className="sendForm">
        <div className="inputGroup">
          <label className="inputLabel">Card Number</label>
          <input
            className="textInput"
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div className="inputGroup">
          <label className="inputLabel">Expiry</label>
          <input
            className="textInput"
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
          />
        </div>

        <div className="inputGroup">
          <label className="inputLabel">CVV</label>
          <input
            className="textInput"
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="***"
          />
        </div>

        <button className="sendPaymentBtn" onClick={handleCardPayment}>
          Send
        </button>
      </div>
    </div>
  );

  //  History Screen
  const renderHistory = () => (
    <div className="historyScreen">
      <h1 className="historyTitle">Transaction History</h1>

      <div className="historyList">
        {transactions.map((tx) => (
          <div key={tx.id} className="historyItem">
            <div className="historyTop">
              <div className="historyLeft">
                <div className="historyIcon">
                  {tx.type === "received" ? (
                    <ArrowDownLeft />
                  ) : (
                    <ArrowUpRight />
                  )}
                </div>

                <div className="historyInfo">
                  <p className="historyName">{tx.name}</p>
                  <p className="historyType">{tx.type}</p>
                </div>
              </div>

              <p className="historyAmount">
                {tx.type === "received" ? "+" : "-"}$
                {tx.amount.toFixed(2)}
              </p>
            </div>

            <p className="historyDate">
              {tx.date} • {tx.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  // Profile Screen   
  const renderProfile = () => (
    <div className="profileScreen">
      <div className="profileHeader">
        <div className="profileAvatar">
          <User />
        </div>

        <h1 className="profileName">John Doe</h1>
        <p className="profileEmail">john.doe@email.com</p>
      </div>
    </div>
  );

  return (
    <div className="appWrapper">
      <div className="appContainer">
        <div className="contentArea">
          {activeTab === "home" && renderHome()}
          {activeTab === "send" && renderSend()}
          {activeTab === "history" && renderHistory()}
          {activeTab === "profile" && renderProfile()}
        </div>

        <nav className="bottomNav">
          <div className="navButtons">
            <button onClick={() => setActiveTab("home")}>
              <CreditCard />
              <span>Home</span>
            </button>

            <button onClick={() => setActiveTab("send")}>
              <Send />
              <span>Send</span>
            </button>

            <button onClick={() => setActiveTab("history")}>
              <History />
              <span>History</span>
            </button>

            <button onClick={() => setActiveTab("profile")}>
              <User />
              <span>Profile</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

