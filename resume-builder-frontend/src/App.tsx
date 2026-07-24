import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
import ResumeBuilder from "./pages/ResumeBuilder"

import Login from "./pages/Login"

const App = () => {
  return (
    <>
     <Routes>
         <Route>
            <Route path ='/' element ={<Home/>} />
            <Route path  = 'app' element={<Layout/>}>
              <Route index element = {<Dashboard/>}/>
              <Route path ='builder/:resumeId' element={<ResumeBuilder/>}/>
            </Route>
            <Route path= 'login' element ={<Login/>}/>
         </Route>
     </Routes>
    </>
  )
}

export default App