import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Send_Email.css";
import { FiSearch } from "react-icons/fi";
import { MdContentCopy, MdDashboard } from "react-icons/md";
import { FaPaste } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RiRefreshLine } from "react-icons/ri";

const FETCH_RECORDS_URL = "https://script.google.com/macros/s/AKfycbxPIOyZ7SAZ1LA5rPD0Gfn3PTvWLPWmz5XnmFgV53Ni44sHrar6VaaBTvsvMJZ3ua2o/exec";
const SEND_OFFERS_URL = "http://localhost:4000/send-offers";

const Email_Send = () => {
  const [records, setRecords] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pastedEmails, setPastedEmails] = useState("");
  const [sendingPasted, setSendingPasted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sentEmails, setSentEmails] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get(FETCH_RECORDS_URL);
        setRecords(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Error Fetching Records");
      }
    };

    fetchRecords();

    const saved = localStorage.getItem("sentEmails");
    if (saved) setSentEmails(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("sentEmails", JSON.stringify(sentEmails));
  }, [sentEmails]);

  const toggleSelection = (record) => {
    setSelected((prevSelected) => {
      const exists = prevSelected.some((s) => s.email === record.email);
      if (exists) {
        return prevSelected.filter((s) => s.email !== record.email);
      }
      return [...prevSelected, record];
    });
  };

  const sendOffers = async () => {
    if (selected.length === 0) {
      toast.warn("Select At Least One User.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(SEND_OFFERS_URL, { emails: selected });
      const { status, sent, message } = res.data;

      if (status === "success") {
        toast.success(`Sent ${sent} Offer Letters Successfully.`);
        setSentEmails((prev) => [...prev, ...selected.map((u) => u.email)]);
        setSelected([]);
      } else {
        throw new Error(message);
      }
    } catch (err) {
      console.error("Send error:", err);
      toast.error(`Failed To Send: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const sendPastedEmails = async () => {
    const emailList = pastedEmails
      .split(/[\n,; ]+/)
      .map((email) => email.trim())
      .filter(Boolean);

    if (emailList.length === 0) {
      toast.warn("Please Paste At Least One Email.");
      return;
    }

    const emailPayload = emailList.map((email) => {
      const match = records.find((r) => r.email === email);
      return {
        name: match?.name || "User",
        email,
      };
    });

    setSendingPasted(true);
    try {
      const res = await axios.post(SEND_OFFERS_URL, { emails: emailPayload });
      const { status, sent, message } = res.data;

      if (status === "success") {
        toast.success(`Sent ${sent} Offer Letters.`);
        setSentEmails((prev) => [...prev, ...emailList]);
        setPastedEmails("");
      } else {
        throw new Error(message);
      }
    } catch (err) {
      console.error("Pasted Email Error:", err);
      toast.error(`Failed To Send: ${err.message}`);
    } finally {
      setSendingPasted(false);
    }
  };

  const handleCopyEmails = () => {
    const emails = records.map((r) => r.email).join(", ");
    navigator.clipboard.writeText(emails);
    toast.info("Emails Copied To Clipboard.");
  };

  const filteredRecords = records.filter((r) => {
    const query = searchQuery.toLowerCase();
    const nameMatch = r.name.toLowerCase().includes(query);
    const status = sentEmails.includes(r.email) ? "sent" : "pending";
    const statusMatch = status.includes(query);
    return nameMatch || statusMatch;
  });

  return (
    <div className="container">

      <div className="upper">
        <h2 className="title"><MdDashboard /> Internship Dashboard</h2>
        <div className="filters">
          <div className="copy_btn">
            <button onClick={handleCopyEmails} className="copy-button">
              <MdContentCopy /> Copy
            </button>
          </div>
          <div className="serarch">
            <input
              className="search_input"
              type="text"
              placeholder="Search Records"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search users"
            />
            <div className="search_btn"><FiSearch size={25} /></div>
          </div>
        </div>
      </div>

      {records.length === 0 ? (
        <div className="loading">
          <div className="loading-heading">Loading records...</div>
        </div>
      ) : (
        <>
          <table className="records-table" aria-label="User records table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((r) => {
                const isSelected = selected.some((s) => s.email === r.email);
                const isSent = sentEmails.includes(r.email);
                const status = isSent
                  ? "Sent"
                  : isSelected
                    ? "Will be Sent"
                    : "Pending";

                return (
                  <tr
                    key={r.email}
                    className={isSelected ? "selected-row" : ""}
                    aria-selected={isSelected}
                  >
                    <td>{r.name}</td>
                    <td>{r.email}</td>
                    <td className={isSent ? "status-sent" : "status-pending"}>
                      {status}
                    </td>
                    <td>
                      <label className="name-label">
                        <input
                          className="custom-checkbox"
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelection(r)}
                          aria-checked={isSelected}
                        />
                      </label>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button
            onClick={sendOffers}
            disabled={loading}
            className="send-button"
            aria-busy={loading}
          >
            {loading ? <div className="refresh"><RiRefreshLine className="spinner" size={25}/>Sending</div> : (
              <div className="btn_name">
                <HiOutlineMail size={25} /> Send
              </div>
            )}
          </button>
        </>
      )}

      <h2 className="sub-title"><FaPaste /> Paste Emails </h2>
      <textarea
        className="email-textarea"
        placeholder="Paste multiple emails separated by comma, space, or new lines"
        value={pastedEmails}
        onChange={(e) => setPastedEmails(e.target.value)}
        aria-label="Paste emails here"
      />

      <button
        onClick={sendPastedEmails}
        disabled={sendingPasted}
        className="send-button"
        aria-busy={sendingPasted}
      >
        {sendingPasted ? <div className="refresh"><RiRefreshLine className="spinner" size={25}/> Sending</div> : (
          <div className="btn_name">
            <HiOutlineMail size={25} /> Send
          </div>
        )}
      </button>
    </div>
  );
};

export default Email_Send;
