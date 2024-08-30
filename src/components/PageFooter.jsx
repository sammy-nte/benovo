import {
  EmailSvg,
  FacebookSvg,
  InstagramSvg,
  PhoneSvg,
  WhatsappSvg
} from "./Svgs/Svgs";

function PageFooter() {
  return (
    <div className="relative isolate overflow-hidden mt-32 pt-16 sm:pt-24 lg:pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-textColor sm:text-4xl">
              Subscribe to our newsletter.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-500 font-light">
              Join our newsletter for the latest on new projects and
              completions. Get exclusive updates and insights straight to your
              inbox. Sign up now and stay informed!
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border border-tempColor bg-white/5 px-3.5 py-2 text-textColor shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Subscribe
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-3 lg:pt-2">
            {/* <div className="flex flex-col items-start p-2">
              <dt className="mt-4 font-semibold text-textColor">
                Weekly articles
              </dt>
              <dd className="mt-2 leading-7 text-gray-400">
                Non laboris consequat cupidatat laborum magna. Eiusmod non irure
                cupidatat duis commodo amet.
              </dd>
            </div> */}
            {/* <div className="flex flex-col items-start p-2">
              <h4 className="mt-4 font-semibold text-textColor">No spam</h4>
              <ul className="text-gray-500">
                <li className="underline pb-1 underline-offset-4 cursor-pointer">
                  Terms
                </li>
                <li className="underline pb-1 underline-offset-4 cursor-pointer">
                  Privacy
                </li>
                <li className="underline pb-1 underline-offset-4 cursor-pointer">
                  Legal
                </li>
                <li className="underline pb-1 underline-offset-4 cursor-pointer" />
              </ul>
            </div> */}
            <div className="flex flex-col items-start p-2 w-fit">
              <h4 className="mt-4 font-semibold text-textColor">
                Get in touch
              </h4>
              <div className="w-fit">
                <ul className="text-gray-500">
                  <li className="flex text-lg font-light">
                    <PhoneSvg width="30px" /> +233204223551{" "}
                  </li>
                  <li className="flex text-lg font-light">
                    <EmailSvg width="30px" /> sammyntewusu@gmail.com
                  </li>
                </ul>
              </div>
              <h4 className="mt-4 font-semibold text-textColor">Socials</h4>
              <div className="flex w-[120px] justify-between">
                <FacebookSvg
                  link="https://web.facebook.com/login.php/?_rdc=1&_rdr"
                  width="30px"
                />
                <InstagramSvg link="https://www.instagram.com/" width="35px" />
                <WhatsappSvg link="https://wa.me/0257530839" width="35px" />
              </div>
            </div>
          </dl>
        </div>
      </div>
      <div
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        aria-hidden="true"
      >
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          }}
        />
      </div>
      <p className="text-center mt-12 md:text-xl">&copy; Benevo</p>
    </div>
  );
}

export default PageFooter;
