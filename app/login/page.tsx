'use client';
import { useState } from 'react';
export default function Login(){
  const [mode,setMode]=useState<'login'|'reg'>('login');
  const [msg,setMsg]=useState('');
  async function submit(e:any){
    e.preventDefault(); setMsg('');
    const f=new FormData(e.currentTarget);
    const payload:any=Object.fromEntries(f.entries());
    const url=mode==='login'?'/api/auth/login':'/api/auth/register';
    const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const d=await r.json().catch(()=>({}));
    if(!r.ok){ setMsg('❌ '+(d?.error||r.status)); return; }
    localStorage.setItem('pt_authed','1');
    location.href='/search';
  }
  return (
    <div className="card">
      <h1>{mode==='login'?'Logowanie':'Rejestracja'}</h1>
      <form onSubmit={submit} className="grid" style={{maxWidth:520}}>
        {mode==='reg' && <div><label>Imię</label><input name="name" required/></div>}
        <div><label>E-mail</label><input name="email" required/></div>
        <div><label>Hasło</label><input name="password" type="password" required/></div>
        <div className="row">
          <button type="button" className="btn" onClick={()=>setMode(mode==='login'?'reg':'login')}>{mode==='login'?'Załóż konto':'Mam konto'}</button>
          <button className="btn btn-primary">OK</button>
        </div>
      </form>
      {msg && <p className="kicker">{msg}</p>}
      <p className="kicker">Po deployu uruchom <code>/api/dev/init</code>.</p>
    </div>
  );
}
