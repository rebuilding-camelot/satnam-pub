# Satnam.pub

**Forging Your Digital True Name**  
A sovereign identity protocol combining Nostr decentralized identifiers with Bitcoin-native payments, empowering users to claim their authentic digital selves.

> *"Sat Nam: Truth is your identity. When your ego aligns with this light, you become humble, compassionate, and whole."*  
> – Yogi Bhajan, Kundalini Yoga

---

## Project Description
Satnam.pub implements the ancient imperative to **"Know Thyself"** (γνῶθι σεαυτόν) through modern cryptography:
- 🧿 **True Name Identity**: `username@satnam.pub` Nostr IDs as digital *sat nam* (Sanskrit: "true identity")
- ⚡ **Lightning Addresses**: `username@satnam.pub` activate zaps & V4V payments honoring *seva* (selfless service)
- 🔐 **Family Credentials**: Multi-sig bunkers preserving *smṛti* (sacred lineage memory)

Built using:
- **NIP-05**: Prove your Nostr identity ([NDK Implementation](https://github.com/nostr-dev-kit/ndk))
- **LNURL-pay**: Monetize skills via *dāna* (virtuous giving)
- **Fedimint**: Secure family finances through *sangha* (community trust)
- **Pubky Nostr Bridge**: Integrate Pubky's Nostr bridge for cross-app identity and relay management
- **Slash Key**: Enable advanced key management and authentication with Slash Key integration

---

## Project Description
Satnam.pub combines Nostr decentralized identities with Bitcoin Lightning payments to create:
- 🆔 **Self-Sovereign Identities**: `username@satnam.pub` Nostr NIP-05 IDs
- ⚡ **LN Addresses**: `username@satnam.pub` Lightning payment addresses
- 🔐 **Family Credentials**: NIP-58 badges for skill verification
- 🤖 **Fedimint Integration**: Multi-sig Nostr accounts & Family Mints, Automated DCA, & family payment splits
- 🌉 **Pubky Nostr Bridge**: Seamless Pubky bridge for Nostr relay and identity interoperability
- ⌨️ **Slash Key**: Slash Key-based authentication and key management for enhanced security

Built on principles of **privacy**, **verifiability**, and **censorship resistance** using:
- Nostr Dev Kit (NDK) for relay management
- Shadcn UI for brandable interfaces
- Start9 for sovereign deployment
- Pubky Nostr Bridge and Slash Key for next-gen identity and key management

---

## Key Features
### Identity System
- **NIP-05 Endpoint**: `/.well-known/nostr.json` [1][14]
- **LNURL-pay**: Lightning Address protocol [2][18]
- **Multi-Sig Bunkers**: FROST-based key sharding [4][10]
- **Pubky Nostr Bridge**: Cross-app relay and identity bridge
- **Slash Key Integration**: Advanced key management and authentication

### Payment Infrastructure
- **Zap-to-Enroll**: NIP-57 premium username payments [1][11]
- **Fedimint Automation**: Scheduled DCA buys [3][17]
- **Family Allowances**: Batched ecash distributions [3][17]

### Credential Ecosystem
- **NIP-58 Badges**: Skill/achievement verification
- **Satnam.pub Issuance**: On-chain credential anchoring
- **Parental Controls**: NIP-172 family groups [1][14]

---

## Development Setup
git clone https://github.com/rebuilding-camelot/satnam-pub
cd satnam-pub
npm install @nostr-dev-kit/ndk @nostrify/signers

### Environment Variables
NEXT_PUBLIC_DOMAIN=satnam.pub
NDK_RELAYS=wss://relay.satnam.pub,wss://nostr.wine
LND_REST_ENDPOINT=https://lnd.satnam.pub

---

## Roadmap
### Phase 1: Core Identity (Complete)
- [x] NIP-05 endpoint implementation [1][14]
- [x] LN Address payment flow [2][18]
- [x] Shadcn UI component library [3][17]

### Phase 2: Family Features (Q3 2025)
- [ ] Fedimint automation scripts [3][17]
- [ ] Parental control dashboard [4][10]
- [ ] NIP-172 family groups [1][14]
- [ ] Pubky Nostr Bridge integration
- [ ] Slash Key authentication rollout

### Phase 3: Credential Network (Q4 2025)
- [ ] RGB credential schema
- [ ] DLC oracle integration
- [ ] Cross-protocol attestations

---

## Built With
- [Nostr Dev Kit (NDK)](https://github.com/nostr-dev-kit/ndk) [1][14]
- [Nostrify Signers](https://nostrify.dev/sign/) [2][18]
- [useNostr Hooks](https://github.com/cmdruid/use-nostr) [3][17]
- [Nstart Onboarding](https://github.com/dtonon/nstart) [4][10]
- [Shadcn UI](https://ui.shadcn.com/) [3][17]
- [Pubky Nostr Bridge](https://github.com/nostrband/pubky) [NEW]
- [Slash Key](https://slashkey.dev/) [NEW]

---

## Development Tools
- **Cursor AI**: Code generation & batch refactoring
- **GitHub Copilot**: Real-time code suggestions
- **Vercel**: Edge network deployment
- **Start9**: Sovereign service packaging

---

## Contributing
1. Fork repo
2. Create feature branch: `git checkout -b feat/new-component`
3. Commit changes: `git commit -am 'Add new credential type'`
4. Push branch: `git push origin feat/new-component`
5. Open Pull Request

---

## License
MIT License - See [LICENSE](LICENSE) for details

---

> "Camelot is not a place, but a promise. Together, let's rebuild it one name, one credential, one family at a time."

<!-- Test commit: SatNam push check, 2025-05-25 -->
