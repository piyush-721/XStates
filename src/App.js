import React,{useState, useEffect} from "react";

function App() {

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const[selectedCity, setSelecetedCity] = useState("");

  useEffect(() => {
    fetch(" https://crio-location-selector.onrender.com/countries")
    .then((response) => response.json())
    .then((data) => setCountries(data))
    .catch((e) => {
      console.error(e);
    })
  },[])

  // console.log(countries);
  // console.log(selectedCountry);

  useEffect(() => {
    if(selectedCountry){
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
      .then((response) => response.json())
      .then((data) => setStates(data))
      .catch((e) => {
        console.error(e);
      })
    }

  },[selectedCountry]);

  // console.log(states);

  useEffect(() => {
    if(selectedState){
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((e) => {
        console.error(e);
      })
    }
  }, [selectedState]);

  // console.log(cities);

  const onCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setStates([]);
    setSelectedState("");
    setCities([]);
    setSelecetedCity("");
  }

  const onStateChange = (e) => {
    setSelectedState(e.target.value);
    setCities([]);
    setSelecetedCity("");
  }

  return (
    <>
      <h1 style={{textAlign:"center"}}>Set Location</h1>
    <div style={{display:"flex", justifyContent:"center"}}>
      <select value={selectedCountry} key={selectedCountry} onChange={(e) => onCountryChange(e)}>
        <option value="" disabled>Select Country</option>
        {
          countries.map((item, index) => (
            <option value={item} key={item}>{item}</option>
          ))
        }
      </select>


      <select key={selectedState || "state"} value={selectedState} disabled = {!selectedCountry} onChange={(e) => onStateChange(e)}>
        <option value="" disabled>Select State</option>
        {
          states.map((item) => (
            <option value={item} key={item}>{item}</option>
          ))
        }
      </select>


      <select value={selectedCity} key={selectedCity || "city"} disabled ={!selectedState} onChange={(e) => setSelecetedCity(e.target.value)}>
        <option value="" disabled>Select City</option>
        {
          cities.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))
        }
      </select>
    </div>
    </>
  );
}

export default App;
