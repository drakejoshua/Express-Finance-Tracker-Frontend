/* 
    [ CoinChart.jsx ]
     
    This is a reusable component for rendering an area chart of cryptocurrency price 
    data using the react-apexcharts library. The chart's appearance ( colors, tooltips, etc. ) is dynamically
    adjusted based on the current theme ( light or dark ) provided by the ThemeProvider context. 
    The chart can also be made interactive ( e.g., show tooltips on hover ) by passing the appropriate prop.
    The component accepts two props: data ( an array of series data for the chart ) and isInteractive 
    ( a boolean to enable/disable interactivity ).

    [!]: you need to wrap the imported instance of the component in a wrapper/parent element as it takes up
        the width and height of it's parent in order to render properly

    Example usage: 
        <CoinChart 
            data={[
                {
                    name: "bitcoin",
                    data: [ 30, 45, 70, 55, 80, 45, 70, 55, 80, 45, 70, 55 ]
                }
            ]}
            isInteractive={ true }
        />
*/



// import component dependencies
import React from 'react'
import { useTheme } from '../providers/ThemeProvider.jsx'
import Chart from 'react-apexcharts/core'
import 'apexcharts/area'
import colors from 'tailwindcss/colors'


// define and export the CoinChart component
export default function CoinChart({ data = [], isInteractive = false }) {
    // get the current theme from the ThemeProvider
    const { theme } = useTheme()

    return (
        // use the Chart component from react-apexcharts to render an area chart 
        // with the provided data and options ( data and interaction state are extracted from props )
        <Chart 
            type='area'
            series={ data }
            options={{
                // remove all axis labels, borders, ticks, and grid lines for a 
                // cleaner look
                xaxis: {
                    labels: { show: false },
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    crosshairs: {
                        show: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                yaxis: {
                    labels: { show: false },
                },
                grid: {
                    show: false,
                },
                // remove tooltips on the X axis and enable tooltip on the 
                // chart's stroke only if the chart is interactive ( e.g., on hover )
                tooltip: {
                    enabled: isInteractive,
                    x: {
                        show: false,
                    }
                },
                // remove the default data labels on the chart's stroke
                dataLabels: {
                    enabled: false,
                },
                // set the fill color and opacity based on the current theme ( light or dark )
                fill: {
                    type: "solid",
                    colors: [( theme == "light" ? "#b9f8cf" : colors.white )],
                    opacity: 0.2,
                },
                // set the stroke color based on the current theme ( light or dark )
                colors: [
                    ( theme == "light" ? colors.green[400] : colors.white ),
                    ( theme == "light" ? colors.green[500] : colors.white ),
                    ( theme == "light" ? colors.green[600] : colors.white ),
                    ( theme == "light" ? colors.green[700] : colors.white ),
                    ( theme == "light" ? colors.green[800] : colors.white ),
                    ( theme == "light" ? colors.green[900] : colors.white ),
                ]
            }}
            width="100%"
            height="100%"
        />
    )
}
