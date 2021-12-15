import React, { useEffect, useState } from 'react';
import ReactDataSheet from "react-datasheet"
import { addCell, CELL_OPTIONS } from '../../utils';

export default function ArrayDataSheetWidget(props) {
  console.log(props)

  const [grid, setGrid] = useState([])

  const [formData, setFormData] = useState(props.formData)

  useEffect(() => {
    const {
      schema,
      uiSchema,
      register: {
        fields: {
          SchemaField
        }
      }
    } = props
    if(formData){
      formData.forEach((value, index) => {
        SchemaField({
          ...props,
          onChange: onCellChangeForArray,
          onCellChange: onCellChangeForArray,
          formData: value,
          schema: schema.items,
          uiSchema: { ...uiSchema.items, 'ui:location': { ...uiSchema.items['ui:location'], row: index + 1 } },
          name: 'items'
        })
      })
    }
  }, [props, formData])

  const onChangeForArray = (formData) => {
    console.log(formData)
  }
  const onCellChangeForArray = (cell) => {
    console.log(cell)
    setGrid((prev) => {
      const newGrid = prev.map(row => [...row])
      addCell(newGrid, cell)
      return newGrid
    })
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactDataSheet
        data={grid}
        valueRenderer={cell => cell.label}
      />
      <button style={{ height: '40px', width: '70px' }} onClick={() => {
        alert(JSON.stringify(formData))
      }}>submit</button>
      <button style={{ height: '40px', width: '70px' }} onClick={() => {
        
      }}>add</button>
    </div>
  )
}