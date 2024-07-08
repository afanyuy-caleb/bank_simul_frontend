import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import OtpVerification from './pages/OtpVerification';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'
import Nopage from './pages/Nopage';
import { useState } from 'react';
import MyContext from './config/MyContext';


function App() {
  const [regData, setRegData] = useState({})
  const [modalDisplay, setModalDisplay] = useState(true);
  const [formMsg, setFormMsg] = useState({
    status: true,
    msg: ""
  })
  const [loginMsg, setLoginMsg] = useState({
    status: true,
    msg: ""
  })
  const [formDisplay, setFormDisplay] = useState({
    status: false,
    page: ''
  })


  return (
    <Router>
      <MyContext.Provider value={{setFormMsg, formMsg, regData, setRegData, modalDisplay, setModalDisplay, loginMsg, setLoginMsg, formDisplay, setFormDisplay}}>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/' exact element={<Home />} />
          <Route path='/index' exact element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp" element={<OtpVerification />} />
          <Route path="*" element={<Nopage />} />
        
        </Routes>
      </MyContext.Provider>
    </Router>
  );
}

export default App;
