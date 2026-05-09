import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Academics } from './pages/Academics'
import { Admissions } from './pages/Admissions'
import { Faculty } from './pages/Faculty'
import { Gallery } from './pages/Gallery'
import { Contact } from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="academics" element={<Academics />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="faculty" element={<Faculty />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="facilities" element={<Navigate to="/about" replace />} />
          <Route path="events" element={<Navigate to="/gallery" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
