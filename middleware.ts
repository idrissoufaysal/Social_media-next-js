import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return new NextResponse(JSON.stringify({ message: 'No token provided' }), { status: 401 });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    // Stockez l'utilisateur dans les en-têtes de la requête pour le traitement en aval
    const response = NextResponse.next();
    response.headers.set('user', JSON.stringify(user));
    return response;
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Invalid token !!!' }), { status: 403 });
  }
}

export const config = {
  matcher: ['/api/user'], // Appliquer ce middleware sur toutes les routes API
};
