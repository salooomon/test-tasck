import './App.css'
import {useRoutes} from "./routes/Routes.jsx";

function App() {
    const routes = useRoutes()
  return (
    <>
        {routes}
    </>
  )
}

export default App
