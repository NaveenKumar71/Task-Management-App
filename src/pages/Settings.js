import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

function Settings() {
  const { darkMode, setDarkMode } = useContext(TaskContext);

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="settings-section">
        <h2>Theme</h2>
        <div className="preference-item">
          <label>Dark Mode</label>
          <div className="toggle-switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              id="dark-mode-toggle"
            />
            <label htmlFor="dark-mode-toggle"></label>
          </div>
        </div>
      </div>
      <div className="settings-section">
        <h2>About</h2>
        <p>Task Management App v1.0.0</p>
        <p>A simple and efficient way to manage your daily tasks.</p>
      </div>
      <div className="settings-section">
        <h2>Contact</h2>
        <p>For support or feedback, please email: support@taskapp.com</p>
      </div>
    </div>
  );
}

export default Settings;