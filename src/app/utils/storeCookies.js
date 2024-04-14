"use server"
import { cookies } from 'next/headers';


/**
 * Function to store cookies.
 * @function
 * @async
 * @param   {Object} cookieData   The token to be stored in the cookies [Required]
 *
 * @example
 * //store cookies
 * token = "token"
 * storeCookies(token);
 */

async function storeCookies(cookieData) {
    return new Response(null, {
        headers: {
          'Set-Cookie': cookies().set('access_token', cookieData.access_token, {
            path: '/',
            maxAge: 0, // Expires in 1 hour
            httpOnly: true,
            secure: false, // Set to true if using HTTPS only
          }),
        'Set-Cookie': cookies().set('username', cookieData.user.username, {
            path: '/',
            maxAge: 0, // Expires in 1 hour
            httpOnly: true,
            secure: false, // Set to true if using HTTPS only
          }),
        'Set-Cookie': cookies().set('email', cookieData.user.email, {
            path: '/',
            maxAge: 0, // Expires in 1 hour
            httpOnly: true,
            secure: false, // Set to true if using HTTPS only
          }),
          'Set-Cookie': cookies().set('avatar', cookieData.user.avatar_url, {
            path: '/',
            maxAge: 0, // Expires in 1 hour
            httpOnly: true,
            secure: false, // Set to true if using HTTPS only
          }),

          'Set-Cookie': cookies().set('access_token', cookieData.access_token, {
            path: '/',
            maxAge: 3600 * 4, // Expires in 1 hour
            httpOnly: true,
            secure: false, // Set to true if using HTTPS only
          }),
        'Set-Cookie': cookies().set('username', cookieData.user.username, {
            path: '/',
            maxAge: 3600 * 4, // Expires in 1 hour
            httpOnly: true,
            secure: false, // Set to true if using HTTPS only
          }),
        'Set-Cookie': cookies().set('email', cookieData.user.email, {
            path: '/',
            maxAge: 3600 * 4, // Expires in 1 hour
            httpOnly: true,
            secure: false, // Set to true if using HTTPS only
          }),
          'Set-Cookie': cookies().set('avatar', cookieData.user.avatar_url, {
            path: '/',
            maxAge: 3600 * 4, // Expires in 1 hour
            httpOnly: true,
            secure: false, // Set to true if using HTTPS only
          }),
        },
      });
}

export default storeCookies;