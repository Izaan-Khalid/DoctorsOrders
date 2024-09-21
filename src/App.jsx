import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home, NurseForm, NurseOrders } from "./Pages";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nurse-form" element={<NurseForm />} />
          <Route path="/nurse-orders" element={<NurseOrders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
