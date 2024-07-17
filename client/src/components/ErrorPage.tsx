import { Link } from "react-router-dom";
import errorImage from "../assets/404.svg";
import { Button } from "./ui/button";

function ErrorPage() {
  return (
    <section className="min-h-screen min-w-screen flex flex-col gap-4 justify-center items-center">
       <script src="//code.tidio.co/fdylvmddtyb7vzsk5frdt3ncrk6cwobs.js" async></script>
      <img src={errorImage} alt="" className="h-96 animate-pulse" />
      <Link to="/">
        <Button size="lg" variant="secondary">
          Home
        </Button>
      </Link>
    </section>
  );
}

export default ErrorPage;
