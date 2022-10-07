"use strict";
const axios = require("axios");
const fs = require("fs");
const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);

async function fetchDocument() {
  try {
    const response = await axios({
      method: "get",
      url: "http://norvig.com/big.txt",
      responseType: "stream",
    })
    let array = [];
    await pipeline(response.data, fs.createWriteStream('big.txt'));
    fs.readFile("big.txt", "utf8", function (err, data) {
      if (err) console.log(err, "eeeeeee");
      array = data
        .replace(/\n/g, " ")
        .replace(/[[&\/\\#,;+()$~%.'''":*?<>{}0-9]/g, " ")
        .toLowerCase()
        .split(" ");
      const word_occurences = {};
      array.forEach((word) => {
        if (!word_occurences[word]) {
          word_occurences[word] = 1;
        } else {
          word_occurences[word]++;
        }
      });
      const word_occurences_array = [];
      for (const word in word_occurences) {
        word_occurences_array.push({ [word]: word_occurences[word] });
      }
      // console.log(word_occurences_array);
      word_occurences_array.sort((a, b) => {
        const [a_count] = Object.values(a);
        const [b_count] = Object.values(b);
        return b_count - a_count;
      });
      const top_ten_word_list_array = word_occurences_array.splice(0, 10);
      let top_ten_word_list_object = {};
      top_ten_word_list_array.forEach((word_object) => {
        top_ten_word_list_object = {
          ...top_ten_word_list_object,
          ...word_object,
        };
      });
      const top_ten_word_list_json = JSON.stringify(top_ten_word_list_object);
      console.log(top_ten_word_list_json);
    });
  } catch (e) {
    console.log(e);
  }
}

fetchDocument();
