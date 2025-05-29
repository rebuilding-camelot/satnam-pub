import React, { useState } from 'react';

// Minimal NostaMeProfileBuilder stub for integration
// TODO: Adapt real logic and UI from src/lib/nosta-me/components/profile/create/ProfileCreate.vue
export default function NostaMeProfileBuilder({ pubkey, onProfileCreated }) {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [nip05, setNip05] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate profile creation
    const profile = {
      name,
      about,
      nip05,
      pubkey
    };
    
    // Call the callback with the created profile
    if (onProfileCreated) {
      onProfileCreated(profile);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, marginBottom: 24 }}>
      <h3>Nosta-Me Profile Builder (React Adaptation)</h3>
      <p>Pubkey: {pubkey || 'N/A'}</p>
      
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Name:
              <input
                type="text"
                className="w-full border rounded px-2 py-1 mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              About:
              <textarea
                className="w-full border rounded px-2 py-1 mt-1"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="About you"
                rows={2}
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              NIP-05:
              <input
                type="text"
                className="w-full border rounded px-2 py-1 mt-1"
                value={nip05}
                onChange={(e) => setNip05(e.target.value)}
                placeholder="you@example.com"
              />
            </label>
          </div>
          <button 
            type="submit" 
            className="bg-satnam-purple hover:bg-satnam-orange text-white px-4 py-2 rounded"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}
