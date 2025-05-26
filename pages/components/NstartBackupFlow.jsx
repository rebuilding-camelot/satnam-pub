import React, { useState, useEffect, useRef } from 'react';
import CryptoJS from 'crypto-js';
import NDK, { NDKUser, NDKEvent } from '@nostr-dev-kit/ndk';
import { NstartOnboardingWizard } from './NstartOnboardingWizard';
import NostaMeProfileBuilder from './NostaMeProfileBuilder';
import { SatnamButton } from './CustomButton';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

/**
 * NstartBackupFlow using NDK for Nostr operations.
 */
export default function NstartBackupFlow() {
  // NDK instance and user state
  const [ndk, setNdk] = useState(null);
  const [pubkey, setPubkey] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [profile, setProfile] = useState(null);
  const [backupData, setBackupData] = useState('');
  const [restoreData, setRestoreData] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [backupStatus, setBackupStatus] = useState('');
  const backupSubRef = useRef(null);

  // Initialize NDK and connect
  useEffect(() => {
    const _ndk = new NDK();
    _ndk.connect().then(() => {
      setIsConnected(true);
      setNdk(_ndk);
      // For demo: generate a random pubkey if not set
      if (!pubkey) {
        // In production, replace with real key management
        const randomHex = Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map(b => b.toString(16).padStart(2, '0')).join('');
        setPubkey(randomHex);
      }
    }).catch(() => setIsConnected(false));
    return () => {
      if (backupSubRef.current) backupSubRef.current.stop();
    };
  }, []);

  // Fetch profile when pubkey changes
  useEffect(() => {
    if (ndk && pubkey) {
      const user = new NDKUser(pubkey);
      user.fetchProfile().then(profile => {
        setProfile(profile);
      }).catch(() => setProfile(null));
    }
  }, [ndk, pubkey]);

  // Listen for backup events (kind 30078, custom for this flow)
  useEffect(() => {
    if (ndk && pubkey) {
      if (backupSubRef.current) backupSubRef.current.stop();
      const sub = ndk.subscribe({
        kinds: [30078],
        authors: [pubkey],
        limit: 1
      }, { closeOnEose: false });
      backupSubRef.current = sub;
      sub.on('event', (evt) => {
        setBackupStatus('Backup event received');
        setRestoreData(evt.content);
      });
      return () => sub.stop();
    }
  }, [ndk, pubkey]);

  // Clear error/message on new input
  useEffect(() => {
    setError('');
    setMessage('');
  }, [backupData, restoreData, passphrase]);

  // Backup: encrypt and publish as kind 30078 event
  const handleBackup = async () => {
    if (!isConnected) {
      setError('Not connected to Nostr.');
      return;
    }
    if (!passphrase) {
      setError('Please enter a passphrase for encryption.');
      return;
    }
    try {
      const encrypted = CryptoJS.AES.encrypt(backupData, passphrase).toString();
      const event = new NDKEvent(ndk);
      event.kind = 30078;
      event.content = encrypted;
      event.pubkey = pubkey;
      await event.sign();
      await event.publish();
      setMessage('Backup successful!');
      setBackupStatus('Backup published');
    } catch (e) {
      setError('Backup failed: ' + (e.message || e));
    }
  };

  // Restore: fetch latest kind 30078 event and decrypt
  const handleRestore = async () => {
    if (!isConnected) {
      setError('Not connected to Nostr.');
      return;
    }
    if (!passphrase) {
      setError('Please enter your passphrase to decrypt.');
      return;
    }
    try {
      // If restoreData is empty, fetch latest event
      let encrypted = restoreData;
      if (!encrypted && ndk && pubkey) {
        const events = await ndk.fetchEvents({
          kinds: [30078],
          authors: [pubkey],
          limit: 1
        });
        if (events.length > 0) {
          encrypted = events[0].content;
        }
      }
      if (!encrypted) {
        setError('No backup data found.');
        return;
      }
      const bytes = CryptoJS.AES.decrypt(encrypted, passphrase);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      if (!decrypted) {
        setError('Decryption failed. Wrong passphrase?');
      } else {
        setMessage('Restore successful! Decrypted data: ' + decrypted);
      }
    } catch (e) {
      setError('Restore failed: ' + (e.message || e));
    }
  };

  // Add handler for profile creation
  const handleProfileCreated = (profile) => {
    setProfile(profile);
    setMessage('Profile created!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Nstart Backup Flow</h2>
        {/* Onboarding Wizard Integration */}
        <div className="mb-6 flex justify-center">
          <NstartOnboardingWizard />
        </div>
        {/* Nosta-Me Profile Builder Integration */}
        <div className="flex justify-center mb-6">
          <NostaMeProfileBuilder pubkey={pubkey} onProfileCreated={handleProfileCreated} />
        </div>
        {/* Satnam Branded Button Example */}
        <div className="mb-6 flex justify-center">
          <SatnamButton />
        </div>
        <div className="mb-4 text-center">
          <Badge className="mb-2">{isConnected ? 'Connected' : 'Not connected'}</Badge><br />
          <span className="text-sm"><strong>Pubkey:</strong> {pubkey || 'N/A'}</span><br />
          {profile && (
            <div className="mt-2 text-sm">
              <strong>NIP-05:</strong> {profile.nip05 || 'N/A'}<br />
              <strong>Name:</strong> {profile.name || 'N/A'}<br />
              <strong>About:</strong> {profile.about || 'N/A'}
            </div>
          )}
        </div>
        <hr className="my-4" />
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-center">
            Passphrase (for encryption):
            <input
              type="password"
              className="w-full border rounded px-2 py-1 mt-1"
              placeholder="Enter passphrase..."
              value={passphrase}
              onChange={e => setPassphrase(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-1 text-center">Backup</h3>
          <textarea
            rows={3}
            className="w-full border rounded px-2 py-1"
            placeholder="Enter data to backup..."
            value={backupData}
            onChange={e => setBackupData(e.target.value)}
          />
          <Button onClick={handleBackup} disabled={!isConnected || !backupData} className="mt-2 w-full">
            Backup to Nostr
          </Button>
          <div className="text-xs text-muted-foreground mt-1 text-center">Status: {backupStatus}</div>
        </div>
        <hr className="my-4" />
        <div className="mb-4">
          <h3 className="font-semibold mb-1 text-center">Restore</h3>
          <textarea
            rows={3}
            className="w-full border rounded px-2 py-1"
            placeholder="Paste backup data to restore..."
            value={restoreData}
            onChange={e => setRestoreData(e.target.value)}
          />
          <Button onClick={handleRestore} disabled={!isConnected} className="mt-2 w-full">
            Restore from Nostr
          </Button>
        </div>
        {/* Show both error and message if present, with accessibility improvements */}
        {error && (
          <div className="text-red-600 mt-2 text-sm text-center" aria-live="polite" aria-label="Error">{error}</div>
        )}
        {message && (
          <div className="text-green-600 mt-2 text-sm text-center" aria-live="polite" aria-label="Message">{message}</div>
        )}
      </Card>
    </div>
  );
}
