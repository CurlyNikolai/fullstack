import {useState, useEffect} from 'react'
import axios from 'axios'

function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = (filter === '')
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  
  return (
  <div>
    <Filter filter={filter} handleFilterChange={handleFilterChange}/>
    <Countries countries={countriesToShow}/>
  </div>
  );
}

const Countries = ({countries}) => {
  if (countries.length > 10) return "Too many matches, specify another filter!"
  if (countries.length === 1) return <CountryInfo key={countries[0].name.common} country={countries[0]}/> 
  return countries.map(country => <CountryName key={country.name.common} country={country}/>)
}

const CountryInfo = ({country}) => {
  const languages = Object.values(country.languages)
  const [weather, setWeather] = useState({
    current: {
      temp: 0
    }
  })

  const hook = () => {
    const api_key = process.env.REACT_APP_API_KEY
    const lat = 60.17
    const lng = 24.93


    axios
      .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
  }

  useEffect(hook, [])

  return (
  <div>
    <h1>{country.name.common}</h1>
    <p>
      capital {country.capital} <br />
      area {country.area}
    </p>
    <h3>languages:</h3>
    <ul>
      {languages.map(language => <li key={language}>{language}</li>)}
    </ul>
    <img src={country.flags.png} alt="flag"></img>
    <h2>Weather in {country.capital}</h2>
    <p>{weather.current.temp - 272.15}</p>
  </div>)
}

const CountryName = ({country}) => {
  const [show, setShow] = useState(false)
  
  if (show) {
    return (
      <>
        {country.name.common} <button onClick={()=>{setShow(!show)}}>{show ? "don't show" : 'show'}</button><br />
        <CountryInfo country={country}/>
        <br></br>
      </>
    )
  }

  return <>{country.name.common} <button onClick={()=>{setShow(!show)}}>{show ? "don't show" : 'show'}</button><br /></>
}

const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

export default App;
