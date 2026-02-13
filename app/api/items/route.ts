import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { uid } from '@/lib/uid';
import { getCookieToken, verifyToken } from '@/lib/auth';

export async function GET(){
  const { rows } = await sql`SELECT * FROM items ORDER BY createdAt DESC`;
  return NextResponse.json(rows);
}

export async function POST(req: Request){
  const token = getCookieToken(req);
  if(!token) return NextResponse.json({ error:'401' }, { status:401 });
  let user:any;
  try{ user = await verifyToken(token); } catch { return NextResponse.json({ error:'401' }, { status:401 }); }

  const body:any = await req.json();
  if(!body?.title || !body?.cat || !body?.price || !body?.city){
    return NextResponse.json({ error:'Brak wymaganych pól' }, { status:400 });
  }

  const id = uid();
  await sql`
    INSERT INTO items (id,ownerId,title,cat,price,deposit,city,desc,image,imageUrl,rating,createdAt)
    VALUES (${id}, ${String(user.sub)}, ${String(body.title)}, ${String(body.cat)}, ${Number(body.price)}, ${Number(body.deposit||0)}, ${String(body.city)}, ${String(body.desc||'')}, ${''}, ${''}, ${4.5}, ${Date.now()})
  `;
  const { rows } = await sql`SELECT * FROM items WHERE id=${id}`;
  return NextResponse.json(rows[0], { status:201 });
}
