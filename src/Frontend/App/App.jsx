import "./App.css"
import { useState } from "react"
import Navbar from "./components/Main/components/navbar/Navbar"
import Main from "./components/Main/Main"
import Total from "./components/Main/components/Total/Total"


function App() {
  const [component, setComponent] = useState("days")

  return (
    <>
      <Navbar
        component={component}
        setComponent={(e) => setComponent(e)}
      />
      <Main activeComponent={component}/>
      <Total />
    </>
  )
}

export default App
