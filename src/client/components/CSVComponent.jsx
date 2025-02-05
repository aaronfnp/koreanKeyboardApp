import { CSVImporter } from "csv-import-react";
import { useState } from "react";

export default function CSVComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Import CSV</button>

      <CSVImporter
        modalIsOpen={isOpen}
        modalOnCloseTriggered={() => setIsOpen(false)}
        darkMode={true}
        onComplete={(data) => console.log(data)}
        template={{
          columns: [
            {
              name: "Korean",
              key: "korean",
              data_type: "string",
              required: true, // Ensures this column is mandatory
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
