import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const SearchPm = (props) => {
  const [studentPm, setStudentPm] = useState();
  const { setRows, pm, students } = props;

  const handleSearch = (e) => {
    setStudentPm(e.target.value);
    if (e.target.value === "Si") {
      setRows(pm);
    } else {
      setRows(students);
    }
  };

  return (
    <>
      <FormControl>
        <InputLabel htmlFor="age-native-simple">PM</InputLabel>
        <Select
          native
          inputProps={{
            name: "PM",
            id: "age-native-simple",
          }}
          value={studentPm}
          onChange={handleSearch}
        >
          <option aria-label="None" value="" />
          <option value="Si">Si</option>
        </Select>
      </FormControl>
    </>
  );
};

export default SearchPm;
