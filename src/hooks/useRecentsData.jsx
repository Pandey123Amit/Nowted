import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const getRecent = async () => {
    const res = await axios.get('https://nowted-server.remotestate.com/notes/recent')
    return res.data
  }


export default function useRecentsData() {
   return useQuery({
    queryKey: ['recent-key'],
    queryFn: getRecent,   
  })
}


