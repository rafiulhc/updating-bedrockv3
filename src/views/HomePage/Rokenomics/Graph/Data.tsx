import React from "react";
import styled from "styled-components";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });



const Data = () => {
  const data = {
    labels: ['Initial Liquidity', 'Staking Rewards', 'Reserve Wallet', 'Advertising & Development'],
    datasets: [
      {
        label: 'Supply',
        data: [65, 10, 20, 5],
        backgroundColor: ['#EC8845', '#D1735D', '#884553', '#873242'],
        borderColor: ['#EC8845', '#D1735D', '#884553', '#763B4D'],
        borderWidth: 1,
      },
    ],
  }


  return (
    <>

      <Doughnut data={data} />

    </>
  );
};

export default Data;
