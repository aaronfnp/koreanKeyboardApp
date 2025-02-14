import React from "react";
import BookForm from "../components/BookForm";
import { useState } from "react";

export default function CreatePage() {
  const [storedListInfo, setStoredListInfo] = useState("");

  return (
    <div className="mt-40">
      <BookForm
        mode="create"
        storedListInfo={storedListInfo}
        setStoredListInfo={setStoredListInfo}
      />
    </div>
  );
}
