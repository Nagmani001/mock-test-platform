import { BrowserRouter, Route, Routes } from "react-router-dom";
import SbiPo from "./pages/sbi-po-mocktest";

export default function App() {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/sbi-po-mock-test" element={<SbiPo />} />
      </Routes>
    </BrowserRouter>
  </div>
}

