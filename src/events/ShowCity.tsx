
interface cityprop{
    city:string
}
function ShowCity(obj:cityprop) {
  return (

    <option value={obj.city}>{obj.city}</option>
  )
}

export default ShowCity