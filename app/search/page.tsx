'use client';
import { useEffect, useState } from 'react';
export default function SearchPage(){
  const [items,setItems]=useState<any[]>([]);
  useEffect(()=>{ fetch('/api/items').then(r=>r.json()).then(d=>setItems(Array.isArray(d)?d:[])); },[]);
  return (
    <div>
      <h1>Wyszukiwarka</h1>
      <div className="results">
        {items.map(it=>(
          <article key={it.id} className="card card-item">
            <img src={it.imageurl || it.image || `https://picsum.photos/seed/${encodeURIComponent(it.id)}/600/400`} alt={it.title} />
            <div style={{padding:10}}>
              <strong><a href={'/offer/'+it.id}>{it.title}</a></strong>
              <div className="kicker">{it.city}</div>
              <div className="price">{Math.round(Number(it.price||0))} PLN / dzień</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
