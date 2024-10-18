"use client";

import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

const labels = ['Grave', 'Simples', 'Aleluia']
const conforme = 20
const naoConforme = 10

const cores = ['#501d1d', '#8cf475', '#46aabc']
const valores = [10, 23, 223]

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

function setColorAderencia(number: number) {
    if (number <= 60){
        return '#b84142'
    }
    if (number >= 61 && number <= 90){
        return '#fae39c'
    }
    return '#57bb8a'
}

export default function Graph() {
    const data = {
        labels: labels,
        datasets: [
            {
                label: '',
                data: valores,
                backgroundColor: cores,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
    };

    return (
        <div className='flex items-center justify-evenly p-32'>
            <div className='w-fit h-full flex flex-col items-center justify-evenly gap-10 '>
                <div className='bg-gray-500 px-10 gap-4 py-5 rounded-2xl shadow-md w-full flex items-center justify-center flex-col' >
                    {
                        labels.map((label, i) => (
                            <div className='flex items-center gap-16 font-bold justify-between w-full'>
                                <p style={{ backgroundColor: cores[i] }} className="p-0.5 rounded-md w-4/5" >{label}</p>
                                <p className="w-1/5">{valores[i]}</p>
                            </div>

                        ))
                    }
                </div>

                <div className='bg-gray-500 px-16 py-5 rounded-2xl shadow-md w-full flex items-center justify-center'>

                        <div className='flex items-center gap-5 justify-between font-bold'>
                            <p>Aderencia</p>
                            <p style={{ backgroundColor: setColorAderencia((conforme/(conforme+naoConforme)*100)) }} className="p-0.5 rounded-md w-4/5">{((conforme/(conforme+naoConforme)*100).toFixed(2))}%</p>
                        </div>

                </div>
            </div>

            <div className="w-fit h-56">
                <Doughnut data={data} options={options}/>
            </div>
        </div>


    );
}
