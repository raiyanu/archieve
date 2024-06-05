import React from "react";
import styles from "./AboutMe.module.css";
import man from "../assets/man in hoodie.jpg";

function AboutMe() {
  return (
    <section className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={man} alt="" />
      </div>
      <div className={styles.contentContainer}>
        <h2>About Me</h2>
        <p>A self taught web developer with a passion making creation.</p>
        <p>
          I am a full stack web developer with a passion for creating beautiful,
          responsive, and user-friendly websites. I have experience in both
          front-end and back-end development, and I am always eager to learn new
          technologies and improve my skills.
        </p>
        <button>Click here</button>
      </div>
    </section>
  );
}

export default AboutMe;
