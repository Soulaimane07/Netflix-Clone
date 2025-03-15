import React, { useState } from 'react'

function Faq({LanguagePath}) {
    const faqs = LanguagePath

    const [selected, setSelected] = useState(null)

  return (
    <article className='min-h-fit text-left py-28 px-60 pb-60 '>
        {faqs.map((item,key)=>(
            <div key={key} className='w-full'>
                <button className={`${key === selected ? 'opacity-100' : 'opacity-60'} text-left text-2xl border-b-2 py-8 border-opacity-20 w-full  border-mywhite`} onClick={()=> setSelected(key)}>
                    {item.title} 
                </button>
                <p className={`${key === selected ? 'flex': 'hidden'} w-full opacity-60  border-b-2 min-h-40 transition-all  border-opacity-20 py-4 text-left border-mywhite`}> 
                    {item.text} 
                </p>
            </div>
        ))}
    </article>
  )
}

export default Faq