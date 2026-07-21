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
import ResultsPage from './pages/Results'; 
import Footer from './components/Footer';
import Register from "./pages/Register";
import AdminPage from './pages/AdminPage';
import CareersPage from './pages/Careers';
import ProfilePage from './pages/Profile';
import ScrollToTop from './components/ScrollToTop';
import SuccessPage from './pages/Success';
import CancelPage from './pages/Cancel';
import OrdersPage from './pages/Orders';
import AccessibilityPage from './pages/Accessibility';
import TosPage from './pages/ToS';
import DoNotSellPage from './pages/DoNotSell';
import PricingPolicyPage from './pages/PricingPolicy';
import PrivacyPolicyPage from './pages/PrivacyPolicy';
import StoresPage from './pages/Stores';
import CookiesPage from './pages/Cookies';
import CaliforniaPrivacyRightsPage from './pages/CaliPrivacyRights';
import InterestBasedAdsPage from './pages/InterestBasedAds';
import CaliforniaTransparencyPage from './pages/CaliSupplyChain';
import Affiliates from './pages/Affiliates';
import TechSupport from './pages/TechSupport';
import PlantTest from './components/PlantTest';
import TrackOrderPage from './pages/TrackOrder';

function App() {
  return (
    <Router>
      <div className="suave-luxury-theme min-h-screen text-slate-900 relative">
        <Navbar />
        <ScrollToTop />

        <div className="pt-20 md:pt-24 relative z-10 flex flex-col min-h-screen justify-between">
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/product/:id" element={<SinglePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/cancel" element={<CancelPage />} />
              <Route path="/ToS" element={<TosPage />} />
              <Route path="/Accessibility" element={<AccessibilityPage />} />
              <Route path="/DoNotSell" element={<DoNotSellPage />} />
              <Route path="/PricingPolicy" element={<PricingPolicyPage />} />
              <Route path="/PrivacyPolicy" element={<PrivacyPolicyPage />} />
              <Route path="/stores" element={<StoresPage />} />
              <Route path="/cookie-preferences" element={<CookiesPage />} />
              <Route path="/california-privacy-rights" element={<CaliforniaPrivacyRightsPage />} />
              <Route path="/interest-based-ads" element={<InterestBasedAdsPage />} />
              <Route path="/supply-chain-transparency" element={<CaliforniaTransparencyPage />} />
              <Route path="/affiliates" element={<Affiliates />} />
              <Route path="/tech-support" element={<TechSupport />} />
              <Route path="/track-order" element={<TrackOrderPage />} />
              <Route path="/plant-test" element={<PlantTest />} />

              {/* Secure Protected Routes */}
              <Route path="/cart" element={<CartPage />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/orders" 
                element={
                  <ProtectedRoute>
                    <OrdersPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;