import React from "react";
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';

interface ParticipationChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderColor: string;
      borderWidth: number;
    }[];
  };
  options: any;
}

const ParticipationChart: React.FC<ParticipationChartProps> = ({ data, options }) => {
  return <Pie data={data} options={options}/>;
};

export default ParticipationChart;
