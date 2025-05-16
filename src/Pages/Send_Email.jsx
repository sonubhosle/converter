import React, { useEffect, useState } from 'react';

const APPS_SCRIPT_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzLRw0QCamzLq4u-To5JwR4rJT1YLHwQJcaOWJER8NlvqgfCvVw4LqwgswlLYSy3zR_/exec';

const Send_Email = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [textareaEmails, setTextareaEmails] = useState('');
  const [status, setStatus] = useState('');

  // Fetch user data from Google Sheets via Apps Script
  useEffect(() => {
    fetch(APPS_SCRIPT_WEBAPP_URL)
      .then(res => res.json())
      .then(data => {
        // Normalize keys to lowercase to avoid confusion
        const normalizedUsers = data.map(user => {
          const normalizedUser = {};
          Object.keys(user).forEach(k => {
            normalizedUser[k.toLowerCase()] = user[k];
          });
          return normalizedUser;
        });
        setUsers(normalizedUsers);
      })
      .catch(() => setStatus('❌ Failed to load user data from Google Sheet.'));
  }, []);

  // Toggle user checkbox by email (all lowercase for consistency)
  const toggleUser = (email) => {
    const updatedSet = new Set(selectedUsers);
    if (updatedSet.has(email)) updatedSet.delete(email);
    else updatedSet.add(email);
    setSelectedUsers(updatedSet);
  };

  // Send offer letters to selected users
  const sendSelectedUsers = async () => {
    if (selectedUsers.size === 0) {
      setStatus('⚠️ No users selected.');
      return;
    }
    const emailsToSend = users
      .filter(u => selectedUsers.has(u.email.toLowerCase()))
      .map(u => ({ email: u.email, name: u.name }));

    await sendEmails(emailsToSend);
  };

  // Send offer letters to emails pasted into textarea
  const sendTextareaEmails = async () => {
    const raw = textareaEmails.trim();
    if (!raw) {
      setStatus('⚠️ Please enter some emails.');
      return;
    }

    const inputEmails = raw
      .split(/[\s,;]+/)
      .map(e => e.trim().toLowerCase())
      .filter(e => e);

    const matchedUsers = users.filter(
      u => inputEmails.includes(u.email.toLowerCase())
    );

    if (matchedUsers.length === 0) {
      setStatus('❌ No matching emails found in the sheet.');
      return;
    }

    const emailsToSend = matchedUsers.map(u => ({
      email: u.email,
      name: u.name
    }));

    await sendEmails(emailsToSend);
  };

  // Common email sending handler
  const sendEmails = async (emails) => {
    setStatus('📤 Sending emails...');
    try {
      const res = await fetch(APPS_SCRIPT_WEBAPP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails }),
      });

      const result = await res.json();
      if (result.status === 'success') {
        setStatus(`✅ Emails sent to ${result.sent} user(s).`);
        setSelectedUsers(new Set());
        setTextareaEmails('');
      } else {
        setStatus('❌ Failed to send: ' + result.message);
      }
    } catch (err) {
      setStatus('❌ Error: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>📧 Internship Offer Letter Sender</h2>

      <h4>✔️ Select from Table</h4>
      <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ background: '#f0f0f0' }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="3">Loading data...</td></tr>
          ) : (
            users.map(user => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.has(user.email.toLowerCase())}
                    onChange={() => toggleUser(user.email.toLowerCase())}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button onClick={sendSelectedUsers} style={{ marginTop: '10px' }}>
        Send Offer Letters to Selected ({selectedUsers.size})
      </button>

      <hr />

      <h4>📥 Paste Emails (From Google Sheet)</h4>
      <textarea
        rows="4"
        cols="60"
        placeholder="Paste emails separated by space, comma or newline"
        value={textareaEmails}
        onChange={(e) => setTextareaEmails(e.target.value)}
      />
      <br />
      <button onClick={sendTextareaEmails} style={{ marginTop: '10px' }}>
        Send Offer Letters to Entered Emails
      </button>

      <p style={{ marginTop: '20px', color: 'blue' }}>{status}</p>
    </div>
  );
};

export default Send_Email;
