import React, { useEffect, useState } from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCountries } from "../actions/countriesActions";
import { setCountry } from "../actions/countryActions";
import { setCountryData } from "../actions/countryDataActions";

const informRiskAPIUrl = process.env.REACT_APP_INFORM_RISK_API_URL
const informRiskIndicators = process.env.REACT_APP_INFORM_RISK_INDICATORS
const model = "Global"

function CountrySelection() {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [data, setData] = useState([])
    const [informReleases, setInformReleases] = useState([])
    const [countriesList, setCountriesList] = useState([])
    const countries = useSelector(state => state.countries)
    const dispatch = useDispatch();

    const fetchCountries = async () => {
        let response = await axios.get('data/custom.geo-hd.json')
        await dispatch(setCountries(response.data.features))
        await setCountriesList(response.data.features)
    }

    const selectCountryHandler = async(e) => {
        let selectedCountry = e.target.value;
        setSelectedCountry(selectedCountry)
        let country = countriesList.find( country => country.properties.iso_a3 === selectedCountry)
        dispatch(setCountry(country));
        let data = await getCountryResults(country.properties.iso_a3)
        await setData(data)
        await dispatch(setCountryData(data))
    }

    const fetchInformList = async () => {
        let response = await axios.get(
            `${informRiskAPIUrl}InformAPI/workflows/WorkflowGroups?model=${model}`
          );
        let informList = await response.data
        let filteredInformList = await informList.filter(inform => inform !== "INFORM_LAC" && inform !== "INFORM_LBN")
        return await filteredInformList;
    }

    const fetchWorkflows = async (informList) => {
        let workflows = Promise.all(
            informList.map( async (inform) => {
                let response = await axios.get(`${informRiskAPIUrl}InformAPI/workflows/GetByWorkflowGroup/${inform}`)
                let newWorkFlow = await response.data.pop()
                return await { inform : inform, workflow: newWorkFlow}
            })
        )
        return await workflows
    }

    const getCountryResults = async(country) => {
        let indicatorList = informRiskIndicators

        let data = await Promise.all(
            informReleases.map( async(informRelease) => {
                let response = await axios.get(
                    `${informRiskAPIUrl}InformAPI/countries/Scores/?WorkflowId=${informRelease.workflow.WorkflowId}&Iso3=${country}&IndicatorId=${indicatorList}}`
                  );
                  return await {
                    informYear: informRelease.inform.replace("INFORM", ""),
                    data: response.data,
                  };
            })
        )
        return await data
    }

    useEffect( async () => {
        fetchCountries()
        let informList = await fetchInformList()
        let informReleases = await fetchWorkflows(informList)
        await setInformReleases(informReleases)

        
    }, [])

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="country">Country</InputLabel>
                <Select
                    labelId="country"
                    id="country"
                    onChange={selectCountryHandler}
                    value={selectedCountry || ""}
                >
                    {countries.sort( (a,b) => a.properties.geounit.localeCompare( b.properties.geounit)).map((country, index) => {
                        return (
                            <MenuItem value={country.properties.iso_a3} key={index}>
                                {country.properties.geounit}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    );
}

export default CountrySelection;
