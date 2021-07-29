import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import { flatten } from "lodash";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { filterData } from "../functions";
function DataChart() {
  const countryData = useSelector((state) => state.countryData);

  const [filteredData, setFilteredData] = useState([]);
  const [HACheck, setHACheck] = useState(true);
  const [VUCheck, setVUCheck] = useState(true);
  const [CCCheck, setCCCheck] = useState(true);

  const HAToggleCheck = (e) => {
    setHACheck(e.target.checked);
  };

  const VUToggleCheck = (e) => {
    setVUCheck(e.target.checked);
  };

  const CCToggleCheck = (e) => {
    setCCCheck(e.target.checked);
  };

  useEffect(() => {
    
    let enabledData = [];
    let sortedData = filterData(countryData);

    if (countryData.length) {
      let HAData = [];
      if (HACheck)
        HAData = sortedData.datasets.filter((data) =>
          data.label.startsWith("HA")
        );

      let VUData = [];
      if (VUCheck)
        VUData = sortedData.datasets.filter((data) =>
          data.label.startsWith("VU")
        );

      let CCData = [];
      if (CCCheck)
        CCData = sortedData.datasets.filter((data) =>
          data.label.startsWith("CC")
        );

      enabledData = flatten([...HAData, ...VUData, ...CCData]);
    }

    setFilteredData({ ...sortedData, datasets: enabledData });
  }, [countryData, HACheck, VUCheck, CCCheck]);

  return (
    <div>
      <FormGroup row style={{ justifyContent: "space-around" }}>
        <FormControlLabel
          control={
            <Checkbox checked={HACheck} name="HA" onChange={HAToggleCheck} />
          }
          label="Hazard"
        ></FormControlLabel>
        <FormControlLabel
          control={
            <Checkbox checked={VUCheck} name="VU" onChange={VUToggleCheck} />
          }
          label="Vulnerability "
        ></FormControlLabel>
        <FormControlLabel
          control={
            <Checkbox checked={CCCheck} name="CC" onChange={CCToggleCheck} />
          }
          label="Lack of Coping Capacity"
        ></FormControlLabel>
      </FormGroup>
      <Line
        data={{
          ...filteredData,
        }}
        width={600}
        height={500}
        options={{
          tooltips: {
            mode: "index",
            intersect: false
          },
          hover: {
            mode: 'index',
            intersect: false
         },
          scales: {
            y: {
              min: 0,
              max: 10,
            },
          },
          plugins: {
            legend: {
              display: true,
              fullSize: false,
              position: 'bottom',
              align : 'start',
              labels: {
                boxWidth: 5,
                boxHeight: 5
              }
            },
          },
        }}
      />
    </div>
  );
}

DataChart.defaultProps = {
  data: [],
};

export default DataChart;
