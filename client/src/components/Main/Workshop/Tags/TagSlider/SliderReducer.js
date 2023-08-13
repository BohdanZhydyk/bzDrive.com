import { PostToApi, bzDeleteFile } from "../../../../../AppFunctions"

export function getBody(body, folderNr, imageNr){
  
  return(
    {
      body: body.map( (folder, f)=>({
        ...folder,
        imgs:folder?.imgs.map( (img, i)=>(
          {...img, act:((f === folderNr) && (i === imageNr))}
        )),
        act:(f === folderNr)
      })),
      folderNr,
      imageNr
    }
  )
}

export const SliderReducer = (action)=>{
  switch(action.type){
    case "SLIDE_PREV":    SLIDE_PREV(action);   break
    case "SLIDE_NEXT":    SLIDE_NEXT(action);   break
    case "MOVE_IMG":      MOVE_IMG(action);     break
    default: break
  }
}

const SLIDE_PREV = ({setSlider, actImgs}) => {
  setSlider(prev => {
    const { body, folderNr, imageNr } = prev
    const isFirstImage = imageNr === 0
    const isFirstFolder = folderNr === 0

    if (isFirstFolder) {
      return isFirstImage
        ? getBody(body, body.length - 1, body[body.length - 1].imgs.length - 1)
        : getBody(body, folderNr, imageNr - 1)
    } else {
      return isFirstImage
        ? getBody(body, folderNr - 1, body[folderNr - 1].imgs.length - 1)
        : getBody(body, folderNr, imageNr - 1)
    }
  })
}

const SLIDE_NEXT = ({setSlider, actImgs})=>{
  setSlider( prev=>{
    const { body, folderNr, imageNr } = prev
    const isLastImage = imageNr === actImgs.length - 1
    const isLastFolder = folderNr === body.length - 1

    if(isLastFolder){
      return isLastImage
      ? getBody(body, 0, 0)
      : getBody(body, folderNr, imageNr + 1)
    } else {
      return isLastImage
      ? getBody(body, folderNr + 1, 0)
      : getBody(body, folderNr, imageNr + 1)
    }
  })
}

function MOVE_IMG({el, nr, dir, folderNr, image, imageNr, fileAddr, setWorkshop, setEditingTag}){

  function ImgTo(imgs, nr){

    const imgToMove = imgs.splice(nr, 1)[0]

    switch(dir) {
      case "LEFT":
        imgs.splice(nr - 1, 0, imgToMove)
        return imgs
      case "RIGHT":
        imgs.splice(nr + 1, 0, imgToMove)
        return imgs
      case "DEL":
        const fileName = image?.img
        bzDeleteFile(fileAddr, fileName, (data)=>{
          if(data?.status === 200){ imgs.splice(nr, 1) }
        })
        return imgs
      default: return imgs
    }
  }

  const newEl = {
    ...el,
    body:el?.body.map( (folder, F)=>
      F !== folderNr
      ? folder
      :
      {...folder, imgs:ImgTo(folder?.imgs, imageNr)}
    )
  }
  const query = { setWorkshop:true, tag:newEl }
  PostToApi( '/getWorkshop', query, (data)=>{
    setWorkshop(data?.workshop)
    setEditingTag( prev=> newEl )
  })

}