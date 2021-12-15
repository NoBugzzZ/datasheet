import { orderProperties } from "../../utils"

// function DefaultObjectFieldTemplate(props) {

// }



export default function ObjectField(props) {
  const {
    schema,
    uiSchema,
    formData,
    register
  } = props
  const { fields: { SchemaField } } = register
  const properties = Object.keys(schema.properties || {})
  let orderedProperties = orderProperties(properties)

  const onPropertyChange = (name) => {
    return (value) => {
      const newFormData = { ...formData,[name]: value };
      props.onChange(newFormData)
    }
  }

  orderedProperties.map(name => {
    SchemaField({
      ...props,
      schema: schema.properties[name],
      uiSchema: uiSchema[name] || {},
      formData: (formData || {})[name],
      name,
      onChange: onPropertyChange(name)
    })
  })
  // const Template = DefaultObjectFieldTemplate
  // const TemplateProps = {
  //   properties: orderedProperties.map(name => {
  //     return {
  //       content: SchemaField({
  //         schema: schema.properties[name],
  //         uiSchema: uiSchema[name]||{},
  //         register,
  //       }),
  //       name,
  //     }
  //   })
  // }
  // Template(TemplateProps)
}