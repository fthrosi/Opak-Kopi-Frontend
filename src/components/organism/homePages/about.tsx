import AboutImage from "../../molecules/about/aboutImage";
import AboutText from "../../molecules/about/aboutText";
import Pages from "@/components/atoms/page";
export default function About() {
  return (
    <Pages className="md:flex-row">
      <div className="flex items-center">
        <AboutText />
      </div>
      <AboutImage />
    </Pages>
  );
}
