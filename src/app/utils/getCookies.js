"use server"
import { cookies } from 'next/headers';

/**
 * Fuction to get stored Cookies.
 * @function
 * @async
 * @returns {Object} The stored Cookies.
 *
 * @example
 * //get stored cookies
 * const cookies = getCookies();
 * 
 */

async function getCookies() {
    const token = cookies().get('token');
    return token;
}

export default getCookies;