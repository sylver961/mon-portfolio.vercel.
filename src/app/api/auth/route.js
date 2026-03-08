import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { password } = await request.json();

        // Check against the environment variable password (or a default for demo purposes)
        const validPassword = process.env.ADMIN_PASSWORD || '1234';

        if (password === validPassword) {
            // Create a response and set the authentication cookie
            const response = NextResponse.json({ success: true }, { status: 200 });

            // Cookie is valid for 1 day
            response.cookies.set({
                name: 'admin_token',
                value: 'authenticated',
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24, // 1 day
            });

            return response;
        } else {
            return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Erreur Serveur' }, { status: 500 });
    }
}
