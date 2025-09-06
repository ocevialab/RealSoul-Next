import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Welcome from "./components/Welcome";

export default function Home() {
  return (
    <div className="m-0 p-0 box-border">
      <Hero />
      <Welcome />
      <Gallery />
      <div className="pointer-events-none inset-x-0 bottom-0 h-[50px]  md:h-[100px] bg-gradient-to-t from-darkGreen/80 to-darkGreen" />
      <Services />
    </div>
  );
}
