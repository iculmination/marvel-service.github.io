class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=5f6e9a2d10bb9d4917e2be5fc239d5d5";
  _baseOffset = 400;

  getResource = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}. Status: ${res.status}`);
    }
    return await res.json();
  };

  getAllCharacters = async (offset=this._baseOffset) => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
    );
    return res.data.results.map((character) => {
      return this._transformCharacter(character);
    });
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (character) => {
    return {
      name: character.name,
      id: character.id,
      description: character.description
        ? `${character.description.slice(0, 210)} ...`
        : "This character does not has a description",
      thumbnail: character.thumbnail.path + "." + character.thumbnail.extension,
      homepage: character.urls[0].url,
      wiki: character.urls[1].url,
      comics: character.comics.items,
    };
  };
}

export default MarvelService;
