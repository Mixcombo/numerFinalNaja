import React, { useState } from 'react'
import { create, all } from 'mathjs'
import { Button } from "react-bootstrap"

function Seidel() {

  const [size, setsize] = useState<number>(0);
  const [matrix, setmatrix] = useState<{a: JSX.Element[][], b: JSX.Element[], d?: JSX.Element[], i: JSX.Element[]}>({ a: [], b: [], i: [] });
  const config = { };
  const math = create(all, config);
  let sizeinput: number;

  const submit = (e: React.ChangeEvent<HTMLInputElement>): void =>{
    sizeinput = Number(e.target.value);
    setsize(sizeinput);
    genarate(sizeinput);
  }

  //create input value matrix
  function genarate(sizeinput: number): void {
    let array: JSX.Element[][] = [] //array for create input feilds matrixa
    let arrayb: JSX.Element[] = [] //array for create input feilds matrixb
    let tempb: JSX.Element[] = [] //template input feild for matrix b
    let tempx: JSX.Element[] = []

    for(let i=0 ; i<sizeinput ; i++){
      array[i] = [] //render jsx arr

      tempb.push(
        <div>
              <input
              id={"rowb"+i}
              />
        </div>
      );


      let temp: JSX.Element[] = [] //template input feild for matrix a
      for(let j=0 ; j<sizeinput ; j++){
        let id = "column"+i+"row"+j
        temp.push(
          <input
          id={id}
          />
        );  
      }

        let id = "row"+i
        tempx.push(
          <input
          id={id}
          />
        );  
      
      array[i].push(<div className='matrix a' >{temp}</div>);
    }
    arrayb.push(<div className='matrix b'>{tempb}</div>);
    console.log(arrayb);

    //setmatrix hook
    setmatrix({a: array, b: arrayb, i: tempx});
  }

  const cal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault()
    let calmatrix: number[][] = []
    let tempb: number[] = []
    let temper: number[] = []
    let tempx: number[] = []

    //setmatrix a&b
    //seterror

    for(let i=0 ; i<size ; i++){
      calmatrix[i] = []
      tempx.push(Number((document.getElementById('row' + i) as HTMLInputElement).value))
      temper[i] = 100.0
      tempb.push(Number((document.getElementById('rowb' + i) as HTMLInputElement).value))
      //console.log(Number(document.getElementById('rowb'+i).value))
      console.log(temper)
      for(let j=0 ; j<size ; j++){
        //console.log(Number(document.getElementById('column'+j+'row'+j).value))
        calmatrix[i].push(Number((document.getElementById('column' + i + 'row' + j) as HTMLInputElement)))
      }

    }
    console.log(calmatrix)
    console.log(tempx);

    //calculator
    let x: number[] = []
    let round = 0
    let er =  0.00001

     for(let i=0 ; i<size ; i++){
      
      
      while(temper[i]>er){
        for(let i = 0 ;i < size; i++){
           x[i] = tempb[i];
          for(let j = 0 ;j < size; j++){
            if(i!==j){
              x[i] -= tempx[j]*calmatrix[i][j];  //คูนทีละตัว เอาไปลบกับค่า b
              
            }
              // console.log(i,j,sum);
              
          }
          console.log(x[i]); //ค่าที่ลบแต่ละคัวทั้งหมด
          x[i] = x[i]/calmatrix[i][i]; //หารเมทริก

          console.log("x แต่ละรอบ",i,x[i]);

          temper[i] = math.abs((x[i]-tempx[i])/x[i])*100.0
          console.log("error",i,temper)
          console.log("x",i,tempx);
          round++
          tempx[i]= x[i]
        }
       
        console.log(round)
      }
      console.log(i);
    }
    console.log(x)

    let ansarr = []
    for(let a=0 ; a<x.length ; a++){
      ansarr.push(
        <div>x{a+1}={x[a].toFixed(2)}</div>
      )
    }
    setmatrix({a:matrix.a,b:matrix.b,d:ansarr,i:matrix.i})
  }

  return (
    <div className='jacobiiteration'>
      <form>
        <h1>GaussSeidel</h1>
        <label htmlFor="size">Enter size is here {'->'}</label>
        <input name="size" type="size" onChange={submit}/><br/><br/>
      </form><br/>
      {(matrix.a === undefined )? null : 
      <div className='matrixf'style={{display: 'flex'}}>
        <div className='matrixw' style={{marginRight:"30px"}}>
          A
        {
          matrix.a 
        }
        </div>
        <div className='matrixw'>
          B 
        {
          matrix.b
        }
        </div>
      </div>}<br></br>
      {( matrix.i === undefined ) ? null : <div style={{marginRight:"20px"}}>X -{">"}{ matrix.i}</div>}
      <br/>
  
      <Button  variant="dark" onClick={cal}>Cal</Button><br/><br/>

      {( matrix.d === undefined ) ? null : <div style={{marginRight:"20px"}}> X { matrix.d}</div>}
    </div>
  )
}

export default Seidel