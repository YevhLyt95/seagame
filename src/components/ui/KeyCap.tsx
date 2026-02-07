import React from "react";

interface KeyCapProps {
    label: string;
    active: boolean;
}

const KeyCap: React.FC<KeyCapProps> = ({ label, active }) => {
  return (
    <div style={{
      width: '50px',
      height: '50px',
      border: `2px solid ${active ? '#f0a500' : '#ffffff55'}`,
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: active ? '#f0a500' : 'rgba(0,0,0,0.2)',
      color: active ? '#000' : '#fff',
      fontWeight: 'bold',
      transition: 'all 0.1s ease',
      boxShadow: active ? '0 0 15px #f0a500' : 'none',
      transform: active ? 'scale(0.95)' : 'scale(1)',
    }}>
      {label}
    </div>
  );
};

export default KeyCap;