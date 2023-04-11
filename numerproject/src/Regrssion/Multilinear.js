import React, { useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import MLR from 'ml-regression-multivariate-linear'

function Multilinear() {

    const [row, setRow] = useState(0)
    const [col, setCol] = useState(0)
    const [tablevalue, setTablevalue] = useState([...Array(row)].map(() => Array(col).fill(0)))
    const [table, setTable] = useState([])
    const [havedata, setHavedata] = useState(0)
    const [xp, setXp] = useState([])
    const [xpredict, setXpredict] = useState([])
    const [result, setResult] = useState(null)

    const setR = (e) => {
        setRow(e.target.value)
        setTablevalue(Array.from({ length: e.target.value }, () => new Array(col).fill("")))
    }

    const setC = (e) => {
        const tmpnumber = Number(e.target.value)
        const newArray = new Array(tmpnumber-1).fill(0)
        console.log(tmpnumber)
        console.log("Narr", newArray)
        setCol(e.target.value)
    }

    const setX = (e,j) => {
        var xtmp = []
        console.log(e.target.value ," = " ,j)
        xtmp = xpredict;
        console.log("xtmp",xtmp)
        xtmp[j] = Number(e.target.value);
        setXpredict(xtmp)
        console.log("xpdict",xpredict)
    }

    const inputn = (e, i, j) => {
        console.log(`matrix [${i}] [${j}] = ${e.target.value}`)
        const Tabletmp = [...tablevalue];
        Tabletmp[i][j] = e.target.value;
        setTablevalue(Tabletmp)
    };

    const Calculate = () => {
        console.log(tablevalue)
        calMat()
    }

    const calMat = () => {
        let table = tablevalue
        const x = table.map(row => row.slice(0, -1).map(Number));
        const y = table.map(row => row.slice(-1).map(Number));
        console.log("x", x);
        console.log("y", y);
        console.log("Xpredict",xpredict)
        const mlr = new MLR(x, y)
        console.log("predict", mlr.predict(xpredict))
    }

    const xcreate = () => {
        const cols = []
        for(let j=0; j<col-1; j++){
            cols.push(
            <Col key={j} xs={12} 
            className="d-flex justify-content-center align-items-center" 
            onChange={(e) => {setX(e, j)}}>
            <Form.Control type="number"> </Form.Control>
            </Col>)
        }
        setXp(cols); 
        console.log("xp", xp)
    }

    const createTable = () => {
        const rows = []
        for(let i=0; i<row; i++){
            const cols = []
            for(let j=0; j<col; j++){
                cols.push(<Col key={j} xs={2} className="d-flex justify-content-center align-items-center" 
                onChange={(e)=>{ inputn(e,i,j)}}><Form.Control type="number"></Form.Control></Col>)
            }
            rows.push(<Row key={i} className="d-flex justify-content-center align-items-center">{cols}</Row>);
        }
        setTable(rows)
        setHavedata(1)

        console.log(table)
    }


    return (
        <div>
            <Form>
            <Form.Group className="mb-3">
                <Form.Label>Row </Form.Label>
                <Form.Control type="number" placeholder="Input Rows" onChange={setR}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Column </Form.Label>
                <Form.Control type="number" placeholder="Input Columns" onChange={setC}/>
            </Form.Group>
            <Button variant="primary" type="button" onClick={() => {
                xcreate();
                createTable()
            }}>
                Create
            </Button>

            {havedata>0 && <Form>
                <Form.Label>X</Form.Label>
                {xp}</Form>}
            <Form>
            <br></br>
                {table}
            </Form>
            <br></br>

            {/* {havedata>0 && <div>
                <Button variant="primary" type="button" onClick={Calculate}> Calculate </Button>
                <Form>
                    <br></br>
                    <Form.Label><h1>{result}</h1></Form.Label>
                    <Row className="justify-content-center" ></Row>
                </Form>
                </div>} */}
            </Form>
        </div>
    )
}

export default Multilinear