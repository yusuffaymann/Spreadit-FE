import Image from "next/image";
import React, {useState} from "react";
import RuleEntry from "./RuleEntry"
import "./Create.css";
import styles from "./CommunityRulesBox.module.css";


export default function CommunityRulesBox({
  community = "testCom",
  rules = [
    {
      title: "Rule Number 1",
      description: "Rule Number 1 Description",
      reportReason: "Shouldn't need this",
    },
    {
      title: "Rule Number 2",
      description: "Rule Number 2 Description",
      reportReason: "Shouldn't need this",
    },
    {
      title: "Rule Number 3",
      description: "Rule Number 3 Description",
      reportReason: "Shouldn't need this",
    },
    {
      title: "Rule Number 3",
      description: "Rule Number 3 Description",
      reportReason: "Shouldn't need this",
    },
    {
      title: "Rule Number 3",
      description: "Rule Number 3 Description",
      reportReason: "Shouldn't need this",
    },
    {
      title: "Rule Number 3",
      description: "Rule Number 3 Description",
      reportReason: "Shouldn't need this",
    },
    {
      title: "Rule Number 3",
      description: "Rule Number 3 Description",
      reportReason: "Shouldn't need this",
    },
    {
      title: "Rule Number 3",
      description: "Rule Number 3 Description",
      reportReason: "Shouldn't need this",
    },
    {
      title: "Rule Number 3",
      description: "Rule Number 3 Description",
      reportReason: "Shouldn't need this",
    },
  ],
}) {
  return (
    <div className={styles.boxSize}>
      <div className={styles.boxStyling}>
        <div className={styles.boxHeader}>
          <div className={styles.boxHeaderPadding}>{community} Rules</div>
        </div>
        <div className={styles.boxPadding} style={{ maxHeight: "none" }}>
          {/* Map over the rules array and render RuleEntry components */}
          {rules.map((rule, index) => (
            <RuleEntry
              key={index} // Provide a unique key for each RuleEntry
              title={rule.title}
              description={rule.description}
              iteration={index + 1} // Increment index by 1 to start from 1
              lastEntry={index === rules.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
