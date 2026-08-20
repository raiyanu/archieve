import React, { useState } from 'react'

export default function App() {
    const [btn, setBtn] = useState(0)
    return (
        <div>
            <p>

                My React App
            </p>

            <button onClick={() => {
                setBtn(btn - 1)
            }}>-</button>
            <p>
                {btn}
            </p>
            <button onClick={() => {
                setBtn(pre => pre + 1);
                setBtn(pre => pre + 1);
                setBtn(pre => pre + 1);

            }}>+</button>
        </div>

    )
}
