// app/api/user/route.ts
import { getDbUserId } from '@/actions/user.action';
import { NextResponse } from 'next/server';

export async function GET() {
    const userId = await getDbUserId(); // Récupère l'ID de l'utilisateur

    if (!userId) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    return NextResponse.json( userId);
}