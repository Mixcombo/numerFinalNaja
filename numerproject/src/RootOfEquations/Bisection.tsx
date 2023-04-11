import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import { useClickOutside } from '@mantine/hooks';
import { Group, Button, NumberInput, TextInput, Grid, Transition, Alert, Dialog} from '@mantine/core';
import Chart from '../component/Chart';
import Tables from '../component/Tables';

interface Bisectionobj {
    iteration : number;
    xL : number;
    xM : number;
    xR : number;
    Err : number;
}

interface LabelBisec {
    xL : string;
    xM : string;
    xR : string;
    Err : string;
}

function Bisection() {

    const [newData, setNewData] = useState<Bisectionobj[]>([]);
    const [InValid, setInValid] = useState<boolean>(false);
    const clickOutside = useClickOutside(()=>{setInValid(false)});
    const [UserInput , setUserInput] = useState({
        Equation:"(x^4)-13",
        X:0,
        XL:0,
        XR:0
    })

    const label: LabelBisec = {
        xL: `xL`,
        xM: `xM`,
        xR: `xR`,
        Err: `Err`
    }

    const data: Bisectionobj[] = [];

    const error = (xold: number, xnew: number) => Math.abs((xnew-xold)/xnew)*100;

    const Calbisection = (xl: number, xr: number, Scope: string) => {
        let xm, fXm, fXr, fXl, ea=100;
        let iter = 0;
        const MAX = 50;
        const e = 0.000001;
        let obj : Bisectionobj = {} as Bisectionobj;

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
            xm = (xl+xr)/2.0
            fXr = evaluate(UserInput.Equation, { [Scope]: xr });
            fXm = evaluate(UserInput.Equation, { [Scope]: xm });
            iter++;

            if(fXm*fXr > 0){
                ea = error(xr, xm);
                obj = {
                    iteration: iter,
                    xL: xl,
                    xM: xm,
                    xR: xr,
                    Err: ea,
                };
                data.push(obj);
                xr = xm;
            }
            else if(fXm*fXr < 0){
                ea = error(xl, xm);
                obj = {
                    iteration: iter,
                    xL: xl,
                    xM: xm,
                    xR: xr,
                    Err: ea,
                };
                data.push(obj);
                xl = xm;
            }
            else{
                ea = 0;
                obj = {
                    iteration: iter,
                    xL: xl,
                    xM: xm,
                    xR: xr,
                    Err: ea,
                };
                data.push(obj);
                break;
            }
        }while(ea>e && iter<MAX)

        setUserInput({
            ...UserInput,
            X:xm
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
        Calbisection(xlnum, xrnum,Scope);
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
                    <h1 style={{color:'black'}}>Bisection Method</h1>
                    <Group position='center'>
                        <Grid justify='center'>
                            <Grid.Col span="content">
                                <TextInput
                                    label="Input f(x)"
                                    onChange={SetEquation}
                                    value={UserInput.Equation}
                                    data-testid='fx'
                                    required
                                />
                                <NumberInput
                                    label="Input XL"
                                    onChange={SetXL}
                                    precision={2}
                                    data-testid='xl'
                                    required
                                />
                                <NumberInput
                                    label="Input XR"
                                    onChange={SetXR}
                                    precision={2}
                                    data-testid='xr'
                                    required
                                />
                                <Button 
                                    data-testid='calculate'
                                    mt="md" 
                                    size='sm' 
                                    type='submit' 
                                    variant="gradient" 
                                    gradient={{ from: 'indigo', to: 'cyan', deg: 60 }}>
                                        Calculate
                                </Button>
                                <h2 data-testid='ans'>Answer = {UserInput.X.toPrecision(7)}</h2>
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

export default Bisection

