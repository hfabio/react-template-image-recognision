import { useEffect, useRef } from "react";
import GestureWorker from './workers/gestureWorker.js?worker';
import {useHandGesture} from './hooks/handGesture';

function App() {
  const canvasRef = useRef(null);
  const gestureWorker = useRef(new GestureWorker({type: 'module'}));
  const {isInitiated, initialize} = useHandGesture();

  useEffect(()=> {
    if(canvasRef.current){
      const ctx = canvasRef.current.getContext("2d");
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      console.log('render')
      gestureWorker.current.postMessage('test')
      if (!isInitiated) initialize(canvasRef);
    }
  }, [canvasRef])

  return (
    <>
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} ></canvas>
    </>
  )
}

export default App
