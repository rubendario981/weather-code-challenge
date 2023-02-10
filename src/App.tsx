import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './components/Home';
import ShowResults from './components/ShowResults';
import './App.css'

function App() {  
  return (
    <div className='flex flex-col items-center'>
      <BrowserRouter>
			
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/results/:city" element={<ShowResults />}></Route>
      </Routes>
      </BrowserRouter>
      
    </div >
  )
}

export default App;
