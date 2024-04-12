import React, { useState } from "react";
import styles from "./EditCommunityModal.module.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

function EditCommunityModal(props) {
  const [nameErrors, setNameErrors] = useState("");
  const [descErrors, setDescErrors] = useState("");
  const [formData, setFormData] = useState({
    membersname: "",
    communitydesc: "",
  });

  function handleNameInputChange(event) {
    const { value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, membersname: value }));

    if (formData.membersname.length > 30) {
      setNameErrors("Name is too long.");
    } else {
      setNameErrors("");
    }
  }

  function handleDescInputChange(event) {
    const { value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, communitydesc: value }));

    if (formData.communitydesc.length > 500) {
      setDescErrors("Description is too long.");
    } else {
      setDescErrors("");
    }
  }

  console.log({ formData });

  const handleclose = () => {
    props.close();
  };

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modal}>
        <div className={styles.titlebox}>
          <h1 className={styles.title}>Edit community details widget</h1>
          <div className={styles.closebutton} onClick={handleclose}>
            <CloseOutlinedIcon />
          </div>
        </div>

        <p className={styles.titledesc}>
          Briefly describes your community and members. Always appears at the
          top of the sidebar.
        </p>
        <input
          className={styles.namebox}
          type="text"
          placeholder=" Members nickname"
          value={formData.membersname}
          onChange={handleNameInputChange}
        ></input>
        {nameErrors ? (
          <p className={styles.errorstext}>{nameErrors}</p>
        ) : (
          <p className={styles.nameboxdesc}>Give a nickname to your members.</p>
        )}

        <input
          className={styles.namebox}
          type="text"
          placeholder=" Community description"
          value={formData.communitydesc}
          onChange={handleDescInputChange}
        ></input>
        {descErrors ? (
          <p className={styles.errorstext}>{descErrors}</p>
        ) : (
          <p className={styles.nameboxdesc}>
            Describe your community to visitors.
          </p>
        )}

        <div className={styles.buttonsbox}>
          <button className={styles.buttons} onClick={handleclose}>
            Cancel
          </button>
          <button
            className={styles.buttons}
            onClick={handleclose}
            disabled={
              !(
                (formData.communitydesc || formData.membersname) &&
                !(descErrors || nameErrors)
              )
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCommunityModal;
