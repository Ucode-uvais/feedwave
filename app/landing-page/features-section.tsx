import Feature from "./feature";
const features = [
  {
    title: "Seamless Integration",
    description: "Easily integrate with your existing tools and services.",
  },
  {
    title: "Customizable",
    description: "Customize Feedwave to fit your needs and preferences.",
  },
  {
    title: "Analytics",
    description: "Track and analyze feedback to make informed decisions.",
  },
  {
    title: "Secure",
    description: "Your Data is safe and secure with Feedwave.",
  },
  {
    title: "Fast Support",
    description: "Get help when you need it with our fast support team",
  },
  {
    title: "Sclabale",
    description: "Grow your business with Feedwave as you scale.",
  },
];

const FeatureSection = () => {
  return (
    <section className="container mx-auto max-w-screen-xl px-4 my-24 flex items-center flex-col">
      <h2 className="mb-6 text-2xl font-bold">Features</h2>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
