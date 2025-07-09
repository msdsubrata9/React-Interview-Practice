import React from "react";

function AccordionItem({ title, body, isOpen, setIsOpen }) {
  return (
    <div className="accordion">
      <div
        className="accordion_title"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <span>{title}</span>
        <span>{isOpen ? "⬆️" : "⬇️"}</span>
      </div>
      {isOpen && <div className="accordion_body">{body}</div>}
    </div>
  );
}

export default AccordionItem;
