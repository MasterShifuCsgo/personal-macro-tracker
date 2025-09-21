import "./App.css"
import { useState } from "react"
import Navbar from "./components/Main/components/navbar/Navbar"
import Main from "./components/Main/Main"
import { Toaster } from "react-hot-toast"
import Modal from "./components/Main/components/components/modal/Modal"


function App() {
  const [component, setComponent] = useState("days")

  return (
    <>
      <Toaster></Toaster>  
      <Modal></Modal>
      <Navbar
        component={component}
        setComponent={(e) => setComponent(e)}
      />
      <Main activeComponent={component}/>      
    </>
  )
}

export default App
