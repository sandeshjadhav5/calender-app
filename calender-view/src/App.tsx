// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WeekView from "./WeekView";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<WeekView />} />
    </Routes>
  );
};

export default App;
