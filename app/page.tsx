import Link from 'next/link';
export default function Page(){
  return (
    <div className="card">
      <h1>PożyczTo – MVP</h1>
      <p className="kicker">Next.js full-stack + Postgres (Vercel/Neon).</p>
      <hr/>
      <ol>
        <li>Po deployu uruchom <code>/api/dev/init</code> (jednorazowo).</li>
        <li>Przejdź do <Link href="/login"><b>/login</b></Link>.</li>
        <li>Dodaj ofertę w <Link href="/add"><b>/add</b></Link>.</li>
        <li>Szukaj w <Link href="/search"><b>/search</b></Link>.</li>
      </ol>
    </div>
  );
}
