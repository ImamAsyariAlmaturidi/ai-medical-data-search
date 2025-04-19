const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");

// Membuat instance Text Splitter
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500, // Ukuran chunk dalam karakter
  chunkOverlap: 50, // Overlap antar chunk
});

export const chunkedDocuments = async (documents: any) => {
  try {
    await textSplitter.splitDocuments(documents);
  } catch (error) {
    console.error("❌ Error:", error);
  }
};
