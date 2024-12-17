class Character {
  constructor(name, status) {
    this.name = name;
    this.status = status;
  }

  isAlive() {
    return this.status === "Alive";
  }
}

class CharacterAPI {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchCharacters() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data.results.map((item) => new Character(item.name, item.status));
    } catch (error) {
      console.error("Error in fetching characters:", error);
      return [];
    }
  }

  async getAliveCharacters() {
    const characters = await this.fetchCharacters();

    const aliveCharacters = characters
      .filter((character) => character.isAlive())
      .map((character) => ({ name: character.name, isAlive: true }));

    return aliveCharacters;
  }
    
    async countAliveCharacters() {
        const aliveCharacters = await this.getAliveCharacters();
        return aliveCharacters.length;
      }
}

const apiUrl = "https://rickandmortyapi.com/api/character";
const characterAPI = new CharacterAPI(apiUrl);

characterAPI.getAliveCharacters().then((aliveCharacters) => {
  console.log("Alive Characters:", aliveCharacters);
});

characterAPI.countAliveCharacters().then((aliveCount) => {
    console.log("Total Alive Characters:", aliveCount);
  });