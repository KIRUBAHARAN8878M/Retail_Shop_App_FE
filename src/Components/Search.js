import React from 'react'

function Search({ data, lable }) {
  return (
    <div className="form-group d-flex justify-content-center  align-items-center">
      <label htmlFor="">Search</label>
      <input
        className="form-control mr-sm-2 me-2  ms-2 shadow-none"
        type="search"
        placeholder={`Search a ${lable}`}
        onChange={(e) => data(e.target.value)}
      />
    </div>
  )
}

export default Search