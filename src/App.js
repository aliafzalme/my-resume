import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MyResumeV1 from './pages/v1/MyResume';
import MyResumeV2 from './pages/v2/MyResume';

const App = () => (
  <BrowserRouter basename="/my-resume">
    <Routes>
      <Route path="/" element={<MyResumeV1 />} />
      <Route path="/v2/my-resume" element={<MyResumeV2 />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
