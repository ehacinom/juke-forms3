import React from 'react';

const FilterInput = ({onChange, inputValue}) => {
  return (
    <form className="form-group" style={{marginTop: '20px'}}>
      <input
        className="form-control"
        placeholder="Enter artist name"
        onChange={() => onChange()}
        value={inputValue}
      />
    </form>
  );
}

export default FilterInput;