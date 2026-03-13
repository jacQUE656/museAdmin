import { Toaster } from "react-hot-toast";
import Display from "./pages/Display";
export const API_BASE_URL = "https://muse-backend-1.onrender.com";


const App = () => {
  return (

        <>        
         <Toaster position="top-center" />
          <Display/>
        </>
        
  )
}
export default App;