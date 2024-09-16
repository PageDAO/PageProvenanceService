import React, { useRef, useEffect } from 'react';

function ExpandableTextArea({ value, onChange, ...props }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  const handleChange = (event) => {
    onChange(event);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      style={{ overflow: 'hidden' }}
      {...props}
    />
  );
}

export default ExpandableTextArea;
