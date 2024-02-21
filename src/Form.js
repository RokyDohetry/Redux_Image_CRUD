// Form.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { updateData, addData } from "./store/formSlice";
import "./index.css";
const Form = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [img, setImg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = nanoid();
    if (isEditMode && editItemId) {
      dispatch(updateData({ id: editItemId, newData: formData }));
      setIsEditMode(false);
      setEditItemId(null);
    } else {
      dispatch(addData({ id, ...formData, img }));
    }
    setFormData({});
  };

  const handleEdit = (item) => {
    setIsEditMode(true);
    setEditItemId(item.id);
    setFormData(item);
  };

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const onChange = (file) => {
    if (!file) {
      setImg("");
      return;
    }

    fileToDataUri(file).then((dataUri) => {
      setImg(dataUri);
    });
  };

  // console.log(img);
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        name="name"
        value={formData.name || ""}
        onChange={handleChange}
        className="input-field"
        placeholder="Name"
      />
      <input
        type="text"
        name="email"
        value={formData.email || ""}
        onChange={handleChange}
        className="input-field"
        placeholder="Email"
      />
      <input
        type="file"
        name="select image"
        onChange={(e) => onChange(e.target.files[0] || null)}
      />
      <button type="submit" className="submit-button">
        {isEditMode ? "Update" : "Submit"}
      </button>
      {isEditMode && (
        <button
          type="button"
          onClick={() => setIsEditMode(false)}
          className="cancel-button"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default Form;
