export default function CountrySelect({ country, setCountry }) {
  const countries = [
    { name: "India", code: "+91" },
    { name: "United States", code: "+1" },
    { name: "United Kingdom", code: "+44" },
    { name: "Canada", code: "+1" },
    { name: "Australia", code: "+61" },
  ];

  return (
    <select
      className="border rounded px-2 py-2"
      value={country}
      onChange={(e) => setCountry(e.target.value)}
    >
      {countries.map((c) => (
        <option key={c.code} value={c.code}>
          {c.name} ({c.code})
        </option>
      ))}
    </select>
  );
}
