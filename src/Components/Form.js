import React, { Component } from "react";
// require("dotenv").config();
let persistData = JSON.parse(localStorage.getItem("token"));

class Form extends Component {
  state = {
    prompt: "",
    result: "",
    dataArray: [],
  };

  handleSubmit = (event) => {
    this.setState({
      prompt: event.target.responseText.value,
    });

    event.preventDefault();

    const data = {
      prompt: event.target.responseText.value,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        let newArr = this.state.dataArray;
        let resObj = {
          prompt: event.target.responseText.value,
          response: result.choices[0].text,
        };
        newArr.unshift(resObj);

        this.setState({
          prompt: event.target.responseText.value,
          result: result.choices[0].text,
        });

        localStorage.setItem("token", JSON.stringify(this.state.dataArray));

        event.target.reset();
      });
  };
  render() {
    return (
      <div>
        <h1>FUN WITH AI</h1>
        <form onSubmit={this.handleSubmit}>
          <p className="prompt">Enter Prompt</p>
          <textarea
            name="responseText"
            placeholder="Enter a prompt to get a response... E.g Tell me a love Poem "
          ></textarea>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>

        <h2>Responses</h2>
        {persistData
          ? persistData.map((data, index) => {
              return (
                <article key={index}>
                  <h4>Prompt: </h4>
                  <p>{data.prompt}</p>
                  <h4> Response:</h4>
                  <p className="text">{data.response}</p>
                </article>
              );
            })
          : this.state.dataArray.map((data, index) => {
              return (
                <article key={index}>
                  <h4>Prompt: </h4>
                  <p>{data.prompt}</p>
                  <h4> Response:</h4>
                  <p className="text">{data.response}</p>
                </article>
              );
            })}
      </div>
    );
  }
}

export default Form;
