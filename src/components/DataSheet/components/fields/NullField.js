import React from "react"
import { getWidget, getLocation } from "../../utils"

export default function NullField(props) {
  const {
    schema,
    uiSchema,
    onCellChange,
    formData,
    name,
  } = props
  const { title } = schema
  const location = getLocation(uiSchema)
  if (location) {
    onCellChange({
      readOnly:true,
      context: {
        location,
        value: formData,
        label: title ? title : name
      }
    })
  }
}