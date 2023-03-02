// @ts-nocheck
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { convertToUSD } from '../../helpers/currencyConverter';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  layout: {
    padding: {
      top: 20
    }
  },
  scales: {
    y: {
      ticks: {
        color: '#6c6c6c'
      },
      title: {
        display: true,
        text: 'Investment Amount ($)',
        color: '#6c6c6c'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Investment Products',
        color: '#6c6c6c',
        padding: {
          top: 20
        }
      },
      ticks: {
        color: '#6c6c6c',
        callback: function (value) {
          const label = this.getLabelForValue(value);

          const cropLength = 20;
          if (label.length > cropLength) {
            return label.substr(0, cropLength) + '...'; //truncate
          } else {
            return label;
          }
        }
      }
    }
  },
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    datalabels: {
      color: 'white',
      anchor: 'end',
      align: 'end',
      font: {
        size: 10
      },
      formatter: function (value, context) {
        return convertToUSD(value);
      }
    }
  }
};
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
const colorsLight = [
  '#d6ae5f',

  '#dcb66f',

  '#e2be7e',

  '#e7c78e',

  '#eccf9d',

  '#f1d7ad',

  '#f6e0bd'
];

export function VerticalBar({ dataset, client }) {
  const [dataLabels, setDataLabels] = useState(null);
  const [dataValues, setDataValues] = useState(null);

  useEffect(() => {
    const labels = dataset?.weights
      ?.filter(weightLabel => weightLabel.value !== 0)
      .map(weightLabel => weightLabel.type);
    const values = dataset?.weights?.map(weightLabel => {
      const percentage = (weightLabel.value * 100).toFixed(1);
      return (client?.latestInvestment?.amount * percentage) / 100;
    });
    setDataLabels(labels);
    setDataValues(values?.slice(0, labels?.length));
  }, [dataset]);

  const data = {
    labels: dataLabels,
    datasets: [
      {
        label: 'Dataset 1',
        tooltip: {
          mode: 'label',
          callbacks: {
            label: function (tooltipItems, data) {
              return convertToUSD(tooltipItems.raw) + ' invested';
            }
          }
        },
        data: dataValues,
        backgroundColor: colors,
        borderWidth: 3,
        maxBarThickness: 80
      }
    ]
  };
  return dataLabels && dataValues && <Bar options={options} data={data} />;
}
