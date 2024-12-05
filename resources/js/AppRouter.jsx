import { Suspense } from "react";
import { Routes, Route } from 'react-router-dom';
import { LazyForm, LazyHome, LazyUserData } from "./pages/AsyncPages";


export default function AppRouter() {
    return (
        <Suspense fallback=<></>>
            <Routes>
                <Route path="/" element={<LazyHome />} />
                <Route path="/Form" element={<LazyForm />} />
                <Route path="/UserData" element={<LazyUserData />}></Route>
            </Routes>
        </Suspense>
    );
}
