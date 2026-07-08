import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute'; 
import HomePage from './pages/Home';
import ListPage from './pages/List';
import SinglePage from './pages/SinglePage';
import CartPage from './pages/Cart';
import LoginPage from './pages/Login';
import ContactPage from './pages/Contact';
import AboutPage from './pages/About';
import ResultsPage from './pages/Results'; // <--- 1. Import your new results component here
import Footer from './components/Footer';
import Register from "./pages/Register";
import AdminPage from './pages/AdminPage';
import CareersPage from './pages/Careers';
import ProfilePage from './pages/Profile';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/product/:id" element={<SinglePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
        
        {/* 2. Registered dynamic search results page layout rule boundary link */}
        <Route path="/results" element={<ResultsPage />} />

        {/* Protected Route Example */}
        <Route 
          path="/cart" 
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;