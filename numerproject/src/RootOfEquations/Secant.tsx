import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import { Group, Button, NumberInput, TextInput, Grid } from '@mantine/core';
import Chart from '../component/Chart';
import Tables from '../component/Tables';

interface Secantobj {
    iteration : number;
    xL : number;
    xM : number;
    xR : number;
    Err : number;
    ErrNotDecimal : number;
}

interface LabelSecant {
    xL : string;
    xM : string;
    xR : string;
    Err : string;
}

function Secant() {

    const [newData, setNewData] = useState<Secantobj[]>([]);
    const [Ans, setAns] = useState<number>(0);
    const [UserInput , setUserInput] = useState({
        Equation:"(x^2)-7",
        X0:0,
        X1:0, 
    })

    const label: LabelSecant = {
        xL: `x0`,
        xM: `x1`,
        xR: `x2`,
        Err: `Err`
    }

    const data: Secantobj[] = [];

    const error = (xold: number, xnew: number) => Math.abs((xnew-xold)/xnew)*100;

    const CalSecant = (x0: number, x1: number, Scope: string) => {
        let fx, fxold, x2=0, ea=100;
        let iter = 1;
        const MAX = 50;
        const e = 0.000001;
        let obj : Secantobj = {} as Secantobj;

        do{
            fx = evaluate(UserInput.Equation, {[Scope]: x1});
            fxold = evaluate(UserInput.Equation, {[Scope]: x0});
            x2 = x1 - ((fx*(x1-x0)))/(fx-fxold);
            ea = error(x1, x2);

            obj = {
                iteration: iter,
                xL: x0,
                xM: x1,
                xR: x2,
                Err: ea,
                ErrNotDecimal: Math.round(ea),
            };
            data.push(obj);
            x0 = x1;
            x1 = x2;
            iter++;
            setAns(x2);
            
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
        CalSecant(UserInput.X0, UserInput.X1, Scope);
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
  
    const SetX0 = (event:number)=>{
        console.log(event);
        setUserInput((prevState)=>{
            return{
                ...prevState,
                X0:event
            }
        })
    }

    const SetX1 = (event:number)=>{
        console.log(event);
        setUserInput((prevState)=>{
            return{
                ...prevState,
                X1:event
            }
        })
    }
    
    return (
        <div>
            <form onSubmit={calculateRoot}>
                <div>
                    <h1 style={{color:'black'}}>Secant Method</h1>
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
                                    label="Input X0"
                                    onChange={SetX0}
                                    precision={2}
                                    required
                                />
                                <NumberInput
                                    label="Input X1"
                                    onChange={SetX1}
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

export default Secant

