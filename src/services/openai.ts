import { ChatOpenAI } from "@langchain/openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

class OpenAIService {
  // Membuat model LLM untuk ChatOpenAI dan OpenAIEmbeddings
  public llm: ChatOpenAI;
  public openAIEmbeddings: OpenAIEmbeddings;

  constructor() {
    // Menggunakan ChatOpenAI untuk chat model
    this.llm = new ChatOpenAI({
      model: "gpt-4o-mini", // Model OpenAI yang digunakan
      temperature: 0, // Kontrol variasi output
    });

    // Menggunakan OpenAIEmbeddings untuk embedding dengan pengaturan yang diminta
    this.openAIEmbeddings = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY as string, // API key diambil dari .env
      model: "text-embedding-3-large", // Model untuk menghasilkan embedding
      batchSize: 512, // Ukuran batch untuk embedding
    });
  }

  // Fungsi untuk menghasilkan embeddings
}

export default OpenAIService;
