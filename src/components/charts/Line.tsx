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
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

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
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = ["Implied Returns", "BL Return Vector", "Difference"];

export const data = {
  labels,
  balanced: [
    {
      label: "Global Bonds (Unhedged)",
      data: [1.287129447, 1.214542374, -0.072587073].map((v) => v.toFixed(2)),
      borderColor: "#dcccaa",
      backgroundColor: "#dcccaa",
    },
    {
      label: "Total US Bond Market",
      data: [0.243855185, 0.238496627, -0.005358558].map((v) => v.toFixed(2)),
      borderColor: "#d5c199",
      backgroundColor: "#d5c199",
    },
    {
      label: "US Large Cap Growth",
      data: [6.043556116, 5.563574066, -0.47998205].map((v) => v.toFixed(2)),
      borderColor: "#ceb788",
      backgroundColor: "#ceb788",
    },
    {
      label: "US Large Cap Value",
      data: [5.154818964, 4.923810322, -0.231008641].map((v) => v.toFixed(2)),
      borderColor: "#c7ad77",
      backgroundColor: "#c7ad77",
    },
    {
      label: "US Small Cap Growth",
      data: [5.679844655, 5.337816864, -0.342027791].map((v) => v.toFixed(2)),
      borderColor: "#c0a266",
      backgroundColor: "#c0a266",
    },
    {
      label: "US Small Cap Value",
      data: [4.390167948, 4.285776209, -0.10439174].map((v) => v.toFixed(2)),
      borderColor: "#b99855",
      backgroundColor: "#b99855",
    },
    {
      label: "Emerging Markets",
      data: [7.618383844, 7.051882231, -0.566501613].map((v) => v.toFixed(2)),
      borderColor: "#947a44",
      backgroundColor: "#947a44",
    },
    {
      label: "Intl Developed ex-US Market",
      data: [6.307626077, 5.864238811, -0.443387265].map((v) => v.toFixed(2)),
      borderColor: "#6f5b33",
      backgroundColor: "#6f5b33",
    },
  ],
  aggressive: [
    {
      label: "Global Bonds (Unhedged)",
      data: [1.287129447, 1.754833253, 0.467703807].map((v) => v.toFixed(2)),
      borderColor: "#dcccaa",
      backgroundColor: "#dcccaa",
    },
    {
      label: "Total US Bond Market",
      data: [0.243855185, 0.378198878, 0.134343693].map((v) => v.toFixed(2)),
      borderColor: "#d5c199",
      backgroundColor: "#d5c199",
    },
    {
      label: "US Large Cap Growth",
      data: [6.043556116, 8.498695053, 2.455138936].map((v) => v.toFixed(2)),
      borderColor: "#ceb788",
      backgroundColor: "#ceb788",
    },
    {
      label: "US Large Cap Value",
      data: [5.154818964, 7.349370801, 2.194551837].map((v) => v.toFixed(2)),
      borderColor: "#c7ad77",
      backgroundColor: "#c7ad77",
    },
    {
      label: "US Small Cap Growth",
      data: [5.679844655, 8.412439812, 2.732595157].map((v) => v.toFixed(2)),
      borderColor: "#c0a266",
      backgroundColor: "#c0a266",
    },
    {
      label: "US Small Cap Value",
      data: [4.390167948, 6.608655876, 2.218487927].map((v) => v.toFixed(2)),
      borderColor: "#b99855",
      backgroundColor: "#b99855",
    },
    {
      label: "Emerging Markets",
      data: [7.618383844, 10.38861666, 2.770232818].map((v) => v.toFixed(2)),
      borderColor: "#947a44",
      backgroundColor: "#947a44",
    },
    {
      label: "Intl Developed ex-US Market",
      data: [6.307626077, 8.607632293, 2.300006217].map((v) => v.toFixed(2)),
      borderColor: "#6f5b33",
      backgroundColor: "#6f5b33",
    },
  ],
  conservative: [
    {
      label: "Global Bonds (Unhedged)",
      data: [1.287129447, 1.035150371, -0.251979076].map((v) => v.toFixed(2)),
      borderColor: "#dcccaa",
      backgroundColor: "#dcccaa",
    },
    {
      label: "Total US Bond Market",
      data: [0.243855185, 0.19391277, -0.049942416].map((v) => v.toFixed(2)),
      borderColor: "#d5c199",
      backgroundColor: "#d5c199",
    },
    {
      label: "US Large Cap Growth",
      data: [6.043556116, 3.43105813, -2.612497987].map((v) => v.toFixed(2)),
      borderColor: "#ceb788",
      backgroundColor: "#ceb788",
    },
    {
      label: "US Large Cap Value",
      data: [5.154818964, 3.384098081, -1.770720883].map((v) => v.toFixed(2)),
      borderColor: "#c7ad77",
      backgroundColor: "#c7ad77",
    },
    {
      label: "US Small Cap Growth",
      data: [5.679844655, 3.794528562, -1.885316093].map((v) => v.toFixed(2)),
      borderColor: "#c0a266",
      backgroundColor: "#c0a266",
    },
    {
      label: "US Small Cap Value",
      data: [4.390167948, 3.139124679, -1.251043269].map((v) => v.toFixed(2)),
      borderColor: "#b99855",
      backgroundColor: "#b99855",
    },
    {
      label: "Emerging Markets",
      data: [7.618383844, 5.490331096, -2.128052748].map((v) => v.toFixed(2)),
      borderColor: "#947a44",
      backgroundColor: "#947a44",
    },
    {
      label: "Intl Developed ex-US Market",
      data: [6.307626077, 4.278471457, -2.02915462].map((v) => v.toFixed(2)),
      borderColor: "#6f5b33",
      backgroundColor: "#6f5b33",
    },
  ],
};

export function LineChart({ dataset }) {
  // const [currentViews, setCurrentViews] = useState([]);
  // const views = useSelector((state: RootState) => state.views);

  // useEffect(() => {
  //   setCurrentViews(views?.filter((v) => v?.risk === dataset.risk));
  //   console.log(views?.filter((v) => v?.risk === dataset.risk));
  // }, [dataset?.risk]);
  console.log(dataset);

  return (
    dataset?.risk && (
      <Line
        options={options}
        data={{ labels, datasets: data[dataset?.risk] }}
      />
    )
  );
}
