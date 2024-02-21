// List.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteData, updateData } from "./store/formSlice";
import HandleEdit from "./handler/HandleEdit";
import "./index.css";

const List = () => {
  const data = useSelector((state) => state.form.data);

  return (
    <table className="styled-table">
      <thead>
        <td>Name</td>
        <td>Email</td>
        <td>Image</td>
        <td>Edit</td>
        <td>Delete</td>
      </thead>
      <tbody>
        <tr></tr>
        {data.map((item, i) => (
          <HandleEdit key={i} item={item} />
        ))}
      </tbody>
    </table>
  );
};

export default List;
