import React, { useEffect, useState } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  

} from "@mui/material";
import Infobox from './Infobox';
import Map from './Map';
import './App.css';
import Table from './Table';
import { sortData } from './Util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";



function App() {
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState('worldwide')
  const [countryInfo, setcountryInfo] = useState({})
  const [tableData, settableData] = useState([])
  const [mapCenter, setmapCenter] = useState({lat:34.80746, lng:-40.4796});
  const [mapZoom , setmapZoom] = useState(3);
  const [mapcountries, setmapcountries]=useState([])
  const [casesType, setcasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setcountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")

        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          settableData(sortedData);
          setmapcountries(data);
          setcountries(countries);

        });
    };
    getCountriesData();

  }, []);
  console.log(casesType);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    setcountry(countryCode);
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setcountry(countryCode);
        setcountryInfo(data);
        setmapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setmapZoom(4);
      });
  };

    
  
  return (
    <div className="App">
      <div className='app_left'>
      <div className='app_header'>

<h1>covid tracker</h1>

<FormControl className="app_dropdown">

  <Select
    variant="outlined"
    onChange={onCountryChange}
    value={country}
  >
    <MenuItem value="worldwide">worldwide</MenuItem>
    {countries.map((country) => (
      <MenuItem value={country.value}>{country.name}</MenuItem>
    ))}

  </Select>


</FormControl>
</div>
<div className='app_stats'>

<Infobox title="coronavirus cases" cases={countryInfo.todayCases}  total={countryInfo.cases} />
<Infobox title="Recovery cases "   cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
<Infobox title="Deaths     "       cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
</div>
<Map
   countries={mapcountries}
   casesType={casesType}
   center={mapCenter}
   zoom={mapZoom}
/>
</div>
  <Card className='app_right'>
     <CardContent>
       <h3>Live cases by country</h3>
       <Table countries={tableData}/>
       <h3>Worldwide new cases</h3>
       <LineGraph/>
     </CardContent>

  </Card>
      </div>
      
  );
}


export default App;
