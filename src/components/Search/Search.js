import React from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

const Search = (props) => {
    return (
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search..."
          className="mr-sm-2"
          defaultValue={props.searchTerm}
          onKeyUp={props.onKeyUp}
        />
      </Form>
    )
}

export default Search;
