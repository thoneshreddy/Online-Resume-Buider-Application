export default function GradientPage({ children }) {
  return (
    <div
      className="
        min-h-screen w-full flex items-center justify-center
        bg-animated-gradient
        dark:bg-none
        dark:bg-slate-950
        text-slate-900 dark:text-slate-100
        transition-colors duration-300
      "
    >
      {children}
    </div>
  );
}
