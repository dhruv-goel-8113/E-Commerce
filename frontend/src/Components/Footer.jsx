import {Link} from 'react-router-dom'
import FOOTER_LINKS from '../assets/footer_links.js'
import FOOTER_CONTACT_INFO from '../assets/footer_contact.js'
import SOCIALS from '../assets/socials.js'
export const Footer = () => {
  return (
    <footer className='flexCenter pb-24 pt-10'>
      <div className='max_padd_container flex w-full flex-col gap-14'>
        <div className='flex flex-col gap-[8%] md:flex-row'>
          <Link to={'/'} className='mb-5 bold-20'>Shoppee</Link>
          <div className='flex flex-wrap gap-10 md:flex-1'>
            {FOOTER_LINKS.map((col)=>(
              <FooterColumn title={col.title} key={col.title}>
                <ul className='flex flex-col gap-4 regular-14 text-gray-20'>
                  {col.links.map((link)=>(
                    <Link to='/'>{link}</Link>
                  ))}
                </ul>
              </FooterColumn>
            ))}
            <div className='flex flex-col gap-5'>
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link)=>(
                  <Link to='/' key={link.label} className='flex gap-2 md:flex-col xl:flex-row'>
                    <p>{link.label}:</p><p className='medium-14'>{link.value}</p>
                  </Link>
      
                ))}
              </FooterColumn>

            </div>
            <div className='flex'>
              <FooterColumn>
                <ul className='flex gap-4'>
                  {SOCIALS.links.map((link)=>(
                    <Link to='/' key={link}><img src={link} alt="socialIcon" height={22} width={22}/></Link>
                  ))}
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>
        <div className='border bg-gray-20'></div>
        <p className='text-center regular-14 text-gray-30'>2024 Shoppee | All rights reserved.</p>
      </div>
    </footer>
  )
}

const FooterColumn=({title,children})=>{
return(
  <div className='flex flex-col gap-5'>
    <h4 className='bold-18 whitespace-nowrap'>{title}</h4>
    {children}
  </div>
)
}