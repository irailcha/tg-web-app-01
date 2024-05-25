import React, { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import Button from "../Button/Button";

const Form = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [subject, setSubject] = useState("physical");
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      name,
      country,
      city,
      subject,
    };
    tg.sendData(JSON.stringify(data));
  }, [name, country, city, subject, tg]);

  useEffect(() => {
    Telegram.WebApp.onEvent("mainButtonClicked", onSendData);

    return () => {
      Telegram.WebApp.offEvent("mainButtonClicked", onSendData);
    };
  }, []);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Send",
    });
  }, [tg]);

  useEffect(() => {
    if (!country || !city) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, city]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };
  const onChangeCity = (e) => {
    setCity(e.target.value);
  };

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSendData();
  };

  return (
    <div className="form-container">
      <h1>Enter your details</h1>
      <form className="form" onSubmit={onSubmit}>
        <label className="label" htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={"input"}
          placeholder="Name"
          value={name}
          onChange={onChangeName}
        />
        <label className="label" htmlFor="name">
          Country:
        </label>
        <input
          type="text"
          id="country"
          name="country"
          className={"input"}
          placeholder="Ukraine"
          value={country}
          onChange={onChangeCountry}
        />
        <label className="label" htmlFor="name">
          City:
        </label>
        <input
          type="text"
          id="city"
          name="city"
          className={"input"}
          placeholder="Dnipro"
          value={city}
          onChange={onChangeCity}
        />

        <label className={"label"} htmlFor="options">
          Options:
        </label>
        <select value={subject} className="select" onChange={onChangeSubject}>
          <option value="physical">physical</option>
          <option value="legal">legal</option>
        </select>

        <Button type="submit" className={"button"}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Form;
