import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { password } = await request.json();

        // Check against the environment variable password
        const validPassword = process.env.ADMIN_PASSWORD || 'djsylva';

        if (password === validPassword) {
            // Create a response and set the authentication cookie
            const response = NextResponse.json({ success: true }, { status: 200 });

            // Removing maxAge makes it a session cookie (prompt on browser close)
            response.cookies.set({
                name: 'admin_token',
                value: 'authenticated',
                httpOnly: true,
                path: '/',
            });

            return response;
        } else {
            return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Erreur Serveur' }, { status: 500 });
    }
}
