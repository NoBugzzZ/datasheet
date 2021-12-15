import React, { useEffect, useState } from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import _ from 'lodash';
import { getDefaultRegister, addCell } from '../utils';

export default function DataSheet(props) {
  const [grid, setGrid] = useState([])

  const [formData, setFormData] = useState(props.formData)

  useEffect(() => {
    const register = getDefaultRegister()
    const _SchemaField = register.fields.SchemaField
    _SchemaField({
      ...props,
      register,
      onChange,
      onCellChange,
      formData,
    })
  }, [formData,props])

  const onCellChange = (cell) => {
    setGrid((prev) => {
      const newGrid = prev.map(row => [...row])
      addCell(newGrid, cell)
      return newGrid
    })
  }

  const onChange = (formData) => {
    setFormData((prev) => {
      if (typeof formData === 'object' &&
        !Array.isArray(formData) &&
        formData !== null
      ) {
        return {
          ...prev,
          ...formData
        }
      }
      return formData
    })
  }

  return (
    <>
      <ReactDataSheet
        data={grid}
        valueRenderer={cell => cell.label}
      // dataRenderer={cell => {
      //   var { value } = cell
      //   value = value ? value : ''
      //   return value
      // }}
      />
      <button style={{ height: '40px', width: '70px', margin: '20px' }} onClick={() => {
        alert(JSON.stringify(formData))
      }}>submit</button>
    </>
  )


}