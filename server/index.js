const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

async function runCompletion(prompt) {
  const openai = new OpenAIApi(configuration);
  const finalPrompt = "Trả lại đáp án với format: Đáp án: A/B/C, nếu có nhắc đến số tiền, trả lại Số tiền: ... (dạng số), không giải thích thêm. Quyết định ý định của người dùng sau bằng 1 trong các đáp án: A. Chat bình thường hoặc không nhắc đến số tiền hoặc trường hợp ngoại lệ, B. Yêu cầu đối phương gửi tiền, C. Thông báo việc sử dụng tiền trong quỹ. Câu chat của người dùng là: '" + prompt + "'"

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: finalPrompt,
    max_tokens: 100,
  });
  console.log(completion.data.choices[0].text.trim());
  return completion.data.choices[0].text.trim();
}

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const router = express.Router();

router.get('/', async (req, res) => {
  const answer = await runCompletion(req.query.question)
  try {
    const postRep = { answer: answer };
    res.json(postRep);
  } catch (err) {
    console.log(err);
  }
})

app.use('/ask', router);

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));