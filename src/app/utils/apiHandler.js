export default async function handler(url, method, body) {
  try {
    const base_url = 'https://oauth.reddit.com';
    const token = `bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzEwMzkwNTIzLjExODg1NCwiaWF0IjoxNzEwMzA0MTIzLjExODg1NCwianRpIjoiTElQLTh0N1d4UnhSaWMtTXVVdDV4c0RBOGZRSC13IiwiY2lkIjoiczFqSXpnTXFIVnFKUnJ6aXJvcmg2ZyIsImxpZCI6InQyX3ZveHpxOG15NCIsImFpZCI6InQyX3ZveHpxOG15NCIsImxjYSI6MTcwOTgyMTgwMzcwMywic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.Bj7XgWmNusfUYRntCnaCB-Sc_-k2_yYFDP5a2H-7FGo4hf_SREfBfvN3fPQM6hfAbQRJhpUOgY_ObNmhV_RiM6-rus3h56bTKMXDz31IkelnjNJIkzEXU7-jDua_2NWN__6ddtb7XtQzdS5bfiZKGtwc8EsFMMontM2MMosg8pAyNQuBTM2-e_gIlGR-VPIrBJBh0hNSmEqezXHN3me2D9JAjAgKf6BX2_gzlzqQYtJpGKxj4o4pBK8ygyv-eJwDWGk_xK3tP0is6gz2KXigNZNAuZrmagMI9HMac2bCSnKsvod6jTr8xQZTJrmfXW5pei5-9QE0z8pULqOSQu1irQ"}`;
    const headers = { 'Authorization': token, 'User-Agent': 'spreadit by Common-Winter-7186' };

    // Conditionally include the body only when it's provided and the method is not 'GET'
    const requestOptions = {
      method: `${method}`,
      headers: { 'Authorization': token, 'User-Agent': 'spreadit by Common-Winter-7186' },
      body: method !== 'GET' && body ? JSON.stringify(body) : undefined
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

