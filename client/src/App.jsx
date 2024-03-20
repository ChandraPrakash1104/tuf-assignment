import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Submit from './pages/Submit';
import Submission from './pages/Submission';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/submission' element={<Submit />} />
        <Route path='/submission/:id' element={<Submission />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
