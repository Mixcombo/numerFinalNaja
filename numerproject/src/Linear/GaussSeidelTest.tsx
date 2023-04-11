import { Grid, Title, Group } from '@mantine/core'
import React, {useState} from 'react'


function GaussSeidel() {

    const [NumberMatrix, setNumberMatrix] = useState<number>(2)
    const [Matrix, setMatrix] = useState<number[][]>(
        Array(Number(NumberMatrix))
        .fill(0)
        .map(() => Array(Number(NumberMatrix)).fill(0))
    )
    const [ValueMatrix, setValueMatrix] = useState<number[]>(
        Array(Number(NumberMatrix)).fill(0)
    )
    //Matrix B
    const [AnsMatrix, setAnsMatrix] = useState<number[]>(
        Array(Number(NumberMatrix)).fill(0)
    )

    const setValueOfMatrix = (value:number, i:number, j:number) => {
        if(value !== undefined){
            const matrix:number[][] = [...Matrix]
            matrix[i][j] = value
            setMatrix(matrix)
        }
    }
    const setAnsOfMatrix = (ans:number, i:number) => {
        if(ans !== undefined){
            const matrix:number[] = [...ValueMatrix]
            matrix[i] = ans
            setValueMatrix(matrix)
        }
    }

    const showAnswer = () => {
        let ans:React.ReactNode[] = []
        for(let i=0; i<NumberMatrix; i++){
            ans.push(
                <Grid.Col span='content'>
                    <h3 key={i}>Y{i} = {AnsMatrix[i]}</h3>
                </Grid.Col>
            )
            return(
                <Group position="center">
                    <Title order={3}>Answer</Title>
                    <Grid>{ans}</Grid>
                </Group>
            )
        }
    }
    const setMatrixState = (value:number) => {
        setMatrix(
            Array(value).fill(0).map(()=>Array(value).fill(0))
        )
        setValueMatrix(Array(value).fill(0))
        setNumberMatrix(value)
    }

    const calSeidel = (e:React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        let x1=0, x2=0, x3=0
    }



    return (
        <div>
            
        </div>
  )
}

export default GaussSeidel