import { Outlet } from 'react-router-dom';
import NotesDetails from './NotesDetails';

function Middlebar() {
  return (
    <div className='text-white flex h-full w-full'>
      <Outlet />
    </div>
  )
}

export default Middlebar;
