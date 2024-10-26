import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Data {
  name: string;
  artista: string;
  cifra: string;
  tom: string;
  texto: string;
}

interface ItemProps {
  id: string;
  consul: string;
}

export default function Edit({ id, consul }: ItemProps) {
  const [data, setData] = useState<Data | null>(null);
  const [troca, setTroca] = useState<boolean>(false);
  const [tom, setTom] = useState<string>('');
  const [currentTom, setCurrentTom] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.0.105:3005/${consul}/${id}`);
        if (!response.ok) {
          console.error('Erro na resposta da API:', response.statusText);
          return;
        }

        const result = await response.json();
        setData(result.data);
        if (result.data) {
          setTom(result.data.tom)
        }
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData();
  }, [id, consul]);

  const handleSave = async () => {
    try {
      const body = {
        id,
        tom: currentTom // Converte de volta para o formato esperado
      };
      
      console.log('Dados enviados:', body); // Adicione este log
  
      const response = await fetch('http://192.168.0.105:3005/editharptom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      
      if (!response.ok) {
        console.error('Erro ao salvar os dados:', response.statusText);
      } else {
        console.log('Cifras salvas com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao salvar as cifras:', error);
    }

    window.location.href= '/' + consul + '/' + id
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div role="status" className="flex justify-center items-center">
          <svg aria-hidden="true" className="w-20 h-20 text-slate-900 animate-spin fill-slate-600" viewBox="0 0 100 101" fill="none">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="w-full h-20 bg-slate-900 fixed top-0 flex place-items-center auto justify-left z-20"> 
        <Link href={`/${consul}/${id}`}>
          <div className="w-auto mx-3 rounded-md flex justify-left place-items-center ml-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
            </svg>
          </div>
        </Link>
        <div className="absolute left-20 mx-auto">
          <h1 className='text-sm w-[60vw] truncate capitalize'>{data.name}</h1> 
          <h1 className='text-sm text-gray-400 capitalize'>{data.artista}</h1> 
        </div>
        <div className='absolute right-5 w-10 h-10 bg-slate-700 flex justify-center place-items-center rounded-md' onClick={() => setTroca(!troca)}>
        {tom}
        </div>
      </nav>

    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 grid grid-cols-3 grid-rows-4 w-[70%]">
      <div onClick={() => { setCurrentTom('C'); setTom('C'); }} className={`w-16 h-16 duration-300 bg-slate-900 rounded-md flex justify-center place-items-center my-3 text-2xl ${tom === 'C'?'border border-white':'border border-slate-900'}`}>C</div>
      <div onClick={() => { setCurrentTom('C#'); setTom('C#'); }} className={`w-16 h-16 duration-300 bg-slate-900 rounded-md flex justify-center place-items-center my-3 text-2xl ${tom === 'C#'?'border border-white':'border border-slate-900'}`}>C#</div>
      <div onClick={() => { setCurrentTom('D'); setTom('D'); }} className={`w-16 h-16 duration-300 bg-slate-900 rounded-md flex justify-center place-items-center my-3 text-2xl ${tom === 'D'?'border border-white':'border border-slate-900'}`}>D</div>
      <div onClick={() => { setCurrentTom('Eb'); setTom('Eb'); }} className={`w-16 h-16 duration-300 bg-slate-900 rounded-md flex justify-center place-items-center my-3 text-2xl ${tom === 'Eb'?'border border-white':'border border-slate-900'}`}>Eb</div>
      <div onClick={() => { setCurrentTom('E'); setTom('E'); }} className={`w-16 h-16 duration-300 bg-slate-900 rounded-md flex justify-center place-items-center my-3 text-2xl ${tom === 'E'?'border border-white':'border border-slate-900'}`}>E</div>
      <div onClick={() => { setCurrentTom('F'); setTom('F'); }} className={`w-16 h-16 duration-300 bg-slate-900 rounded-md flex justify-center place-items-center my-3 text-2xl ${tom === 'F'?'border border-white':'border border-slate-900'}`}>F</div>
      <div onClick={() => { setCurrentTom('F#'); setTom('F#'); }} className={`w-16 h-16 duration-300 bg-slate-900 rounded-md flex justify-center place-items-center my-3 text-2xl ${tom === 'F#'?'border border-white':'border border-slate-900'}`}>F#</div>
      <div onClick={() => { setCurrentTom('G'); setTom('G'); }} className={`w-16 h-16 duration-300 bg-slate-900 rounded-md flex justify-center place-items-center my-3 text-2xl ${tom === 'G'?'border border-white':'border border-slate-900'}`}>G</div>
      <div onClick={() => { setCurrentTom('G#'); setTom('G#'); }} className={`w-16 h-16 duration-300 bg-slate-900 rounded-md flex justify-center place-items-center my-3 text-2xl ${tom === 'G#'?'border border-white':'border border-slate-900'}`}>G#</div>
      <div onClick={() => { setCurrentTom('A'); setTom('A'); }} className={`w-16 h-16 duration-300 bg-slate-900 rounded-md flex justify-center place-items-center my-3 text-2xl ${tom === 'A'?'border border-white':'border border-slate-900'}`}>A</div>
      <div onClick={() => { setCurrentTom('Bb'); setTom('Bb'); }} className={`w-16 h-16 duration-300 bg-slate-900 rounded-md flex justify-center place-items-center my-3 text-2xl ${tom === 'Bb'?'border border-white':'border border-slate-900'}`}>Bb</div>
      <div onClick={() => { setCurrentTom('B'); setTom('B'); }} className={`w-16 h-16 duration-300 bg-slate-900 rounded-md flex justify-center place-items-center my-3 text-2xl ${tom === 'B'?'border border-white':'border border-slate-900'}`}>B</div>
    </div>

      <button className="fixed flex plce-items-center justify-center bottom-0 w-full py-6 border border-slate-900 rounded-md bg-slate-900 text-slate-50" onClick={handleSave}>
            <div className='flex plce-items-center justify-center text-center m-auto'>
            Salvar
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-square flex plce-items-center justify-center text-center m-auto ml-2" viewBox="0 0 16 16">
              <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
              <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
            </svg>
            </div>
      </button>
    </div>
  );
}
