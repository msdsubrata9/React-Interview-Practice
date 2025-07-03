import { useState } from "react";

function Accordion({ heading, children }) {
  const [expanded, setExpanded] = useState(false);

  function handleExpandCollapse() {
    const newValue = !expanded;
    setExpanded(newValue);
    if (newValue) {
      const elem = document.getElementById("content-1");
      elem.focus({ preventScroll: true });
    }
  }

  return (
    <div data-expanded={expanded} className="accordion">
      <button
        aria-expanded={expanded}
        className="heading"
        onClick={handleExpandCollapse}
        aria-controls="content-1"
        id="heading-1"
      >
        {heading}
        <span data-expanded={expanded} aria-hidden="true">
          &gt;
        </span>
      </button>
      <div
        id="content-1"
        tabIndex={0}
        role="region"
        aria-labelledby="heading-1"
        aria-hidden={!expanded}
        className="content"
      >
        {children}
      </div>
    </div>
  );
}
export default Accordion;
