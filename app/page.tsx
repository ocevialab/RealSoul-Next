// import { Carousel } from "./components/carousel";
import DrivenList from "./components/DrivenList";
import FAQSection from "./components/FAQSection";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Location from "./components/Location";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Welcome from "./components/Welcome";

export default function Home() {
  return (
    <div className="m-0 p-0 box-border">
      <Hero />
      <Welcome />
      <Gallery />
      <div className="pointer-events-none inset-x-0 bottom-0 h-[50px]  md:h-[100px] bg-gradient-to-t from-darkGreen/80 to-darkGreen" />
      <Services />
      <div className="pointer-events-none inset-x-0 bottom-0 h-[50px]  md:h-[100px] bg-gradient-to-b from-darkGreen/80 to-darkGreen/95" />
      <DrivenList />
      <div className="pointer-events-none inset-x-0 bottom-0 h-[50px]  md:h-[100px] bg-gradient-to-b from-darkGreen/95 to-darkGreen/30" />
      <Location />
      <div className="pointer-events-none inset-x-0 bottom-0 h-[50px]  md:h-[100px] bg-gradient-to-t from-darkGreen/80 to-darkGreen/30" />
      <Testimonials />
      <div className="pointer-events-none inset-x-0 bottom-0 h-[50px]  md:h-[100px] bg-gradient-to-b from-darkGreen/80 to-darkGreen/95" />
      <FAQSection />
    </div>
  );
}
