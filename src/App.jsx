import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import EventDetails from './pages/EventDetails'
import Booking from './pages/Booking'
import MyTickets from './pages/MyTickets'
import Profile from './pages/Profile'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}
