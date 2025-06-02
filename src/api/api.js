import axios from "axios";

export const BACKEND_ENDPOINT = "https://crio-location-selector.onrender.com"

export const fetchCountries = async () => {
    try{
        const res = await axios.get(`${BACKEND_ENDPOINT}/countries`)
        console.log(res.data);
        return res.data;
    }   
    catch(e){
        console.error(e);
    }
}