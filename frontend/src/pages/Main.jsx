import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Happy } from "react-happytext";
import Reveal from "react-reveal/Reveal";
import TextyAnim from "rc-texty";

const Main = () => {
  return (
    <div>
      <div className="Home__center">
        <center>
          <h1 className="Home__h1">
            Welcome to <Happy value="HappyTour" />
          </h1>

          <h3 className="Home__h3">
            <TextyAnim style={{ display: "inline-block" }}>
              Make your Tour Memorable
            </TextyAnim>
          </h3>
        </center>
      </div>
    </div>
  );
};

export default Main;
