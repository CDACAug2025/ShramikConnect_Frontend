import React from 'react';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <>
      {/* We removed <AppNavbar /> from here because 
         MainLayout.jsx and AdminLayout.jsx already handle the navbars.
      */}
      <AppRoutes />
    </>
  );
};

export default App;