import React from "react";
import Hero from "../Components/Hero";
import Banner from "../Components/Banner";
import { Link } from "react-router-dom";

function ErrorComp() {
  return (
    <Hero>
      <Banner title="404" subtitle="page not found">
        <Link to="/" className="btn-primary">
          Retun Home
        </Link>
      </Banner>
    </Hero>
  );
}

export default ErrorComp;
