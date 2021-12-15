import React from "react"

export default function StringInputWidget(props) {
  const {
    value,
    onChange,
  } = props
  return (
    <input
      value={value?value:''}
      style={{ width: '100%', height: '100%' }}
      onChange={(e) => {
        onChange(e.target.value)
      }}
    >
    </input>
  )
}