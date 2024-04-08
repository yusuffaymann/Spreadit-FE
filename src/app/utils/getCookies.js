"use server"
import { cookies } from 'next/headers';

async function getCookies() {
    const token = cookies().get('token');
    return token;
}

export default getCookies;