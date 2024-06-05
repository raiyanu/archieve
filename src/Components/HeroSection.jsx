import React from "react";
import styles from "./heroSection.module.css";
import heroImage from "../assets/proud.svg";
import {
  ArrowLongRightIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/16/solid";

const HeroSection = () => {
  return (
    <section className={styles.container}>
      <div className={styles.introText}>
        <h1>
          <span>Raiyan,</span> Unveiling Creativity in Action - Transforming
          Ideas into
        </h1>
        <p className={styles.underlineOnHover}>
          {/* This portfolio is a glimpse into the world where I bring ideas to
          life. I combine my passion for design with the power of code to craft
          engaging and user-friendly web experiences. Explore my projects to see
          how I translate innovative concepts into functional and visually
          stunning realities. */}
          I'm passionate about crafting beautiful and intuitive web experiences.
          I bridge the gap between creativity and functionality, transforming
          ideas into interactive realities. Explore my portfolio to see my
          skills in action.
        </p>
        <div className={styles.introAction}>
          <button>Sign Up</button>
          <button>
            <QuestionMarkCircleIcon className={styles.QuestionMarkCircleIcon} />
            <u>
              Wanna know more...?
              <ArrowLongRightIcon className={styles.ArrowRight} />
            </u>
          </button>
        </div>
      </div>
      <div className={styles.heroImage}>
        <img src={heroImage} alt="heroImage" />
      </div>
    </section>
  );
};

export default HeroSection;
