import { useEffect, useState } from "react"

export const Timer = ()=>{
    const [seconds,setSeconds] = useState(0);
    const [minutes,setMinutes] = useState(0);

    let timer;

    useEffect(()=>{
        timer = setInterval(()=>{
            setSeconds(seconds+1)

            if(seconds === 59)
            {
                setMinutes(minutes+1);
                setSeconds(0);
            }
        },1000)

        return ()=>clearInterval(timer)
    })

    if(minutes > 1)
    {
        clearInterval(timer)
    }
    return(
        <div>
           Task Expires in 1 Minute {minutes < 1 ? 
            <h5 style={{color:"red"}}>{"0"+minutes}:{seconds<10 ? "0"+seconds:seconds}</h5>:
            <h5 style={{color:"red"}}>Task Expired</h5> }
        </div>
    )
}