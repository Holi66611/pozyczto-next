'use client';
import { useState } from 'react';
export default function AddPage(){
  const [status,setStatus]=useState('');
  async function submit(e:any){
    e.preventDefault(); setStatus('Zapisywanie…');
    const f=new FormData(e.currentTarget);
    const payload:any=Object.fromEntries(f.entries());
    payload.price=Number(payload.price);
    const r=await fetch('/api/items',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const d=await r.json().catch(()=>({}));
    if(!r.ok){ setStatus('❌ '+(d?.error||r.status)); return; }
    setStatus('✅ Dodano'); location.href='/search';
  }
  return (
    <div>
      <h1>Dodaj przedmiot</h1>
      <form onSubmit={submit} className="card grid grid-2">
        <div><label>Tytuł</label><input name="title" required/></div>
        <div><label>Kategoria</label><input name="cat" required placeholder="np. narzedzia"/></div>
        <div><label>Cena / dzień</label><input name="price" type="number" required/></div>
        <div><label>Miasto</label><input name="city" required/></div>
        <div style={{gridColumn:'1/-1'}}><label>Opis</label><textarea name="desc" rows={4}/></div>
        <div style={{gridColumn:'1/-1', display:'flex', justifyContent:'flex-end'}}><button className="btn btn-primary">Zapisz</button></div>
      </form>
      {status && <p className="kicker">{status}</p>}
      <small>Wymagane logowanie: /login</small>
    </div>
  );
}
