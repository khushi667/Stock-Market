import React, { useState } from "react";
import Chart from "react-apexcharts";

const LiveStockGraph = () => {
  // Sample hardcoded data for a more complex chart
  const sampleData = [
    { x: new Date().getTime() - 60000 * 12, y: 95 },
    { x: new Date().getTime() - 60000 * 11, y: 96 },
    { x: new Date().getTime() - 60000 * 10, y: 99 },
    { x: new Date().getTime() - 60000 * 9, y: 100 },
    { x: new Date().getTime() - 60000 * 8, y: 98 },
    { x: new Date().getTime() - 60000 * 7, y: 97 },
    { x: new Date().getTime() - 60000 * 6, y: 101 },
    { x: new Date().getTime() - 60000 * 5, y: 102 },
    { x: new Date().getTime() - 60000 * 4, y: 104 },
    { x: new Date().getTime() - 60000 * 3, y: 103 },
    { x: new Date().getTime() - 60000 * 2, y: 105 },
    { x: new Date().getTime() - 60000 * 1, y: 107 },
  ];

  const sampleData2 = [
    { x: new Date().getTime() - 60000 * 12, y: 90 },
    { x: new Date().getTime() - 60000 * 11, y: 91 },
    { x: new Date().getTime() - 60000 * 10, y: 94 },
    { x: new Date().getTime() - 60000 * 9, y: 93 },
    { x: new Date().getTime() - 60000 * 8, y: 95 },
    { x: new Date().getTime() - 60000 * 7, y: 94 },
    { x: new Date().getTime() - 60000 * 6, y: 97 },
    { x: new Date().getTime() - 60000 * 5, y: 96 },
    { x: new Date().getTime() - 60000 * 4, y: 98 },
    { x: new Date().getTime() - 60000 * 3, y: 99 },
    { x: new Date().getTime() - 60000 * 2, y: 100 },
    { x: new Date().getTime() - 60000 * 1, y: 101 },
  ];

  const [series, setSeries] = useState([
    {
      name: "Tech Stock",
      data: sampleData,
    },
    {
      name: "Finance Stock",
      data: sampleData2,
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      id: "complex-stock-chart",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
        autoSelected: "zoom",
      },
      background: "#fff",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      type: "datetime",
      range: 60000 * 12, // Display the last 12 minutes
      labels: {
        datetimeUTC: false,
      },
    },
    yaxis: {
      min: 85, // Set realistic min and max values according to your data
      max: 110,
      tickAmount: 5,
      labels: {
        formatter: (val) => `$${val.toFixed(2)}`,
      },
    },
    grid: {
      borderColor: "#e7e7e7",
      strokeDashArray: 5,
    },
    markers: {
      size: 4,
      colors: ["#6A1B9A", "#FF5733"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    colors: ["#6A1B9A", "#FF5733"],
    tooltip: {
      x: {
        format: "HH:mm:ss",
      },
      y: {
        formatter: (val) => `$${val.toFixed(2)}`,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
    },
    annotations: {
      xaxis: [
        {
          x: new Date().getTime() - 60000 * 6,
          borderColor: "#999",
          label: {
            show: true,
            text: "Event",
            style: {
              color: "#fff",
              background: "#775DD0",
            },
          },
        },
      ],
      yaxis: [
        {
          y: 105,
          y2: 107,
          borderColor: "#f00",
          fillColor: "#f2f2f2",
          opacity: 0.2,
          label: {
            borderColor: "#f00",
            style: {
              fontSize: "10px",
              color: "#333",
              background: "#f2f2f2",
            },
            text: "Resistance Zone",
          },
        },
      ],
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#FDD835", "#FAD961"],
        inverseColors: true,
        opacityFrom: 0.6,
        opacityTo: 0.2,
        stops: [0, 50, 100],
        colorStops: [],
      },
    },
  });

  return (
    <>
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="pt-2 pb-4 px-4 bg-white rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
          Complex Stock Price Chart
        </h2>
        <Chart options={options} series={series} type="line" height={500} />
      </div>
    </div>
    </>
  );
};

export default LiveStockGraph;
