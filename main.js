class Character {
    constructor(id, name, status, gender) {
      // Validations
      if (!Number.isInteger(id) || id <= 0) {
        throw new Error('ID must be a positive integer');
      }

      if (typeof name !== 'string' || name.trim() === '') {
        throw new Error('Name must be a non-empty string');
      }

      const validStatuses = ['Alive', 'Dead', 'unknown'];
      if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }

      const validGenders = ['Female', 'Male', 'Genderless', 'unknown'];
      if (!validGenders.includes(gender)) {
        throw new Error(`Invalid gender. Must be one of: ${validGenders.join(', ')}`);
      }

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
        // Validate API URL
        if (!apiUrl || typeof apiUrl !== 'string') {
          throw new Error('Invalid API URL');
        }   
        this.apiUrl = apiUrl;
      }

  async fetchCharacters() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
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

export { Character, CharacterAPI };