import React, { useState } from "react"

export default function BooleanInputWidget(props) {
  const {
    value,
    onChange,
  } = props
  const [data,setData]=useState(value);
  return (
    <input
      checked={data?data:false}
      style={{ width: '100%', height: '80%'}}
      onChange={(e) => {
        // onChange(e.target.checked)
        setData(e.target.value);
      }}
      type='checkbox'
    >
    </input>
  )
}