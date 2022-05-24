import React, { useState } from "react"

export default function NumberInputWidget(props) {
  const {
    value,
    onChange,
  } = props
  const [data,setData]=useState(value)
  return (
    <input
      value={data?data:''}
      style={{ width: '100%', height: '100%' }}
      onChange={(e) => {
        // onChange(Number(e.target.value))
        setData(e.target.value);
      }}
      type='number'
    >
    </input>
  )
}