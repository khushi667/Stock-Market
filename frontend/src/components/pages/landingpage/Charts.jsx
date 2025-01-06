import { useState } from "react";
import Chart from "react-apexcharts";

function Charts() {
  const [state, setState] = useState({
    options: {
      colors: ["#6A1B9A", "#AB47BC"], 
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "Trade A",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: "Trade B",
        data: [3, 60, 35, 80, 49, 70, 20, 81],
      },
    ],
  });

  const chartStyle = {
    display: 'inline-block',
    width: '450px',
    height: '400px',
    padding: '1px',
    margin: '0 15px', 
  };

  const containerStyle = {
    textAlign: 'center',
    margin: '0 auto',
    paddingTop: '40px', 
  };

  return (
    <>
    <div className="flex items-center justify-center text-3xl">
      Charts
    </div>
    <div style={containerStyle}>
      <h1>
        <i className="fas fa-user"></i>{" "}
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={chartStyle}>
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="480"
          />
        </div>
        <div style={chartStyle}>
          <Chart
            options={state.options}
            series={state.series}
            type="area"
            width="480"
          />
        </div>
      </div>
    </div>
    </>
  );
}

export default Charts;
