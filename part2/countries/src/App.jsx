import { useEffect, useState } from 'react'
import Search from './components/Search'
import countriesService from './services/countriesService';
import Notification from './components/Notification';
import CountriesMatched from './components/CountriesMatched';
import Country from './components/Country';

let hasFetch = false;

function App() {

  const [country, setCountry] = useState(null);
  const [allCountries, setAllCountries] = useState(null);
  const [notification, setNotification] = useState({ message: null, isError: false });
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {

    if (!searchValue?.trim()) return

    // countries data will only be load after input search change with a valid value, preventing innecesary requests on each page refresh
    if (!hasFetch) {
      hasFetch = true
      countriesService.getAll()
        .then(setAllCountries)
        .catch(() => {
          setNotification({ message: 'Error retrieving countries from database. Try again later', isError: true })
          setTimeout(() => {
            setNotification({ message: null, isError: false })
          }, 4000)
        })
    }
  }, [searchValue])

  const handleChange = ({ currentTarget: { value } }) => {
    setSearchValue(value)
    setCountry(null)

    const isValid = /^[a-z]+(\s[a-z]+)*$/i.test(value) && !/\d/.test(value)

    if (!isValid && value) {
      setNotification({ message: `'${value}' is not a valid search`, isError: true })
      return
    }

    setNotification({ message: null, isError: false })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchValue) return
    const exactMatch = filterCountries(searchValue).find(
      ({ name: { common } }) => common.toLowerCase().trim() === searchValue.toLowerCase().trim()
    )
    setCountry(exactMatch || null)
  }

  const handleShowBtnClick = (commonName) => {
    const exactMatch = filterCountries(commonName).find(
      ({ name: { common } }) => common === commonName
    )
    setCountry(exactMatch || null)
  }

  const filterCountries = (name) => {
    return allCountries?.filter(({ name: { common } }) =>
      common.toLowerCase().includes(name.toLowerCase().trim())
    )
  }

  const countries = filterCountries(searchValue)

  return (
    <>
      <h1>Data for Countries</h1>
      <Search onChange={handleChange} onSubmit={handleSubmit} value={searchValue} />
      <Notification message={notification.message} isError={notification.isError} />

      {country ? <Country data={country} /> :
        searchValue && (
          countries?.length ?
            countries.length === 1 ?
              <Country data={countries[0]} />
              :
              countries.length <= 10 ?
                <CountriesMatched countries={countries} onClick={handleShowBtnClick} />
                :
                <p>Too many matches, specify another filter</p>
            :
            <p>No countries found</p>
          )
      }
    </>
  )
}

export default App
