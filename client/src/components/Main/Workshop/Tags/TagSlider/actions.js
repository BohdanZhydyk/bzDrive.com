
export const actions = (action, img, setImg, folder, setFolder, slider, setSlider)=>{
  
  let sliderLen = slider.length
  let folderLen = slider[folder].imgs.length
  
  function PrevFolder(){
    setImg( folder === 0 ? slider[sliderLen - 1].imgs.length - 1 : slider[folder - 1].imgs.length - 1 )
    setFolder( folder === 0 ? (sliderLen - 1) : folder - 1 )
  }
  function NextFolder(){
    setFolder( sliderLen === (folder + 1) ? 0 : folder + 1 )
    setImg(0)
  }
  
  switch(action.type){
    // case "EDIT":          EDIT(edit, setEdit);                                break
    case "SLIDE_LEFT":    SLIDE_LEFT(PrevFolder, img, setImg);                break
    case "SLIDE_RIGHT":   SLIDE_RIGHT(folderLen, NextFolder, img, setImg);    break
    case "MOVE_IMG":      MOVE_IMG(action, folderLen, slider, setSlider);     break
    case "INPUT_CHG":     INPUT_CHG(action, slider, setSlider);               break
    default: break
  }
}

// const EDIT = (edit, setEdit)=> setEdit(!edit)

const SLIDE_LEFT = (PrevFolder, img, setImg)=>{
  img === 0 ? PrevFolder() : setImg(img - 1)
}

const SLIDE_RIGHT = (folderLen, NextFolder, img, setImg)=>{
  folderLen === (img + 1) ? NextFolder() : setImg(img + 1)
}

const MOVE_IMG = (action, folderLen, slider, setSlider)=>{
  let moveFromTo = (arr, from, to)=>{
    if(to >= 0 && to <= folderLen){
      arr.splice(to, 0, arr.splice(from,1)[0])
    }
    return arr
  }
  setSlider(
    slider.map( (el, n)=>{
      return(
        n === action.folder
        ? {...el, imgs: moveFromTo(el.imgs, action.from, action.to)}
        : el
      )
    })
  )
}

const INPUT_CHG = (action, slider, setSlider)=>{
  let getTxt = (txt)=>{
    return txt.map( (line)=> line.name === action.lang ? {...line, val:action.value} : line )
  }
  setSlider(
    slider.map( (el, n)=> n === action.folder ? {...el, txt: getTxt(el.txt)} : el)
  )
}