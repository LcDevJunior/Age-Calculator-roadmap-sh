import { useState } from "react";
import { DateTime } from "luxon";

interface AgeI {
  days: number;
  months: number;
  years: number;
}

function App() {
  const [birthDate, setBirthDate] = useState("");
  const [yourAge, setYourAge] = useState<AgeI>();

  const calculateAge = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const birth = DateTime.fromISO(birthDate);
    const now = DateTime.now();

    if (!birth.isValid || birth > now) {
      alert("Please enter valid birthdate");
      return;
    }

    const yymmddAge = now.diff(birth, ["years", "months", "days"]).toObject();

    setYourAge({
      years: yymmddAge.years ?? 0,
      months: yymmddAge.months ?? 0,
      days: yymmddAge.days ?? 0,
    });
  };

  function displayAgeStatus(): string {
    const roundedDays = Math.round(yourAge?.days as number);

    console.log(roundedDays);
    const isBornToday =
      roundedDays === 1 && yourAge?.months === 0 && yourAge.years === 0;

    let textStatus = `You are born ${yourAge?.years} years ${yourAge?.months} months ${roundedDays} days`;

    if (isBornToday) {
      textStatus = `You are born today`;
    }

    return textStatus;
  }

  return (
    <>
      <h1 className="font-semibold text-3xl text-center">Age Calculator</h1>
      <form onSubmit={calculateAge} className="mt-8 w-70">
        <p className="mb-1">Enter your birth date:</p>
        <input
          type="date"
          name="date"
          onChange={(e) => setBirthDate(e.target.value)}
          className="border-2 border-slate-600 w-full  px-3 py-2 rounded-md"
        />
        <button
          disabled={!birthDate}
          className="mt-2 bg-sky-400 text-white px-3 py-2 font-semibold rounded-md w-full cursor-pointer hover:bg-sky-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors ease-in"
        >
          Calculate
        </button>

        {yourAge && (
          <p className="mt-4 text-center text-balance text-lg ">
            {displayAgeStatus()}
          </p>
        )}
      </form>
    </>
  );
}

export default App;
