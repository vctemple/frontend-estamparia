import React from "react";
import "../../styles/footer.css"

const footer = () => {
  return (
    <div className='footer'>
        <p>Todos os direitos reservados Ⓒ</p>
        <div className='tel'>
          {/*<BiPhone size='16px' />*/}
          <p>+55 19 99816-9477</p>
        </div>
    </div>
  )
}

export default footer