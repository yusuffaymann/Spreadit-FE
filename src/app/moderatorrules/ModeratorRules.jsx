import React, { useState } from "react";
import "./ModeratorRules.css";

function ModeratorRules() {
  const [rules, setRules] = useState([
    "Be respectful to other users.",
    "No spamming or self-promotion.",
    "Stay on topic.",
  ]);
  const [newRule, setNewRule] = useState("");

  const handleAddRule = () => {
    if (newRule.trim() !== "") {
      setRules([...rules, newRule]);
      setNewRule("");
    }
  };

  const handleRemoveRule = (index) => {
    const updatedRules = [...rules];
    updatedRules.splice(index, 1);
    setRules(updatedRules);
  };

  return (
    <div className="moderator-rules-container">
      <h2>Moderator Rules</h2>
      <div className="rules-list">
        <ul>
          {rules.map((rule, index) => (
            <li key={index}>
              {rule}
              <button onClick={() => handleRemoveRule(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="add-rule">
        <input
          type="text"
          value={newRule}
          onChange={(e) => setNewRule(e.target.value)}
          placeholder="Add new rule"
        />
        <button onClick={handleAddRule}>Add Rule</button>
      </div>
    </div>
  );
}

export default ModeratorRules;
