import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import { Group, Button, NumberInput, TextInput, Grid } from '@mantine/core';
import Chart from '../component/Chart';
import Tables from '../component/Tables';

interface Onepointobj {
    iteration : number;
    xM : number;
    Err : number;
    ErrNotDecimal : number;
}

interface LabelOnepoint {
    xM : string;
    Err : string;
}

function Onepoint() {

    const [newData, setNewData] = useState<Onepointobj[]>([]);
    const [Ans, setAns] = useState<number>(0);
    const [UserInput , setUserInput] = useState({
        EquationFX:"2x-1",
        EquationGX:"1/4+x/2",
        X:0,
        XL:0,
        XR:0,
    })

    const label: LabelOnepoint = {
        xM: `X`,
        Err: `Err`
    }

    const data: Onepointobj[] = [];

    const error = (xold: number, xnew: number) => Math.abs((xnew-xold)/xnew)*100;

    const CalOnepoint = (x: number, Scope: string) => {
        let xnew=0, ea=100;
        let iter = 0;
        const MAX = 50;
        const e = 0.000001;
        let obj : Onepointobj = {} as Onepointobj;

        do{
            xnew = evaluate(UserInput.EquationGX, { [Scope]: x});
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
        const Scope:any = Regex(UserInput.EquationGX);
        CalOnepoint(UserInput.X, Scope);
        setNewData(data)
    }

    const SetEquationFX = (event:React.ChangeEvent<HTMLInputElement>)=>{
        console.log(event.target.value);
        setUserInput((prevState)=>{
            return{
                ...prevState,
                EquationFX:event.target.value
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

    const SetEquationGX = (event:React.ChangeEvent<HTMLInputElement>)=>{
        console.log(event.target.value);
        setUserInput((prevState)=>{
            return{
                ...prevState,
                EquationGX:event.target.value
            }
        })
    }
    
    return (
        <div>
            <form onSubmit={calculateRoot}>
                <div>
                    <h1 style={{color:'black'}}>Onepoint Iteration Method</h1>
                    <Group position='center'>
                        <Grid justify='center'>
                            <Grid.Col span="content">
                                <TextInput
                                    label="Input f(x)"
                                    onChange={SetEquationFX}
                                    value={UserInput.EquationFX}
                                    required
                                />
                                <TextInput
                                    label="Input g(x)"
                                    onChange={SetEquationGX}
                                    value={UserInput.EquationGX}
                                    required
                                />
                                <NumberInput
                                    label="Input XL"
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

export default Onepoint

