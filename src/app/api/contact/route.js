import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        const data = await request.json();
        const { name, email, message, photo } = data;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Veuillez remplir tous les champs.' }, { status: 400 });
        }

        // Sauvegarder dans le fichier JSON pour le Dashboard
        const filePath = path.join(process.cwd(), 'data', 'messages.json');
        let messages = [];
        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            messages = JSON.parse(fileData);
        } catch (e) {
            // Fichier non existant ou vide
        }

        const newMessage = {
            id: Date.now().toString(),
            name,
            email,
            message,
            photo: photo || null,
            date: new Date().toISOString()
        };
        messages.unshift(newMessage); // Ajouter au début

        fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

        // Configurer le transporteur Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `Nouveau message de Portfolio : ${name}`,
            text: `Nouveau message de contact via le portfolio :\n\nNom: ${name}\nEmail: ${email}\nPhoto: ${photo ? 'Oui' : 'Non'}\n\nMessage:\n${message}`,
            html: `
        <h3>Nouveau message de votre Portfolio</h3>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Photo :</strong> ${photo ? 'Attachée (voir le Dashboard)' : 'Aucune'}</p>
        <hr/>
        <p><strong>Message :</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
        };

        try {
            // Envoyer l'email seulement si les variables d'environnement sont présentes
            if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                await transporter.sendMail(mailOptions);
                console.log("Email envoyé avec succès !");
            } else {
                console.log("Les identifiants email ne sont pas configurés. Message sauvegardé uniquement dans le Dashboard.");
            }
        } catch (mailError) {
            console.error("Erreur d'envoi d'email (le message est quand même sauvegardé) :", mailError.message);
        }

        return NextResponse.json({ message: 'Message reçu avec succès!' }, { status: 200 });
    } catch (error) {
        console.error("Erreur d'envoi d'email :", error);
        return NextResponse.json({ error: 'Erreur lors de l\'envoi du message' }, { status: 500 });
    }
}
