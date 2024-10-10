import CopyBtn from "@/components/CopyBtn";

const Page = ({
  params,
}: {
  params: {
    projectId: string;
  };
}) => {
  if (!params.projectId) return <div>Invalid Project Id</div>;
  if (!process.env.WIDGET_URL) return <div>Missing WIDGET_URL</div>;
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Start Collecting Feedback</h1>
      <p className="text-lg text-secondary-foreground">
        Embed the code in your site
      </p>
      <pre className="bg-purple-900 p-6 rounded-md mt-6 relative">
        <CopyBtn
          text={`<my-widget project="${params.projectId}"></my-widget>\n<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`}
        />
        <code className="text-white">
          {`<my-widget project-id="${params.projectId}"></my-widget>`}
          <br />
          {`<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`}
        </code>
      </pre>
    </div>
  );
};

export default Page;
