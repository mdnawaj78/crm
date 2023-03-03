import { BrowserRouter,Routes,Route } from 'react-router-dom'; 
import './App.css';  
import Crm from './Components/Crm/Crm';
import Header from './Components/Header/Header';
import NewLead from './Components/New_Lead/NewLead'; 
import Login from './Components/Login/Login'; 

function App() {
  return (
    <> 
     <Header/>
     <BrowserRouter>
      <Routes>
        <Route path='Crm' element={<Crm/>}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='newlead' element={<NewLead/>}></Route>
      </Routes>
     </BrowserRouter> 
    </>
  );
}

export default App;
