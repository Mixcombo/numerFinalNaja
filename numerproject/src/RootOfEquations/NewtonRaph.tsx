import React, { useState } from 'react';
import { derivative, evaluate } from 'mathjs';
import { Group, Button, NumberInput, TextInput, Grid } from '@mantine/core';
import Chart from '../component/Chart';
import Tables from '../component/Tables';

interface Newtonobj {
    iteration : number;
    xM : number;
    Err : number;
    ErrNotDecimal : number;
}

interface LabelNewton {
    xM : string;
    Err : string;
}

function Newton() {

    const [newData, setNewData] = useState<Newtonobj[]>([]);
    const [Ans, setAns] = useState<number>(0);
    const [UserInput , setUserInput] = useState({
        Equation:"(x^2)-7",
        X:0, 
    })

    const label: LabelNewton = {
        xM: `X`,
        Err: `Err`
    }

    const data: Newtonobj[] = [];

    const error = (xold: number, xnew: number) => Math.abs((xnew-xold)/xnew)*100;

    const CalNewton = (x: number, Scope: string) => {
        let fx, fxp, xnew=0, ea=100;
        let iter = 0;
        const MAX = 50;
        const e = 0.000001;
        let obj : Newtonobj = {} as Newtonobj;

        do{
            fx = evaluate(UserInput.Equation, {[Scope]: x});
            fxp = derivative(UserInput.Equation, `${[Scope]}`).evaluate({[Scope]: x});
            console.log(fxp);
            xnew = x-(fx/fxp);
            ea = error(x, xnew);
            x = xnew;
            iter++;

            obj = {
                iteration: iter,
                xM: xnew,
                Err: ea,
                ErrNotDecimal: Math.round(ea),
            };
            data.push(obj);
            console.log("Iter : "+iter," ","X : "+xnew+" Err : "+ea);
            setAns(xnew);
            
        }while(ea>e && iter<MAX)
    }

    const Regex = ((Eq:String) => {
        let test = /[a-zA-Z]/i;
        let Alphabet = Eq.match(test)
        if(Alphabet){
          return Alphabet[0];
        }
    })

    const calculateRoot = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const Scope:any = Regex(UserInput.Equation);
        CalNewton(UserInput.X, Scope);
        setNewData(data);
        console.log(data);
    }

    const SetEquation = (event:React.ChangeEvent<HTMLInputElement>)=>{
        console.log(event.target.value);
        setUserInput((prevState)=>{
            return{
                ...prevState,
                Equation:event.target.value
            }
        })
    }
  
    const SetX = (event:number)=>{
        console.log(event);
        setUserInput((prevState)=>{
            return{
                ...prevState,
                X:event
            }
        })
    }
    
    return (
        <div>
            <form onSubmit={calculateRoot}>
                <div>
                    <h1 style={{color:'black'}}>Newton Raphson Method</h1>
                    <Group position='center'>
                        <Grid justify='center'>
                            <Grid.Col span="content">
                                <TextInput
                                    label="Input f(x)"
                                    onChange={SetEquation}
                                    value={UserInput.Equation}
                                    required
                                />
                                <NumberInput
                                    label="Input X"
                                    onChange={SetX}
                                    precision={2}
                                    required
                                />
                                <Button 
                                    mt="md" 
                                    size='sm' 
                                    type='submit' 
                                    variant="gradient" 
                                    gradient={{ from: 'indigo', to: 'cyan', deg: 60 }}>
                                        Calculate
                                </Button>
                                <h2>Answer = {Ans.toPrecision(7)}</h2>
                            </Grid.Col>
                            <Grid.Col span="content">
                                <div style={{margin:"50px", marginLeft:"90px"}}>
                                    <Chart data={newData}/>
                                </div>
                            </Grid.Col>
                        </Grid>
                    </Group>
                    <Tables data={newData} label={label} />
                </div>
            </form>
        </div>
    )
}

export default Newton

