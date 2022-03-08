export default function sum(...args){
  console.log(args)
  let validValues=[]
  args.forEach((value)=>{
    if(value!==null&&value!==undefined){
      let v=Number(value)
      if(v!=NaN){
        validValues.push(v)
      }
    }
  })
  if(validValues.length>0){
    let res=0
    validValues.forEach((value)=>{
      res+=value
    })
    return res
  }
  return null
}