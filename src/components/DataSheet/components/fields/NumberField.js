import React from "react"
import { getWidget, getLocation, getFormData } from "../../utils"

export default function NumberField(props) {
  const {
    schema,
    uiSchema,
    register,
    onCellChange,
    name,
    onChange,
    rootFormData,
    rootSchema,
  } = props
  let { formData } = props
  // console.log(schema, register, rootSchema, rootFormData)
  const { widgets } = register
  const { title } = schema
  let defaultWidget = 'input'
  const Widget = getWidget(schema, defaultWidget, widgets)
  const location = getLocation(uiSchema)
  // if (schema.hasOwnProperty("dependencies")) {
  //   let newFormData = getFormData(schema, rootSchema, rootFormData, register)
  //   console.log(newFormData)
  //   if (newFormData !== null && newFormData !== undefined) {
  //     if (Number(formData) !== Number(newFormData) && Number(newFormData) !== NaN) {
  //       onChange(Number(newFormData))
  //       formData = newFormData
  //     }
  //   }
  // }
  if (location) {
    onCellChange({
      component:
        <Widget
          value={formData}
          onChange={onChange}
        />,
      context: {
        location,
        value: formData,
        label: title ? title : name
      }
    })
  }
}