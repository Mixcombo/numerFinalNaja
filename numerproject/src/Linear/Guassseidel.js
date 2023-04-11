import React, { useState } from 'react'
import { create, all } from 'mathjs'
import { Button } from "@mantine/core"

function GaussSeidel() {

  const [size, setsize] = useState('')
  const [matrix, setmatrix] = useState('')
  const [showB, setshowB] = useState([])
  const config = {}
  const math = create(all, config)
  let sizeinput

  const submit = (e) =>{
    sizeinput = e.target.value;
    setsize(sizeinput)
    generate(sizeinput)
  }

  //create input value matrix
  function generate(){
    let array = [] //array for create input fields matrixa
    let arrayb = [] //array for create input fields matrixb       
    let tempb = [] //template input field for matrix b
    let tempx = []

    for(let i=0 ; i<sizeinput ; i++){
      array[i] = [] //render jsx arr
      
      ////push MatrixB
      tempb.push(
        <div>
          <input
            id={"rowb"+i}
          />
        </div>
        )
        
      let temp = [] //template input field for matrix a
      for(let j=0 ; j<sizeinput ; j++){
        let id = "column"+i+"row"+j
        //push MatrixA
        temp.push(
          <input
            id={id}
          />
        )  
      }
  
      let id = "row"+i
      ////push MatrixInitialize
      tempx.push(
        <input
          id={id}
        />
      )  
      array[i].push(<div class='matrix a'>{temp}</div>)  
    }
    arrayb.push(<div class='matrix b'>{tempb}</div>)
    console.log(arrayb);

    //setmatrix hook
    setmatrix({a:array, b:arrayb, i:tempx})
  }

  const cal = (e) =>{
    e.preventDefault()
    let calmatrix = []
    let tempb = []
    let temper = []
    let tempx=[]

    //setmatrix a&b
    //seterror

    for(let i=0; i<size; i++){
      calmatrix[i] = []
      tempx.push(Number(document.getElementById('row'+i).value))
      temper[i] = 100.0
      tempb.push(Number(document.getElementById('rowb'+i).value))
      //console.log(Number(document.getElementById('rowb'+i).value))
      console.log(temper)
      for(let j=0; j<size; j++){
        //console.log(Number(document.getElementById('column'+j+'row'+j).value))
        calmatrix[i].push(Number(document.getElementById('column'+i+'row'+j).value))
      }

    }
    console.log(calmatrix)
    console.log(tempx);

    //calculator
    let x = []
    let round = 0
    let er =  0.00001

     for(let i=0; i<size; i++){
      while(temper[i]>er){
        for(let i=0; i<size; i++){
           x[i] = tempb[i];
          for(let j=0; j<size; j++){
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
        console.log("Round:", round)
      }
      console.log(i);
    }
    console.log(x)

    let ansarr = []
    // let result = []
    for(let a=0; a<x.length; a++){
      ansarr.push(
        <div>x{a+1} = {x[a].toFixed(2)}</div>
      )
    }
    console.log(calmatrix, tempx)
    let result = math.multiply(calmatrix, tempx)
    console.log(result)
    setshowB(result)
    
    setmatrix({a:matrix.a, b:matrix.b, d:ansarr, i:matrix.i})
  }

  return (
    <div className='gaussseidel'>
      <form>
        <h1>Gauss-Seidel Method</h1>
        <label for="size">Enter Matrix size = </label>
        <input name="size" type="size" onChange={submit}/><br/><br/>
      </form><br/>
      {(matrix.a === undefined )? null : 
      <div class='matrixf'style={{display:"contents"}}>
        <div class='matrixw' style={{marginRight:"30px"}}>
          A
        {
          matrix.a 
        }
        </div>
        <div class='matrixw'>
          B 
        {
          matrix.b
        }
        </div>
      </div>}<br></br>
      {( matrix.i === undefined ) ? null : <div style={{marginRight:"20px"}}> X = { matrix.i}</div>}
      <br/>
  
      <Button size='xs' onClick={cal}>Cal</Button><br/><br/>

      {( matrix.d === undefined ) ? null : <div style={{marginRight:"20px"}}> X { matrix.d}</div>}

      <div>{showB.map((data)=>{
        return(
          <div style={{marginTop:"5px"}}>{data.toFixed(2)}</div>
        )
      })}</div>

    </div>
  )
}

export default GaussSeidel