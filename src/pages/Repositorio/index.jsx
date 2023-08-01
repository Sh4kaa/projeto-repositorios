import { useParams } from "react-router-dom"



export default function Repositorio() {
  const {repositorio} = useParams()

  return (
    <div style={{color: 'white'}}>

      <h1>{repositorio}</h1>
    </div>
  )
}
