
import './App.less';
import { Home, Categories, Images } from './views'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Categories />} />
            <Route path='search' element={<Images />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
