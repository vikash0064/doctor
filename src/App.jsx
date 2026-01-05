import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import DoctorDetails from './pages/DoctorDetails';
import Treatments from './pages/Treatments';
import Blogs from './pages/Blogs';
import WhatsAppButton from './components/WhatsAppButton';

import AdminPanel from './components/AdminPanel';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto bg-white shadow-2xl my-0">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/doctor-profile" element={<DoctorDetails />} />
            <Route path="/doctors" element={<DoctorDetails />} />
            <Route path="/treatments" element={<Treatments />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/admin/testimonials" element={<AdminPanel />} />
            {/* Add more routes as needed */}
            <Route path="*" element={<div className="py-20 text-center"><h1 className="text-4xl text-gray-300 font-bold">404 - Page Not Found</h1></div>} />
          </Routes>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
