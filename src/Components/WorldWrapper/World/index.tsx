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

  const countryHover = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.id) return;
    [...svgRef.current.children].forEach((country) => {
      country.classList.remove("hoveredCountry");
    });
    const targetCountryTimezones = Country.getAllCountries().filter(
      (country: ICountry) =>
        country.name.toLowerCase() === target.id.toLowerCase()
    );
    setSelectedCountry(targetCountryTimezones);
    target.classList.add("hoveredCountry");
  };

  return (
    <Section onMouseOver={countryHover}>
      <WorldSvg ref={svgRef} />
      <CountryInfo selectedCountry={selectedCountry} />
    </Section>
  );
}
