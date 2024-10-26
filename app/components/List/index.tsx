'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ListaProps {
  link: string;
}

interface Item {
  id: number;
  name: string;
  tom: string;
}

const Lista: React.FC<ListaProps> = ({ link }) => {
  const [data, setData] = useState<Item[]>([]);
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [qnt, setQnt] = useState(0);
  // const[color, setColor] = useState('cyan')
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api-adms-production.up.railway.app/${link}`);
        if (link === 'harpa') {
          setQnt(632);
        } else {
          const response2 = await fetch('https://api-adms-production.up.railway.app/qnt');
          const result2 = await response2.json();
          setQnt(result2.row.qnt);
        }

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result.data); // Supondo que o JSON retornado tenha o formato { data: [...] }
        setFilteredData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [link]);

  useEffect(() => {
    if (search === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [search, data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen relative z-10">
        <div role="status" className="flex justify-center items-center">
          <svg aria-hidden="true" className={`w-[20vw] h-[20vw] text-cyan-900 animate-spin fill-cyan-600`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='mt-36 flex flex-col items-center mx-4'>
      <input
        type="text"
        className={`left-4 fixed z-10 bg-cyan-950 top-24 text-cyan-100 border-2 border-cyan-800 rounded p-2 mb-4 w-[92%] uppercase mx-auto`}
        placeholder={`Pesquise aqui... [ Total ${qnt} ]`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className='w-full'>
        {filteredData.map(item => (
          <li key={item.id}>
            <div className="flex relative my-3 overflow-hidden">
              <Link href={`${link}/${item.id}`} className='flex'>
                <div className={`w-12 h-10 flex justify-center items-center m-auto text-center bg-cyan-800 text-xl mr-2 rounded-md overflow-hidden`}>{item.tom? item.tom :'X'}</div>
                <div className='w-full h-10 flex items-center text-md mr-3 rounded-md'>
                  <p className='w-[55vw] text-left truncate text-md capitalize'>{item.name}</p>
                </div>
              </Link>

              {/* <Link href={`${link}/${item.id}`} className='absolute right-10 top-1 flex justify-center items-center'>
                <div className={`w-8 h-8 flex bg-cyan-800 text-xl rounded-md justify-center items-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-heart-fill text-cyan-950`} viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                  </svg>
                </div>
              </Link>

              <Link href={`${link}/${item.id}`} className='absolute right-0 top-1 flex justify-center items-center'>
                <div className={`w-8 h-8 flex bg-cyan-800 text-xl rounded-md justify-center items-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-bookmark-fill text-cyan-950`} viewBox="0 0 16 16">
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
                  </svg>
                </div>
              </Link> */}
            </div>

            <hr className={`text-white border-cyan-600 w-full`}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lista;
