import { NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
// import { generateKeyPair } from 'nostr-control';
import { generateKeyPair } from '../../../node_modules/nostr-control/nostr-control.js';
// import { Suda } from 'sudabase'; // Suda removed, see below
import { supabase } from '../supabaseClient';

// const sudabase = new Suda({
//   repo: 'rebuilding-camelot/satnam-pub',
//   branch: 'main',
//   token: process.env.SUDABASE_TOKEN // Set this in your environment
// });

// Dummy implementations for demonstration. Replace with your actual DB and file update logic.
async function createUser(username, publicKey, privateKey) {
  // Suda-based logic removed. Implement your own DB/file update logic here if needed.
  // const users = (await sudabase.get('data/users.json')) || {};
  // users[username] = {
  //   pubkey: publicKey,
  //   privkey: privateKey,
  //   relays: ['wss://relay1.nostr.com'] // or customize per user
  // };
  // await sudabase.set('data/users.json', users);
}

async function updateWellKnownNostrJson(username, publicKey) {
  // No-op: users.json is the source for nostr.json endpoint
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Require Supabase Auth (JWT in Authorization header)
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const jwt = authHeader.replace('Bearer ', '');
  // Validate JWT with Supabase
  const { data: user, error: userError } = await supabase.auth.getUser(jwt);
  if (userError || !user || !user.user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  const userId = user.user.id;

  // Validate input
  const { username, pubkey, privkey_encrypted } = req.body;
  if (!username || typeof username !== 'string' || username.length < 3) {
    return res.status(400).json({ error: 'Username is required and must be at least 3 characters.' });
  }
  if (!pubkey || typeof pubkey !== 'string' || pubkey.length < 10) {
    return res.status(400).json({ error: 'Valid pubkey is required.' });
  }

  // Check for existing username or pubkey
  const { data: existing, error: existingError } = await supabase
    .from('users')
    .select('id')
    .or(`username.eq.${username},pubkey.eq.${pubkey}`)
    .maybeSingle();
  if (existing) {
    return res.status(409).json({ error: 'Username or pubkey already exists.' });
  }

  // Insert user into Supabase users table
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        id: userId, // Use Supabase Auth user id
        username,
        pubkey,
        privkey_encrypted: privkey_encrypted || null,
      },
    ])
    .select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // Optionally: update NIP-05 mapping or trigger other logic here

  return res.status(201).json({ user: data[0] });
}
