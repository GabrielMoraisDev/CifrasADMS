import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import "../../../app/globals.css";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;

  const [btn1, setBtn1] = useState(false);
  const [btn2, setBtn2] = useState(false);
  const [btn3, setBtn3] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setBtn1(true), 200);
    const timer2 = setTimeout(() => setBtn2(true), 500);
    const timer3 = setTimeout(() => setBtn3(true), 800);

    // Limpa os temporizadores quando o componente é desmontado
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <>
      <nav className="w-full h-20 bg-cyan-900 fixed top-0 flex place-items-center justify-center z-20">
        <Link href={`/harpa/${id}`} className="flex justify-center place-items-center text-xl animate-fade">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-square mr-2" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
          </svg>
          Voltar 
        </Link>
      </nav>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-center mt-[-8rem]">
        <div className={`${btn1 ? 'animate-fade-up' : 'opacity-0'} w-auto px-3 py-2 rounded-md my-7 text-2xl bg-cyan-800`}>
          <Link href={`/harpa/edit/cifra/${id}`}>Editar Cifra</Link>
        </div>
        <div className={`${btn2 ? 'animate-fade-up' : 'opacity-0'} w-auto px-3 py-2 rounded-md my-7 text-2xl bg-cyan-800`}>
          <Link href={`/harpa/edit/tom/${id}`}>Editar Tom</Link>
        </div>
        <div className={`${btn3 ? 'animate-fade-up' : 'opacity-0'} w-auto px-3 py-2 rounded-md my-7 text-2xl bg-slate-600`}>
          Editar Letra
        </div>
      </div>
    </>
  );
}
