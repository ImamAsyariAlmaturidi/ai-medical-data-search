import dotenv from "dotenv";
import { queryVektor } from "./embeddings/covid"; // Fungsi query untuk mengambil vektor
dotenv.config();
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";

// Fungsi untuk mengekstrak kunci dari pertanyaan

// Fungsi utama untuk mendapatkan data
async function getData() {
  try {
    // Ambil pertanyaan dari pengguna
    const userQuestion =
      "berikan detail pasien yang memiliki history current_or_former_smoker?";

    const result = await queryVektor(userQuestion); // Menggunakan key untuk query vektor

    // Inisialisasi model OpenAI
    const model = new ChatOpenAI({
      modelName: "gpt-4", // Bisa menggunakan gpt-3.5-turbo juga
      temperature: 0,
    });

    // Membuat prompt dinamis berdasarkan hasil vektor
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "Kamu adalah asisten medis. Jawablah berdasarkan data pasien:\n{context}",
      ],
      ["human", "{question}"],
    ]);

    // Menyusun rangkaian tugas
    const simpleGraph = RunnableSequence.from([
      async (input) => ({
        context: JSON.stringify(result, null, 2), // Menyediakan data vektor sebagai konteks
        question: input,
      }),
      prompt,
      model,
    ]);

    // Menyusun dan menanyakan pertanyaan pengguna
    const response = await simpleGraph.invoke(userQuestion);

    if (response?.content) {
      console.log(response.content); // Menampilkan hasil jawaban
    } else {
      console.log("Tidak ada respons yang relevan.");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

getData();
