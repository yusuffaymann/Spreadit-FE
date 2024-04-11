import { useState } from "react";
import styles from "./Poll.module.css"
import Button from "./Button";
import Image from "next/image";
import check from "../../assets/check.svg";


function Poll ({isOpen,options,onVote}) {

    const totalVotes = options.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.votes;
    }, 0);
    const [selectedChoice,setSelectedChoice] = useState(-1);
    const [hasVoted,setHasVoted] = useState(false);
    function handleVote () {
        onVote(options[selectedChoice]);
        setHasVoted(true);
    }

    return(
        <div className={styles.poll}>
            {totalVotes !== 0 && <div className={styles.header}>
                {isOpen && <div className={styles.open}>Open</div>}
                {!isOpen && <div className={styles.open}>Closed</div>}
                <div>•</div>
                <div className={styles.totalVotes}>{`${totalVotes} total votes`}</div>
            </div>}     
            {!hasVoted && <div className={styles.body}>
            {options.map((optionObject, index) => (
                    <div className={styles.radio} key={index}>
                        <input className={`${styles.radioButton} ${selectedChoice === index ? styles.selected : ""}`} onClick={() => {setSelectedChoice(index)}}
                            type="radio"
                            id={`option${index}`}
                            name="options"
                            value={optionObject.option}
                        />
                        <label htmlFor={`option${index}`}>{optionObject.option}</label>
                    </div>))}
            </div>}
            {hasVoted && <div className={styles.body}>
            {options.map((optionObject, index) => (
                    <div className={`${styles.results} ${index === selectedChoice ? styles.selected : ""}`} key={index}>
                        <div className={styles.votes}>{optionObject.votes}</div>
                        <div>{optionObject.option}</div>
                        {selectedChoice === index && 
                            <Image 
                            src={check}
                            width={16}
                            height={16} 
                            viewBox="0 0 20 20"
                            alt="selected choice" />                        
                        }
                    </div>))}
            </div>}
            {(isOpen && !hasVoted) && <div className={styles.footer}>
                {!isOpen && <div className={styles.closingIn}>Voting closed x days ago</div>}
                {isOpen && 
                <div className={styles.footerContent}>
                    <div className={styles.voteButton}>
                        {selectedChoice === -1 && <Button name={"Vote"} active={false} ></Button>}
                        {selectedChoice !== -1 && <Button name={"Vote"} active={true} onClick={() => handleVote()} ></Button>}
                    </div>
                    <div className={styles.closingIn}>Closes in x days</div>
                </div>
                }
            </div>}



        </div>
    );

}

export default Poll;