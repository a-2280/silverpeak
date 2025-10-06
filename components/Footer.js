export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full fixed bottom-0 left-0 flex justify-between items-center py-[19px] px-[28px] bg-white flex-wrap z-10">
      <p className="text-nowrap">
        +1 (801) 499 5045 / <button className="!no-underline">EMAIL</button>
      </p>
      <p className="text-end w-fit text-nowrap">
        &copy;{currentYear} SILVERPEAK ENGINEERING
      </p>
    </div>
  );
}
