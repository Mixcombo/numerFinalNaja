import React from 'react'
import { Group } from '@mantine/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

interface Data {
    iteration : number;
    xL? : number;
    xM : number;
    xR? : number;
    Err : number;
}

interface Props {
    data : Data[];
}

function Chart({data}:Props) {
    console.log(data);
  return (
    <Group position='center'>
            <div>
                <LineChart 
                    width={600}
                    height={400}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="iteration"/>
                    {data.length > 5 ? <YAxis scale="log" domain={['auto', 'auto']} />:<YAxis/>}
                    <YAxis/>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" strokeWidth={2} dataKey="Err" stroke={`#8884d8`}  r={2.5}/>
                    <Line type="monotone" strokeWidth={2} dataKey="xM" stroke={`#82ca9d`} r={2.5} />
                </LineChart>
            </div>
    </Group>
  )
}

export default Chart