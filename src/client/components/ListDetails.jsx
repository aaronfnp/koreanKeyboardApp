import React from "react";
import StoredWords from "./WordList";
import CSVComponent from "./CSVComponent";
import StudyContainer from "./StudyContainer";

const ListDetails = ({
  storedWords,
  setStoredWords,
  storedListInfo,
  setStoredListInfo,
}) => {
  const exampleDescription = `
  "Little Forest (リトル・フォレスト, Ritoru Foresuto) is a Japanese slice-of-life manga series 
  written and illustrated by Daisuke Igarashi. It was adapted into a two-part Japanese live-action 
  film released on August 30, 2014, and February 14, 2015.[1][2]

  Additionally, it was adapted into a Korean live-action film released on February 28, 2018,[5] 
  and into a South Korean TV series which premiered on August 12, 2019."
`;
  const exampleCategories = `Cozy, Food, Healing, Daily-life, Countryside, Farming, Cooking`;

  return (
    <main className="list-details">
      <h3>Description</h3>
      <p>{exampleDescription || "No description available"}</p>

      <h3>Categories</h3>
      <p>{exampleCategories || "No categories"}</p>

      <h3>Similar Lists</h3>
      <ul>
        <li>Chinese Bong Bong Club</li>
        <li>Omelette Rice Jam Jam</li>
      </ul>

      <StoredWords
        storedWords={storedWords}
        setStoredWords={setStoredWords}
        storedListInfo={storedListInfo}
        setStoredListInfo={setStoredListInfo}
      />
      <StudyContainer />

      <CSVComponent setStoredWords={setStoredWords} />
    </main>
  );
};

export default ListDetails;
