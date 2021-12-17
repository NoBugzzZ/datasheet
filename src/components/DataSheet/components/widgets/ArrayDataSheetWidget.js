import React, { useEffect, useState } from 'react';
import ReactDataSheet from "react-datasheet"
import { addCell, CELL_OPTIONS, getDefaultFormState, getSchemaType } from '../../utils';

function getUiSchemaForArray(schema, uiSchema, row) {
  const type = getSchemaType(schema)
  if (type === 'object') {
    for (let name in schema.properties) {
      uiSchema[name] = getUiSchemaForArray(schema.properties[name], _.cloneDeep(uiSchema[name]), row)
    }
  } else if (type === 'array') {
    let location = { ...uiSchema['ui:location'] }
    location['row'] = row
    uiSchema = { ...uiSchema, 'ui:location': location }
  } else {
    let location = { ...uiSchema['ui:location'] }
    location['row'] = row
    uiSchema = { ...uiSchema, 'ui:location': location }
  }
  return uiSchema
}

function getMaxRowSpanAndComputeTotalColSpan(schema, uiSchema) {
  let maxRowSpan = 1
  let totalColSpan = 0
  const type = getSchemaType(schema)
  if (type === 'object') {
    for (let name in schema.properties) {
      const {
        maxRowSpan: newMaxRowSpan,
        totalColSpan: newTotalColSpan
      } = getMaxRowSpanAndComputeTotalColSpan(schema.properties[name], uiSchema[name])
      maxRowSpan = maxRowSpan >= newMaxRowSpan ? maxRowSpan : newMaxRowSpan
      totalColSpan += newTotalColSpan
    }
  } else if (type === 'array') {
    const { rowSpan, colSpan } = uiSchema['ui:location']
    if (rowSpan) maxRowSpan = maxRowSpan >= rowSpan ? maxRowSpan : rowSpan
    if (colSpan) totalColSpan += colSpan
  } else {
    const { rowSpan, colSpan } = uiSchema['ui:location']
    if (rowSpan) maxRowSpan = maxRowSpan >= rowSpan ? maxRowSpan : rowSpan
    if (colSpan) totalColSpan += colSpan
  }
  return {
    maxRowSpan,
    totalColSpan
  }
}

export default function ArrayDataSheetWidget(props) {

  const [grid, setGrid] = useState([])

  useEffect(() => {
    const {
      schema,
      uiSchema,
      formData,
      register: {
        fields: {
          SchemaField
        }
      }
    } = props
    if (formData) {
      const {
        maxRowSpan,
        totalColSpan
      } = getMaxRowSpanAndComputeTotalColSpan(schema.items, uiSchema.items)
      formData.forEach((value, index) => {
        const row = index * maxRowSpan + 1
        SchemaField({
          ...props,
          onChange: onChangeForArray(index),
          onCellChange: onCellChangeForArray,
          formData: value,
          schema: schema.items,
          uiSchema: getUiSchemaForArray(schema.items, _.cloneDeep(uiSchema.items), row),
          name: 'items'
        })
        onCellChangeForArray({
          context: {
            label: '删除',
            location: {
              rowSpan: 1,
              colSpan: 1,
              row,
              col: totalColSpan + 1,
            }
          },
          component:
            <button onClick={() => {
              const { onChange } = props
              const newFormData = props.formData
              newFormData.splice(index, 1)
              onChange(newFormData)
              setGrid([])
            }}
            >删除</button>
        })
      })
    }
  }, [props])

  const onChangeForArray = (index) => {
    return (value) => {
      const { formData, onChange } = props
      let newFormData = _.cloneDeep(formData)
      newFormData[index] = value
      onChange(newFormData)
    }
  }
  const onCellChangeForArray = (cell) => {
    setGrid((prev) => {
      const newGrid = _.cloneDeep(prev)
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
        alert(JSON.stringify(props.formData))
      }}>submit</button>
      <button style={{ height: '40px', width: '70px' }} onClick={() => {
        const { schema: { items }, onChange } = props
        const value = getDefaultFormState(items)
        if (typeof (value) !== 'undefined') {
          const formData = props.formData ? props.formData : []
          formData.push(value)
          onChange(formData)
        }
      }}
      >add</button>
    </div>
  )
}