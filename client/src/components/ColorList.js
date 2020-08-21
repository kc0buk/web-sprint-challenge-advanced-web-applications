import React, { useState } from "react";
import axios from "axios";
import { useAPI } from '../hooks/useAPI'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};

let config = {
  method: '',
  url: '',
  data: ''
}

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  // const [method, setMethod] = useState('')
  const [colorID, setColorID] = useState('')
  // const [config, setConfig] = useState({})
  const [data, moveData, error] = useAPI({
    method: '',
    url: '',
    data: ''
  })
  const [dataDelete, deleteData, errorDelete] = useAPI({
    method: 'delete',
    url: `/api/colors/${colorID}`,
    data: ''
  })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  // const deleteAPICall = () => {
  //   moveData()
  //     .then( res => {
  //       console.log(res)
  //     })
  // }

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then( res => {
      const newArr = colors.map(color => {
        if(color.id === res.data.id) {
          return res.data
        } else {
          return color
        }
      })
      updateColors(newArr)
      setEditing(false)
      setColorToEdit(initialColor)
    })

  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then( res => {
        updateColors(colors.filter( color => 
          color.id !== res.data))
      })

    // console.log(color.id)
    // setColorID(color.id)
    // console.log(colorID)
    // deleteData()
    // config = {
    //   method: 'delete',
    //   url: `/api/colors/${color.id}`,
    //   data: ''
    // }
    // setMethod('delete')
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span data-testid='colorName'>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
