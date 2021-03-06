import React from "react"
import { getWidget, getLocation } from "../../utils"

export default function BooleanField(props) {
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
  let defaultWidget = 'input'
  const Widget = getWidget(schema, defaultWidget, widgets)
  const location = getLocation(uiSchema)
  if (location) {
    onCellChange({
      component:
        <Widget
          value={props.formData}
          onChange={onChange}
        />,
      context: {
        location,
        value: props.formData,
        label: title ? title : name
      }
    })
  }
}