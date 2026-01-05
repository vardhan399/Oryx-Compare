import paybisLogo from "./assets/paybis.webp";

type ResultRowProps = {
  loading?: boolean;
  providerName?: string;
  btc?: string;
  isBest?: boolean;
};

type Logo = {
  source: string;
  invert?: boolean;
};

const logos: { [keys: string]: Logo } = {
  paybis: { source: paybisLogo, invert: true },
  guardarian: { source: "https://guardarian.com/main-logo.svg" },
  moonpay: { source: "https://www.moonpay.com/assets/logo-full-white.svg" },
  transak: {
    source: "https://assets.transak.com/images/website/transak-logo-white.svg",
  },
};

export default function ResultRow({
  loading,
  providerName,
  btc,
  isBest,
}: ResultRowProps) {
  let url = `http://${providerName}.com`;
  if (providerName === "guardian") {
    url += "/buy-btc";
  }

  return (
    <a
      href={url}
      target="_blank"
      className={`
        block relative min-h-[64px] rounded-lg p-4 my-3 overflow-hidden
        border transition-all duration-200
        ${
          isBest
            ? "border-purple-400 ring-2 ring-purple-400/50 bg-gradient-to-r from-purple-600/35 to-blue-500/30 scale-[1.02]"
            : "border-white/10 bg-gradient-to-r from-purple-500/10 to-blue-500/10"
        }
      `}
    >
      {/* BEST badge */}
      {isBest && (
        <span className="absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full bg-purple-500/80 text-white">
          BEST
        </span>
      )}

      <div className="flex gap-4 items-center">
        {providerName && (
          <div className="grow flex items-center">
            <img
              src={logos[providerName].source}
              className={
                "h-8 " + (logos[providerName]?.invert ? "invert" : "")
              }
              alt=""
            />
          </div>
        )}

        {btc && (
          <div className="flex gap-2 items-center">
            <span className="text-xl text-purple-100 font-medium">
              {new Intl.NumberFormat("sv-SE", {
                minimumFractionDigits: 8,
              }).format(parseFloat(btc))}
            </span>
            <span className="text-xl text-purple-300/60">BTC</span>
          </div>
        )}
      </div>

      {loading && (
        <div className="inset-0 absolute bg-gradient-to-r from-transparent via-blue-800/50 to-transparent skeleton-animation border-t border-white/25" />
      )}
    </a>
  );
}
