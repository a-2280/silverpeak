"use client";

export default function Contact({ onClose }) {
  return (
    <div
      className="h-[100dvh] w-screen absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-8 flex justify-center items-center overflow-y-scroll"
      onClick={onClose}
    >
      <form
        action="https://formspree.io/f/mgvnpvoo"
        method="POST"
        className="bg-blue p-[37px] flex flex-col lg:h-full lg:w-full lg:max-h-[760px] lg:max-w-[752px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="!text-white mb-[29px] lg:max-w-[508px] lg:!text-[24px]">
          Have a project you&apos;d like us to take a look at? Let&apos;s talk.
        </h1>
        <div className="flex flex-col gap-[17px] mb-[64px] lg:grid lg:grid-cols-2 lg:gap-x-[55px]">
          <label>
            <p>Name</p>
            <input type="text" name="name" placeholder="John Doe" />
          </label>
          <label>
            <p>Email</p>
            <input type="email" name="email" placeholder="JOHNDOE@GMAIL.COM" />
          </label>
          <label>
            <p>Company Name (If Applicable)</p>
            <input
              type="text"
              name="company"
              placeholder="AWESOME COMPANY, INC."
            />
          </label>
          <label>
            <p>Phone</p>
            <input type="phone" name="phone" placeholder="+1 801 123 4567" />
          </label>
        </div>
        <label className="mb-[44px]">
          <p>How can we help? What services are you interested in?</p>
          <textarea
            name="details"
            id="details"
            placeholder="DETAIL PROJECT INFORMATION HERE"
            onInput={(e) => {
              if (window.innerWidth < 1024) {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }
            }}
            className="lg:h-full lg:!max-h-[279px]"
          ></textarea>
        </label>
        <div className="flex items-center">
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
}
