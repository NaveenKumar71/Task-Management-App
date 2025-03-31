import React from 'react';

function FilterSort({ filter, setFilter, sort, setSort }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <label className="me-2">Filter: </label>
        <select 
          value={filter} 
          onChange={e => setFilter(e.target.value)} 
          className="form-select d-inline-block w-auto"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <label className="me-2">Sort By: </label>
        <select 
          value={sort} 
          onChange={e => setSort(e.target.value)} 
          className="form-select d-inline-block w-auto"
        >
          <option value="none">None</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSort;
