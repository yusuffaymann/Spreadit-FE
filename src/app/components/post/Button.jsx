import styles from "./Button.module.css"

function Button({ name, onClick, active }) {
    return (
      <div>
        <button type="button" onClick={onClick} className={`${styles.button} ${ active === false ? styles.inactive : ""}`} disabled = {active===false} >{name}</button>
      </div>
    );
  }
  
  export default Button;