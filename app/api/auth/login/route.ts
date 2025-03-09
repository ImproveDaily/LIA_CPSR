import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    const db = client.db('lia_cpsr');
    
    const body = await request.json();
    const { username, password } = body;

    console.log('Login poging voor gebruiker:', username);

    // Zoek de gebruiker in de database
    const user = await db.collection('User').findOne({ username });

    if (!user) {
      console.log('Gebruiker niet gevonden');
      return NextResponse.json(
        { error: 'Ongeldige gebruikersnaam of wachtwoord' },
        { status: 401 }
      );
    }

    console.log('Gebruiker gevonden:', { id: user._id, username: user.username, role: user.role });
    console.log('Opgeslagen wachtwoord:', user.password);

    // Verifieer het wachtwoord
    const isValidPassword = await bcrypt.compare(password, user.password);

    console.log('Wachtwoord verificatie resultaat:', isValidPassword);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Ongeldige gebruikersnaam of wachtwoord' },
        { status: 401 }
      );
    }

    // Verwijder het wachtwoord uit de response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: {
        ...userWithoutPassword,
        id: user._id.toString()
      },
      message: 'Succesvol ingelogd'
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Er is een fout opgetreden tijdens het inloggen' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
} 