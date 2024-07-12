import axios from "axios";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { Carousel, Container, ExampleCarouselImage, Row, Col } from "react-bootstrap";
import Slider from "react-slick/lib/slider";

export default function FeedBack() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [users, setUsers] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      await axios.get("http://localhost:9999/feedbacks").then((res) => {
        setFeedbacks(res.data.slice(0, 5));
      });
    };

    fetchFeedback();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      await axios.get("http://localhost:9999/users").then((res) => {
        setUsers(res.data);
      });
    };

    fetchUsers();
  }, []);

  const getFeedbackMaker = (feedback) => {
    return users?.find((user) => user.id === feedback.user_id);
  };

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
    return date.toLocaleString("en-US", options);
  }

  const SlideSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const goToNextSlide = () => {
    sliderRef.current.slickNext();
  };

  const goToPrevSlide = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <Container className="text-center">
      <h3 className="mb-5">Feedbacks</h3>
      <Row>
        <Col sm={1} lg={1} md={1} className="d-flex align-items-center">
          <div
            className="bg-light p-2 rounded-circle text-center"
            style={{ width: "50px", height: "50px", cursor: "pointer" }}
            onClick={goToPrevSlide}
          >
            <i className="bi bi-chevron-left fs-4"></i>
          </div>
        </Col>
        <Col sm={10} lg={10} md={10}>
          <Slider ref={sliderRef} {...SlideSettings}>
            {feedbacks?.map((feedback) => (
              <div className="text-center align-items-center" key={feedback.id}>
                <p>"{feedback.content}"</p>
                <div className="d-flex justify-content-center">
                  <img
                    width={50}
                    src={`images/avatars/${getFeedbackMaker(feedback)?.avatar}`}
                    alt="Avatar"
                  ></img>
                </div>
                <h6>{getFeedbackMaker(feedback)?.name}</h6>
                <span>{formatTimestamp(feedback.timestamp)}</span>
              </div>
            ))}
          </Slider>
        </Col>
        <Col sm={1} lg={1} md={1} className="d-flex align-items-center">
          <div
            className="bg-light p-2 rounded-circle text-center"
            style={{ width: "50px", height: "50px", cursor: "pointer" }}
            onClick={goToNextSlide}
          >
            <i className="bi bi-chevron-right fs-4"></i>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
