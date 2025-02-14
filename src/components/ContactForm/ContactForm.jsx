import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { addContact } from "../../redux/contactsSlice";
import s from "./ContactForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Name is required"),
  number: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .required("Phone number is required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = (values, { resetForm }) => {

    dispatch(
      addContact({
        id: nanoid(),
        name: values.name.trim(),
        number: values.number.trim(),
      })
    );
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      onSubmit={handleFormSubmit}
      validationSchema={validationSchema}
    >
      <Form className={s.contactForm}>
        <label htmlFor="name" className={s.label}>
          Name
          <Field
            id="name"
            className={s.formInput}
            name="name"
            placeholder="Enter name"
          />
          <ErrorMessage name="name" component="p" className={s.inputError} />
        </label>

        <label htmlFor="number" className={s.label}>
          Phone Number
          <Field
            id="number"
            className={s.formInput}
            name="number"
            placeholder="Enter phone number"
          />
          <ErrorMessage name="number" component="p" className={s.inputError} />
        </label>

        <button className={s.formBtn} type="submit">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;