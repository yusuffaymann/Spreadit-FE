import styles from "./HiddenPost.module.css"

function HiddenPost () {

    return (
        <div className={styles.hidden} >
            <div className={styles.text} >
            Post hidden
            </div>
            <button type="button" className={styles.button}>
                Undo
            </button>
        </div>
    );

}

export default HiddenPost;