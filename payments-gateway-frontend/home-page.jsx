import React, { useState, useEffect } from "react";
import "./PaymentsApp.css";

import {
  CreditCard,
  Send,
  History,
  User,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
} from "lucide-react";

export default function PaymentsApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [balance, setBalance] = useState(5420.5);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [data, setData] = useState(null);

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

  const handleSendMoney = () => {
    if (recipient && amount && parseFloat(amount) > 0) {
      const newTransaction = {
        id: transactions.length + 1,
        type: "sent",
        name: recipient,
        amount: parseFloat(amount),
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      };

      setTransactions([newTransaction, ...transactions]);
      setBalance(balance - parseFloat(amount));
      setRecipient("");
      setAmount("");
      setActiveTab("home");
    }
  };

  const renderHome = () => (
    <div className="homeScreen">
      <div className="balanceCard">
        <p className="balanceLabel">Total Balance</p>
        <h1 className="balanceAmount">${balance.toFixed(2)}</h1>

        <div className="actionButtons">
          <button
            className="sendBtn"
            onClick={() => setActiveTab("send")}
          >
            Send Money
          </button>

          <button className="requestBtn">Request</button>
        </div>
      </div>

      <div className="activitySection">
        <div className="activityHeader">
          <h2 className="activityTitle">Recent Activity</h2>
          <button
            className="viewAllBtn"
            onClick={() => setActiveTab("history")}
          >
            View All
          </button>
        </div>

        <div className="transactionList">
          {transactions.slice(0, 4).map((tx) => (
            <div key={tx.id} className="transactionItem">
              <div className="transactionLeft">
                <div className="transactionIcon">
                  {tx.type === "received" ? (
                    <ArrowDownLeft />
                  ) : (
                    <ArrowUpRight />
                  )}
                </div>

                <div className="transactionInfo">
                  <p className="transactionName">{tx.name}</p>
                  <p className="transactionDate">
                    {tx.date} • {tx.time}
                  </p>
                </div>
              </div>

              <p className="transactionAmount">
                {tx.type === "received" ? "+" : "-"}$
                {tx.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSend = () => (
    <div className="sendScreen">
      <h1 className="sendTitle">Send Money</h1>

      <div className="sendForm">
        <div className="inputGroup">
          <label className="inputLabel">Recipient</label>
          <input
            className="textInput"
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Name or email"
          />
        </div>

        <div className="inputGroup">
          <label className="inputLabel">Amount</label>

          <div className="amountInputWrapper">
            <DollarSign className="dollarIcon" />
            <input
              className="amountInput"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>
        </div>

        <button className="sendPaymentBtn" onClick={handleSendMoney}>
          Send Payment
        </button>
      </div>
    </div>
  );

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

  const renderProfile = () => (
    <div className="profileScreen">
      <div className="profileHeader">
        <div className="profileAvatar">
          <User />
        </div>

        <h1 className="profileName">John Doe</h1>
        <p className="profileEmail">john.doe@email.com</p>
      </div>

      <div className="profileDetails">
        <div className="profileRow">
          <span className="profileLabel">Account Number</span>
          <span className="profileValue">****1234</span>
        </div>

        <div className="profileRow">
          <span className="profileLabel">Member Since</span>
          <span className="profileValue">Jan 2024</span>
        </div>

        <div className="profileRow">
          <span className="profileLabel">Verified</span>
          <span className="profileValue">✓ Yes</span>
        </div>
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
            <button
              className="navButton"
              onClick={() => setActiveTab("home")}
            >
              <CreditCard />
              <span className="navText">Home</span>
            </button>

            <button
              className="navButton"
              onClick={() => setActiveTab("send")}
            >
              <Send />
              <span className="navText">Send</span>
            </button>

            <button
              className="navButton"
              onClick={() => setActiveTab("history")}
            >
              <History />
              <span className="navText">History</span>
            </button>

            <button
              className="navButton"
              onClick={() => setActiveTab("profile")}
            >
              <User />
              <span className="navText">Profile</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
