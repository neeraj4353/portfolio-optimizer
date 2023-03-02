import { Chart } from 'react-google-charts';
import { useEffect, useState } from 'react';
import { debounce } from '../../helpers/general';

export function PieChartGoogle({ dataset }) {
  const [chartData, setChartData] = useState(null);
  const finalData = [['Products', 'Percentage']];
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });

  const colorsLight = [
    '#d6ae5f',

    '#dcb66f',

    '#e2be7e',

    '#e7c78e',

    '#eccf9d',

    '#f1d7ad',

    '#f6e0bd'
  ];
  const colors = [
    // '#4a3d22',
    '#d0a64f',
    '#6f5b33',
    '#947a44',
    '#c0a266',
    '#c7ad77',
    '#ceb788',
    '#d5c199',
    '#dcccaa'
  ];
  const options = {
    is3D: true,
    backgroundColor: 'transparent',
    height: '400px',
    width: '545px',
    colors: colors,
    animation: { startup: true, duration: 1000, easing: 'out' },
    pieSliceTextStyle: { color: '#fff', fontName: 'Roboto', fontSize: 18 },
    legend: {
      textStyle: {
        fontName: 'Roboto',
        fontSize: 16,
        color: '#6c6c6c',
        marginTop: 50
      },
      alignment: 'center',
      position: dimensions.width <= 1200 ? 'none' : 'center'
    },
    chartArea: { width: '100%' }
  };

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }, 1000);

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  });

  useEffect(() => {
    const labels = dataset?.weights?.map(weightLabel => {
      if (weightLabel.value !== 0)
        finalData.push([weightLabel.type, weightLabel.value]);
    });
    setChartData(finalData);
  }, [dataset]);

  return (
    chartData && (
      <Chart
        className="pie-chart"
        chartType="PieChart"
        data={chartData}
        options={options}
      />
    )
  );
}
