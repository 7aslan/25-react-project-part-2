import CountdownTimer from ".";
import './timer.css'

function CountdownTimerTest(){

    function handleTimeFinish(){
        console.log("Countdown is finished and passed to the db")
    }
    return(
        <div>
            <h1>CountDown Timer</h1>
            <CountdownTimer initialTime={120} onTimeFinish={handleTimeFinish}/>

        </div>
    )
}
export default CountdownTimerTest;