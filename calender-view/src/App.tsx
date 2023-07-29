// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WeekView from "./WeekView";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={WeekView} />
      </Switch>
    </Router>
  );
};

export default App;
