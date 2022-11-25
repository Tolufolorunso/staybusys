import Head from "next/head";
// import Head from "next/head";
import * as React from "react";
import { useState } from "react";
import { Box, Grid, Input, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import CountriesData from '../../data/countries_cities';
import { useRouter } from "next/router";

import Layout from "src/components/Layout";
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  bgcolor: "b#F7F4EF",
  borderRadius: "7px",
};

const availabilities = [
  'Weekdays',
  'Weekends',
]

const currencies = [
  'Dollar',
  'Euro',
  'Naira',
]

const Personaldetails = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [cities, setCities] = useState([])
  const [availability, setAvailability] = useState('')
  const [currency, setCurrency] = useState('')
  const countries = [];




  const customStyles = {
    indicatorSeparator: () => ({
      // none of react-select's styles are passed to <Control />
      border: 0,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      border: "1px solid #969696",
      display: "flex",
      borderRadius: "7px",
      marginTop: "10px",
      height: "50px",
      marginTop:'0.95rem',
      background: 'rgba(255, 204, 0, 0.03)',
      border: '1px solid rgba(255, 204, 0, 0.3)',
      paddingRight: "12px",
      paddingLeft: "12px",
      fontFamily: "Euclid Circular A",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "140%",
      /* or 25px */
      width: "100%",
      letterSpacing: " 0.03em",

      color: "#2F2E40 ",
    }),
    indicatorsContainer: () => ({
      color: "#2F2E40 !important",
    }),
    dropdownIndicator: () => ({
      color: "#2F2E40 !important",
      marginTop: "13px",
    }),
  };
 
  const router = useRouter();
  const handleSelectCountry = (event) => {
    var selectedCountry = event.target.value;
    var allCities = CountriesData[selectedCountry];
    setCities(allCities);
    setCountry(selectedCountry);
};

const handleSelectCity = (event) => {
    var selectedCity = event.target.value;
    setCity(selectedCity);
};

for (var item in CountriesData) {
    countries.push(item)
}

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('here');
    router.push("/profileImage")

}

  function proceed() {
    console.log("Proceed");

    
  }
  return (
    <>
      <Head>
        <title>Enter Personal Details | Material Kit</title>
      </Head>
      <Layout>
      <Grid container
sx={containerStyle}
className="form__container">
            <Grid item
sm={12}>
                <Grid item
sm={12}>
                    <Box sx={{ position: 'relative' }}>
                        <Grid item
sm={8}
sx={{ mx: 'auto' }}>
                            <h5 className="form__container_heading"> Enter your details</h5>
                        </Grid>
                        <span className={'update__profile update__profile_counter_1'}>1/3</span>
                    </Box>
                </Grid>
                <Grid item
sm={8}
xs={12}
sx={{ mx: 'auto' }}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        className="form__container_form"
                    >
                        <Box>
                            <Grid container>
                                <Grid item
xs={12}
sm={6}>
                                    <Box className="form__container"
sx={{ mr: 2 }}>
                                        <InputLabel shrink
htmlFor="firstName">
                                            First Name:
                                        </InputLabel>
                                        <Box className="form__input">
                                            <Input
                                                id="firstName"
                                                autoComplete="off"
                                                name="firstName"
                                                type="text"
                                                required
                                                fullWidth
                                                autoFocus
                                                disableUnderline
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item
xs={12}
sm={6}>
                                    <Box className="form__container"
sx={{ ml: 2 }}>
                                        <InputLabel shrink
htmlFor="lastName">
                                            Last Name:
                                        </InputLabel>
                                        <Box className="form__input">
                                            <Input
                                                id="lastName"
                                                autoComplete="off"
                                                name="lastName"
                                                type="text"
                                                required
                                                fullWidth
                                                disableUnderline
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item
xs={12}
sm={6}>
                                    <Box className="form__container"
sx={{ mr: 2 }}>
                                        <InputLabel shrink
htmlFor="firstName">
                                            Country:
                                        </InputLabel>
                                        <Box className="form__input">
                                            <Select
                                                value={country}
                                                onChange={handleSelectCountry}
                                                className="form__select"
                                                fullWidth
                                                required
                                                renderValue={(country) => {
                                                    if (!country) {
                                                        return <em>Select Country</em>;
                                                    }
                                                    return country;
                                                }}
                                                >
                                                    <MenuItem disabled
value="">
                                                        <em>Select Country</em>
                                                    </MenuItem>
                                                    {countries.map((country) => (
                                                        <MenuItem
                                                            key={country}
                                                            value={country}
                                                        >
                                                            {country}
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item
xs={12}
sm={6}>
                                    <Box className="form__container"
sx={{ ml: 2 }}>
                                        <InputLabel shrink
htmlFor="lastName">
                                            City:
                                        </InputLabel>
                                        <Box className="form__input">
                                            <Select
                                                value={city}
                                                onChange={handleSelectCity}
                                                required
                                                className="form__select"
                                                fullWidth
                                                renderValue={(city) => {
                                                    if (!city) {
                                                        return <em>Select City</em>;
                                                    }
                                                    return city;
                                                }}
                                                >
                                                    <MenuItem disabled
value="">
                                                        <em>Select City</em>
                                                    </MenuItem>
                                                    {cities.map((city) => (
                                                        <MenuItem
                                                            key={city}
                                                            value={city}
                                                        >
                                                            {city}
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>

                             <Grid container>
                                <Grid item
xs={12}
sm={6}>
                                    <Box className="form__container"
sx={{ mr: 2 }}>
                                        <InputLabel shrink
htmlFor="availability">
                                            When are you more available:
                                        </InputLabel>
                                        <Box className="form__input">
                                            <Select
                                                value={availability}
                                                onChange={(e) => setAvailability(e.target.value)}
                                                required
                                                className="form__select"
                                                fullWidth
                                                renderValue={(availability) => {
                                                    if (!availability) {
                                                        return <em>Select Availability</em>;
                                                    }
                                                    return availability;
                                                }}
                                                >
                                                    <MenuItem disabled
value="">
                                                        <em>Select Availability</em>
                                                    </MenuItem>
                                                    {availabilities.map((availability) => (
                                                        <MenuItem
                                                            key={availability}
                                                            value={availability}
                                                        >
                                                            {availability}
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item
xs={12}
sm={6}>
                                    <Box className="form__container"
sx={{ ml: 2 }}>
                                        <InputLabel shrink
htmlFor="currency">
                                            Preferred Currency:
                                        </InputLabel>
                                        <Box className="form__input">
                                            <Select
                                                value={currency}
                                                onChange={(e) => setCurrency(e.target.value)}
                                                required
                                                className="form__select"
                                                fullWidth
                                                renderValue={(currency) => {
                                                    if (!currency) {
                                                        return <em>Select Currency</em>;
                                                    }
                                                    return currency;
                                                }}
                                                >
                                                    <MenuItem disabled
value="">
                                                        <em>Select Currency</em>
                                                    </MenuItem>
                                                    {currencies.map((currency) => (
                                                        <MenuItem
                                                            key={currency}
                                                            value={currency}
                                                        >
                                                            {currency}
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        
                            <Grid container
justifyContent="center">
                                <Grid item
sm={6}>
                                    <LoadingButton
                      loading={loading}
                                     
                                        type="submit"
                                        size="large"
                                        variant="contained"
                                        loadingPosition="end" 
                                        className="default__button"
                                        fullWidth
                                    >
                                        Proceed
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Personaldetails;
