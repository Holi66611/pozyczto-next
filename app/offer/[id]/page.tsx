'use client';
import { useEffect, useState } from 'react';
export default function Offer({ params }:{ params:{id:string}}){
  const [it,setIt]=useState<any>(null);
  useEffect(()=>{ fetch('/api/items/'+params.id).then(r=>r.json()).then(setIt); },[params.id]);
  if(!it) return <div className="card">Ładowanie…</div>;
  return <div className="card"><h1>{it.title}</h1><p className="kicker">{it.city}</p><p>{it.desc}</p></div>;
}
