import React from "react"

import './News.scss'


function News() {

  const txt_1 = `
    bzDrive.com to miejsce, w którym będziemy publikować najnowsze wiadomości odnosnie naszej strony.
    Będziemy prezentować zarówno informacje dotyczące naszej strony oraz jej funkcji, jak i ciekawostki ze świata technologii i internetu.
  `
  const txt_2 = `
    Będziemy na bieżąco informować Cię o najważniejszych wydarzeniach. Zapraszamy do regularnego odwiedzania naszej strony i śledzenia naszych postów.
  `

  return(
    <div className="News flex column">

      <h2>News</h2>

      <div className="NewsInfo">
        <p>{txt_1}</p>
        <p>{txt_2}</p>
      </div>

    </div>
  )
}

export default News