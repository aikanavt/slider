import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
function App() {
  const [people, setPeople] = useState(data);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (value < 0) {
      setValue(lastIndex);
    }
    if (value > lastIndex) {
      setValue(0);
    }
  }, [value, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setValue(value + 1);
    }, 3000);
    return () => clearInterval(slider);
  }, [value]);

  return (
    <main>
      <section className="section">
        <div className="title">
          <h2>
            <span>/</span>Reviews
          </h2>
        </div>
        <div className="section-center">
          {people.map((person, index) => {
            const { id, image, name, title, quote } = person;
            let position = "nextSlide";
            if (index === value) {
              position = "activeSlide";
            }
            if (
              index === value - 1 ||
              (value === 0 && index === people.length - 1)
            ) {
              position = "lastSlide";
            }
            return (
              <article className={position} key={id}>
                <img src={image} alt={title} className="person-img" />
                <h4>{name}</h4>
                <h5 className="title">{title}</h5>
                <p className="text">{quote}</p>
                <FaQuoteRight className="icon" />
              </article>
            );
          })}

          <button onClick={() => setValue(value - 1)} className="prev">
            <FiChevronLeft />
          </button>
          <button onClick={() => setValue(value + 1)} className="next">
            <FiChevronRight />
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
