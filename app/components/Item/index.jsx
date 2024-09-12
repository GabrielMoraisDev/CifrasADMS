import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Item({ id, consul }) {
  const [data, setData] = useState(null);
  const [tom, setTom] = useState('C');

  // Mapa de substituições baseado no tom
  const substitutions = {
    'Bb': {
      'C': 'Bb',
      'D': 'C',
      'Dm': 'Cm',
      'Em': 'Dm',
      'F': 'Eb',
      'G': 'F',
      'A': 'G',
      'Am': 'Gm',
      'B°': 'A°',
      // Adicione mais substituições se necessário
    },
    'B': {
      'C': 'B',
      'Dm': 'C#m',
      'Em': 'D#m',
      'F': 'E',
      'G': 'F#',
      'Am': 'G#m',
      'B°': 'A#°',
      // Adicione mais substituições se necessário
    },
    // Adicione mais tons e suas substituições se necessário
  };

  // Função para substituir todas as cifras em um texto baseado no tom
  function cifra(tom, text) {
    if (!text) return ''; // Retorna uma string vazia se o texto for undefined ou null

    if (substitutions[tom]) {
      // Itera sobre o mapa de substituições e aplica as mudanças
      Object.keys(substitutions[tom]).forEach(originalCifra => {
        const replacedCifra = substitutions[tom][originalCifra];
        // Substitui todas as ocorrências da cifra original pelo valor substituído
        const regex = new RegExp(`\\b${originalCifra}\\b`, 'g');
        text = text.replace(regex, replacedCifra);
      });
    }
    return text; // Retorna o texto com as cifras substituídas
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.0.155:3000/${consul}/${id}`);
        
        if (!response.ok) {
          console.error('Erro na resposta da API:', response.statusText);
          return;
        }

        const result = await response.json();

        if (!result || typeof result !== 'object') {
          console.error('Resposta inesperada da API');
          return;
        }

        setData(result.data);
        setTom(data.tom)
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData();
  }, [id, consul]);


  if (!data) {
    return (
      <div className="flex items-center justify-center w-full h-screen relative z-10">
        <div role="status" className="flex justify-center items-center">
          <svg aria-hidden="true" className="w-[20vw] h-[20vw] text-cyan-900 animate-spin fill-cyan-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const renderParagraphs = (text) => {
    const lines = text.split('\n'); // Divide o texto em linhas
    const cifras = data.cifra ? data.cifra.split('][').map(cifra => `[${cifra.replace(/[\[\]]/g, '')}]`) : []; // Processa as cifras

    return (
      <div>
        {lines.map((line, index) => (
          <div key={index}>
            <p className='mt-6'>{cifra(data.tom, cifras[index] || '')}</p> {/* Substitui as cifras de acordo com o tom */}
            <p>{line}</p>
          </div>
        ))}
      </div>
    );
  };

  
  return (
    <div>
      <nav className="w-full h-20 bg-cyan-900 fixed top-0 flex place-items-center auto justify-left z-20"> 
        <Link href={`/${consul}`}>
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
        <div className='absolute right-5 w-10 h-10 bg-cyan-700 flex justify-center place-items-center rounded-md'>
          {tom}
        </div>
      </nav>
      
      <div className='mt-24 mx-3'>{renderParagraphs(data.texto)}</div>
    </div>
  );
}
