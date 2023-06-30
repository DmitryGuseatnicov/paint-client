import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Paint } from 'pages';

const Routing = () => {
    return (
        <Routes>
            <Route path="/:roomId" element={<Paint />} />
            <Route path="*" element={<Navigate to={`${Math.random()}`} replace />} />
        </Routes>
    );
};

export default Routing;
