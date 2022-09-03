import { useState } from "react";
import { useEffect } from "react";
import { CountryInfoWrapper } from "./index.styled";

interface ITimezone {
  abbreviation: string;
  gmtOffset: number;
  gmtOffsetName: string;
  tzName: string;
  zoneName: string;
}

export default function CountryInfo({ selectedCountry }: any) {
  const [timezones, setTimezones] = useState([]);
  const [noData, setNoData] = useState<string>("");

  useEffect(() => {
    if (selectedCountry[0] && selectedCountry[0].timezones.length > 0) {
      setTimezones(selectedCountry[0].timezones);
      setNoData("");
    } else {
      setTimezones([]);
      setNoData("No data");
    }
  }, [selectedCountry]);

  return (
    <CountryInfoWrapper>
      {noData ? noData : null}
      <>
        {timezones.map((timezone: ITimezone, index: number) => (
          <div key={`${timezone.zoneName + index}`}>
            {timezone.zoneName}: {timezone.gmtOffsetName}
          </div>
        ))}
      </>
    </CountryInfoWrapper>
  );
}
