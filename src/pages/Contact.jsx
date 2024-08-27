import React from "react";
import { useState } from "react";
import { FacebookSvg, InstagramSvg, WhatsappSvg } from "../components/Svgs/Svgs";

export default function Contact() {
  const [contactFormData, setContactFormData] = useState({
    contactName: "",
    email: "",
    message: ""
  });

  function handleForm(e) {
    const { name, value } = e.target;
    setContactFormData(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  }
  return (
    <section className="bg-[#ffffff]  grid place-items-center lg:h-[90vh]">
      <div className="w-[88%] items-center flex flex-col justify-around mx-auto rounded-xl md:w-[80%] lg:flex-row lg:w-[1000px] ">
        <div className="rounded-2xl p-4 bg-[#ffffff] shadow-custom flex flex-col justify-between mt-[50px] lg:mt-0 lg:h-[500px] lg:w-[40%] my-[10px]">
          <div className="texts">
            <h2 className="pt-[1em] pb-[0.3em] font-bold">Contact information</h2>
            <p className="font-light">
              Fill up the form and you will receive a response as soon as
              possible
            </p>
            <p className="font-light">Phone: 020199409</p>
          </div>
          <div className="con">
            <div className="contact-box">
              <InstagramSvg width="50px"/>
            </div>
            <div className="contact-box">
              <WhatsappSvg width="50px" />
            </div>
            <div className="contact-box">
              <FacebookSvg width="50px" />
            </div>
          </div>
        </div>
        <div className="w-[90%] md:!w-[80%] lg:!w-[50%]">
          <form
            className="flex flex-col items-center mb-4"
            name="contact"
            method="POST"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="form__group">
              <input
                type="input"
                className="form__field"
                placeholder="Name"
                name="contactName"
                id="name"
                required
                value={contactFormData.name}
                onChange={handleForm}
              />
              <label htmlFor="name" className="form__label">
                Name
              </label>
            </div>
            <div className="form__group">
              <input
                type="email"
                className="form__field"
                placeholder="Email"
                name="email"
                id="email"
                value={contactFormData.email}
                onChange={handleForm}
                required
              />
              <label htmlFor="email" className="form__label">
                Email
              </label>
            </div>
            <div className="form__group">
              <textarea
                className="form__field"
                name="message"
                id="message"
                cols="20"
                rows="3"
                required
                value={contactFormData.message}
                onChange={handleForm}
              />
              <label htmlFor="name" className="form__label">
                Message
              </label>
            </div>
            <div>
              <button type="submit" className="form-submit-btn">
                Submit
              </button>
              <a href="mailto:sammyntewusu1@gmail.com">
                <button type="button" className="form-submit-btn">
                  Direct Email
                </button>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
