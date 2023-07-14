const { Configuration, OpenAIApi } = require("openai");

const getLangCode = async (apiKey, wordLang) => {
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that provides language codes.",
      },
      {
        role: "user",
        content: `get language code of ${wordLang}`,
      },
      {
        role: "assistant",
        content: langCode,
      },
    ],
  });
  const response = { content: completion.data.choices[0].message.content.trim() };
  return response;
};

module.exports = getLangCode;
