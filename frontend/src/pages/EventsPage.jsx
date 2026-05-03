import React from "react";
import Header from "../components/Layout/Header";
import EventCard from "../components/Events/EventCard";
import Footer from "../components/Layout/Footer";

function EventsPage() {
  return (
    <div>
      <Header activating={4} />
      <EventCard active={true} />
      <Footer />
    </div>
  );
}

export default EventsPage;
