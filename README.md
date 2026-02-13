# PożyczTo – ZIP pod Vercel (NAPRAWIONE)
Najważniejsze: jest `tsconfig.json` z aliasem `@/*`, więc Vercel nie wywali błędu `Can't resolve '@/lib/db'`.

Deploy:
- wrzuć do GitHuba tak, by `package.json` był w root,
- Vercel -> import repo -> Deploy,
- dodaj DB (Storage) i env: DATABASE_URL, JWT_SECRET,
- uruchom /api/dev/init.
