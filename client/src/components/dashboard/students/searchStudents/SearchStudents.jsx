import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

const SearchStudents = (props) => {
  const [search, setSearch] = useState("");
  const { setRows, students } = props;
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setRows(
      students.filter((el) => {
        return el.firstName
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      })
    );
  };
  return (
    <>
      <form noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Buscar Estudiante"
          size="medium"
          value={search}
          onChange={handleSearch}
        />
      </form>
    </>
  );
};

export default SearchStudents;
