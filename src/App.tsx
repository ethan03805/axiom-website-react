import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Docs from './pages/Docs'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/docs" element={<Docs />} />
      {/* Support old URL */}
      <Route path="/docs.html" element={<Docs />} />
    </Routes>
  )
}

export default App
