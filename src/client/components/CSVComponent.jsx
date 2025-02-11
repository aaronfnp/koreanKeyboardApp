import { CSVImporter } from "csv-import-react";
import { useState } from "react";

export default function CSVComponent({ setStoredWords }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="bg-black" onClick={() => setIsOpen(true)}>
        Import CSV
      </button>

      <CSVImporter
        modalIsOpen={isOpen}
        modalOnCloseTriggered={() => setIsOpen(false)}
        darkMode={true}
        onComplete={(data) => {
          const extractedWords = data.rows.map((row) => row.values); // Extract the values field
          console.log(extractedWords); // Debugging: Check if it looks correct
          setStoredWords(extractedWords);
          setIsOpen(false);
        }}
        template={{
          columns: [
            {
              name: "Korean",
              key: "korean",
              data_type: "string",
              required: true,
              description: "Korean word or phrase",
              suggested_mappings: ["Korean", "Hangul"],
            },
            {
              name: "English",
              key: "english",
              data_type: "string",
              required: true,
              description: "English translation",
              suggested_mappings: ["English", "Translation"],
            },
          ],
        }}
      />
    </>
  );
}
