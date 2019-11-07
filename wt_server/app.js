const express = require("express"),
  app = express(),
  cors = require("cors"),
  request = require("request"),
  cheerio = require("cheerio"),
  bodyParser = require("body-parser"),
  http = require("http").createServer(app);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

http.listen(4000, () => {
  console.log("server on");
});

app.use(cors());

app.post("/", (req, res) => {
  console.log(req.body);

  const url = encodeURI(
    `https://search.naver.com/search.naver?sm=top_hty&fbm=0&ie=utf8&query=${req.body.place}+날씨`
  );
  request(url, (error, response, body) => {
    if (error) throw error;

    const $ = cheerio.load(body);

    const today = $(".today_area .info_list.weather_condition._tabContent");
    const now = $(".today_area .todaytemp").text();

    if (!now) {
      res.status(404).send({ message: "no data" });
      return;
    }

    const current = $(".api_title").text();

    const todayTmp = textToArray(
      today
        .find("li .weather_item._dotWrapper > span")
        .not(".blind")
        .not(".dot_point")
    );
    const todayTime = textToArray(
      today.find(".item_time > span").not(".tomorrow")
    );

    const todayCondition = textToArray(today.find(".item_condition > span"));

    const todayDust = $(".today_area").find(".indicator");

    const dustData = getDust(todayDust);

    const tmiData = textToArray(
      $(".today_area")
        .find(".info_data .info_list")
        .children()
    );

    const todayData = {
      current,
      todayTmp,
      todayTime,
      todayCondition,
      now,
      dustData,
      tmiData
    };

    res.status(200).send(todayData);
  });
});

// 텍스트를 배열로 변형해주는 함수
const textToArray = element => {
  const array = [];

  element.each(idx => {
    array.push(element.eq(idx).text());
  });

  return array;
};

// 미세먼지를 구하는 함수
const getDust = element => {
  const array = [];

  const name = textToArray(element.find("dt"));
  const detail = textToArray(element.find("dd"));
  const status = getLvl(element.find("dd"));

  name.forEach((el, i) => {
    const dustData = {
      name: name[i],
      detail: detail[i],
      status: status[i]
    };

    array.push(dustData);
  });

  return array;
};

//  레벨을 구하는 함수
const getLvl = element => {
  const array = [];

  element.each(idx => {
    array.push(element.eq(idx).attr("class"));
  });

  return array;
};
