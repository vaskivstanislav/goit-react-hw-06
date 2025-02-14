import { Field, Form, Formik } from "formik";
import styles from "./SearchBox.module.css";
// import styles from "..SearchBox/SearchBox.module.css";
import toast from "react-hot-toast";

const SearchBox = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    const formattedSearch = values.search.trim().toLowerCase();
    if (!formattedSearch) {
      toast.error("The search field cannot be empty!");
      return;
    }
    onSubmit(formattedSearch);
    actions.resetForm();
  };

  return (
    <div className={styles.searchThumb}>
      <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
        <Form>
          <Field
            className={styles.inputSearch}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search films"
          />
          <button className={styles.btnSearch} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBox;