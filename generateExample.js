const { Configuration, OpenAIApi } = require("openai");

const generateExample = async (apiKey, wordLang, wordName, wordMean) => {
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    messages: [{ role: "user", content: `${wordLang}で${wordMean}という意味の${wordName}という単語があります。この単語を使った例文と、例文を日本語訳した文を出力してください` }],
    functions: [
      {
        "name": "generate_example",
        "description": "generate example",
        "parameters": {
          "type": "object",
          "properties": {
            "example_sentence": {
              "type": "string",
              "description": "generated exapmle sentense."
            },
            "example_sentence_translated": {
              "type": "string",
              "description": "Generated example sentence translated into Japanese"
            }
          }
        },
        required: ["example_sentence", "example_sentence_translated"]
      }
    ],
    function_call: "auto"
  });

  const response = JSON.parse(completion.data.choices[0].message.function_call.arguments);
  return response;
};

module.exports = generateExample;