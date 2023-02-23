import React from "react"


export function FullScreenPannel({ props:{blur, BLUR} }) {
  return (
    <div className="FullScreenPannel">

      <div className="BlurPannel flex" onClick={()=>blur && BLUR()}></div>

      {
        blur &&
        <div className="SidePannel">

          <div className="SidePannelTop flex"></div>

          <div className="AuthPanel flex column">

            <div className="Title">Zaloguj się</div>
            {/* <div className="Title">Zarejestruj się</div>
            <div className="Title">Resetowanie hasła</div> */}

            <form className="FormPannel flex column">

              <fieldset className="Input">

                <legend>{`email`}</legend>

                <input type="email" placeholder={`wprowadź dane...`} value={``}
                  // onChange={ (e)=> ON_CHANGE(e) }
                  // onKeyUp={ (e)=> e.key === "Enter" && ON_KEYUP_IMG(e) }
                />

                <img className="ImgBtnSmall"
                  src={`https://bzdrive.com/files/ico/icoSearch.png`}
                  // onClick={ ()=> ON_KEYUP_IMG({ target:{value:val}, key:"Enter" }) }
                  alt={`search`}
                />

              </fieldset>

              <fieldset className="Input">

                <legend>{`password`}</legend>

                <input type="password" placeholder={`wprowadź dane...`} value={``}
                  // onChange={ (e)=> ON_CHANGE(e) }
                  // onKeyUp={ (e)=> e.key === "Enter" && ON_KEYUP_IMG(e) }
                />

                <img className="ImgBtnSmall"
                  src={`https://bzdrive.com/files/ico/icoSearch.png`}
                  // onClick={ ()=> ON_KEYUP_IMG({ target:{value:val}, key:"Enter" }) }
                  alt={`search`}
                />

              </fieldset>

              <button className="Button" type="submit">Log In</button>
              
            </form>

            <div className="EnotherButtons flex">
              <div className="Link flex"><a href="/privacy">Sign Up</a></div>
              <div className="Link flex"><a href="/privacy">Forgot Password?</a></div>
            </div>

            <div className="Link flex"><a href="/privacy">Privacy Policy</a></div>
            
          </div>

        </div>
      }

    </div>
  )
}