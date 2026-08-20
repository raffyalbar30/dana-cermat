import './App.css'
import Loginpages from './pages/Loginpages'
import Dashboard from './pages/Dashboard'
import { Routes, Route } from "react-router-dom";
import Routers from './Routers';
import ChatBotUI from './pages/Aiasistent';
import Transactions from './pages/Transactions';
import BudgetExpanses from './pages/BudgetExpanses';
import Analytics from './pages/Analytics';
import Register from './layouts/Register';
import DanaCermatLanding from './pages/Homepages';
import Forgotpasswordpages from './pages/Forgotpasswordpages';
import NewPasswordpage from './pages/NewPasswordpage';



function App() {
  

  return (
     <Routes>
         <Route path="/" element={<DanaCermatLanding/>}/>
         <Route path="/Login" element={<Loginpages/>}/>
         <Route path="/Register" element={<Register/>}/>
         <Route path="/Forgot/password" element={<Forgotpasswordpages/>}/>
         <Route path="/Forgot/newpassword" element={<NewPasswordpage/>}/>
         <Route path="/Dashboard" element={<Routers Children={<Dashboard/>}/>}/>
         <Route path="/Transactions" element={<Routers Children={<Transactions/>}/>}/>
         <Route path="/Budget" element={<Routers Children={<BudgetExpanses/>}/>}/>
         <Route path="/Analytics" element={<Routers Children={<Analytics/>}/>}/>
         <Route path="/Aiasistent" element={<Routers Children={<ChatBotUI/>}/>}/>
     </Routes>
  )
}

export default App
