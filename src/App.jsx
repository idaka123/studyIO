import { Routes, Route } from "react-router-dom";
import { routes } from './Routes/route';


function App() {

  return (
    <>
    <Routes>
        {routes.map((route, idx) => {
          return (<Route 
                    key={idx}
                    exact={route.exact}
                    path={route.path}
                    element={route.page}
                  ></Route>
                )})}
      </Routes>
    </> 
  )
}

export default App
