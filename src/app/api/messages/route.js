import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'messages.json');

function readMessages() {
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileData);
    }
    return [];
}

// GET - Récupérer tous les messages
export async function GET() {
    try {
        const messages = readMessages();
        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.error("Erreur lecture messages :", error);
        return NextResponse.json({ error: 'Erreur lors de la récupération des messages' }, { status: 500 });
    }
}

// DELETE - Supprimer un message par ID
export async function DELETE(request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
        }

        let messages = readMessages();
        const updatedMessages = messages.filter((msg) => msg.id !== id);
        fs.writeFileSync(filePath, JSON.stringify(updatedMessages, null, 2));

        return NextResponse.json({ message: 'Message supprimé avec succès' }, { status: 200 });
    } catch (error) {
        console.error("Erreur suppression :", error);
        return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
    }
}
