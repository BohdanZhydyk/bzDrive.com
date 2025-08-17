import React from "react"
import ActionBtn from "../../../All/ActionBtn"
import Avatar from "../Elements/Avatar"


function OfficeTopLine({ props:{companies, activeCompany, toggle, setToggle} }){

  const companyUser = companies?.user ? companies?.user?.login : companies?.id

  const financesBtnProps = {
    name: toggle?.finances ? `cancel` : `fin`,
    click: ()=>{ setToggle(prev=> ({finances:!prev.finances})) }
  }

  const vinDecoderBtnProps = {
    name: toggle?.decoderVIN ? `cancel` : `vin`,
    click: ()=>{ setToggle(prev=> ({decoderVIN:!prev.decoderVIN})) }
  }

  const nipDecoderBtnProps = {
    name: toggle?.decoderNIP ? `cancel` : `nip`,
    click: ()=>{ setToggle(prev=> ({decoderNIP:!prev.decoderNIP})) }
  }

  const searchBtnProps = {
    name: toggle?.search ? `cancel` : `doc`,
    click: ()=>{
      setToggle(prev=> ({search:!prev.search}))
    }
  }

  const settingsBtnProps = {
    name: toggle?.settings ? `cancel` : `settings`,
    click: ()=>{ setToggle(prev=> ({settings:!prev.settings})) }
  }

  return(
    <div className="OfficeTopLine flex stretch between">

      <div className="ActiveCompanyPannel flex start">
        
        <Avatar props={{link:`https://bzdrive.com/files/dealers/`, ava:companies?.myCompanies[activeCompany]?.img}} />
        
        <span className="ActiveCompanyName flex start txtOrg bold">
          {`${companies?.myCompanies[activeCompany]?.shortName ?? `New_Company_${companies?.id}`}`}
        </span>

      </div>

      <div className="BtnsPannel flex end">
        {/* <ActionBtn props={financesBtnProps} /> */}
        {/* <ActionBtn props={vinDecoderBtnProps} /> */}
        <ActionBtn props={nipDecoderBtnProps} />
        {/* <ActionBtn props={searchBtnProps} /> */}
        <ActionBtn props={settingsBtnProps} />
      </div>

    </div>
  )
}

export default OfficeTopLine