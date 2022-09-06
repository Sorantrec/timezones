import { MouseEvent, useState } from "react";
import { ReactComponent as WorldSvg } from "../../../Static/World.svg";
import CountryInfo from "../../CountryInfo";
import { Section } from "./index.styled";

let { Country } = require("country-state-city");

interface ICountry {
  isoCode: string;
  name: string;
  phonecode: number;
  flag: string;
  currency: string;
  latitude: number;
  longitude: number;
  timezones: [
    {
      zoneName: string;
      gmtOffset: number;
      gmtOffsetName: string;
      abbreviation: string;
      tzName: string;
    }
  ];
}

export default function World({ svgRef }: any) {
  const [selectedCountry, setSelectedCountry] = useState([]);

  const gainTargetCountry = (currentTargetCountry: HTMLElement) => {
    const country = Country.getAllCountries().filter(
      (country: ICountry) =>
        country.name.toLowerCase() === currentTargetCountry.id.toLowerCase()
    );
    return country;
  };

  const countryHover = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const targetParentElement = target.parentElement as HTMLElement;
    if (!target.id) return;

    [...svgRef.current.children].forEach((country) => {
      country.classList.remove("hoveredCountry");
    });

    const targetCountryTimezones = gainTargetCountry(target);
    const targetCountryGroupTimezone = gainTargetCountry(targetParentElement);

    if (targetParentElement?.tagName === "g") {
      setSelectedCountry(targetCountryGroupTimezone);
      targetParentElement.classList.add("hoveredCountry");
    } else {
      setSelectedCountry(targetCountryTimezones);
      target.classList.add("hoveredCountry");
    }
  };

  return (
    <Section onMouseOver={countryHover}>
      <WorldSvg ref={svgRef} />
      <CountryInfo selectedCountry={selectedCountry} />
    </Section>
  );
}
