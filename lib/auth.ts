import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  isLoggedIn: boolean;
  username: string;
}

const sessionOptions = {
  password: process.env.AUTH_SECRET!,
  cookieName: 'hotel_admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  return session;
}

export async function auth() {
  const session = await getSession();
  if (!session.isLoggedIn) return null;
  return { user: { name: session.username } };
}