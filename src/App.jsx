import React, { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import Confetti from 'react-confetti'

export default function App() {

  const [numbers,setNumbers]=useState(allnewDice())
  const [tenzies,setTenzies]=useState(false)


  useEffect(()=> {
    const results=[]
    const allTrue=numbers.map((el)=>el.isHeld ? el.isHeld : false)
    const allTrueResults=allTrue.find(el=>el===false)

    const firstValue=numbers[0].value;

    const sameValues=numbers.map((el)=>firstValue===el.value ? true : false)
    const sameValuesResults=sameValues.find(el=>el===false)

    
    
   if(allTrueResults!==false && sameValuesResults!==false) {
      setTenzies(true)
      console.log("you won")
   } 


  },[numbers])

  function createNewDice() {
    return ( 
       {
        value:Math.floor(Math.random()*(6-1+1)+1),
        isHeld:false,
        id:nanoid()
       }

    )
  }
  
  function allnewDice() {
      const numbersArray=[]

      for( let i=0;i<10;i++) {
        numbersArray.push(createNewDice())
        
      } 
      
    return (
      numbersArray
      
    )
  }

  function rollDice() {
    // eslint-disable-next-line no-restricted-globals
    if(event.target.innerText==="New Game") {
      setTenzies(false)
      setNumbers(allnewDice())
    } else {

    setNumbers(prevState=> prevState.map((number)=> 

        number.isHeld ? number : createNewDice()

    ))
    } 
    
  }

  function holdDice(id) {

    setNumbers(prevNumbers=>prevNumbers.map((number)=> 
      id===number.id ? {...number, isHeld : !number.isHeld} : number
    ))

  }

  const mapNumbers=numbers.map((el)=> 
    <Die value={el.value} key={el.id} held={el.isHeld} holdDice={()=>holdDice(el.id)} />
  )


  return (
    
      <main>

        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="container">
          {mapNumbers}
        </div>
        <button className="roll" onClick={rollDice} >{tenzies ? "New Game" : "Roll"}</button>
        {tenzies && <Confetti/>}
      </main>
   
  )
}