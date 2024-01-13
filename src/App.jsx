import { useEffect, useMemo, useState } from 'react'
import Confetti  from 'react-confetti'
import './App.css'

const gameIcons=[
 "💍", "👟", "🎩", "🧤", "👑",'⛑️'

]




function App() {
const [pieces, setPieces] = useState([])
const isGameCompleted= useMemo(() => { 
  if(pieces.length>0 && pieces.every((piece) => piece.solved)){
  return true;}
  return false
   } , [pieces])

const startGame =()=>{

const duplicateGameIcons= [...gameIcons,...gameIcons]


const newGameIcons=[]

while(newGameIcons.length < gameIcons.length*2){
const randomIndex=Math.floor(Math.random()* duplicateGameIcons.length);
newGameIcons.push({

  emoji:duplicateGameIcons[randomIndex],
  flipped:false,
  solved:false,
  position:newGameIcons.length
 
})

duplicateGameIcons.splice(randomIndex,1)

}

setPieces(newGameIcons)

}


useEffect(() => {
  startGame();
}, [])


const handleActive =(data)=>{
const flippedData=pieces.filter(data => data.flipped && !data.solved)
if(flippedData.length==2) return;

const newPieces=  pieces.map((piece)=>{
  if(piece.position===data.position){
    piece.flipped=!piece.flipped;
  }
  return piece;
})
setPieces(newPieces);
}

const gameGameLogic=()=>{
 const flippedData=pieces.filter((data)=> data.flipped && !data.solved);
 if(flippedData.length===2){
 setTimeout(() => {
  if(flippedData[0].emoji===flippedData[1].emoji){
    setPieces(pieces.map((pieces)=>{

      if(pieces.position===flippedData[0].position||pieces.position===flippedData[1].position)
      {
        pieces.solved=true;
      }
       return pieces;
  
     }))

  }else{

   setPieces(pieces.map((pieces)=>{

    if(pieces.position===flippedData[0].position||pieces.position===flippedData[1].position)
    {
      pieces.flipped=false;
    }
     return pieces;

   }))

  }
 }, 800);
 }
}



useEffect(() => {
  gameGameLogic();

}, [pieces])


  return (
    <>
   <main>
   <h1>MATCH GAME</h1>
    <div className='Container'>
      {pieces.map((data,index)=>(
     <div className={`flip-card ${data.flipped||data.solved ?"active" :""} `}
     
     key={index} onClick={()=>handleActive(data)}>
     <div className="flip-card-inner">
    <div className="flip-card-front"> </div>
    <div className="flip-card-back">{data.emoji}</div>
    </div>
    
   </div>
    ))}
    </div>

    {isGameCompleted &&(
      <div className='game-completed'>
 <h1 className='win'>YOU WIN.....</h1>
 <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
    />
    </div>) }
   
   </main>
   </>
  )
}

export default App
