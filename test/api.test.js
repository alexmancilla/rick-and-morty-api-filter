import { Character, CharacterAPI } from '../src/main'; 

test('CharacterAPI should only return alive characters and replace spaces with underscores in names', async () => {
  const mockFetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        results: [
          { id: 1, name: 'Rick Sanchez', status: 'Alive', gender: 'Male' },
          { id: 2, name: 'Morty Smith', status: 'Alive', gender: 'Male' },
          { id: 3, name: 'Rick Sanchez', status: 'Alive', gender: 'Male' },
          { id: 4, name: 'Morty Smith', status: 'Dead', gender: 'Male' }
        ]
      })
    })
  );

  global.fetch = mockFetch;

  const characterAPI = new CharacterAPI('http://mockapi.com');
  const aliveCharacters = await characterAPI.getAliveCharacters();

  expect(aliveCharacters.results).toEqual([
    { id: 1, name: 'Rick_Sanchez', status: 'Alive', gender: 'Male' },
    { id: 2, name: 'Morty_Smith', status: 'Alive', gender: 'Male' },
    { id: 3, name: 'Rick_Sanchez', status: 'Alive', gender: 'Male' }
  ]);

  expect(mockFetch).toHaveBeenCalledTimes(1);
});

// Cleaning
afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});