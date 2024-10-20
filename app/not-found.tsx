import Link from "next/link";
export default function NotFound() {
    return (
        <div className="w-full h-screen bg-slate-900 flex justify-center items-center">
            <div className="inline text-center">
                <div className="text-white text-xl text-center font-thin">Ainda em construção por</div>
                <div className="text-3xl my-2 font-bold">Gabriel Morais :)</div>
                <div className="text-white text-xl text-center font-thin mb-10">Aguarde as atualizações!</div>
                <Link href='/' className="m-auto w-[80%] bg-cyan-800 py-3 px-5 rounded-md mt-20">Voltar ao início</Link>
            </div>
        </div>
    );
}
