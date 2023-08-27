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
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<ProtectedRoute Component={Dashboard} />}/>
          <Route path='/movie/:id/' element={<MovieDetail />} />
          <Route path='/movie/:id/bookticket' element={<BookTicket/>}/>
          <Route path='/getticket/' element={<ProtectedRoute Component={ShowTicket} />}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
