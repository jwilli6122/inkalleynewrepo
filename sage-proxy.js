// Netlify Serverless Function — SAGE Connect API Proxy
// Sits between the browser dashboard and SAGE's API
// Deployed automatically by Netlify alongside index.html

exports.handler = async function(event, context) {

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ ErrNum: 405, ErrMsg: 'Method not allowed' })
    };
  }

  // CORS headers — allow the dashboard to call this function from any origin
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Parse the request body sent from the dashboard
    const requestBody = JSON.parse(event.body);

    // Inject the real SAGE credentials server-side
    // (keeps the auth key out of browser requests)
    const sagePayload = {
      ...requestBody,
      auth: {
        acctId: 256432,
        loginId: 'JacobWilliams',
        key: '467b867cecf0dd6e2aaba25543aeafe9'
      }
    };

    // Forward request to SAGE Connect API
    const sageResponse = await fetch('https://www.promoplace.com/ws/ws.dll/ConnectAPI', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(sagePayload)
    });

    const data = await sageResponse.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

  } catch (err) {
    console.error('SAGE proxy error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        ErrNum: 10001,
        ErrMsg: `Proxy error: ${err.message}`
      })
    };
  }
};
