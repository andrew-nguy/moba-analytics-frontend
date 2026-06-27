const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return res.json();
}

export function getAccount(name: string, tag: string, platform: string) {
  return fetchFromApi<{ puuid: string; gameName: string; tagLine: string }>(
    `/api/account?name=${name}&tagLine=${tag}&platform=${platform}`
  );
}

export function getSummoner(puuid: string, platform: string) {
  return fetchFromApi<{ profileIconId: number; summonerLevel: number }>(
    `/api/summoner?puuid=${puuid}&platform=${platform}`
  );
}

export function getRanked(puuid: string, platform: string) {
  return fetchFromApi<{ queueType: string; tier: string; rank: string; leaguePoints: number; wins: number; losses: number }[]>(
    `/api/ranked?puuid=${puuid}&platform=${platform}`
  );
}

export function getMatchIds(puuid: string, platform: string) {
  return fetchFromApi<string[]>(
    `/api/matches?puuid=${puuid}&platform=${platform}`
  );
}

export function getMatch(matchId: string, platform: string) {
  return fetchFromApi<any>(
    `/api/match?matchId=${matchId}&platform=${platform}`
  );
}