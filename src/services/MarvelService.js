import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=5f6e9a2d10bb9d4917e2be5fc239d5d5";
  const _baseOffset = 400;

  const getAllCharacters = async (offset = _baseOffset) => {
    try {
      const res = await request(
        `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
      );
      return res.data.results.map((character) => {
        return _transformCharacter(character);
      });
    } catch (error) {}
  };

  const getCharacter = async (id) => {
    try {
      const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
      return _transformCharacter(res.data.results[0]);
    } catch (error) {}
  };

  const getAllComics = async (offset = 5000) => {
    try {
      const res = await request(
        `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
      );
      return res.data.results.map((comics) => {
        return _transformComics(comics);
      });
    } catch (error) {}
  };

  const getComic = async (id) => {
    try {
      const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
      return _transformComics(res.data.results[0], true);
    } catch (error) {}
  };

  const _transformCharacter = (character) => {
    return {
      name: character.name,
      id: character.id,
      description: character.description
        ? `${character.description.slice(0, 210)} ...`
        : "There is no description for this character",
      thumbnail: character.thumbnail.path + "." + character.thumbnail.extension,
      homepage: character.urls[0].url,
      wiki: character.urls[1].url,
      comics: character.comics.items,
    };
  };

  const _transformComics = (comics, singleComic) => {
    let comicLanguage = "No information";

    if (
      comics.textObjects &&
      comics.textObjects[0] &&
      comics.textObjects[0].language &&
      comics.textObjects[0].language !== "" &&
      singleComic
    ) {
      comicLanguage = comics.textObjects[0].language;
    }

    let data = {
      title: comics.title,
      id: comics.id,
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      // details: comics.urls[0].url,
      description: comics.description
        ? comics.description
        : "There is no description for this comic",
      pages: comics.pageCount,
      languages: comicLanguage,
      price:
        comics.prices[0].price === 0
          ? "NOT AVAILABLE"
          : `$${comics.prices[0].price}`,
    };

    return data;
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComic,
    clearError,
  };
};

export default useMarvelService;
