import React, { memo } from 'react'
import BasicButton from '../Components/Material/Button'

const Apk = memo(() => {
  return (
   <>
   <div className='flix'>
   <a href='https://www.dropbox.com/s/l48qxois9ascfm5/app-release.apk?dl=0' target='_download'>
                    <BasicButton text={'download apk'} />
                  </a>
                  </div>
   </>
  )
})

export default Apk