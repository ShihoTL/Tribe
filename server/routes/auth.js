import express from 'express';
import axios from 'axios';

const router = express.Router();

// Send email login code
router.post('/send-login-code', async (req, res) => {
  const { email } = req.body;

  try {
    await axios.post(
      'https://auth.privy.io/api/v1/login/email/start',
      { email },
      {
        headers: {
          Authorization: `Bearer ${process.env.PRIVY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ message: 'Code sent to email.' });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to send login code' });
  }
});

// Verify code and create wallet
router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;

  try {
    const authRes = await axios.post(
      'https://auth.privy.io/api/v1/login/email/verify',
      { email, code },
      {
        headers: {
          Authorization: `Bearer ${process.env.PRIVY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const { user, accessToken } = authRes.data;

    const walletRes = await axios.post(
      'https://wallet.privy.io/api/v1/wallets',
      { user_id: user.id, chain: 'solana' }, // explicitly Solana
      {
        headers: {
          Authorization: `Bearer ${process.env.PRIVY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const wallet = walletRes.data;

    res.status(200).json({
      email: user.email,
      userId: user.id,
      walletAddress: wallet.address,
      accessToken,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Login or wallet creation failed' });
  }
});

export default router;
