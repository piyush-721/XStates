import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_ENDPOINT, fetchCountries } from "../api/api";
import { Box, Typography } from "@mui/material";

export default function States() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const specificCountryStates = async (country) => {
    if (!country) return;
    try {
      const res = await axios.get(`${BACKEND_ENDPOINT}/country=${country}/states`);
      setStates(res.data);
      setSelectedState("");
      setCities([]);
      setSelectedCity("");
    } catch (e) {
      console.error(e);
      setStates([]);
    }
  };

  const specificStateCities = async (country, state) => {
    if (!country || !state) return;
    try {
      const res = await axios.get(`${BACKEND_ENDPOINT}/country=${country}/state=${state}/cities`);
      setCities(res.data);
      setSelectedCity("");
    } catch (e) {
      console.error(e);
      setCities([]);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCountries();
      if (data && Array.isArray(data)) {
        setCountries(data);
      }
    };
    getData();
  }, []);
//   console.log(countries);
  

  useEffect(() => {
    if (selectedCountry) {
      specificCountryStates(selectedCountry);
    } else {
      setStates([]);
      setSelectedState("");
      setCities([]);
      setSelectedCity("");
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      specificStateCities(selectedCountry, selectedState);
    } else {
      setCities([]);
      setSelectedCity("");
    }
  }, [selectedState]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>Select Location</Typography>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        {/* Country Dropdown */}
        <select
          key={selectedCountry}
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          style={{ width: 200, padding: 8 }}
        >
          <option value="" disabled>Select Country</option>
          {countries.map((country, index) => (
            <option key={`${country}-${index}`} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* State Dropdown */}
        <select
          key={selectedState}
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
          style={{ width: 200, padding: 8 }}
        >
          <option value="" disabled>Select State</option>
          {states.map((state, index) => (
            <option key={`${state}-${index}`} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* City Dropdown */}
        <select
          key={selectedCity}
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
          style={{ width: 200, padding: 8 }}
        >
          <option value="" disabled>Select City</option>
          {cities.map((city, index) => (
            <option key={`${city}-${index}`} value={city}>
              {city}
            </option>
          ))}
        </select>
      </Box>

      {/* Display Selected Location */}
      {selectedCity && selectedState && selectedCountry && (
        <Typography variant="h6" sx={{ mt: 4 }}>
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </Typography>
      )}
    </Box>
  );
}







// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BACKEND_ENDPOINT, fetchCountries } from "../api/api";
// import { Autocomplete, TextField, Box, Typography } from "@mui/material";

// export default function States() {
//   const [countries, setCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState(null);

//   const [states, setStates] = useState([]);
//   const [selectedState, setSelectedState] = useState(null);

//   const [cities, setCities] = useState([]);
//   const [selectedCity, setSelectedCity] = useState(null);

//   const specificCountryStates = async (country) => {
//     if (!country) return;
//     try {
//       const res = await axios.get(`${BACKEND_ENDPOINT}/country=${country}/states`);
//       setStates(res.data);
//       setSelectedState(null); // Reset state when country changes
//       setCities([]); // Clear cities as well
//       setSelectedCity(null);
//     } catch (e) {
//       console.error(e);
//       setStates([]);
//       setSelectedState(null);
//       setCities([]);
//       setSelectedCity(null);
//     }
//   };

//   const specificStateCities = async (country, state) => {
//     if (!country || !state) return;
//     try {
//       const res = await axios.get(`${BACKEND_ENDPOINT}/country=${country}/state=${state}/cities`);
//     //   console.log(res.data);
//       setCities(res.data);
//       setSelectedCity(null); // Reset city when state changes
//     } catch (e) {
//       console.error(e);
//       setCities([]);
//       setSelectedCity(null);
//     }
//   };

//   useEffect(() => {
//     const getData = async () => {
//       const data = await fetchCountries();
//       if (data && Array.isArray(data)) {
//         const trimmed = data.map((name) => name.trim());
//         const unique = Array.from(new Set(trimmed));
//         setCountries(unique);
//       }
//     };
//     getData();
//   }, []);

//   useEffect(() => {
//     if (selectedCountry) {
//       specificCountryStates(selectedCountry);
//     } else {
//       setStates([]);
//       setSelectedState(null);
//       setCities([]);
//       setSelectedCity(null);
//     }
//   }, [selectedCountry]);

//   useEffect(() => {
//     if (selectedCountry && selectedState) {
//       specificStateCities(selectedCountry, selectedState);
//     } else {
//       setCities([]);
//       setSelectedCity(null);
//     }
//   }, [selectedCountry, selectedState]);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         marginTop: 5,
//         gap: 3,
//       }}
//     >
//       <Typography variant="h4" component="h1" gutterBottom>
//         Select Location
//       </Typography>

//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           gap: 2,
//           justifyContent: "center",
//         }}
//       >
//         {/* Country Dropdown */}
//         <Autocomplete
//           options={countries}
//           value={selectedCountry}
//           onChange={(e, newValue) => setSelectedCountry(newValue)}
//           getOptionLabel={(option) => option || ""}
//           isOptionEqualToValue={(option, value) => option === value}
//           sx={{ width: 300 }}
//           renderInput={(params) => <TextField {...params} label="Select Country" />}
//         />

//         {/* State Dropdown */}
//         <Autocomplete
//           options={states}
//           value={selectedState}
//           onChange={(e, newValue) => setSelectedState(newValue)}
//           getOptionLabel={(option) => option || ""}
//           isOptionEqualToValue={(option, value) => option === value}
//           sx={{ width: 300 }}
//           renderInput={(params) => <TextField {...params} label="Select State" />}
//           disabled={!selectedCountry}
//         />

//         {/* City Dropdown */}
//         <Autocomplete
//           options={cities}
//           value={selectedCity}
//           onChange={(e, newValue) => setSelectedCity(newValue)}
//           getOptionLabel={(option) => option || ""}
//           isOptionEqualToValue={(option, value) => option === value}
//           sx={{ width: 300 }}
//           renderInput={(params) => <TextField {...params} label="Select City" />}
//           disabled={!selectedState}
//         />
//       </Box>
//     </Box>
//   );
// }


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BACKEND_ENDPOINT, fetchCountries } from "../api/api";

// export default function States() {
//   const [countries, setCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState(null);

//   const [states, setStates] = useState([]);
//   const [selectedState, setSelectedState] = useState(null);

//   const [cities, setCities] = useState([]);
//   const [selectedCity, setSelectedCity] = useState(null);

//   const specificCountryStates = async (country) => {
//     if (!country) return;
//     try {
//       const res = await axios.get(`${BACKEND_ENDPOINT}/country=${country}/states`);
//       setStates(res.data);
//       setSelectedState(null);
//       setCities([]);
//       setSelectedCity(null);
//     } catch (e) {
//       console.error(e);
//       setStates([]);
//       setSelectedState(null);
//       setCities([]);
//       setSelectedCity(null);
//     }
//   };

//   const specificStateCities = async (country, state) => {
//     if (!country || !state) return;
//     try {
//       const res = await axios.get(`${BACKEND_ENDPOINT}/country=${country}/state=${state}/cities`);
//       setCities(res.data);
//       setSelectedCity(null);
//     } catch (e) {
//       console.error(e);
//       setCities([]);
//       setSelectedCity(null);
//     }
//   };

//   useEffect(() => {
//     const getData = async () => {
//       const data = await fetchCountries();
//       if (data && Array.isArray(data)) {
//         const trimmed = data.map((name) => name.trim());
//         const unique = Array.from(new Set(trimmed));
//         setCountries(unique);
//       }
//     };
//     getData();
//   }, []);

//   useEffect(() => {
//     if (selectedCountry) {
//       specificCountryStates(selectedCountry);
//     } else {
//       setStates([]);
//       setSelectedState(null);
//       setCities([]);
//       setSelectedCity(null);
//     }
//   }, [selectedCountry]);

//   useEffect(() => {
//     if (selectedCountry && selectedState) {
//       specificStateCities(selectedCountry, selectedState);
//     } else {
//       setCities([]);
//       setSelectedCity(null);
//     }
//   }, [selectedCountry, selectedState]);

//   return (
//     <div style={{ marginTop: 50, textAlign: "center" }}>
//       <h1>Select Location</h1>

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           gap: 20,
//           marginTop: 20,
//         }}
//       >
//         {/* Country select */}
//         <select
//           value={selectedCountry}
//           onChange={(e) => setSelectedCountry(e.target.value)}
//           style={{ width: 200, height: 35, fontSize: 16 }}
//         >
//           <option key="default-country" value="">
//             Select Country
//           </option>
//           {countries.map((country) => (
//             <option key={country} value={country}>
//               {country}
//             </option>
//           ))}
//         </select>

//         {/* State select */}
//         <select
//           value={selectedState}
//           onChange={(e) => setSelectedState(e.target.value)}
//           disabled={!selectedCountry}
//           style={{ width: 200, height: 35, fontSize: 16 }}
//         >
//           <option key="default-state" value="">
//             Select State
//           </option>
//           {states.map((state) => (
//             <option key={state} value={state}>
//               {state}
//             </option>
//           ))}
//         </select>

//         {/* City select */}
//         <select
//           value={selectedCity}
//           onChange={(e) => setSelectedCity(e.target.value)}
//           disabled={!selectedState}
//           style={{ width: 200, height: 35, fontSize: 16 }}
//         >
//           <option key="default-city" value="">
//             Select City
//           </option>
//           {cities.map((city) => (
//             <option key={city} value={city}>
//               {city}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Show selection */}
//       {selectedCity && selectedState && selectedCountry && (
//         <p style={{ marginTop: 30, fontSize: 18 }}>
//           You selected {selectedCity}, {selectedState}, {selectedCountry}.
//         </p>
//       )}
//     </div>
//   );
// }
