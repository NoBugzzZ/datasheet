import { getSchemaType } from "../../utils"
import PropTypes from 'prop-types';

const COMPONENT_TYPES = {
  array: 'ArrayField',
  boolean: 'BooleanField',
  integer: 'IntegerField',
  null: 'NullField',
  number: 'NumberField',
  object: 'ObjectField',
  string: 'StringField',
}

function getFieldComponent(schema, uiSchema, fields) {
  const componentName = COMPONENT_TYPES[getSchemaType(schema)]
  return (componentName in fields
    ? fields[componentName]
    : fields['UnsupportedField']
  )
}

/**
 * 
 * @param {scheam,uiSchema,formData,register,onChange,onCellChange}
 */


export default function SchemaField(props) {
  const {
    schema,
    uiSchema,
    register: { fields },
  } = props
  const _FieldComponent = getFieldComponent(schema, uiSchema, fields)
  _FieldComponent({ ...props })
}