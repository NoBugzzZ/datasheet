import React from "react"
import { getWidget, getLocation } from "../../utils"

export default function ArrayField(props) {
  console.log(props)
  const {
    schema,
    uiSchema,
    register,
    onCellChange,
    formData,
    name,
    onChange,
  } = props

  const { widgets } = register
  const { title } = schema
  let defaultWidget = 'datasheet'
  const Widget = getWidget(schema, defaultWidget, widgets)
  const location = getLocation(uiSchema)
  if (location) {
    onCellChange({
      component:
        <Widget
          {...props}
        />,
      context: {
        location,
        value: formData,
        label: title ? title : name
      }
    })
  }
}