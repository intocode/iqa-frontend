import React from 'react';

function ErrorIcon() {
  return (
    <div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00004C14.6667 4.31814 11.6819 1.33337 8 1.33337C4.3181 1.33337 1.33333 4.31814 1.33333 8.00004C1.33333 11.6819 4.3181 14.6667 8 14.6667Z"
          fill="#F56C6C"
        />
        <path
          d="M10.6667 5.33325L5.33333 10.6666"
          stroke="white"
          strokewidth="2"
          strokelinecap="round"
          strokelinejoin="round"
        />
        <path
          d="M5.33333 5.33325L10.6667 10.6666"
          stroke="white"
          strokewidth="2"
          strokelinecap="round"
          strokelinejoin="round"
        />
      </svg>
    </div>
  );
}

export default ErrorIcon;
