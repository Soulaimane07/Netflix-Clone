function Header({tab, setTab, tabs}) {
  return (
    <ul className='flex mx-16 z-40 space-x-14 text-xl font-medium border-b-2 border-slate-100 border-opacity-20  bg-primary'>
        {tabs.map((item,key)=>(
            <a href={`#${item.title}`} key={key} onClick={()=> setTab(key)}>
                <h2 className={`${tab === key ? ' opacity-100' : 'opacity-50'} transition-all pb-8`}>{item.title}</h2>
            </a>
        ))}
    </ul>
  )
}

export default Header