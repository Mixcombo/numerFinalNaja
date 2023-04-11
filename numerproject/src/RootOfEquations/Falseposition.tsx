import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import { useClickOutside } from '@mantine/hooks';
import { Group, Button, NumberInput, TextInput, Grid, Transition, Alert, Dialog} from '@mantine/core';
import Chart from '../component/Chart';
import Tables from '../component/Tables';

interface Falseposobj {
    iteration : number;
    xL : number;
    xM : number;
    xR : number;
    Err : number;
    ErrNotDecimal : number;
}

interface LabelFalse {
    xL : string;
    xM : string;
    xR : string;
    Err : string;
}

function Falsepos() {

    const [newData, setNewData] = useState<Falseposobj[]>([]);
    const [InValid, setInValid] = useState<boolean>(false);
    const clickOutside = useClickOutside(()=>{setInValid(false)});
    const [UserInput , setUserInput] = useState({
        Equation:"(x^4)-13",
        X:0,
        XL:0,
        XR:0,
    })

    const label: LabelFalse = {
        xL: `xL`,
        xM: `xM`,
        xR: `xR`,
        Err: `Err`
    }

    const data: Falseposobj[] = [];

    const error = (xold: number, xnew: number) => Math.abs((xnew-xold)/xnew)*100;

    const CalFalsepos = (xl: number, xr: number, Scope: string) => {
        let fXnew, fXl, fXr, xnew: number, xold=0, ea=100;
        let iter = 0;
        const MAX = 50;
        const e = 0.000001;
        let obj : Falseposobj = {} as Falseposobj;

        fXl = evaluate(UserInput.Equation, {[Scope]:xl})
        fXr = evaluate(UserInput.Equation, {[Scope]:xr})

        let check: number = fXl * fXr;

        if(check>=0 || xl>xr){
            setInValid(true)
            setUserInput((prevState)=>{
                return{
                    ...prevState,
                    X:0
                }
            })
            return
        }
        do{
            fXl = evaluate(UserInput.Equation, { [Scope]: xl });
            fXr = evaluate(UserInput.Equation, { [Scope]: xr });
            xnew = (xl*fXr - xr*fXl)/(fXr-fXl);
            fXnew = evaluate(UserInput.Equation, {[Scope]:xnew})
            iter++;

            if(fXnew*fXr > 0){
                ea = error(xold, xnew);
                obj = {
                    iteration: iter,
                    xL: xl,
                    xM: xnew,
                    xR: xr,
                    Err: ea,
                    ErrNotDecimal: Math.round(ea),
                };
                data.push(obj);
                xr = xnew;
            }
            else if(fXnew*fXr < 0){
                ea = error(xl, xnew);
                obj = {
                    iteration: iter,
                    xL: xl,
                    xM: xnew,
                    xR: xr,
                    Err: ea,
                    ErrNotDecimal: Math.round(ea),
                };
                data.push(obj);
                xl = xnew;
            }
            xold = xnew;
        }while(ea>e && iter<MAX)

        setUserInput({
            ...UserInput,
            X:xnew
        })
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
        const xlnum: number = UserInput.XL;
        const xrnum: number = UserInput.XR;
        const Scope:any = Regex(UserInput.Equation);
        CalFalsepos(xlnum, xrnum,Scope);
        setNewData(data)
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
  
    const SetXL = (event:number)=>{
        console.log(event);
        setUserInput((prevState)=>{
            return{
                ...prevState,
                XL:event
            }
        })
    }
  
    const SetXR = (event:number)=>{
        console.log(event);
        setUserInput((prevState)=>{
            return{
                ...prevState,
                XR:event
            }
        })
    }
    
    return (
        <div>
            <form onSubmit={calculateRoot}>
                <div>
                    <h1 style={{color:'black'}}>False Position Method</h1>
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
                                    label="Input XL"
                                    onChange={SetXL}
                                    precision={2}
                                    required
                                />
                                <NumberInput
                                    label="Input XR"
                                    onChange={SetXR}
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
                                <h2>Answer = {UserInput.X.toPrecision(7)}</h2>
                            </Grid.Col>
                            <Grid.Col span="content">
                                <div style={{margin:"50px", marginLeft:"90px"}}>
                                    <Chart data={newData}/>
                                </div>
                            </Grid.Col>
                        </Grid>
                    </Group>
                    <Tables data={newData} label={label} />
                    <Transition mounted={InValid} transition="slide-up" duration={1000} timingFunction='ease'>
                        {(styles)=><Dialog opened={InValid} withBorder={false} style={{...styles,padding:0}}>
                            <Alert color='red' ref={clickOutside} variant='filled' title="Something Wrong">
                                Your input XL or XR is wrong
                            </Alert>
                        </Dialog>}
                    </Transition>
                </div>
            </form>
        </div>
    )
}

export default Falsepos

