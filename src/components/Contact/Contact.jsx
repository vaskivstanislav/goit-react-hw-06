import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
import s from "./Contact.module.css";

const Contact = ({ user }) => {
  const dispatch = useDispatch();

  const handleDeleteContactUser = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete contact ${user.name}?`
    );
    if (confirmDelete) {
      dispatch(deleteContact(user.id));
    }
  };

  return (
    <div className={s.contactCard}>
      <div className={s.contactInfo}>
        <p className={s.contactText}>
          <strong>Name:</strong> {user.name}
        </p>
        <p className={s.contactText}>
          <strong>Phone:</strong> {user.number}
        </p>
      </div>
      <button
        className={s.contactBtn}
        type="button"
        onClick={handleDeleteContactUser}
      >
        Delete
      </button>
    </div>
  );
};

export default memo(Contact);