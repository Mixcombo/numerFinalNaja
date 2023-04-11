import React, { useState } from 'react'
import { create, all } from 'mathjs'

function GaussSeidel() {

  const [size, setsize] = useState('')
  const [matrix, setmatrix] = useState('')
  const config = { }
  const math = create(all, config)


  const submit = e =>{
    e.preventDefault()
    genarate()
  }

  //create input value matrix
  function genarate(){
    let array = [] //array for create input feilds matrixa
    let arrayb = [] //array for create input feilds matrixb       
    let tempb = [] //template input feild for matrix b
    let er = []

    er.push(
      <div>
      <label for="size">Enter Error is here {'->'}</label>
      <input id="ERROR"/>
      </div>
    )
    for(let i=0 ; i<size ; i++){
      array[i] = [] //render jsx arr
      tempb.push(
        <input
        id={"rowb"+i}
        />
      )
      let temp = [] //template input feild for matrix a
      for(let j=0 ; j<size ; j++){
        let id = "column"+i+"row"+j
        temp.push(
        <input
        id={id}
        />
        )  
      }
      array[i].push(<div class='matrix a'>{temp}</div>)
      
    }
    arrayb.push(<div class='matrix b'>{tempb}</div>)

    //setmatrix hook
    setmatrix({a:array,b:arrayb,c:er})
  }

  const cal = e =>{
    e.preventDefault()
    let calmatrix = []
    let tempb = []
    let tempx = []
    let temper = []
    let er

    //setmatrix a&b
    //seterror

    er = Number(document.getElementById('ERROR').value)
    for(let i=0 ; i<size ; i++){
      calmatrix[i] = []
      tempx[i] = 0
      temper[i] = 100.0
      tempb.push(Number(document.getElementById('rowb'+i).value))
      //console.log(Number(document.getElementById('rowb'+i).value))
      for(let j=0 ; j<size ; j++){
        //console.log(Number(document.getElementById('column'+j+'row'+j).value))
        calmatrix[i].push(Number(document.getElementById('column'+i+'row'+j).value))
      }
    }
    //console.log(calmatrix)
    //console.log(temper)
    //console.log(tempER) 

    //calculator
    let x = []
    let round = 0
    for(let i=0 ; i<size ; i++){
      while(temper[i]>er){
        for(let i = 0 ;i < size; i++){
          x[i] = tempb[i];
          for(let j = 0 ;j < size; j++){
            if(j!==i)
              x[i] -= tempx[j]*calmatrix[i][j];
          }
          x[i] /= calmatrix[i][i];
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
    setmatrix({a:matrix.a,b:matrix.b,c:matrix.c,d:ansarr})
  }
  return (
    <div className='gaussseidel'>
      <form>
        <h1>Gauss Seidel Iteration</h1>
        <label for="size">Enter size is here {'->'}</label>
        <input 
        name="size" 
        type="size" 
        onChange={event => setsize(event.target.value)} 
        value={size} /><br/><br/>
        <button onClick={submit}>create</button><br/><br/>
      </form><br/><br/>
      <div class='matrix f'>
        <div class='matrixw'>
        {
          matrix.a 
        }
        </div>
        <div class='matrixw'>
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

export default GaussSeidel