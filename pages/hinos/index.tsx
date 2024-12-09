import "../../app/globals.css";

import Nav from '../../app/components/Nav'
import List from '../../app/components/List'


export default function Hinos() {
  return (
    <>
      <Nav/>
      <div className="bg-cyan-900 w-full h-14 fixed top-12 z-10"></div>
      <List link='hinos'/>
    </>
  );
}
