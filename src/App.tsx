import axios from "axios";
import { useEffect, useState } from "react";
import AmountInput from "./AmountInput";
import LoadingSkeleton from "./LoadingSkeleton";
import ResultRow from "./ResultRow";
import { sortBy } from "lodash";
import useDebouncedEffect from "use-debounced-effect";

type CachedResult = {
  provider: string;
  btc: string;
};

type OfferResults = { [keys: string]: string };

const defaultAmount = "100";

function App() {
  const [prevAmount, setPrevAmount] = useState(defaultAmount);
  const [amount, setAmount] = useState(defaultAmount);

  // ✅ FIX: removed unused setter
  const [cachedResults] = useState<CachedResult[]>([]);

  const [offerResults, setOfferResults] = useState<OfferResults>({});
  const [loading, setLoading] = useState(true);

  // No cache for now
  useEffect(() => {
    setLoading(false);
  }, []);

  useDebouncedEffect(() => {
    if (amount === defaultAmount) return;
    if (amount !== prevAmount) {
      setLoading(true);

      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/offers`, {
          amount: Number(amount),
        })
        .then((res) => {
          setOfferResults(res.data);
          setPrevAmount(amount);
          setLoading(false);
        });
    }
  }, 300, [amount]);

  const sortedCache: CachedResult[] = sortBy(cachedResults, "btc").reverse();

  const sortedResults: CachedResult[] = sortBy(
    Object.keys(offerResults).map((provider) => ({
      provider,
      btc: offerResults[provider],
    })),
    "btc"
  ).reverse();

  const showCached = amount === defaultAmount;
  const rows = showCached ? sortedCache : sortedResults;

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1
        className="
          uppercase text-6xl text-center
          font-extrabold tracking-wide
          bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400
          bg-clip-text text-transparent
          drop-shadow-[0_0_12px_rgba(56,189,248,0.25)]
        "
      >
        Find Cheapest BTC
      </h1>

      <div className="flex justify-center mt-6">
        <AmountInput
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="mt-6">
        {loading && <LoadingSkeleton />}

        {!loading &&
          rows.map((result, index) => (
            <ResultRow
              key={result.provider}
              providerName={result.provider}
              btc={result.btc}
              isBest={index === 0}
            />
          ))}
      </div>
    </main>
  );
}

export default App;
