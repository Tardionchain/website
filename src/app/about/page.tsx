import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <section className="md:h-[80vh] items-center flex justify-center">
      <Card className="md:w-[80vw]">
        <CardHeader>
          <CardTitle className="text-3xl">About Tardionchain</CardTitle>
          <CardDescription>
            Building the first digital tardigrade life form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="w-96">
            Tardionchain is a groundbreaking project at the convergence of
            biological research, neural simulation, artificial intelligence, and
            blockchain technology
          </p>
          <section className="mt-4">
            <h2 className="text-2xl font-bold">Our Approach</h2>
            <div className="my-4">
              <h3 className="font-bold text-lg">Biological Research</h3>
              <ul>
                <li>
                  - Tardionchain conducts <strong>original research</strong>{" "}
                  into the neural system of tardigrades, mapping and
                  understanding their <strong>200-neuron connectome</strong>.
                </li>
                <li>
                  - We explore how tardigrades process stimuli, adapt, and
                  survive in extreme environments.
                </li>
              </ul>
            </div>

            <div className="my-4">
              <h3 className="font-bold text-lg">Neural Simulation</h3>
              <ul>
                <li>
                  - Inspired by existing research, we simulate the{" "}
                  <strong>Biological Neural Core</strong> digitally.
                </li>
                <li>
                  - The simulations combine{" "}
                  <strong>artificial intelligence</strong> and biologically
                  accurate neural structures to replicate tardigrade behaviors
                  and decision-making processes.
                </li>
              </ul>
            </div>

            <div className="my-4">
              <h3 className="font-bold text-lg">Blockchain Integration</h3>
              <ul>
                <li>
                  - Tardionchain ensures these neural simulations are{" "}
                  <strong>verifiable</strong> by running computations both on
                  secure computing systems and on the blockchain.
                </li>
                <li>
                  - This allows for <strong>transparent</strong>,{" "}
                  <strong>immutable</strong>, and{" "}
                  <strong>trusted execution</strong> of neural behaviors—forever
                  on-chain.
                </li>
              </ul>
            </div>
          </section>
        </CardContent>
      </Card>
    </section>
  );
}
