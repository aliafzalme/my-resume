import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MyResumeV1 from './pages/v1/MyResume';
import MyResumeV2 from './pages/v2/MyResume';

/*
 * basename comes from PUBLIC_URL so the same code works in both places:
 * '' under `npm start` (served at localhost:3000/) and '/my-resume' in a
 * production build (derived from "homepage" in package.json). Hardcoding
 * '/my-resume' made every route 404 in local dev.
 */
const App = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
    <Routes>
      <Route path="/" element={<MyResumeV1 />} />
      <Route path="/v2" element={<Navigate to="/v2/my-resume" replace />} />
      <Route path="/v2/my-resume" element={<MyResumeV2 />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
