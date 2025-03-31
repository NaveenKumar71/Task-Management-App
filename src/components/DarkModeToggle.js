import React from 'react';

function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button 
      onClick={() => setDarkMode(!darkMode)} 
      className="btn btn-secondary"
    >
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default DarkModeToggle;
