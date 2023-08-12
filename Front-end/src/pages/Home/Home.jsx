import "./Home.css";

import { Link, useNavigate } from "react-router-dom";

import FAQSection from "./../../components/FAQSection/FAQSection.jsx";

import faqData from "./../../assets/json-data/faqData.json";

import services_menu from "./../../assets/json-data/services_menu.json";
import heroImage from "./../../assets/Images/doctor-hero.svg";
import waveImg from "./../../assets/Images/wave.svg";
import gif from "./../../assets/Images/doctor-application.gif";
import Chat from "../../components/Chat/Chat";
import { useEffect, useState } from "react";
import Review from "../../components/Review/Review";

// Three js import
import { Canvas } from "@react-three/fiber";
import Earth from "../../components/Earth.jsx";
// import Brain from "../../components/Brain";

const Home = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);
  useEffect(() => {
    const appointmentId = localStorage.getItem("doctorAI_pop_up");
    if (appointmentId) {
      setAppointmentId(appointmentId);
      setIsPopupOpen(true);
    }
  }, []);

  const closePopup = () => {
    setIsPopupOpen(false);
    localStorage.removeItem("doctorAI_pop_up");
  };

  const navigateTo = (url) => {
    navigate(url);
  };

  return (
    <>
      {isPopupOpen && (
        <Review onClose={closePopup} appointmentId={appointmentId} />
      )}
      <div className="home">
        {/* Top Body */}
        <section className="home_main gradient-bg-welcome">
          <div className="home_main_three">
            <Canvas
              className="home_main_canvas"
              style={{ position: "absolute", zIndex: "1" }}
            >
              <ambientLight intensity={0.5} />
              <Earth />
              {/* <Brain /> */}
              <directionalLight position={[-45, 20, 20]} intensity={1} />
            </Canvas>
            <div className="home_main__container">
              <div className="home_main__container__left">
                <div className="home_main__container__left__social">
                  <a>
                    <span>F</span>
                    <span>A</span>
                    <span>C</span>
                    <span>E</span>
                    <span>B</span>
                    <span>O</span>
                    <span>O</span>
                    <span>K</span>
                  </a>
                </div>
                <div className="home_main__container__left__social">
                  <a>
                    <span>I</span>
                    <span>N</span>
                    <span>S</span>
                    <span>T</span>
                    <span>I</span>
                    <span>G</span>
                    <span>R</span>
                    <span>A</span>
                    <span>M</span>
                  </a>
                </div>
                <div className="home_main__container__left__social">
                  <a>
                    <span>T</span>
                    <span>W</span>
                    <span>I</span>
                    <span>T</span>
                    <span>T</span>
                    <span>E</span>
                  </a>
                </div>
              </div>
              <div className="home_main__container__middle">
                <div className="home_main__container__middle__top">
                  <p>Mental Health</p>
                </div>
                <div className="home_main__container__middle__hero">
                  <h1>
                    Discovering
                    <br />
                    Bright Minds
                    <br />
                    Learn Together
                  </h1>
                </div>
                <div className="home_main__container__middle__bottom">
                  <p>
                    Taking care of your mental health is just as important as
                    taking care of your physical health.
                    <br />
                    Here are some tips to help you improve your mental health.
                  </p>
                </div>
              </div>
              <div className="home_main__container__right">
                <div className="home_main__container__right_top">
                  <strong>Dyslexics</strong> have a great ability to sense,
                  <br /> understand, and respond to
                  <br /> how people feel.
                </div>
                <div className="home_main__container__right_bottom">
                  <p className="home_main__container__right_bottom_number">
                    200k
                  </p>
                  <p>Children suffering from dyslexia</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <div className="topBody_container">zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
          <div className="topBody">
            <img src={heroImage} alt="" />
            <div className="hero-text">
              <h1>Empowering Healthcare through Artificial Intelligence</h1>
              <p>
                Detect. Connect. Heal. Seamlessly schedule doctor meetings after
                disease detection, unlocking your path to optimal health.
              </p>
              <Link type="button" to="/appointment" className="appointment-btn">
                Make Appointment
              </Link>
            </div>
          </div>
          <img className="wave-img" src={waveImg} alt="" />
        </div> */}
        {/* Models Section */}
        <div className="modelSection">
          {/* Models */}
          <div>
            <p>
              <span>Health At Your FingerTips.</span> <br /> Check your health
              with our latest AI Technology
            </p>
            <img src={gif} className="gifimg" />
          </div>
          <div className="models">
            {services_menu.items.map((item, index) => {
              if (index !== services_menu.items.length - 1) {
                return (
                  <button
                    key={index}
                    className="CtScan"
                    onClick={() => navigateTo(item.url)}
                  >
                    <img src={item.src} />
                    <p>{item.title}</p>
                  </button>
                );
              }
            })}
          </div>
        </div>
        <hr />
        <div className="chat_container">
          <Chat />
        </div>
        <div className="bottomBody">
          {/* About */}
          <div className="faq">
            <h1>Have a question ?</h1>
            <FAQSection faqData={faqData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
