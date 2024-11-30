import React from 'react'

import { Title } from './Title'
import { AdminBtns } from './AdminBtns'


function CardTopLine({
  props: {car, sw, printMode, defaultFileAddr, isAdmin, setIsLine, editCard, setEditCard, del, setDel, docID, Reducer}
}) {

  const btnsProps = {sw, printMode, defaultFileAddr, isAdmin, setIsLine, editCard, setEditCard, del, setDel, docID, Reducer}

  return (
    <div className="CardTopLine flex stretch">

      <Title props={{car, sw}}/>

      <div className="IDsection flex column start">

        {
          sw?.id &&
          <div className="CardID txtGry flex end">
            <span>{`ID: ${sw?.id ?? ""}`}</span>
          </div>
        }

        <AdminBtns props={btnsProps} />

      </div>

    </div>
  )
}

export default CardTopLine
