import React, { useEffect, useState } from 'react';

import styles from './LayOut.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function TemplateName() {
  let [count, setCount] = useState(0);

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />
      {/* Content Area */}
      <div className="flex-1 max-w-full overflow-x-hidden px-4 pt-16">
        <Outlet />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
