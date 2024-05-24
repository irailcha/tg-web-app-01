import React, { useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import Button from "../Button/Button";

const Form = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [subject, setSubject] = useState("physical");
  const { tg } = useTelegram();

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Send",
    });
  }, []);

  useEffect(() => {
    if (!country || !street) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };
  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  return (
    <div>
      <form className="form">
        <label className="form-label" htmlFor="name">
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
        <input
          type="text"
          id="country"
          name="country"
          className={"input"}
          placeholder="Country"
          value={country}
          onChange={onChangeCountry}
        />
        <input
          type="text"
          id="street"
          name="street"
          className={"input"}
          placeholder="Street"
          value={street}
          onChange={onChangeStreet}
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
