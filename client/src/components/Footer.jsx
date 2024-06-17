import { Button, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#111827] h-[10vh] p-5 flex items-center justify-between rounded-md'>
      <div>
        <Typography fontSize={'20px'} color={'#fff'}>
          © 2024 Blog App. All rights reserved.
        </Typography>
      </div>
      <div className='flex gap-5'>
        <div>
          <Button sx={{ color: '#fff' }}>Terms</Button>
        </div>
        <div>
          <Button sx={{ color: '#fff' }}>Privacy</Button>
        </div>
        <div>
          <Button sx={{ color: '#fff' }}>Sitemap </Button>
        </div>
      </div>
    </div>
  )
}

export default Footer
