import { Link } from 'react-router-dom'

function Gendre({item}) {
  return (
    <li key={item.id} className='w-64 h-28'>
      <Link
        to={`/gendres/${item.id}`} 
        className='w-60 h-full hover:scale-105 flex items-center overflow-hidden transition-all bg-gray-400 hover:bg-gray-500 bg-opacity-25 rounded-md'
      >
        <h2 className='pb-4 pl-6 pt-16 font-medium text-lg'>{item.title}</h2> 
      </Link>
    </li>
  )
}

export default Gendre