import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Tests from "./pages/test";
import Arena from "./pages/arena";
import Result from "./pages/result";


export default function App() {
  return <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/tests/:id" element={<Arena />} />
        <Route path="/result/:id" element={<Result />} />

      </Routes>
    </BrowserRouter>
  </>
}

