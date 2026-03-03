import { Toaster } from "react-hot-toast";
import Display from "./pages/Display";
export const API_BASE_URL = "http://localhost:2011";


const App = () => {
  return (

        <>
        
        <Toaster position="top-center" />
          <Display/>
        </>
        
  )
}
export default App;