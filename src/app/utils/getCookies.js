"use server"
import { cookies } from 'next/headers';

async function getCookies() {
    return cookies().get('token');
}

export default getCookies;