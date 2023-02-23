import React from "react"


function Footer({ props:{state, blur, BLUR} }) {
  return (
    <footer className={`${blur ? `blur` : ``}`}>
      <p>Moja aplikacja &copy; 2023</p>
    </footer>
  )
}

export default Footer