function CountriesMatched({countries, onClick}) {
  return (
    <ul>
      {countries.map(country => <li key={country.name.common}>{country.name.common} <button onClick={() => onClick(country.name.common)}>Show</button></li>)}
    </ul>
  )
}

export default CountriesMatched