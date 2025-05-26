import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { name } = req.query;
  // NDK expects the username without domain
  const cleanName = name && name.split('@')[0];

  // Read users.json at runtime
  const usersPath = path.join(process.cwd(), 'data', 'users.json');
  let users = {};
  try {
    const fileContent = fs.readFileSync(usersPath, 'utf8');
    if (!fileContent.trim()) {
      return res.status(500).json({ error: 'users.json is empty' });
    }
    users = JSON.parse(fileContent);
  } catch (e) {
    return res.status(500).json({ error: 'Could not read users.json', details: e.message });
  }

  if (!cleanName || !users[cleanName]) {
    return res.status(404).json({ error: 'User not found' });
  }

  // NIP-05 NDK-compliant response
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    names: { [cleanName]: users[cleanName].pubkey },
    relays: { [users[cleanName].pubkey]: users[cleanName].relays }
  });
}
