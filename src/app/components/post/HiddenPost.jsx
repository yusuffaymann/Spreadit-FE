import styles from "./HiddenPost.module.css"

function HiddenPost ({unHide}) {

    return (
        <div className={styles.hidden} onClick={(e) => {e.stopPropagation();}} >
            <div className={styles.text} >
            Post hidden
            </div>
            <button type="button" className={styles.button} onClick={() => unHide()}>
                Undo
            </button>
        </div>
    );

}

export default HiddenPost;