import React from "react"

import './EditArea.scss'
import { getRandomColor, GetUser } from "../../../../AppFunctions"
import ActionBtn from '../../../All/ActionBtn'


export function ElDocBtns({ props:
  {order, save, setSave, edit, setEdit, actBtn, setActBtn, orderColor, setOrderColor}
}) {

  function EDIT_CHG(){ setSave(true); setEdit(!edit); }
  function ACT_CHG(act){ setSave(true); setActBtn(act); }
  function COLOR_CHG(){ setSave(true); setOrderColor( getRandomColor() ); }

  const OrderColor = {
    backgroundColor:orderColor,
    backgroundImage:`linear-gradient(0deg, ${orderColor}, #111a 30% 70%, ${orderColor})`
  }

  const isSameUser = order?.user === GetUser().login

  return(
    <div className="ElDocBtns flex">

      <div className="ActionBtns flex start">

        {
          ['open', 'repair', 'close', 'delete'].map( (btn, n)=>{
            const classes = `ActBtn ${btn === actBtn ? `ActBtn_${btn}` : ``} flex`
            return(
              <div className={classes} key={`ActBtn${n}`} onClick={()=>ACT_CHG(btn)}>
                {btn}
              </div>
            )
          })
        }

        <div className="ActBtn flex" style={OrderColor} onClick={COLOR_CHG}>
          {`OrderColor`}
        </div>

      </div>

      <div className="DocBtns flex end">
        <ActionBtn props={{name:save ? 'save' : 'print', click:()=>{}}} />
        { isSameUser && <ActionBtn props={{name:'delete', click:()=>{}}} />}
        <ActionBtn props={{name:'cancel', click:EDIT_CHG}} />
      </div>

    </div>
  )
}