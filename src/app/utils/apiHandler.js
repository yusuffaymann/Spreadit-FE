/**
 * Component for handling fetch calls.
 * @function
 * @async
 * @param   {string} url   The endpoint the request should be sent to [Required]
 * @param   {string} method   The method of the request GET,PUT,etc.. [Required]
 * @param   {string} body   The body of the request [Required (if not GET or DELETE)]
 * @returns {JSON} The response pasrsed as a json.
 *
 * @example
 * //gets the data at settings/emails endpoint
 * const url = /settings/emails
 * const method = GET
 * return (handler(url, method));
 * @example
 * //post data to settings/notifications endpoint
 * const url = /settings/notifications
 * const method = Post
 * const body = {          
 *        mentions: true,
          comments: false
        }
 * return (handler(url, method, body));
 */

async function handler(url, method, body, token="") {
    try {
      const base_url = 'http://localhost:80';
      const headers = token !== "" ? {"Content-Type": "application/json","Authorization": `Bearer ${token}`} : {"Content-Type": "application/json"}

  
      // Conditionally include the body only when it's provided and the method is not 'GET'
      const requestOptions = {
        method: `${method}`,
        headers: headers,
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
  };

  export default handler;
