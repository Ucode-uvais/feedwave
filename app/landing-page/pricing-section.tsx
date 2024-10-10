import PricingCard from "./pricing-card";

export type PricingPlan = {
  title: string;
  price: number;
  description: string;
  isPopular: boolean;
  features: string[];
  url: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    title: "Free",
    price: 0,
    description: "For Small Teams just getting started.",
    isPopular: false,
    url: "/dashboard",
    features: [
      "3 projects",
      "Unlimited Users",
      "2GB Storage",
      "Priority Support",
    ],
  },
  {
    title: "Monthly",
    price: 120,
    description: "For Growing Teams",
    isPopular: true,
    url: "/payments/subscribe?plan=monthly",
    features: [
      "Unlimited Projects",
      "Unlimited Users",
      "5GB Storage",
      "Priority Support",
    ],
  },
  {
    title: "Yearly",
    price: 520,
    description: "Upgrade to Save More",
    isPopular: false,
    url: "/payments/subscribe?plan=yearly",
    features: [
      "Unlimited Projects",
      "Unlimited Users",
      "50GB Storage",
      "Priority Support",
    ],
  },
];

const PricingSection = () => {
  return (
    <div className="text-center">
      <h1 className="capitalize text-3xl">pricing</h1>
      <h2 className="font-extrabold text-3xl mb-8 pt-3">
        Flexing Pricng to Fit Your Needs
      </h2>
      <div className="mt-10 grid items-center grid-cols-1 gap-3 md:grid-cols-3 max-w-screen-xl">
        {pricingPlans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
