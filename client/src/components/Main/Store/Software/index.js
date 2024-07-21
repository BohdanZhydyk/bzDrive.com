import React, { useState } from "react"

import "./Software.scss"


function Software() {

  const [brands, setBrands] = useState(["VW", "Toyota", "Ford", "Alfa Romeo", "Mercedes"])
  // const [brands, setBrands] = useState(false)

  console.log(brands)

  return (
    <div className="Software flex">

    {
      brands &&
      <div className="BrandsWrapper flex wrap">
      {
        brands?.map( (brand, b)=>{

          const key = `Brand${b}`
          const brandIco = `https://bzdrive.com/files/CarIcons/${brand?.replace(/[^a-zA-Z]/g, '').toLowerCase()}.svg`

          return(
            <div className="Brand flex" key={key}>
              <img className="ImgBtn IcoColor flex" src={brandIco} alt="SVG" />
              <div className="BrandName flex">{brand}</div>
            </div>
          )

        })
      }
      </div>
    }

    </div>
  )
}

export default Software