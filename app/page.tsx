import Hero from "./components/Hero";
import Welcome from "./components/Welcome";

export default function Home() {
  return (
    <div className="m-0 p-0 box-border">
      <Hero />
      <Welcome />
    </div>
  );
}
