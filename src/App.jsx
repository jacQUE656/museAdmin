import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AddSong from "./pages/AddSong";
import ListSong from "./pages/ListSong";
import AddAlbum from "./pages/AddAlbum";
import ListAlbum from "./pages/ListAlbum";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
export const API_BASE_URL = "http://localhost:2011";


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/add-song" element={
            //<ProtectedRoute requiredAdmin={true}>
              <AddSong />
           // </ProtectedRoute>
          } />
          <Route path="/list-songs" element={
           // <ProtectedRoute requiredAdmin={true}>
              <ListSong />
           // </ProtectedRoute>
          } />
          <Route path="/add-album" element={
           // <ProtectedRoute requiredAdmin={true}>
              <AddAlbum />
            //</ProtectedRoute>
          } />
          <Route path="/list-albums" element={
           // <ProtectedRoute requiredAdmin={true}>
              <ListAlbum />
          //  </ProtectedRoute>
          } />
          <Route path="/" element={<Login />} />

          <Route path="*" element={
          //  <ProtectedRoute requiredAdmin={true}>
              <AddSong />
           // </ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App;