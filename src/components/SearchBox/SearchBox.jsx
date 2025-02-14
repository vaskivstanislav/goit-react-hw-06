import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import s from "./SearchBox.module.css";
import { changeFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();

  const handleSearchUser = useCallback(
    (event) => {
      const value = event.target.value.trim().toLowerCase();
      dispatch(changeFilter(value));
    },
    [dispatch]
  );

  return (
    <div className={s.serchWrap}>
      <label htmlFor="search" className={s.label}>
        Find contact by name
      </label>
      <input
        id="search"
        className={s.serchInput}
        type="text"
        placeholder="Type to search..."
        onChange={handleSearchUser}
        aria-label="Search contacts"
      />
    </div>
  );
};

export default React.memo(SearchBox);