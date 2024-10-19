"use client"; // Adicione esta linha no topo

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Nav() {
    const currentPath = usePathname(); // Atualizado

    const getSvgClass = (path) => {
        return currentPath === path ? 'text-cyan-400' : 'text-white'; // Altere a cor conforme necessário
    };

    return(
        <nav className="w-full h-20 bg-cyan-900 fixed top-0 flex place-items-center auto justify-center z-20"> 
        <Link href='/harpa'>
        <div className="w-14 h-14 mx-3 rounded-md flex justify-center place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={`bi bi-journal-text ${getSvgClass('/harpa')}`} viewBox="0 0 16 16">
            <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
            </svg>
        </div>
        </Link>
        <Link href='/hinos'>
        <div className="w-14 h-14 mx-3 rounded-md flex justify-center place-items-center"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={`bi bi-list-columns-reverse ${getSvgClass('/hinos')}`} viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 .5m4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10A.5.5 0 0 1 4 .5m-4 2A.5.5 0 0 1 .5 2h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-4 2A.5.5 0 0 1 .5 4h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m-4 2A.5.5 0 0 1 .5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m-4 2A.5.5 0 0 1 .5 8h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5m-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
            </svg>
        </div>
        </Link>
        <Link href='/liked'>
        <div className="w-14 h-14 mx-3 rounded-md flex justify-center place-items-center"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={`bi bi-heart ${getSvgClass('/liked')}`} viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
            </svg>
        </div>
        </Link>
        <Link href='/saved'>
        <div className="w-14 h-14 mx-3 rounded-md flex justify-center place-items-center"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={`bi bi-bookmark-heart ${getSvgClass('/saved')}`} viewBox="0 0 16 16">
            <path d="M8 4.41c1.32-1.33 3.5-.44 3.5 1.2 0 1.03-.4 1.38-3.5 3.77-3.1-2.39-3.5-2.74-3.5-3.77 0-1.64 2.18-2.53 3.5-1.2m0-1.43c-1.84-1.85-5.5-.56-5.5 2.63 0 1.57.76 2.37 5.5 6.14 4.74-3.77 5.5-4.57 5.5-6.14 0-3.19-3.66-4.48-5.5-2.63"/>
            <path d="M2 15V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13l-6-3-6 3"/>
            </svg>
        </div>
        </Link>
        </nav>
    );
}
