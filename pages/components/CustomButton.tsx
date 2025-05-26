import { Button } from "./ui/button";

export function SatnamButton() {
  return (
    <Button 
      className="bg-satnam-purple hover:bg-satnam-orange text-white"
      onClick={() => console.log('Nostr signer initiated')}
    >
      Create @satnam.pub ID
    </Button>
  );
}
