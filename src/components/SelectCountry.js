import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { geoArr } from "./data/countriesAndStates";
import { InputRow } from "aws-amplify-react";

const SelectCountry = (props, ref) => {
  const { theme, onCountryChange, onStatesChange } = props;
  const [states, setStates] = useState(geoArr[233].states);

  const filterStates = (country, countryList = geoArr) => {
    let countryObj = countryList.filter((ctry) => ctry.name === country);
    let statesList = countryObj[0].states;
    console.debug({ filterStates: { country, statesList, countryObj } });
    return statesList;
  };

  const handleCountryChange = (country) => {
    setStates(filterStates(country));
    //console.debug({ handleCountryChange: { states } });
  };

  return (
    <>
      <Autocomplete
        id="countrySelect"
        options={geoArr}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          event = event.target.value;
          console.log({ event, newValue: newValue.name });
          handleCountryChange(newValue.name);
        }}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Combo box"
            variant="outlined"
            onChange={handleCountryChange}
          />
        )}
      />
      <Autocomplete
        id="stateSelect"
        options={states}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Combo box"
            variant="outlined"
            onChange={handleCountryChange}
          />
        )}
      />
    </>
  );
};

export default SelectCountry;
