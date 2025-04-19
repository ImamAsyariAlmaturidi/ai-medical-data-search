import { ChatAnthropic } from "@langchain/anthropic";

class AnthropicService {
  // Membuat model LLM untuk ChatAnthropic
  public llm: ChatAnthropic;

  constructor() {
    // Menggunakan ChatAnthropic untuk chat model
    this.llm = new ChatAnthropic({
      model: "claude-2", // Model Anthropic yang digunakan
      temperature: 0, // Kontrol variasi output
    });
  }
}

export default AnthropicService;
