import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IGeneral from "../interfaces/IWeatherData";

const CardCity = ({ city }: any) => {
	const [selectedCity, setSelectedCity] = useState<IGeneral>();
	const [description, setDescription] = useState<string>("");
	const [icon, setIcon] = useState<string>("")
	const navigate = useNavigate();
	const API_KEY = import.meta.env.VITE_API_KEY

	const fetchData = async (cityy: string) => {
		try {
			const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityy}&APPID=${API_KEY}`)

			setDescription(res.data.weather[0].description)
			setIcon(res.data.weather[0].icon)
			setSelectedCity(res.data)

		} catch (error) {
			console.log("city card error", error);

		}
	}
	useEffect(() => {
		fetchData(city);
	}, [])

	const viewDetails =()=> navigate("/results/" + city)
	return (
		<div onClick={viewDetails}
		className="mx-auto text-white flex flex-col bg-indigo-600 bg-opacity-50 border border-blue-500 shadow-xl rounded-md w-56 hover:bg-indigo-400 hover:bg-opacity-75 hover:cursor-pointer">
			<p className="items-center bg-blue-500 px-4 py-3 text-lg text-center font-semibold rounded-t-lg"> {selectedCity?.name} - {selectedCity?.sys.country}</p>
			<div className="flex gap-2 items-center">
				<div className="w-1/2">
					<img
						src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
						className="mx-auto w-16"
						alt="Icon forecast" />
					<p className="first-letter:capitalize text-center text-md">{description}</p>
				</div>
				<div className="w-1/2 text-center">
					<p className="text-4xl">{(Number(selectedCity?.main.temp) - 273.15).toFixed()}°C </p>
					<p className="text-md mt-3">Real feel {(Number(selectedCity?.main.feels_like) - 273.15).toFixed()}°C </p>
				</div>
			</div>
			<div className="flex flex-col my-3 gap-2">
				<p className="text-center text-sm">Min. temperature: {(Number(selectedCity?.main.temp_min) - 273.15).toFixed()}°C  </p>
				<p className="text-center text-sm">Max. temperature: {(Number(selectedCity?.main.temp_max) - 273.15).toFixed()}°C </p>
			</div>
		</div>
	)
}

export default CardCity