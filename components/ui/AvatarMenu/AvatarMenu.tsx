import { useEffect, useRef, useState } from 'react'
import Button from '../Button/Button'
import LinkItem from '../Link/LinkItem'
import { Session } from '@supabase/supabase-js'

type Props = {
  onLogout?: () => void
  session: Session | null
}

// Avtar with darpdown menu
export default ({ onLogout, session }: Props) => {
  const [state, setState] = useState(false)
  const profileRef = useRef<HTMLButtonElement>(null)

  const navigation = [
    { title: 'Profile', path: '/profile' },
    { title: 'Upvotes', path: '/account/upvotes' },
    { title: 'My tools', path: '/account/tools' },
  ]

  useEffect(() => {
    const handleDropDown = (e: MouseEvent) => {
      if (profileRef.current && !(profileRef.current as HTMLElement).contains(e.target as Node)) setState(false)
    }
    document.addEventListener('click', handleDropDown)
  }, [])

  return session && session.user ? (
    <div className="relative">
      <button
        ref={profileRef}
        className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-slate-700 lg:focus:ring-2"
        onClick={() => setState(!state)}
      >
        <img src={session.user.user_metadata.avatar_url} className="w-full h-full rounded-full" />
      </button>
      <ul
        className={`bg-slate-800 top-14 right-0 absolute rounded-lg w-52 shadow-md space-y-0 overflow-hidden ${
          state ? '' : 'hidden'
        }`}
      >
        {navigation.map((item, idx) => (
          <li key={idx}>
            <LinkItem
              href={item.path}
              className="block w-full py-2 px-3 font-normal text-slate-300 text-left rounded-none hover:bg-slate-700"
            >
              {item.title}
            </LinkItem>
          </li>
        ))}
        <Button
          onClick={onLogout}
          className="block w-full py-2 px-3 font-normal text-slate-300 text-left rounded-none border-t border-slate-700 bg-transparent hover:bg-slate-700"
        >
          Logout
        </Button>
      </ul>
    </div>
  ) : (
    <></>
  )
}
