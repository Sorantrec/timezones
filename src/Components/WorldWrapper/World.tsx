import { MouseEvent } from "react";
import { ReactComponent as WorldSvg } from "../../Static/World.svg";

let Country = require("country-state-city").Country;

export default function World({ svgRef }: any) {
  const countryHover = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.id) return;
    [...svgRef.current.children].forEach((country) => {
      country.classList.remove("hoveredCountry");
    });
    const targetCountryTimezones = Country.getAllCountries().filter(
      (country: any) => country.name.toLowerCase() === target.id.toLowerCase()
    );
    console.log(targetCountryTimezones);
    target.classList.add("hoveredCountry");
  };

  return (
    <section onMouseOver={countryHover}>
      <WorldSvg ref={svgRef} />
    </section>
  );
}
