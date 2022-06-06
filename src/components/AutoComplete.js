import React from "react";
import { FormRow } from "aws-amplify-react";
import { makeStyles } from "@material-ui/core/styles";
import useAutocomplete from "@material-ui/lab/useAutocomplete";

const useStyles = makeStyles((theme) => ({
  label: {
    display: "block"
  },
  input: {
    width: 200
  },
  listbox: {
    width: 200,
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: "absolute",
    listStyle: "none",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    maxHeight: 200,
    border: "1px solid rgba(0,0,0,.25)",
    '& li[data-focus="true"]': {
      backgroundColor: "#4a8df6",
      color: "white",
      cursor: "pointer"
    },
    "& li:active": {
      backgroundColor: "#2977f5",
      color: "white"
    }
  }
}));

const AutoComplete = (props) => {
  const { id, options, optionKey, theme, ...rest } = props;
  const classes = useStyles();
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions
  } = useAutocomplete({
    id: id,
    options: options,
    getOptionLabel: (option) => option[optionKey]
  });

  const style = propStyle();

  return (
    <div>
      <div {...getRootProps()}>
        <FormRow
          theme={props.theme}
          claseName={classes.input}
          {...getInputProps}
          {...rest}
        />
      </div>
      {groupedOptions.length > 0 ? (
        <ul className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option[optionKey]}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default AutoComplete;
