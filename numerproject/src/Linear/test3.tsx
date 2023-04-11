import React, { useState } from 'react';
import { create, all, MathJsStatic } from 'mathjs';
import { Button } from 'react-bootstrap';

interface Matrix {
  a: React.ReactNode[][];
  b: React.ReactNode[][];
  d?: React.ReactNode[];
  i: React.ReactNode[];
};

function GaussSeidel() {
  const [size, setSize] = useState<number>();
  const [matrix, setMatrix] = useState<Matrix>({ a: [], b: [], i: [] });

  const config = {};
  const math: MathJsStatic = create(all, config);
  let sizeInput: number;

  const submit = (e: React.ChangeEvent<HTMLInputElement>) => {
    sizeInput = Number(e.target.value);
    setSize(sizeInput);
    genarate(Number(sizeInput));
  };

  // create input value matrix
  function genarate(sizeInput: number) {
    let array: React.ReactNode[][] = []; // array for create input fields matrixa
    let arrayb: React.ReactNode[] = []; // array for create input fields matrixb
    let tempb: JSX.Element[] = []; // template input field for matrix b
    let tempx: JSX.Element[] = [];

    for (let i = 0; i < sizeInput; i++) {
      array[i] = []; // render jsx arr

      tempb.push(
        <div>
          <input id={'rowb' + i} />
        </div>
      );

      let temp: JSX.Element[] = []; // template input field for matrix a
      for (let j = 0; j < sizeInput; j++) {
        let id = 'column' + i + 'row' + j;
        temp.push(<input id={id} />);
      }

      let id = 'row' + i;
      tempx.push(<input id={id} />);

      array[i].push(<div className='matrix a'>{temp}</div>);
    }
    arrayb.push(<div className='matrix b'>{tempb}</div>);
    console.log(arrayb);

    // setMatrix hook
    // setMatrix({ a: array, b: arrayb, i: tempx });
  }

  const cal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let calmatrix: number[][] = [];
    let tempb: number[] = [];
    let temper: number[] = [];
    let tempx: number[] = [];

    // setMatrix a&b
    // seterror

    for (let i = 0; i < Number(size); i++) {
      calmatrix[i] = [];
      tempx.push(Number((document.getElementById('row' + i) as HTMLInputElement).value));
      temper[i] = 100.0;
      tempb.push(Number((document.getElementById('rowb' + i) as HTMLInputElement).value));
      //console.log(Number(document.getElementById('rowb'+i).value))
      console.log(temper);
      for (let j = 0; j < Number(size); j++) {
        //console.log(Number(document.getElementById('column'+j+'row'+j).value))
        calmatrix[i].push(Number((document.getElementById('column' + i + 'row' + j) as HTMLInputElement).value));
      }
    }
    console.log(calmatrix);
    console.log(tempx);

    // calculator
    let x: number[] = [];
    let round = 0;
    let er = 0.00001;

    for (let i = 0; i < Number(size); i++) {
        while(temper[i]>er){
            for(let i = 0 ;i < Number(size); i++){
               x[i] = tempb[i];
              for(let j = 0 ;j < Number(size); j++){
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
        setMatrix({a:matrix.a,b:matrix.b,d:ansarr,i:matrix.i})
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
    
    export default GaussSeidel
