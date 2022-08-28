import World from "./World";
import { Wrapper } from "./index.styled.js";
import { useEffect, useRef, useState } from "react";

import toCapitalize from "./../../Utils/toCapitalize";

const wcc = require("world-countries-capitals");

function WorldWrapper() {
  const [selectCountry, setSelectCountry] = useState("");
  const [currentCountry, setCurrentCountry] = useState<String>("");
  const [currentTime, setCurrentTime] = useState<String>("");
  const svgRef = useRef<SVGElement>(null);

  var timezones = require("timezones.json");

  useEffect(() => {
    const timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const capital: string = timezone.split("/")[1];
    const country: string = wcc.getCountryDetailsByCapital(capital)[0].country;
    const countriesPaths: HTMLCollection | undefined =
      svgRef?.current?.children;
    setCurrentCountry(
      country.replace(country.charAt(0), toCapitalize(country))
    );
    if (countriesPaths && countriesPaths.length > 0) {
      const currentCountrySvg: Element | undefined = Array.from(
        countriesPaths
      ).find((path) => path.id === country);
      currentCountrySvg?.classList.add("activeCountry");
    }
    const getTheTime = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // timezones.map((timezone) => console.log(timezone.offset, timezone.text));

    return () => clearInterval(getTheTime);
  }, []);

  return (
    <Wrapper>
      <h1>IP country is: {currentCountry}</h1>
      <h2>Your time is: {currentTime}</h2>
      <World svgRef={svgRef} />
    </Wrapper>
  );
}

export default WorldWrapper;
