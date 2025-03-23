export default function PageHeading({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <h1 className="text-2xl md:text-3xl font-semibold">{children}</h1>;
}
