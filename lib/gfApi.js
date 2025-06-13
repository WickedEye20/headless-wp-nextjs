import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

const GF_API_URL = 'https://demo.parkdistrictrec.com/wp-json/gf/v2';

const oauth = OAuth({
  consumer: {
    key: process.env.GF_CONSUMER_KEY,
    secret: process.env.GF_CONSUMER_SECRET,
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  },
});

export async function gfFetch(endpoint, method = 'GET', body = null) {
  const url = `${GF_API_URL}${endpoint}`;
  const request_data = {
    url,
    method,
    // Do NOT include data: body for JSON POST (Gravity Forms expects signature without body)
  };


  const headers = oauth.toHeader(oauth.authorize(request_data));
  headers['Content-Type'] = 'application/json';

  console.log(body);

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
