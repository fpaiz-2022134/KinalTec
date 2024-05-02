import { Tooltip } from 'bootstrap'
import { React, useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import axios from 'axios'

const SimpleBarCharts = () => {

  const [hotels, setHotels] = useState([])

  const getHotels = async () => {
    try {
      const { data } = await axios('http://localhost:2880/hotel/get')
      setHotels(data.hotels)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => { getHotels(); }, [])

  return (
    <>
    <br /><br />
    <h1 className='text-center'>Estadisticas</h1>
    <br />
    {
      hotels.map(({ _id, name, visits }, index) => {
        
      })
    }
    < ResponsiveContainer width="100%" aspect={2} >
      <BarChart data={hotels} width={50} height={50} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="8 2 2"></CartesianGrid>
        <XAxis dataKey="name"></XAxis>
        <YAxis></YAxis>
        <Legend></Legend>
        <Bar dataKey="visits" fill='#6b48ff'></Bar>

      </BarChart>
    </ResponsiveContainer >
    </>
  )
}

export default SimpleBarCharts
