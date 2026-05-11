const PB_URL = 'http://127.0.0.1:8090';
const COLLECTION_GENERAL = 'general';
const COLLECTION_SECTIONS = 'sections';

let authToken: string | null = null;

export async function authenticate(): Promise<string> {
  const res = await fetch(`${PB_URL}/api/collections/_superusers/auth-with-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identity: 'rafaelvillahinojosa@gmail.com',
      password: '98RafaOverdan',
    }),
  });
  if (!res.ok) throw new Error('PocketBase auth failed');
  const data = await res.json();
  authToken = data.token as string;
  return authToken;
}

function headers(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    Authorization: authToken || '',
  };
}

export async function getGeneralRecord(): Promise<Record<string, unknown> | null> {
  const res = await fetch(`${PB_URL}/api/collections/${COLLECTION_GENERAL}/records?perPage=1`, { headers: headers() });
  if (!res.ok) return null;
  const data = await res.json();
  return data.items?.[0] || null;
}

export async function createGeneralRecord(data: Record<string, unknown>): Promise<string> {
  const res = await fetch(`${PB_URL}/api/collections/${COLLECTION_GENERAL}/records`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json.id;
}

export async function updateGeneralRecord(id: string, data: Record<string, unknown>): Promise<void> {
  await fetch(`${PB_URL}/api/collections/${COLLECTION_GENERAL}/records/${id}`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify(data),
  });
}

export async function getSectionRecords(): Promise<Array<Record<string, unknown>>> {
  const res = await fetch(`${PB_URL}/api/collections/${COLLECTION_SECTIONS}/records?perPage=20&sort=sectionId`, { headers: headers() });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items || [];
}

export async function createSectionRecord(data: Record<string, unknown>): Promise<string> {
  const res = await fetch(`${PB_URL}/api/collections/${COLLECTION_SECTIONS}/records`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json.id;
}

export async function updateSectionRecord(id: string, data: Record<string, unknown>): Promise<void> {
  await fetch(`${PB_URL}/api/collections/${COLLECTION_SECTIONS}/records/${id}`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify(data),
  });
}
