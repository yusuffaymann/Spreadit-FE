"use server"
import { cookies } from 'next/headers';


/**
 * Function to store cookies.
 * @function
 * @async
 * @param   {string} token   The token to be stored in the cookies [Required]
 *
 * @example
 * //store cookies
 * token = "token"
 * storeCookies(token);
 */

async function storeCookies(token) {
    return new Response(null, {
        headers: {
          'Set-Cookie': cookies().set('token', token, {
            path: '/',
            maxAge: 3600, // Expires in 1 hour
            httpOnly: true,
            secure: false, // Set to true if using HTTPS only
          })
        ,
        },
      });
}

export default storeCookies;