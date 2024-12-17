class Character {
  constructor(id, name, status, gender) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.gender = gender;
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
      return data.results.map(
        (item) => new Character(item.id, item.name, item.status, item.gender)
      );
    } catch (error) {
      console.error("Error in fetching characters:", error);
      return [];
    }
  }

  async getAliveCharacters() {
    const characters = await this.fetchCharacters();

    const aliveCharacters = characters.filter((character) =>
      character.isAlive()
    );

    const modifiedCharacters = aliveCharacters.map((character) => ({
        id: character.id,
        name: character.name.replace(/ /g, "_"),
        status: character.status,
        gender: character.gender
      }));
  
      return {
        results: modifiedCharacters
      };
  }

  async countAliveCharacters() {
    const aliveCharacters = await this.getAliveCharacters();
    return aliveCharacters.length;
  }
}

const apiUrl = "https://rickandmortyapi.com/api/character";
const characterAPI = new CharacterAPI(apiUrl);

characterAPI.getAliveCharacters().then((aliveCharactersJSON) => {
    console.log(JSON.stringify(aliveCharactersJSON, null, 2));
  });

characterAPI.countAliveCharacters().then((aliveCount) => {
  console.log("Total Alive Characters:", aliveCount);
});