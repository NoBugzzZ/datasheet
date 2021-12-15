import React from "react"

export default function BooleanInputWidget(props) {
  const {
    value,
    onChange,
  } = props
  return (
    <input
      checked={value?value:false}
      style={{ width: '100%', height: '80%'}}
      onChange={(e) => {
        onChange(e.target.checked)
      }}
      type='checkbox'
    >
    </input>
  )
}