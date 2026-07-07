export const SUMMONER_SPELLS: Record<number, string> = {
  1: 'SummonerBoost',       // Cleanse
  3: 'SummonerExhaust',     // Exhaust
  4: 'SummonerFlash',       // Flash
  6: 'SummonerHaste',       // Ghost
  7: 'SummonerHeal',        // Heal
  11: 'SummonerSmite',      // Smite
  12: 'SummonerTeleport',   // Teleport
  13: 'SummonerMana',       // Clarity
  14: 'SummonerDot',        // Ignite
  21: 'SummonerBarrier',    // Barrier
  32: 'SummonerSnowball',   // Mark (ARAM)
};

export function getSpellName(id: number): string {
  return SUMMONER_SPELLS[id] ?? 'SummonerFlash';
}

export function getSpellUrl(id: number): string {
  return `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/${getSpellName(id)}.png`;
}