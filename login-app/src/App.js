import React, { useState } from "react";
import "./index.css";
const initialUsers = [
  { name: "Admin", account: "admin", password: "password" },
  { name: "User1", account: "user1", password: "123456" }
];

const Login = () => {
  const [users, setUsers] = useState(initialUsers);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [newAccount, setNewAccount] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.account === username && u.password === password
    );
    if (user) {
      setLoggedInUser(user);
      setNewName(user.name);
      setNewAccount(user.account);
      setNewPassword(user.password);
      setMessage(`登入成功！歡迎, ${user.name}`);
    } else {
      setMessage("帳號或密碼錯誤！");
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setMessage("已登出");
  };

  const handleDeleteUser = () => {
    setUsers(users.filter((u) => u.account !== loggedInUser.account));
    setLoggedInUser(null);
    setMessage("使用者已刪除");
  };

  const handleUpdateUser = () => {
    if (!newName.trim() || !newAccount.trim() || !newPassword.trim()) {
      setMessage("名稱、帳號和密碼不能為空");
      return;
    }
    const updatedUsers = users.map((u) =>
      u.account === loggedInUser.account
        ? { name: newName, account: newAccount, password: newPassword }
        : u
    );
    setUsers(updatedUsers);
    setLoggedInUser({ name: newName, account: newAccount, password: newPassword });
    setMessage("使用者資訊已更新");
  };

  return (
    <div className="login-container">
      {!loggedInUser ? (
        <>
          <h2 className="login-title">登入</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label>帳號</label>
              <input
                type="text"
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label>密碼</label>
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="button">登入</button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <h2 className="login-title">管理帳戶</h2>
          <div className="mb-4">
            <label>名稱</label>
            <input
              type="text"
              className="input-field"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>帳號</label>
            <input
              type="text"
              className="input-field"
              value={newAccount}
              onChange={(e) => setNewAccount(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>密碼</label>
            <input
              type="password"
              className="input-field"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button onClick={handleUpdateUser} className="button mb-4">更新使用者資訊</button>
          <button onClick={handleDeleteUser} className="button mb-4" style={{ background: '#dc2626' }}>刪除使用者</button>
          <button onClick={handleLogout} className="button" style={{ background: '#6b7280' }}>登出</button>
        </div>
      )}
      {message && <p className="error-message">{message}</p>}
      <div className="mt-6">
        <h3 className="login-title">目前所有使用者：</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index} className="text-gray-700">
              {user.name} ({user.account})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Login;