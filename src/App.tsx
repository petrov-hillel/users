import React from 'react';
import { Route, Routes } from "react-router-dom";
import UsersList from "./components/UsersList";
import UserPage from "./components/UserPage";
import './index.css'

function App() {
  return (
    <div className="App p-16">
        <Routes>
            <Route path={'/'} element={<UsersList />} />
            <Route path={'/users/:userId'} element={<UserPage />} />
        </Routes>
    </div>
  );
}

export default App;
