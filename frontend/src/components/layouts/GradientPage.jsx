export default function GradientPage({ children }) {
  return (
    <div className="min-h-screen w-full bg-animated-gradient flex items-center justify-center">
      {children}
    </div>
  );
}
