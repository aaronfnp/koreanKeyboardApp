import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION || "us-east-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Books";

// Get books from DynamoDB
export const getBooks = async () => {
  const params = {
    TableName: TABLE_NAME,
  };

  try {
    const books = await dynamoClient.scan(params).promise();
    console.log(books.Items); // Remove later
    return books.Items;
  } catch (err) {
    console.error("Error fetching books:", err);
    throw err;
  }
};

// Add a new book to DynamoDB
export const addBook = async (bookData) => {
  // Ensure bookData has a bookId field
  if (!bookData.bookId) {
    console.error("Missing bookId in the item");
    return;
  }

  const params = {
    TableName: TABLE_NAME,
    Item: bookData,
  };

  try {
    await dynamoClient.put(params).promise();
    console.log("Book added successfully!");
  } catch (err) {
    console.error("Error adding book:", err);
    throw err; // Rethrow the error for proper handling
  }
};
