import React, { useRef, useEffect } from 'react';

function ExpandableInput({ value, onChange, ...props }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = 'auto';
      inputRef.current.style.width = inputRef.current.scrollWidth + 'px';
    }
  }, [value]);

  const handleChange = (event) => {
    onChange(event);
    if (inputRef.current) {
      inputRef.current.style.width = 'auto';
      inputRef.current.style.width = inputRef.current.scrollWidth + 'px';
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={handleChange}
      style={{ minWidth: '100px' }}
      {...props}
    />
  );
}

export default ExpandableInput;
