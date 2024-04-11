import close from "../../assets/close.svg";
import Button from "./Button";
import styles from "./DeletePostModal.module.css";
import Image from 'next/image';


function DeletePost({closeModal, onDelete}) {

    function handleDelete () {
        closeModal();
        onDelete();

    }

return (
    <div className={styles.modelOverlay} onClick={(e) => {e.stopPropagation();}}>
        <div className={styles.modal}>
            <div className={styles.header}>
                <div className={styles.title}>Delete post?</div>
                <button type="button" className={styles.close} style={{marginLeft: "auto"}} onClick={() => closeModal()}>
                    <Image 
                    src={close}
                    width={16}
                    height={16} 
                    viewBox="0 0 20 20"
                    alt="close" />
                </button>    
            </div>
            <div className={styles.description}>Once you delete this post, it can't be restored</div>
            <div className={styles.buttons}>
                <div className={styles.back}>
                    <Button name={"Go Back"} active={true} onClick={() => closeModal()} />
                </div>
                <div className={styles.delete}>
                    <Button name={"Yes, Delete"} active={true} onClick={() => handleDelete()} />
                </div>
            </div>
        </div>
    </div>
    );

}

export default DeletePost;