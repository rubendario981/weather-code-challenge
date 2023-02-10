export default  interface IGeneral {
    name: string,
    main: {
        feels_like: number,
        humidity: number,
        pressure: number,
        temp: number,
        temp_max: number,
        temp_min: number
    },
    coord: {
        lat?: number,
        lon?: number,
    },
    sys: {
        country: string,
        id: number,
        sunrise: number,
        sunset: number
    },
    clouds: {
        all: number
    },
    wind: {
        speed: number,
        deg: number
      },
}