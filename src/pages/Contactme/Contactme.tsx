import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Contactme.css";
import { type RootState } from "../../context/store";
import { Heading, SocialLinks, IconComponent } from "../../components";
import useDeviceType from "../../utility/useDeviceType";

const Contactme = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const deviceType = useDeviceType();

  const contactSection = useSelector(
    (state: RootState) => (state as any).userData.data.contactSection,
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const contactFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    try {
      const response = await fetch("https://formspree.io/f/xojpoeyy", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setStatus("SUCCESS");
        setFormData({
          name: "",
          email: "",
          message: "",
        }); // Clear the form
        setTimeout(() => {
          setStatus("");
        }, 3000);
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      setStatus("ERROR");
    }
  };

  const contactFormComponent = () => {
    return (
      <form onSubmit={(e) => contactFormSubmit(e)}>
        <div className="flex flex-col items-start">
          <label htmlFor="name">Name</label>
          <input
            className="border border-[var(--border-color)] bg-transparent text-[var(--text-color)] transition-colors duration-300 p-2 w-full mb-4"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            required
            autoComplete="false"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="email">Email</label>
          <input
            className="border border-[var(--border-color)] bg-transparent text-[var(--text-color)] transition-colors duration-300 p-2 w-full mb-4"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            required
            autoComplete="false"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="message">Message</label>
          <textarea
            className="border border-[var(--border-color)] bg-transparent text-[var(--text-color)] transition-colors duration-300 p-2 w-full mb-4"
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            required
            autoComplete="false"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <button className="contact-button" type="submit">
          Send Message
        </button>
      </form>
    );
  };

  const contactInfoComponent = () => {
    const { email, mobile } = contactSection.contactDetails;
    return (
      <>
        {deviceType !== "mobile" && (
          <p className="article-paragraph contact-article">
            {contactSection.description}
          </p>
        )}
        <p className="article-paragraph contact-article">
          <IconComponent
            imageSrc="../assets/icons/email.svg"
            imageText="email"
          />
          : {email}
        </p>
        <p className="article-paragraph contact-article">
          <IconComponent
            imageSrc="../assets/icons/phone-call.svg"
            imageText="mobile"
          />
          : {mobile}
        </p>
        <hr className="hr m-2 max-w-full" />
        <SocialLinks showDisplayName={true} section="contact" />
      </>
    );
  };

  return (
    <section
      className="container flex flex-col items-center w-full mx-auto pt-20 md:pt-24 gap-2"
      id="contact"
    >
      <Heading title={contactSection.title} />
      <br />
      {deviceType === "mobile" && (
        <p className="article-paragraph contact-article text-center">
          {contactSection.description}
        </p>
      )}
      <div className="flex flex-col md:flex-row lg:flex mt-5 md:mt-0 md:p-6 py-32 gap-5">
        <div className="contact-form shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-[var(--bg-color)] transition-colors duration-300 rounded-tl-[20px] rounded-br-[20px] p-2 md:p-3 lg:p-5 w-full">
          {contactFormComponent()}
          {status === "SUCCESS" && <p>Message sent successfully!</p>}
          {status === "ERROR" && <p>Oops! There was a problem.</p>}
        </div>
        <div className="p-2 md:p-3 lg:p-5 w-full">{contactInfoComponent()}</div>
      </div>
    </section>
  );
};

export default Contactme;
