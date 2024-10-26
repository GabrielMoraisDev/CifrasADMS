"use client"; // Adicione esta linha no topo

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
    const currentPath = usePathname(); // Atualizado
    const [nav1, setNav1] = useState<boolean>(false)
    const [nav2, setNav2] = useState<boolean>(false)
    const [nav3, setNav3] = useState<boolean>(false)
    const [nav4, setNav4] = useState<boolean>(false)

    setTimeout(function() {
        setNav1(true)
      }, 200)

      setTimeout(function() {
        setNav2(true)
      }, 400)

      setTimeout(function() {
        setNav3(true)
      }, 600)

      setTimeout(function() {
        setNav4(true)
      }, 800)

    const getSvgClass = (path:string) => {
        return currentPath === path ? 'text-cyan-400' : 'text-white'; // Altere a cor conforme necessário
    };

    return(
        <nav className="w-full h-20 bg-cyan-900 fixed top-0 flex place-items-center auto justify-center z-20"> 
        <Link href='/harpa'>
        <div className={`${nav1?'animate-fade-right ':'opacity-0'} w-14 h-14 mx-3 rounded-md flex justify-center place-items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={`bi bi-journal-text ${getSvgClass('/harpa')}`} viewBox="0 0 16 16">
            <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
            </svg>
        </div>
        </Link>
        <Link href='/hinos'>
        <div className={`${nav2?'animate-fade-right ':'opacity-0'} w-14 h-14 mx-3 rounded-md flex justify-center place-items-center`}> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={`bi bi-list-columns-reverse ${getSvgClass('/hinos')}`} viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 .5m4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10A.5.5 0 0 1 4 .5m-4 2A.5.5 0 0 1 .5 2h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-4 2A.5.5 0 0 1 .5 4h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m-4 2A.5.5 0 0 1 .5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m-4 2A.5.5 0 0 1 .5 8h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5m-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
            </svg>
        </div>
        </Link>
        <Link href='/liked'>
        <div className={`${nav3?'animate-fade-right ':'opacity-0'} w-14 h-14 mx-3 rounded-md flex justify-center place-items-center`}> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={`bi bi-heart ${getSvgClass('/liked')}`} viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
            </svg>
        </div>
        </Link>
        <Link href='/saved'>
        <div className={`${nav4?'animate-fade-right ':'opacity-0'} w-14 h-14 mx-3 rounded-md flex justify-center place-items-center`}> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={`bi bi-bookmark ${getSvgClass('/liked')}`} viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
            </svg>
        </div>
        </Link>
        </nav>
    );
}
