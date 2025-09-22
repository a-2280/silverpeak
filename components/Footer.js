export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex justify-between items-center gap-4 mt-4">
      <p className="text-nowrap">
        +1 (801) 499 5045 / <button className="!no-underline">EMAIL</button>
      </p>
      <p className="text-end w-fit">
        &copy;{currentYear} SILVERPEAK ENGINEERING
      </p>
    </div>
  );
}
