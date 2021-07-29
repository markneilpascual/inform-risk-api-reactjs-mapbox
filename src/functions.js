import { minBy, maxBy, flattenDeep } from "lodash";

export const filterData = (data) => {
    // eslint-disable-next-line array-callback-return
  
    let chartData = [];
    let datas = [];
  
    if (data.length) {
      
      chartData = {
        labels: [...data].map((inform) => {
          return inform.informYear;
        }),
      };
  
      let indicators = [...data].map(inform => {
        return inform.data.map(data => data.IndicatorId)
      }).pop()
  
      data.map(inform => {
        datas.push(inform.data)
      })
          
      let datasets = indicators.map(indicator => {
        return {label: indicator, borderColor: randomColor(), data: datas.map(data => {
          return data.filter( _data => _data.IndicatorId === indicator).pop()
        }).map(data => {
          return data ? data.IndicatorScore.toFixed(2) : null
        })}
      })
      chartData = {...chartData, datasets: datasets}
    }
    
    return chartData;
  };
  
  const randomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }

export const getBounds = (coordinates) => {
  let flattenCoordinates = flattenDeep(coordinates);

  let longs = [...flattenCoordinates].filter((coord, index) => index % 2 === 0);
  let lats = [...flattenCoordinates].filter((coord, index) => index % 2 === 1);
  return [
    [minBy(longs), minBy(lats)],
    [maxBy(longs), maxBy(lats)],
  ];
};
