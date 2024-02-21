import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteData, updateData } from "../store/formSlice";

function HandleEdit({ item }) {
  const dispatch = useDispatch();

  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
  });
  const [img, setImg] = useState("");

  const handleDelete = (id) => {
    dispatch(deleteData(id));
  };

  const handleEdit = (item) => {
    setShowEdit(true);
    setEditData({
      name: item.name,
      email: item.email,
    });
  };

  const handleSubmit = (item) => {
    let newData = {
      id: item.id,
      name: editData.name,
      email: editData.email,
      img,
    };
    dispatch(updateData({ id: item.id, updatedValue: newData }));
    setShowEdit(false);
  };
  //   console.log(img);

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

  return (
    <tr>
      <td>
        {!showEdit ? (
          item.name
        ) : (
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />
        )}
      </td>
      <td>
        {!showEdit ? (
          item.email
        ) : (
          <input
            type="email"
            value={editData.email}
            onChange={(e) =>
              setEditData({ ...editData, email: e.target.value })
            }
          />
        )}
      </td>
      <td>
        {!showEdit ? (
          <img
            src={item.img}
            style={{
              width: "50px",
              height: "50px",
            }}
          ></img>
        ) : (
          <input
            type="file"
            name="select image"
            onChange={(e) => onChange(e.target.files[0] || null)}
          />
        )}
      </td>
      <td>
        {!showEdit ? (
          <button onClick={() => handleEdit(item)}>Edit</button>
        ) : (
          <button onClick={() => handleSubmit(item)}>Submit</button>
        )}
      </td>

      <td>
        <button onClick={() => handleDelete(item.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default HandleEdit;
