import { InferInsertModel } from "drizzle-orm";
import { projects } from "@/db/schema";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SubscribeBtn from "../payments/subscribe-btn";
import { monthlyPlanId } from "@/lib/payments";
import { Lock } from "lucide-react";

type Project = InferInsertModel<typeof projects>;
type Props = {
  projects: Project[];
};
const ProjectList = (props: Props) => {
  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-3 m-5 p-4 gap-4">
        {props.projects.map((project: Project) => (
          <li key={project.id}>
            <Card className="max-w-[350px] flex flex-col h-full">
              <CardHeader className="flex-1">
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>

              <CardFooter>
                <Link href={`/projects/${project.id}`}>
                  <Button>View Project</Button>
                </Link>
              </CardFooter>
            </Card>
          </li>
        ))}
        <Card className="max-w-[350px] flex flex-col h-full bg-gray-300">
          <CardHeader className="flex-1">
            <CardTitle className="flex flex-row text-sm md:text-lg items-center">
              <Lock className="h-4 w-4 md:h-8 md:w-8 mr-2" />
              <span>Upgrade to Premium</span>
            </CardTitle>
            <CardDescription className="mt-3 text-gray-900">
              Unlock Unlimited Projects
            </CardDescription>
          </CardHeader>
          <div className="w-fit mx-auto mb-4">
            <SubscribeBtn price={monthlyPlanId} />
          </div>
        </Card>
      </ul>
    </div>
  );
};

export default ProjectList;
