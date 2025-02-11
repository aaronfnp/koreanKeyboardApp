import React from "react";
import StoredWords from "./WordList";
import { ExampleWordList } from "./WordList";

const ListDetails = ({
  storedWords,
  setStoredWords,
  storedListInfo,
  setStoredListInfo,
  setIsStudying,
}) => {
  const exampleDescription = `
  "Little Forest (リトル・フォレスト, Ritoru Foresuto) is a Japanese slice-of-life manga series 
  written and illustrated by Daisuke Igarashi. It was adapted into a two-part Japanese live-action 
  film released on August 30, 2014, and February 14, 2015.[1][2]

  Additionally, it was adapted into a Korean live-action film released on February 28, 2018,[5] 
  and into a South Korean TV series which premiered on August 12, 2019."
`;
  const exampleCategories = `Cozy, Food, Healing, Daily-life, Countryside, Farming, Cooking`;

  const exampleBooks = [
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZO12mnqv6catSzLF8Z05r4qfDEkf2nI0eWQ&s",
      title: "Chinese Bong Bong Club",
    },
    {
      img: "https://i.namu.wiki/i/Xf940z5T_pJjOeL7oGq6pVul6bhnru1gmoN-WkpN8U1T89pY1DxXGW4lWAD_oI8_tPrzfyEcM1FZkgnPUUJ3iUFiGmZM1gAmjfrfc6csPIbrAD7KpsZHwDCh6Uo-2EEnOPQTNkH8kIFcBxK2jZw_oVOjNGTjc6FqCjZOA7wV5VI.webp",
      title: "Omelette Rice Jam Jam",
    },
  ];

  return (
    <main className="list-details mt-10 rounded-lg">
      <h1 className="text-3xl">{storedListInfo.title_en}</h1>
      <h2>{storedListInfo.title_kr ? `${storedListInfo.title_kr}` : ""}</h2>
      <h3>Description</h3>
      <p>{storedListInfo.description || "No description available"}</p>

      <h3>Categories</h3>
      <div>
        {storedListInfo.themes.map((t, index) => (
          <div key={index} className="theme-item">
            <p>{t}</p>
          </div>
        ))}
      </div>

      <h3>Similar Books</h3>
      <div className="similar-books-container">
        {exampleBooks.map((b) => (
          <div key={b.title} className="book-item">
            <img src={b.img} alt={b.title} className="book-image" />
            <p className="book-title">{b.title}</p>
          </div>
        ))}
      </div>
      <p>Sample Word List</p>
      <ExampleWordList
        storedWords={storedWords}
        setStoredWords={setStoredWords}
        storedListInfo={storedListInfo}
        setStoredListInfo={setStoredListInfo}
      />
    </main>
  );
};

export default ListDetails;
