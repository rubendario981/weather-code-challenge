import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import IGeneral from "../assets/interfaces/IWeatherData";
import Header from "./Header";
import gps from "../assets/gpsicon.png";
import Swal from "sweetalert2";

const ShowResults = () => {
	const navigate = useNavigate();
	const [selectedCity, setSelectedCity] = useState<IGeneral>();
	const [description, setDescription] = useState<string>("");
	const [icon, setIcon] = useState<string>("")
	const { city } = useParams();
	const API_KEY = import.meta.env.VITE_API_KEY
	const [timeSunrise, setTimeSunrise] = useState<string>("")
	const [timeSunset, setTimeSunset] = useState<string>("")
	const [localTime, setLocalTime] = useState<string>("")
	const [viewCelsius, setViewCelsius] = useState<boolean>(true)

	useEffect(() => {
		if (city) {
			const fetchData = async (city: string) => {
				try {
					const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`)
					
					setDescription(res.data.weather[0].description)
					setIcon(res.data.weather[0].icon)
					setSelectedCity(res.data)

					const sunriseTime = new Date(res.data.sys.sunrise * 1000);
					setTimeSunrise(sunriseTime.getHours().toString() + " : " + sunriseTime.getMinutes().toString())

					const sunsetTime = new Date(res.data.sys.sunset * 1000);
					setTimeSunset(sunsetTime.getHours() + " : " + sunsetTime.getMinutes())

					const getLocalTime = new Date(res.data.dt * 1000 + res.data.timezone * 1000);
					setLocalTime(getLocalTime.toUTCString())
				} catch (error) {
					Swal.fire("Not found", `The city ${city} doesn't exist. Please try again`)
					navigate("/")
				}
			}
			fetchData(city);
		}
	}, [])

	return (
		<div className="flex flex-wrap">
			<div className="w-full">
				<Header />
			</div>
			<div className="w-full mt-6">
				<h3 className="text-white text-6xl text-center">Current weather in {selectedCity?.name}</h3>
			</div>
			<div className="mt-6 mx-auto text-white flex gap-6 bg-indigo-600 bg-opacity-50 border border-blue-500 py-6 px-4 shadow-2xl rounded-2xl">
				<div className="text-center pr-8 border-r-2 ">
					<div className="inline-flex items-center bg-blue-500 text-white px-4 rounded-lg"> <img src={gps} className="w-6 mr-3" alt="gps icon" /> {selectedCity?.name} - {selectedCity?.sys.country}</div>
					<p className="font-semibold">Local time in {city}</p>
					<p className="text-sm">{localTime}</p>
					<img
						src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
						className="mx-auto w-24"
						alt="Icon forecast" />
					<p className="first-letter:capitalize text-2xl">{description}</p>
				</div>
				<div className="text-center pr-8 border-r-2 ">
					<label className="relative inline-flex items-center cursor-pointer">
						<input type="checkbox" value="" className="sr-only peer" />
						<div onClick={() => setViewCelsius(prev => !prev)}
							className="w-11 h-6 bg-indigo-600 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
						<span className="ml-3 text-sm font-medium">See in{viewCelsius ? " farenheith degrees" : " celsius degrees"}</span>
					</label>
					{viewCelsius
						? <div>
							<p className="text-7xl">{(Number(selectedCity?.main.temp) - 273.15).toFixed()}°C </p>
							<p className="text-xl text-left mt-3">Real feel shade {(Number(selectedCity?.main.feels_like) - 273.15).toFixed()}°C </p>							
						</div>
						: <div>
							<p className="text-7xl">{((Number(selectedCity?.main.temp) - 273.15) * 9 / 5 + 32).toFixed()}°F </p>
							<p className="text-xl text-left mt-3">Real feel shade {((Number(selectedCity?.main.feels_like) - 273.15) * 9 / 5 + 32).toFixed()}°F </p>
						</div>
					}
					<p className="text-left mt-1">Humidity {selectedCity?.main.humidity} %</p>
					<p className="text-left mt-1">Latitude {selectedCity?.coord.lat} </p>
					<p className="text-left mt-1">Longitude {selectedCity?.coord.lon} </p>
					
				</div>
				<div className="text-center">
					<div className="flex">
						<div className="w-1/2">
							<p>Sunrise</p>
							<img className="w-24 mx-auto bg-blue-300 bg-opacity-25 rounded-md px-3"
								src="https://cdn-icons-png.flaticon.com/512/1163/1163765.png" alt="sunrise" />
							<p>{timeSunrise}</p>
						</div>
						<div className="w-1/2">
							<p>Sunset</p>
							<img className="w-24 mx-auto bg-blue-600 bg-opacity-50 rounded-md px-3 shadow-2xl"
								src="https://cdn-icons-png.flaticon.com/512/362/362409.png" alt="sunrise" />
							<p>{timeSunset}</p>
						</div>
					</div>
					{viewCelsius
						? <div className="mt-4 flex flex-col gap-2">
							<p className="text-left">Min. temperature: {(Number(selectedCity?.main.temp_min) - 273.15).toFixed()}°C  </p>
							<p className="text-left">Max. temperature: {(Number(selectedCity?.main.temp_max) - 273.15).toFixed()}°C </p>
						</div>
						: <div>
							<p className="text-left">Min. temperature: {((Number(selectedCity?.main.temp_min) - 273.15) * 9 / 5 + 32).toFixed()}°F </p>
							<p className="text-left mt-1">Max. temperature: {((Number(selectedCity?.main.temp_max) - 273.15) * 9 / 5 + 32).toFixed()}°F</p>
						</div>
					}
					<p className="text-left mt-1">Cloudiness: {selectedCity?.clouds.all} %</p>
					<p className="text-left mt-1">Wind speed: {selectedCity?.wind.speed} m/sec </p>
				</div>
			</div>
		</div>
	)
}

export default ShowResults