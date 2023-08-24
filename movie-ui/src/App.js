import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './components/Home/Home';
import Navbar from './';
import { Signin } from './components/SIgnIn/SignIn';
import { Signup } from './components/Signup/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import { MovieDetail } from './components/MovieDetail/MovieDetail';
import { BookTicket } from './components/BookTicket/BookTicket';
import ShowTicket from './components/ShowTicket/ShowTickets';


function App() {
  return (
    <div className="App">
      {/* <Provider store={store}> */}
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/movie/:id/' element={<MovieDetail />} />
          <Route path='/movie/:id/bookticket' element={<BookTicket/>}/>
          
          <Route path='/getticket/' element={<ShowTicket/>}/>
        </Routes>
        </BrowserRouter>
        {/* </Provider> */}
      
    </div>
  );
}

export default App;
