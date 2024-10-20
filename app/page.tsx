import { redirect } from 'next/navigation';

export default function Home() {
  // Redireciona imediatamente para a rota /harpa
  redirect('/harpa');
  
  return null; // Não é necessário renderizar nada, pois ocorre redirecionamento
}
