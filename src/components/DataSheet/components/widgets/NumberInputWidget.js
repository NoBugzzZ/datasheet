import React from "react"

export default function NumberInputWidget(props) {
  const {
    value,
    onChange,
  } = props
  return (
    <input
      value={value?value:''}
      style={{ width: '100%', height: '100%' }}
      onChange={(e) => {
        onChange(Number(e.target.value))
      }}
      type='number'
    >
    </input>
  )
}