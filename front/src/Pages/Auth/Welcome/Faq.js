import React, { useState } from 'react'

function Faq() {
    const faqs = [
        {
            "question": "What is Disney+ ?",
            "desc": "Disney+ is the dedicated streaming home of your favourite stories from Disney, Pixar, Marvel, Star Wars, National Geographic; as well as a huge range of general entertainment with Star - all in one place.  With thousands of movies, TV series, and exclusive Originals to choose from, there's something for everyone on Disney+. Subscribers can also enjoy a number of benefits included in their subscription, such as:",
        },
        {
            "question": "What can I watch on Disney+?",
            "desc": "With thousands of films and series from the greatest storytellers around the globe and more added each month, you will always find something to watch on Disney+ "
        },
        {
            "question": "What is Disney+ ?",
            "desc": "Disney+ is the dedicated streaming home of your favourite stories from Disney, Pixar, Marvel, Star Wars, National Geographic; as well as a huge range of general entertainment with Star - all in one place.  With thousands of movies, TV series, and exclusive Originals to choose from, there's something for everyone on Disney+. Subscribers can also enjoy a number of benefits included in their subscription, such as:",
        },
        {
            "question": "What can I watch on Disney+?",
            "desc": "With thousands of films and series from the greatest storytellers around the globe and more added each month, you will always find something to watch on Disney+ "
        }
    ]

    const [selected, setSelected] = useState(null)

  return (
    <article className='min-h-fit text-left py-28 text-white px-60 pb-60'>
        {faqs.map((item,key)=>(
            <div key={key} className='w-full'>
                <button className={`${key === selected ? 'opacity-100' : 'opacity-60'} text-2xl border-b-2 py-8 border-opacity-20 w-full text-left border-white`} onClick={()=> setSelected(key)}>
                    {item.question} 
                </button>
                <p className={`${key === selected ? 'flex': 'hidden'} w-full opacity-60  border-b-2 min-h-40 transition-all  border-opacity-20 py-4 text-left border-white`}> {item.desc} </p>
            </div>
        ))}
    </article>
  )
}

export default Faq