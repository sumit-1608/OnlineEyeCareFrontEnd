export default function AuthFooter(props) {
  return (
    <div className="mt-2 flex flex-col items-center">
      <span className="font-bold text-black hover:text-green-400 ">
        Contact Us
      </span>

      <footer className="mt-4 flex gap-6 text-black">
        <a
          href="https://instagram.com/sumeet_jain7?igshid=YmMyMTA2M2Y="
          target={'_blank'}
          rel="noopener noopener noreferrer"
        >
          <img src="/instagram.png" alt="" className="h-10 w-10" />
        </a>

        <a
          href="https://twitter.com/sumeet_jain7?lang=en"
          target={'_blank'}
          rel="noopener noopener noreferrer"
        >
          <img src="/twitter.png" alt="" className="h-10 w-10" />
        </a>

        <a
          href="https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin"
          target={'_blank'}
          rel="noopener noopener noreferrer"
        >
          <img src="/gmail.png" alt="" className="h-10 w-10" />
        </a>
      </footer>

      <p className="mt-4  text-black  font-bold">
        Helpline:- +91 9850032807
      </p>

      <p className="font-bold text-black ">
        Email:- jainsumeet77@gmail.com
      </p>
    </div>
  );
}
