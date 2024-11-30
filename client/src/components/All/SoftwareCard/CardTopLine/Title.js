import React from 'react'


export function Title({ props: {car, sw} }) {

  const progIcons = sw.programmer.split(',').map(p => `https://bzdrive.com/files/ico/Prog ${p.trim()}.png`)

  const brand = car?.brand?.length ? car.brand : "brand"
  const model = car?.model?.length ? car.model : "model"
  const ECUType = sw?.ECUType?.length ? sw.ECUType :  "ECUType"

  return (
    <div className="Title flex start bold">

      <div className="IcoProgrammer flex column">
        {
          progIcons?.length > 0 && progIcons.map( (progIcon, alt)=>{
            return <img src={progIcon} alt={alt} key={`ProgIcon${sw?.id}${alt}`} />
          })
        }
      </div>

      <div className='TitleTxt flex start wrap'>

        <span>{`${brand} ${model}`}</span>
        
        <span>{ECUType}</span>

      </div>

    </div>
  )
}
