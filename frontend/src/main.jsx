import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51RIvaNPa6tEp78ud2mebrzv0Fkgd5D8uKqo9K1yBu6TbFjUB6oUnqcBboWrlZYl5ZCTXy3UQ7CrQO515vb70eXzK00c5I9N6bM"
);

createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>
);