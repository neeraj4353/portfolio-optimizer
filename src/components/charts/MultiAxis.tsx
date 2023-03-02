// @ts-nocheck
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  scales: {
    x: {
      ticks: {
        callback: function (value) {
          const label = this.getLabelForValue(value);

          if (label.length > 6) {
            return label.substr(0, 6) + "..."; //truncate
          } else {
            return label;
          }
        },
      },
    },
  },
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  plugins: {},
};

const labels = [
  "Global Bonds (Unhedged)",
  "Total US Bond Market",
  "US Large Cap Growth",
  "US Large Cap Value",
  "US Small Cap Growth",
  "US Small Cap Value",
  "Emerging Markets",
  "Intl Developed ex-US Market",
];
const line1Color = "#d66a41";
const line2Color = "#d88d49";
const line3Color = "#f2b69a";

export const data = {
  balanced: [
    {
      label: "Implied Returns",
      data: [
        1.287129447, 0.243855185, 6.043556116, 5.154818964, 5.679844655,
        4.390167948, 7.618383844, 6.307626077,
      ].map((v) => v.toFixed(2)),
      borderColor: line1Color,
      backgroundColor: line1Color,
    },
    {
      label: "BL Return Vector",
      data: [
        1.214542374, 0.238496627, 5.563574066, 4.923810322, 5.337816864,
        4.285776209, 7.051882231, 5.864238811,
      ].map((v) => v.toFixed(2)),
      borderColor: line2Color,
      backgroundColor: line2Color,
    },
    {
      label: "Difference",
      data: [
        -0.072587073, -0.005358558, -0.47998205, -0.231008641, -0.342027791,
        -0.10439174, -0.566501613, -0.443387265,
      ].map((v) => v.toFixed(2)),
      borderColor: line3Color,
      backgroundColor: line3Color,
    },
  ],
  aggressive: [
    {
      label: "Implied Returns",
      data: [
        1.287129447, 0.243855185, 6.043556116, 5.154818964, 5.679844655,
        4.390167948, 7.618383844, 6.307626077,
      ].map((v) => v.toFixed(2)),
      borderColor: line1Color,
      backgroundColor: line1Color,
    },
    {
      label: "BL Return Vector",
      data: [
        1.754833253, 0.378198878, 8.498695053, 7.349370801, 8.412439812,
        6.608655876, 10.38861666, 8.607632293,
      ].map((v) => v.toFixed(2)),
      borderColor: line2Color,
      backgroundColor: line2Color,
    },
    {
      label: "Difference",
      data: [
        0.467703807, 0.134343693, 2.455138936, 2.194551837, 2.732595157,
        2.218487927, 2.770232818, 2.300006217,
      ].map((v) => v.toFixed(2)),
      borderColor: line3Color,
      backgroundColor: line3Color,
    },
  ],
  conservative: [
    {
      label: "Implied Returns",
      data: [
        1.287129447, 0.243855185, 6.043556116, 5.154818964, 5.679844655,
        4.390167948, 7.618383844, 6.307626077,
      ].map((v) => v.toFixed(2)),
      borderColor: line1Color,
      backgroundColor: line1Color,
    },
    {
      label: "BL Return Vector",
      data: [
        1.035150371, 0.19391277, 3.43105813, 3.384098081, 3.794528562,
        3.139124679, 5.490331096, 4.278471457,
      ].map((v) => v.toFixed(2)),
      borderColor: line2Color,
      backgroundColor: line2Color,
    },
    {
      label: "Difference",
      data: [
        -0.251979076, -0.049942416, -2.612497987, -1.770720883, -1.885316093,
        -1.251043269, -2.128052748, -2.02915462,
      ].map((v) => v.toFixed(2)),
      borderColor: line3Color,
      backgroundColor: line3Color,
    },
  ],
};

export function MultiAxis({ dataset }) {
  return (
    dataset?.risk && (
      <Line
        options={options}
        data={{ labels, datasets: data[dataset?.risk] }}
      />
    )
  );
}
