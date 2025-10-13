import React, { useEffect } from 'react';
import AOS from 'aos';
import Header from '../components/Header';
import './landing.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import 'animate.css';
import 'aos/dist/aos.css'; // ✅ Important to include AOS styles

function Landing() {
  const nav = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handlePetcards = (category) => {
    sessionStorage.setItem("selectedcategory", category);
    nav("/petcard");
  };

  return (
    <>
      <Header />

      {/* Carousel */}
      <div className='container-fluid mb-4 p-3 carousel-bg'>
        <div className="carousel-wrapper shadow rounded overflow-hidden">
          <Carousel fade interval={1500} controls={false} indicators={true}>
            <Carousel.Item>
              <img
                src="https://marketplace.canva.com/EAGqxo0U274/1/0/1600w/canva-purple-pink-and-brown-playful-pet-food-banner-landscape--1uxvft9NE4.jpg"
                alt="Slide 1"
                className="d-block w-100 carousel-img"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://marketplace.canva.com/EAGgH5fKw8Y/1/0/1600w/canva-blue-and-white-illustrative-pet-store-banner-41alUL79VcQ.jpg"
                alt="Slide 2"
                className="d-block w-100 carousel-img"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://petsnpet.pk/wp-content/uploads/2025/07/Banner-01-Petsnpet-scaled.png"
                alt="Slide 3"
                className="d-block w-100 carousel-img"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      {/* Pet Type Cards */}
      <h3 className='my-5 p-5 text-center animate__animated animate__bounce animate__infinite animate__slower text-primary'>
        Choose Your Pet Type
      </h3>

      <div className='container-fluid d-flex flex-wrap justify-content-center gap-4 my-5'>

        {/* Dogs */}
        <Card
          style={{ width: '17rem', transition: 'transform 0.3s' }}
          className="shadow-sm border-0 rounded-4 overflow-hidden card-hover"
          data-aos="fadeInUp"
        >
          <button onClick={() => handlePetcards("Dog")} className="text-decoration-none border-0">
            <Card.Img
              variant="top"
              src="https://www.shutterstock.com/image-vector/line-art-labrador-retriever-illustration-260nw-2429482253.jpg"
              style={{ maxHeight: '15rem', objectFit: 'cover' }}
              className="rounded-top"
            />
            <Card.Body className="text-center">
              <Card.Title className="fw-bold mb-2">Dogs</Card.Title>
              <Button variant="outline-primary" size="sm">View More</Button>
            </Card.Body>
          </button>
        </Card>

        {/* Cats */}
        <Card
          style={{ width: '17rem', transition: 'transform 0.3s' }}
          className="shadow-sm border-0 rounded-4 overflow-hidden card-hover"
          data-aos="fadeInUp"
        >
          <button onClick={() => handlePetcards("Cat")} className="text-decoration-none border-0">
            <Card.Img
              variant="top"
              src="https://thumbs.dreamstime.com/b/cat-pencil-sketch-12201761.jpg"
              style={{ maxHeight: '15rem', objectFit: 'cover' }}
              className="rounded-top"
            />
            <Card.Body className="text-center">
              <Card.Title className="fw-bold mb-2">Cats</Card.Title>
              <Button variant="outline-primary" size="sm">View More</Button>
            </Card.Body>
          </button>
        </Card>

        {/* Birds */}
        <Card
          style={{ width: '17rem', transition: 'transform 0.3s' }}
          className="shadow-sm border-0 rounded-4 overflow-hidden card-hover"
          data-aos="fadeInUp"
        >
          <button onClick={() => handlePetcards("Bird")} className="text-decoration-none border-0">
            <Card.Img
              variant="top"
              src="https://i.etsystatic.com/23481730/r/il/0c208d/4585494486/il_fullxfull.4585494486_r3e7.jpg"
              style={{ maxHeight: '15rem', objectFit: 'cover' }}
              className="rounded-top"
            />
            <Card.Body className="text-center">
              <Card.Title className="fw-bold mb-2">Birds</Card.Title>
              <Button variant="outline-primary" size="sm">View More</Button>
            </Card.Body>
          </button>
        </Card>

        {/* Fish */}
        <Card
          style={{ width: '17rem', transition: 'transform 0.3s' }}
          className="shadow-sm border-0 rounded-4 overflow-hidden card-hover"
          data-aos="fadeInUp"
        >
          <button onClick={() => handlePetcards("Fish")} className="text-decoration-none border-0">
            <Card.Img
              variant="top"
              src="https://i.pinimg.com/736x/1e/b3/7e/1eb37e3783aba6fdd3eab1fd2f384502.jpg"
              style={{ maxHeight: '15rem', objectFit: 'cover' }}
              className="rounded-top"
            />
            <Card.Body className="text-center">
              <Card.Title className="fw-bold mb-2">Fish</Card.Title>
              <Button variant="outline-primary" size="sm">View More</Button>
            </Card.Body>
          </button>
        </Card>

        {/* Small Mammals */}
        <Card
          style={{ width: '17rem', transition: 'transform 0.3s' }}
          className="shadow-sm border-0 rounded-4 overflow-hidden card-hover"
          data-aos="fadeInUp"
        >
          <button onClick={() => handlePetcards("Small Mammals")} className="text-decoration-none border-0">
            <Card.Img
              variant="top"
              src="https://img.freepik.com/premium-vector/vector-sketch-possum-muzzle-possum-vector-illustration_231873-5437.jpg"
              style={{ maxHeight: '15rem', objectFit: 'cover' }}
              className="rounded-top"
            />
            <Card.Body className="text-center">
              <Card.Title className="fw-bold mb-2">Small Mammals</Card.Title>
              <Button variant="outline-primary" size="sm">View More</Button>
            </Card.Body>
          </button>
        </Card>

      </div>

      {/* Services Section */}
      <h3 className="text-primary my-5 p-5 text-center animate__animated animate__bounce animate__infinite animate__slower">
        Services
      </h3>

      <div className="container d-flex flex-column align-items-center gap-4 mb-5">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 card-custom text-center p-4 shadow-sm rounded-4" data-aos="fade-down-right">
          <Link to="/appointment">
            <img
              src="https://img.freepik.com/premium-photo/veterinarian-dog-are-examining-dog_646443-2346.jpg"
              alt="Pet Appointment"
              className="img-fluid rounded mb-3"
              style={{ width: '100%', height: '280px', objectFit: 'cover' }}
            />
          </Link>
          <h4 className="fw-bold fs-4 text-primary">Pet Appointment</h4>
          <p className="text-muted fs-6">Book appointments for your pet with trusted vets near you.</p>
        </div>

        <div className="col-12 col-sm-10 col-md-8 col-lg-6 card-custom text-center p-4 shadow-sm rounded-4" data-aos="fade-down-left">
          <Link to="/carevideo">
            <img
              src="https://www.shutterstock.com/image-photo/young-smiling-happy-cheerful-owner-600nw-2397244269.jpg"
              alt="Pet Care Tips"
              className="img-fluid rounded mb-3"
              style={{ width: '100%', height: '280px', objectFit: 'cover' }}
            />
          </Link>
          <h4 className="fw-bold fs-4 text-primary">How to Care</h4>
          <p className="text-muted fs-6">Get expert tips and daily care routines for your furry friend.</p>
        </div>
      </div>
    </>
  );
}

export default Landing;
