import React from "react"
import { getWidget, getLocation } from "../../utils"

export default function IntegerField(props) {
  const {
    schema,
    uiSchema,
    register,
    onCellChange,
    formData,
    name,
    onChange,
  } = props

  const handleChange=(value)=>{
    onChange(parseInt(value))
  }

  const { widgets } = register
  const { title } = schema
  let defaultWidget = 'input'
  const Widget = getWidget(schema, defaultWidget, widgets)
  const location = getLocation(uiSchema)
  if (location) {
    onCellChange({
      component:
        <Widget
          value={formData}
          onChange={handleChange}
        />,
      context: {
        location,
        value: formData,
        label: title ? title : name
      }
    })
  }
}