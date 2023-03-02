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
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  ChartDataLabels,
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
  interaction: {
    mode: 'index' as const,
    intersect: false
  },
  scales: {
    y: {
      ticks: {
        color: '#6c6c6c'
      },
      title: {
        display: true,
        text: 'Returns (%)',
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
        callback: function (value, index, labels) {
          const label = this.getLabelForValue(value);

          const cropLength = labels.length > 4 ? 5 : 20;
          if (label.length > 4) {
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
    datalabels: {
      color: 'white',
      anchor: 'end',
      align: 'end',
      font: {
        size: 10
      },
      formatter: function (value, context) {
        return value + '%';
      }
    },
    legend: {
      display: false
    }
  }
};

const labels = [
  'Global Bonds (Unhedged)',
  'Total US Bond Market',
  'US Large Cap Growth',
  'US Large Cap Value',
  'US Small Cap Growth',
  'US Small Cap Value',
  'Emerging Markets',
  'Intl Developed ex-US Market'
];

const line1Color = '#d0a64f';
// const line3Color = "#c0a266";
const line2Color = '#ceb788';
const tooltip = {
  mode: 'label',
  callbacks: {
    label: function (tooltipItems, data) {
      return `${tooltipItems?.dataset?.label} ${tooltipItems.raw}%`;
    }
  }
};

export function VerticalBarChart({ dataset, initialResults = false }) {
  const [dataLabels, setDataLabels] = useState(null);

  useEffect(() => {
    const labels = !initialResults
      ? dataset?.weights
          ?.filter(weightLabel => weightLabel.value !== 0)
          ?.map(weightLabel => weightLabel.type)
      : dataset?.weights?.map(weightLabel => weightLabel.type);

    setDataLabels(labels);
  }, [dataset]);

  const data = {
    labels: dataLabels,
    datasets: [
      {
        label: 'Equilibrium Returns',
        tooltip,
        data: !initialResults
          ? dataset?.equilibriumReturns?.slice(0, dataLabels?.length)
          : dataset?.equilibriumReturns,
        borderColor: line1Color,
        backgroundColor: line1Color,
        maxBarThickness: 80
      }
    ]
  };

  if (!initialResults) {
    data.datasets.push({
      label: 'Optimized Returns',
      tooltip,
      data: !initialResults
        ? dataset?.analystViews?.slice(0, dataLabels?.length)
        : dataset?.analystViews,
      borderColor: line2Color,
      backgroundColor: line2Color,
      maxBarThickness: 80
    });
  }

  return dataset?.risk && <Bar options={options} data={data} />;
}
