import React, { useState } from 'react'
import { create, all } from 'mathjs'

function Seidel() {
  const [size, setSize] = useState<number>(0)
  const [matrix, setMatrix] = useState<{
    a: JSX.Element[][]
    b: JSX.Element[]
    c: JSX.Element[]
    d: JSX.Element[]
  }>({
    a: [],
    b: [],
    c: [],
    d: [],
  })
  const config = {}
  const math = create(all, config)

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    generate()
  }

  //create input value matrix
  function generate() {
    let array: JSX.Element[][] = [] //array for create input feilds matrixa
    let arrayb: JSX.Element[] = [] //array for create input feilds matrixb
    let tempb: JSX.Element[] = [] //template input feild for matrix b
    let er: JSX.Element[] = []

    er.push(
      <div>
        <label htmlFor="size">Enter Error is here {'->'}</label>
        <input id="ERROR" />
      </div>
    )
    for (let i = 0; i < size; i++) {
      array[i] = [] //render jsx arr
      // tempb.push(<input id={`rowb${i}`} />)
      tempb.push(
        <input
        id={"rowb"+i}
        />
      )

      let temp: JSX.Element[] = [] //template input feild for matrix a

      for (let j = 0; j < size; j++) {
        // let id = `column${i}row${j}`
        let id = "column"+i+"row"+j
        temp.push(<input id={id} />)
      }
      array[i].push(<div className="matrix a">{temp}</div>)
    }
    arrayb.push(<div className="matrix b">{tempb}</div>)

    //setmatrix hook
    setMatrix({ a: array, b: arrayb, c: er, d: [] })
  }

  const cal = (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault()
    let calmatrix: number[][] = []
    let tempb: number[] = []
    let tempx: number[] = []
    let temper: number[] = []
    let er: number

    //setmatrix a&b
    //seterror

    er = Number((document.getElementById('ERROR') as HTMLInputElement).value)
    for (let i = 0; i < size; i++) {
      calmatrix[i] = []
      tempx[i] = 0
      temper[i] = 100.0
      tempb.push(Number((document.getElementById(`rowb${i}`) as HTMLInputElement).value))
      for (let j = 0; j < size; j++) {
        calmatrix[i].push(Number((document.getElementById(`column${i}row${j}`) as HTMLInputElement).value))
      }
    }

    //calculator
    let x: number[] = []
    let round = 0
    for (let i = 0; i < size; i++) {
      while (temper[i] > er) {
        for (let i = 0; i < size; i++) {
          x[i] = tempb[i]
          for (let j = 0; j < size; j++) {
            if (j !== i) x[i] -= tempx[j] * calmatrix[i][j]
          }
          x[i] /= calmatrix[i][i]
          temper[i] = math.abs((x[i]-tempx[i])/x[i])*100.0
          tempx[i] = x[i]
          round++
        }
      }
      //console.log(temper)
      //console.log(x)
    }
    //console.log(x)

    let ansarr = []
    for(let a=0 ; a<x.length ; a++){
      ansarr.push(
        <div>x{a+1}={x[a].toFixed(2)}</div>
      )
    }
    setMatrix({a:matrix.a,b:matrix.b,c:matrix.c,d:ansarr})
  }
  return (
    <div className='gaussseidel'>
      <form onSubmit={submit}>
        <h1>Gauss Seidel Iteration</h1>
        <label htmlFor="size">Enter size is here {'->'}</label>
        <input 
        name="size" 
        type="size" 
        onChange={(e) => setSize(Number(e.target.value))} 
        value={size} /><br/><br/>
        <button type= "submit">create</button><br/><br/>
      </form><br/><br/>
      <div className='matrix f'>
        <div className='matrixw'>
        {
          matrix.a 
        }
        </div>
        <div className='matrixw'>
        {
          matrix.b
        }
        </div>
      </div><br/>
      <div>
        {
          matrix.c
        }
      </div><br/>
      <button onClick={cal}>Cal</button><br/><br/>
      <div className='matrix f'>
        matrix X -{'>'}
        {
          matrix.d
        }
      </div>
    </div>
  )
}

export default Seidel
