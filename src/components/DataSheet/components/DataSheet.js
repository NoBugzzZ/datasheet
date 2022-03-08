import React, { useEffect, useState } from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import _ from 'lodash';
import { getDefaultRegister, addCell, captureMatrix, matrixToGrid } from '../utils';
import PropTypes from 'prop-types';

export default function DataSheet(props) {
  const [grid, setGrid] = useState([])
  const [matrix, setMatrix] = useState([])
  const [formData, setFormData] = useState(props.formData)

  useEffect(() => {
    console.log(formData)
    setMatrix([])
    const register = getDefaultRegister()
    const _SchemaField = register.fields.SchemaField
    _SchemaField({
      ..._.cloneDeep(props),
      register,
      onChange,
      onCellChange,
      formData: _.cloneDeep(formData),
      rootFormData:_.cloneDeep(formData),
      rootSchema:props.schema?_.cloneDeep(props.schema):{},
    })
  }, [formData, props])

  const onCellChange = (cell) => {
    setMatrix(prev => {
      return captureMatrix(_.cloneDeep(prev), cell)
    })
    // setGrid((prev) => {
    //   const newGrid = prev.map(row => [...row])
    //   addCell(newGrid, cell)
    //   return newGrid
    // })
  }

  const onChange = (changedFormData) => {
    setFormData((prev) => {
      if (typeof changedFormData === 'object' &&
        !Array.isArray(changedFormData) &&
        changedFormData !== null
      ) {
        return {
          ...prev,
          ...changedFormData
        }
      }
      return changedFormData
    })
  }
  return (
    <>
      <ReactDataSheet
        data={matrixToGrid(matrix)}
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

DataSheet.propTypes = {
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object,
  formData: PropTypes.any,
}