import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import dotenv from "dotenv";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAIEmbeddings } from "@langchain/openai";

dotenv.config();

const csvFilePath = "./datas/covid.csv"; // Pastikan path ini benar
const embeddingService = new OpenAIEmbeddings({
  model: "text-embedding-ada-002",
  // openAIApiKey: process.env.OPENAI_API_KEY,
});
export const insertVektor = async () => {
  try {
    const loader = new CSVLoader(csvFilePath);
    const docs = await loader.load();
    console.log("📄 Data berhasil dimuat dari CSV");

    // Tambahkan ID saja jika perlu, tapi JANGAN tambahkan vektor ke metadata
    const preparedDocs = docs.map((doc, index) => {
      doc.id = `doc_${index}`;
      return doc;
    });

    // Pastikan koleksi ada, kalau belum dibuat
    const vectorStore = await Chroma.fromExistingCollection(embeddingService, {
      collectionName: "covid-19",
      url: "http://localhost:8000",
    });
    vectorStore.delete({
      filter: { source: "./datas/covid.csv" }, // Hapus koleksi jika ada
    }); // Hapus koleksi jika ada

    vectorStore.addDocuments(preparedDocs); // Simpan dokumen ke dalam vector stores
    console.log("✅ Vektor berhasil disimpan ke dalam vector store");
  } catch (error) {
    console.error("❌ Error insertVektor:", error);
  }
};

export const queryVektor = async (query: string) => {
  try {
    const vectorStore = await Chroma.fromExistingCollection(embeddingService, {
      collectionName: "covid-19",
      url: "http://localhost:8000",
    });

    // Cari dokumen paling mirip
    const results = await vectorStore.similaritySearch(query, 10); // Mengambil 10 hasil teratas

    return results;
  } catch (error) {
    console.error("❌ Error queryVektor:", error);
  }
};
