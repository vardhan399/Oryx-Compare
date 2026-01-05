import Input, { InputProps } from "./Input";

export default function AmountInput(props: InputProps) {
  return (
    <div
      className="
        bg-slate-800/70 text-white text-xl px-6 py-3 rounded-xl
        border border-white/10
        shadow-lg shadow-black/30
        hover:border-purple-400/50
        hover:shadow-purple-500/20
        transition-all duration-200
      "
    >
      <Input
        placeholder="Amount"
        className="border-0 w-24 pl-4 bg-transparent text-2xl outline-none"
        value={props.value}
        onChange={props.onChange}
      />
      <span className="text-white/50 px-4">USD</span>
    </div>
  );
}
