import { ChangeEvent, useState } from 'react';
import { useNavigate } from "react-router-dom";

import Carousel from './Carousel';
const Home = () => {
    const [city, setCity] = useState<string>("");
		const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCity(e.currentTarget.value);
    }
  
    const searchCity = () => {
			navigate("/results/" + city)			
    }
  
  return (
    <div className='flex flex-col items-center'>
      <div className='w-full'>
        <h1 className='my-12 text-center text-white text-8xl'>The weather app</h1>
      </div>

      <div className='w-1/2 mx-auto'>
        <label htmlFor="city" className="block mb-2 text-lg font-medium text-white ">Insert the city</label>
        <input
          type="text"
          id="city"
          value={city}
          name="city"
          onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          placeholder="Ex London, Paris, New York..." />
      </div>

      <div className='w-1/4 mx-auto mt-8'>
        <button onClick={searchCity} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl w-full px-5 py-2.5 focus:outline-none">Search</button>
      </div>

      <div className='flex justify-between gap-8'>
				<img src="https://images.vexels.com/media/users/3/240759/isolated/lists/6c36107196ebe4963480e32409d298f8-shining-sun-and-clouds.png" className="w-24" alt="sun and clouds" />
				<img src="https://images.vexels.com/media/users/3/240759/isolated/lists/6c36107196ebe4963480e32409d298f8-shining-sun-and-clouds.png" className="w-24" alt="sun and clouds" />
				<img src="https://images.vexels.com/media/users/3/240759/isolated/lists/6c36107196ebe4963480e32409d298f8-shining-sun-and-clouds.png" className="w-24" alt="sun and clouds" />

      </div>
      
    </div >
  )
}

export default Home