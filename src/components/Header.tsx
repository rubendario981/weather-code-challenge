import { useRef } from "react";
import { useNavigate } from "react-router-dom"

const Header = () => {
	const navigate = useNavigate();
	const city = useRef<any>("")

	const searchForecast = () => navigate("/results/" + city.current.value)

	return (
		<div className="bg-white flex items-center justify-between">
			<div className="flex items-center mr-96">
				<div onClick={() => navigate("/")} className="w-full hover:cursor-pointer">
					<img src="https://images.vexels.com/media/users/3/240759/isolated/lists/6c36107196ebe4963480e32409d298f8-shining-sun-and-clouds.png" className="w-24" alt="sun and clouds" />
				</div>
				<div className="inline-block">
					<h3 className="w-48 text-blue-700 font-semibold text-xl">The weather app</h3>
				</div>
			</div>
			<label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
			<div className="relative w-96 mr-6">
				<input ref={city}
					type="text"
					id="search"
					className="block w-full p-3 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
					placeholder="Search" />
				<button onClick={searchForecast}
					className="text-white absolute right-0 bottom-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-xl text-lg px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">	Search</button>
			</div>
		</div>
	)
}

export default Header