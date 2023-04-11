import React from 'react'
import { Card, Group, Table } from '@mantine/core'

interface Data {
  iteration : number;
  xL? : number;
  xM : number;
  xR? : number;
  Err : number;
}

interface LabelData {
  xL? : string;
  xM : string;
  xR? : string;
  Err : string;
}

interface TableData {
  data : Data[];
  label : LabelData;
}

function Tables({data, label}:TableData) {
  console.log(data);
  return (
    <Group position="center" mb="md" mt="md">
      <Card shadow="md" p="sm" radius="md" withBorder>
        <Table fontSize="md" horizontalSpacing="md" withBorder withColumnBorders highlightOnHover>
          <thead>
            <tr>
              <th>Iteration</th>
              {label.xL && <th>{label.xL}</th>}
              <th>{label.xM}</th>
              {label.xR && <th>{label.xR}</th>}
              <th>Error</th>
            </tr>
          </thead>
          <tbody style={{textAlign:"left"}}>
            {data.map((element:Data, index: number) => {
              return (
                <tr key={index}>
                  <td>{element.iteration}</td>
                  {typeof element.xL !== 'undefined' && <td>{element.xL}</td>}
                  <td>{element.xM}</td>
                  {element.xR && <td>{element.xR}</td>}
                  <td>{element.Err}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Card>
    </Group>
  )
}

export default Tables