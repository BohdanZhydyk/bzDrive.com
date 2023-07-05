import React, {useState} from "react"

import "./SeaBattle.scss"
import { BattleField } from "./BattleField"
import { ShipsField } from "./ShipsField"


function SeaBattle(){

  const field = [
    ["Z","1","2","3","4","5","6","7","8","9","10","Z"],
    ["A","","","","","","","","","","","Z"],
    ["B","","","","","","","","","","","Z"],
    ["C","","","","","","","","","","","Z"],
    ["D","","","","","","","","","","","Z"],
    ["E","","","","","","","","","","","Z"],
    ["F","","","","","","","","","","","Z"],
    ["G","","","","","","","","","","","Z"],
    ["H","","","","","","","","","","","Z"],
    ["I","","","","","","","","","","","Z"],
    ["J","","","","","","","","","","","Z"],
    ["Z","Z","Z","Z","Z","Z","Z","Z","Z","Z","Z","Z"]
  ]

  const [ships, setShips] = useState(
    [
      "#333","#333","#333","#333","#0000","#333","#333","#333","#333","#0000","#0000",
      "#0000","#0000","#0000","#0000","#0000","#0000","#0000","#0000","#0000","#0000","#0000",
      "#333","#333","#333","#0000","#333","#333","#333","#0000","#333","#333","#333",
      "#0000","#0000","#0000","#0000","#0000","#0000","#0000","#0000","#0000","#0000","#0000",
      "#333","#333","#0000","#333","#333","#0000","#333","#333","#0000","#333","#333",
      "#0000","#0000","#0000","#0000","#0000","#0000","#0000","#0000","#0000","#0000","#0000",
      "#333","#0000","#333","#0000","#333","#0000","#333","#0000","#333","#0000","#0000",
    ]
  )

  const [shipLen, setShipLen] = useState({pos:0, length:[4,4,3,3,3,2,2,2,2,1,1,1,1,1]})

  const [field1, setField1] = useState(field)
  const [field2, setField2] = useState(false)

  const elClass = (el,x,y)=>{
    if( el === 'Z'){ return `NullEl` }
    else if(y === 0){ return `TopEl` }
    else if(x === 0){ return `FirstEl` }
    else{ return `El` }
  }

  const EL_CLICK = (pl,x,y)=>{

    function ColorEl(prev,x,y,color){
      return prev.map( (line, Y)=>{
        return(
          (Y === y) && (Y !== 0) && (Y !== 11)
          ? line.map( (el, X)=>{
            return(
              (X === x) && (X !== 0) && (X !== 11)
              ? color
              : el
            )
          })
          : line
        )
      })
    }

    function PlusShip(prev){
      let first = true
      return prev.map( el=>{
        if(el === `#333` && first){
          first = false
          return `#171`
        }
        else{ return el }
      })
    }

    function MinusShip(prev){
      let first = true
      const revPrev = [...prev].reverse()
      return [...revPrev.map( el=>{
        if(el === `#171` && first){
          first = false
          return `#333`
        }
        else{ return el }
      })].reverse()
    }

    function newShipLen(l,x,y){
      let len = 1
      for( let i=1; i<(l+1); i++ ){ if(field1[y][x+i] === `#171`){len = len + 1} else {break} }
      for( let i=1; i<(l+1); i++ ){ if(field1[y][x-i] === `#171`){len = len + 1} else {break} }
      for( let i=1; i<(l+1); i++ ){ if(field1[y+i][x] === `#171`){len = len + 1} else {break} }
      for( let i=1; i<(l+1); i++ ){ if(field1[y-i][x] === `#171`){len = len + 1} else {break} }
      if(len === l){ setShipLen( prev=>({...prev, pos:(prev?.pos + 1)}) ) }
      return len <= l ? true : false
    }

    const isValidMove = (
      field1[y][x] === ''
      && field1[y-1][x-1] !== `#171`
      && field1[y-1][x+1] !== `#171`
      && field1[y+1][x-1] !== `#171`
      && field1[y+1][x+1] !== `#171`
    )

    if(pl === 1){
      const l = shipLen?.length[shipLen?.pos]
      if(isValidMove && newShipLen(l,x,y)){
        setField1(prev=> ColorEl(prev,x,y,`#171`))
        setShips(prev=> PlusShip(prev))
      }
      else{
        setField1(prev=> ColorEl(prev,x,y,``))
        setShips(prev=> MinusShip(prev))
      }
    }
    if(pl === 2){setField2( prev=> ColorEl(prev,x,y,`#171`) )}
  }

  console.log(ships)

  return(
    <div className="SeaBattle flex">
      
      <div className="BattleArea flex wrap">

        <BattleField props={{player:1, field:field1, elClass, EL_CLICK}}/>

        {
          field2
          ? <BattleField props={{player:2, field:field2, elClass, EL_CLICK}}/>
          : <ShipsField props={{ships}}/>
        }

      </div>

    </div>
  )
}

export default SeaBattle