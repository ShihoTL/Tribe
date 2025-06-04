//server/index.js

import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
import dns from 'dns';
import { promisify } from 'util';

dotenv.config();

const app = express();
const resolveDns = promisify(dns.resolve);

// Enhanced CORS configuration for Expo Go
app.use(
  cors({
    origin: '*', // Allow all origins for development
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`\n[${timestamp}] ${req.method} ${req.url}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  console.log('---');
  next();
});

const PRIVY_APP_ID = process.env.PRIVY_APP_ID;
const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET;

console.log('Starting server with config:');
console.log('PRIVY_APP_ID:', PRIVY_APP_ID ? 'Set' : 'Missing');
console.log('PRIVY_APP_SECRET:', PRIVY_APP_SECRET ? 'Set' : 'Missing');

// Updated function to get auth headers for Privy API
function getPrivyAuthHeaders() {
  // Create Basic Auth header: base64(appId:appSecret)
  const credentials = Buffer.from(
    `${PRIVY_APP_ID}:${PRIVY_APP_SECRET}`
  ).toString('base64');

  return {
    Authorization: `Basic ${credentials}`,
    'privy-app-id': PRIVY_APP_ID, // Changed to lowercase as per API docs
    'Content-Type': 'application/json',
    'User-Agent': 'Node.js-Server/1.0',
  };
}

// Network diagnostics function
async function runNetworkDiagnostics() {
  console.log('\n=== NETWORK DIAGNOSTICS ===');

  try {
    // Test DNS resolution
    console.log('Testing DNS resolution for auth.privy.io...');
    const addresses = await resolveDns('auth.privy.io');
    console.log('✅ DNS Resolution successful:', addresses);
  } catch (dnsError) {
    console.log('❌ DNS Resolution failed:', dnsError.message);

    // Try alternative DNS servers
    console.log('Trying with Google DNS (8.8.8.8)...');
    dns.setServers(['8.8.8.8', '8.8.4.4']);
    try {
      const addresses = await resolveDns('auth.privy.io');
      console.log('✅ DNS Resolution with Google DNS successful:', addresses);
    } catch (altDnsError) {
      console.log(
        '❌ DNS Resolution with Google DNS failed:',
        altDnsError.message
      );
    }
  }

  // Test basic connectivity
  try {
    console.log('Testing basic HTTPS connectivity...');
    const testResponse = await fetch('https://httpbin.org/get', {
      timeout: 5000,
    });
    console.log('✅ Basic HTTPS connectivity works:', testResponse.status);
  } catch (connectError) {
    console.log('❌ Basic HTTPS connectivity failed:', connectError.message);
  }

  // Test Privy API connectivity with timeout
  try {
    console.log('Testing Privy API connectivity...');
    const privyResponse = await fetch('https://auth.privy.io/api/v1/health', {
      timeout: 10000,
      headers: {
        'User-Agent': 'Node.js',
      },
    });
    console.log('✅ Privy API is reachable:', privyResponse.status);
  } catch (privyError) {
    console.log('❌ Privy API connectivity failed:', privyError.message);
  }

  console.log('=== END DIAGNOSTICS ===\n');
}

// Run diagnostics on startup
runNetworkDiagnostics();

// Health check endpoint with network test
app.get('/health', async (req, res) => {
  console.log('Health check requested');

  const healthData = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    env: {
      PRIVY_APP_ID: PRIVY_APP_ID ? 'Set' : 'Missing',
      PRIVY_APP_SECRET: PRIVY_APP_SECRET ? 'Set' : 'Missing',
    },
    network: {},
  };

  // Quick network test
  try {
    await fetch('https://httpbin.org/get', { timeout: 3000 });
    healthData.network.basic = 'OK';
  } catch (error) {
    healthData.network.basic = 'FAILED: ' + error.message;
  }

  try {
    await fetch('https://auth.privy.io/api/v1/health', { timeout: 5000 });
    healthData.network.privy = 'OK';
  } catch (error) {
    healthData.network.privy = 'FAILED: ' + error.message;
  }

  res.json(healthData);
});

// Network test endpoint
app.get('/test-network', async (req, res) => {
  await runNetworkDiagnostics();
  res.json({ message: 'Network diagnostics completed. Check console.' });
});

// Enhanced fetch function with retry logic
async function fetchWithRetry(url, options, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries} for ${url}`);

      const response = await fetch(url, {
        ...options,
        timeout: 15000, // 15 second timeout
      });

      console.log(`✅ Request successful on attempt ${attempt}`);
      return response;
    } catch (error) {
      console.log(`❌ Attempt ${attempt} failed:`, error.message);

      if (attempt === maxRetries) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, attempt - 1) * 1000;
      console.log(`Waiting ${delay}ms before retry...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// Updated endpoint for sending login code using Privy's REST API
app.post('/send-login-code', async (req, res) => {
  console.log('\n=== SEND LOGIN CODE REQUEST ===');
  console.log('Request received at:', new Date().toISOString());

  try {
    const { email } = req.body;
    console.log('Extracted email:', email);

    if (!email) {
      console.log('Error: Email is missing');
      return res.status(400).json({ error: 'Email is required' });
    }

    // Validate environment variables
    if (!PRIVY_APP_ID || !PRIVY_APP_SECRET) {
      console.log('Error: Privy credentials not configured');
      return res.status(500).json({
        error: 'Server configuration error: Privy credentials missing',
      });
    }

    console.log('Preparing Privy API request...');
    const headers = getPrivyAuthHeaders();
    console.log('Auth headers prepared:', {
      ...headers,
      Authorization: '[REDACTED]',
    });

    const privyRequestBody = {
      email: email.trim().toLowerCase(),
      mode: 'login-or-sign-up', // This allows both login and signup
    };
    console.log(
      'Sending request to Privy:',
      JSON.stringify(privyRequestBody, null, 2)
    );

    // Updated API endpoint - try multiple possible endpoints
    const endpoints = [
      'https://auth.privy.io/api/v1/passwordless/init',
      'https://auth.privy.io/api/v1/email/init',
      'https://api.privy.io/v1/passwordless/init',
      'https://api.privy.io/v1/email/init',
    ];

    let response;
    let lastError;

    for (const endpoint of endpoints) {
      try {
        console.log(`Trying endpoint: ${endpoint}`);
        response = await fetchWithRetry(endpoint, {
          method: 'POST',
          headers,
          body: JSON.stringify(privyRequestBody),
        });

        if (response.status !== 404) {
          console.log(
            `Endpoint ${endpoint} responded with status:`,
            response.status
          );
          break;
        }
      } catch (error) {
        console.log(`Endpoint ${endpoint} failed:`, error.message);
        lastError = error;
      }
    }

    // If all endpoints failed, throw the last error
    if (!response) {
      throw lastError || new Error('All API endpoints failed');
    }

    console.log('Final Privy response status:', response.status);
    console.log(
      'Privy response headers:',
      Object.fromEntries(response.headers)
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Privy error response:', errorText);

      // Handle specific error cases
      if (response.status === 404) {
        return res.status(500).json({
          error:
            'Authentication service endpoint not found. Please check Privy API configuration.',
        });
      }

      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    console.log('Privy success response:', JSON.stringify(data, null, 2));

    console.log('Sending success response to client');
    return res.json({ success: true, data });
  } catch (error) {
    console.error('Error in send-login-code:', error);
    console.error('Error stack:', error.stack);

    // Provide more specific error messages
    let errorMessage = 'Failed to send login code';
    if (error.code === 'ENOTFOUND') {
      errorMessage =
        'Network connectivity issue. Please check your internet connection.';
    } else if (error.name === 'FetchError') {
      errorMessage =
        'Unable to connect to authentication service. Please try again.';
    }

    return res.status(500).json({ error: errorMessage });
  }
});

// Updated verify code endpoint
app.post('/verify-code', async (req, res) => {
  console.log('\n=== VERIFY CODE REQUEST ===');
  console.log('Request received at:', new Date().toISOString());

  try {
    const { email, code } = req.body;
    console.log('Email:', email);
    console.log('Code:', code);

    if (!email || !code) {
      console.log('Error: Email or code is missing');
      return res.status(400).json({ error: 'Email and code are required' });
    }

    // Validate environment variables
    if (!PRIVY_APP_ID || !PRIVY_APP_SECRET) {
      console.log('Error: Privy credentials not configured');
      return res.status(500).json({
        error: 'Server configuration error: Privy credentials missing',
      });
    }

    console.log('Preparing auth headers...');
    const headers = getPrivyAuthHeaders();

    console.log('Verifying code with Privy...');

    // Try multiple possible verification endpoints
    const verifyEndpoints = [
      'https://auth.privy.io/api/v1/passwordless/authenticate',
      'https://auth.privy.io/api/v1/email/authenticate',
      'https://api.privy.io/v1/passwordless/authenticate',
      'https://api.privy.io/v1/email/authenticate',
    ];

    let verifyRes;
    let lastError;

    for (const endpoint of verifyEndpoints) {
      try {
        console.log(`Trying verify endpoint: ${endpoint}`);
        verifyRes = await fetchWithRetry(endpoint, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            code: code.trim(),
          }),
        });

        if (verifyRes.status !== 404) {
          console.log(
            `Verify endpoint ${endpoint} responded with status:`,
            verifyRes.status
          );
          break;
        }
      } catch (error) {
        console.log(`Verify endpoint ${endpoint} failed:`, error.message);
        lastError = error;
      }
    }

    if (!verifyRes) {
      throw lastError || new Error('All verification endpoints failed');
    }

    console.log('Verify response status:', verifyRes.status);

    if (!verifyRes.ok) {
      const errorText = await verifyRes.text();
      console.error('Verify error response:', errorText);
      return res.status(verifyRes.status).json({ error: errorText });
    }

    const verifyData = await verifyRes.json();
    console.log(
      'Verify success response:',
      JSON.stringify(verifyData, null, 2)
    );

    // Extract user ID from the response (may vary based on API version)
    const userId = verifyData.user?.id || verifyData.userId || verifyData.id;

    if (!userId) {
      console.log('Error: User ID missing in response');
      return res.status(400).json({ error: 'User ID missing in response' });
    }

    console.log('Creating/getting wallet for user:', userId);

    // FIXED: Use the correct Privy API endpoint and payload structure
    console.log('Trying wallet creation with correct API structure...');

    const walletPayload = {
      chain_type: 'solana', // FIXED: Use chain_type instead of chain
      // Removed walletType as it's not part of the API spec
      // Optional: You can add policy_ids if you have policies set up
      // policy_ids: []
    };

    console.log('Wallet payload:', JSON.stringify(walletPayload, null, 2));

    const walletRes = await fetchWithRetry('https://api.privy.io/v1/wallets', {
      method: 'POST',
      headers,
      body: JSON.stringify(walletPayload),
    });

    console.log('Wallet response status:', walletRes.status);

    if (!walletRes.ok) {
      const errorText = await walletRes.text();
      console.error('Wallet error response:', errorText);

      // Still return success with user data if wallet creation fails
      return res.json({
        success: true,
        userId,
        user: verifyData.user || verifyData,
        wallet: null,
        error: errorText,
        message: 'User authenticated successfully, but wallet creation failed',
      });
    }

    const walletData = await walletRes.json();
    console.log(
      'Wallet success response:',
      JSON.stringify(walletData, null, 2)
    );

    const responseData = {
      success: true,
      userId,
      user: verifyData.user || verifyData,
      wallet: walletData,
    };

    console.log(
      'Sending final success response:',
      JSON.stringify(responseData, null, 2)
    );
    return res.json(responseData);
  } catch (error) {
    console.error('Error in verify-code:', error);
    console.error('Error stack:', error.stack);

    // Provide more specific error messages
    let errorMessage = 'Failed to verify code';
    if (error.code === 'ENOTFOUND') {
      errorMessage =
        'Network connectivity issue. Please check your internet connection.';
    } else if (error.name === 'FetchError') {
      errorMessage =
        'Unable to connect to authentication service. Please try again.';
    }

    return res.status(500).json({ error: errorMessage });
  }
});

// Test Privy API configuration endpoint
app.get('/test-privy-config', async (req, res) => {
  console.log('\n=== TESTING PRIVY CONFIGURATION ===');

  try {
    const headers = getPrivyAuthHeaders();

    // Test basic API access
    const testEndpoints = [
      'https://auth.privy.io/api/v1/apps/me',
      'https://api.privy.io/v1/apps/me',
      'https://auth.privy.io/api/v1/health',
      'https://api.privy.io/v1/health',
    ];

    const results = {};

    for (const endpoint of testEndpoints) {
      try {
        console.log(`Testing endpoint: ${endpoint}`);
        const response = await fetch(endpoint, {
          method: 'GET',
          headers,
          timeout: 5000,
        });

        results[endpoint] = {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers),
        };

        if (response.ok) {
          const data = await response.json();
          results[endpoint].data = data;
        } else {
          const errorText = await response.text();
          results[endpoint].error = errorText;
        }
      } catch (error) {
        results[endpoint] = {
          error: error.message,
        };
      }
    }

    res.json({
      message: 'Privy configuration test completed',
      credentials: {
        appId: PRIVY_APP_ID ? 'Set' : 'Missing',
        appSecret: PRIVY_APP_SECRET ? 'Set' : 'Missing',
      },
      results,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to test Privy configuration',
      details: error.message,
    });
  }
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('\n=== GLOBAL ERROR HANDLER ===');
  console.error('Error:', error);
  console.error('Stack:', error.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  console.log('\n=== 404 NOT FOUND ===');
  console.log(`${req.method} ${req.url} not found`);
  res.status(404).json({ error: 'Endpoint not found' });
});

const PORT = 8002;
app.listen(PORT, '0.0.0.0', () => {
  console.log('\n=== SERVER STARTED ===');
  console.log(`Privy backend server running on:`);
  console.log(`- Local: http://localhost:${PORT}`);
  console.log(`- Network: http://0.0.0.0:${PORT}`);
  console.log(`- Health check: http://localhost:${PORT}/health`);
  console.log(`- Network test: http://localhost:${PORT}/test-network`);
  console.log(
    `- Privy config test: http://localhost:${PORT}/test-privy-config`
  );
  console.log('===========================\n');
});
