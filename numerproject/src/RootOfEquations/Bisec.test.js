import { render, screen, fireEvent } from '@testing-library/react';
import Bisection from './Bisection';

describe('Bisection', () => {
    it('cal function when form is summitted', () => {
        render(<Bisection/>)
            const fxInput = screen.getByTestId('fx')
            const xlInput = screen.getByTestId('xl')
            const xrInput = screen.getByTestId('xr')
            const clickbtn = screen.getByTestId('calculate')

            // console.log(fxInput.value)
            // console.log(xlInput)
            // console.log(xrInput)

            fireEvent.change(fxInput, {target: {value: '(x^2)-7'}})
            fireEvent.change(xlInput, {target: {value: 2}})
            fireEvent.change(xrInput, {target: {value: 3}})

            console.log(fxInput.value)
            console.log(xlInput.value)
            console.log(xrInput.value)

            fireEvent.click(clickbtn)

            const ans = screen.getByTestId('ans')
            console.log(ans.textContent)
            
            expect(ans.textContent).toBe('Answer = 2.645751')
    })
    
});
