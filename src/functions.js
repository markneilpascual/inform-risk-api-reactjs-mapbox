import { minBy, maxBy, flattenDeep, flatten, uniq } from "lodash";

export const filterData = (data) => {
    // eslint-disable-next-line array-callback-return

    let chartData = {};
    let datas = [];

    if (data.length) {
        const labels = [...data].map((inform) => {
            return inform.informYear;
        });

        const indicators = uniq(
            flatten(
                [...data].map((inform) => {
                    return inform.data.map((data) => data.IndicatorId);
                })
            )
        );

        data.map((inform) => {
            datas.push(inform.data);
        });

        const datasets = indicators.map((indicator) => {
            return {
                label: indicator,
                borderColor: randomColor(),
                data: datas
                    .map((data) => {
                        return data
                            .filter((d) => d.IndicatorId === indicator)
                            .pop();
                    })
                    .map((data) => {
                        return data ? data.IndicatorScore.toFixed(2) : null;
                    }),
            };
        });

        chartData = { labels: labels, datasets: datasets };
    }

    return chartData;
};

const randomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const getBounds = (coordinates) => {
    let flattenCoordinates = flattenDeep(coordinates);

    let longs = [...flattenCoordinates].filter(
        (coord, index) => index % 2 === 0
    );
    let lats = [...flattenCoordinates].filter(
        (coord, index) => index % 2 === 1
    );
    return [
        [minBy(longs), minBy(lats)],
        [maxBy(longs), maxBy(lats)],
    ];
};
