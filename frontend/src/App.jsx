import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import LandingPage from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Budget from './pages/Budget';
import Expenses from './pages/Expenses';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';

function App() {
  return <BrowserRouter>
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/budgets" element={<Budget />} />
        <Route path="/dashboard/expenses" element={<Expenses />} />
    </Routes>
  
  </BrowserRouter>
}

export default App
