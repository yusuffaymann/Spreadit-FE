export default async function handler(url, method, body) {
  try {
/*     const base_url = 'https://oauth.reddit.com';
    const token = `bearer ${""}`;
    const headers = { 'Authorization': token, 'User-Agent': 'spreadit by Common-Winter-7186' }; */
    const base_url = 'http://localhost:3010';
/*     const token = `bearer 1`; */


    // Conditionally include the body only when it's provided and the method is not 'GET'
    const requestOptions = {
      method: `${method}`,
/*       headers: { 'Authorization': token, 'User-Agent': 'spreadit by Common-Winter-7186' }, */
      headers: { 
/*         'Authorization': token, */
      },
      body: method !== ('GET' || 'DELETE') && body ? JSON.stringify(body) : undefined
    };

    const response = await fetch(`${base_url}${url}`, requestOptions);

    if (!response.ok) {
      throw new Error('API request failed');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw for further handling
  }
}

