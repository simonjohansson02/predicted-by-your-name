import "./App.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import debounce from "lodash.debounce";
import TableInfo from "../Table/Table";
const countriesQuery = require("countries-code");

function App() {
  const [apiInfo, setApiInfo] = useState({});

  const apiCalls = async (e) => {
    const name = e.target.value;

    if (name.length <= 0) {
      setApiInfo("");
      return;
    }

    const response1 = await fetch(`https://api.agify.io?name=${name}`);
    const data1 = await response1.json();

    const response2 = await fetch(`https://api.genderize.io?name=${name}`);
    const data2 = await response2.json();

    const response3 = await fetch(`https://api.nationalize.io?name=${name}`);
    const data3 = await response3.json();

    setApiInfo({
      name: data1.name,
      age: data1.age,
      gender: data2.gender,
      countries: [
        {
          info: data3.country[0],
          name: countriesQuery.getCountry(data3.country[0]?.country_id),
        },
        {
          info: data3.country[1],
          name: countriesQuery.getCountry(data3.country[1]?.country_id),
        },
        {
          info: data3.country[2],
          name: countriesQuery.getCountry(data3.country[2]?.country_id),
        },
      ],
    });
  };

  const debouncedApiCall = () => {
    return debounce(apiCalls, 1000, {
      leading: false,
      trailing: true,
    });
  };

  return (
    <Box className="App">
      <TextField
        id="outlined-search"
        label="First Name HERE"
        type="search"
        onChange={debouncedApiCall()}
      />
      <TableInfo apiInfo={apiInfo} />
    </Box>
  );
}

export default App;
