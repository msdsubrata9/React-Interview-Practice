import React, { useState } from "react";
import Button from "./Button";

function TabList({ tabs, defaultSelection = 3 }) {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelection);
  function handleTabChange(index) {
    return () => {
      setSelectedIndex(index);
    };
  }
  const Component = tabs[selectedIndex].Component;

  return (
    <div role="tabList">
      <div>
        {tabs.map((tab, index) => (
          <Button
            onClick={handleTabChange(index)}
            label={tab.label}
            key={tab.id}
            role="tab"
            aria-selected={index === selectedIndex}
            data-selected={index === selectedIndex}
          />
        ))}
      </div>
      <div role="tabpanel">
        <Component />
      </div>
    </div>
  );
}

export default TabList;
