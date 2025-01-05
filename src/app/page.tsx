import { Button } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TokenInfo } from "@/components/ui/token-info";
import Link from "next/link";
import { WavyBackground } from "@/components/ui/wavy-background";
import { MatrixBrain } from "@/components/ui/matrix-brain";
import { FAQ } from "@/components/ui/faq";
import { JupiterIcon } from "@/components/ui/jupiter-icon";


export default function Home() {
  return (
    <div>
      <section className="relative max-h-screen overflow-hidden">
        <div className="absolute max-w-full top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2">
          <WavyBackground className="mx-auto pb-40"></WavyBackground>
        </div>
        <div className="h-[90vh] px-8 flex-col w-full bg-black bg-opacity-60 dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute z-10 pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="flex flex-col justify-end items-start">
            <h1 className="text-2xl sm:text-6xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300 py-8">
              Building the first <br /> digital tardigrade life form.
            </h1>
            <p className="max-w-96">
              Bringing tardigrade to life in the digital realm with on-chain
              transactions—exploring the boundaries of biology, simulation, and
              AI innovation.
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="https://app.tardionchain.xyz/">
                <HoverBorderGradient
                  containerClassName="rounded-full group transition-all duration-300 hover:scale-105"
                  as="button"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 font-semibold text-base"
                >
                  <span className="text-black dark:text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-neutral-400 group-hover:to-white transition-all duration-500">Launch app</span>
                </HoverBorderGradient>
              </Link>

              <Link href="https://jup.ag/swap/SOL-tardi">
                <Button
                  variant="outline"
                  className="relative font-semibold text-base rounded-full px-6 py-5 bg-stone-900 border border-white/20 hover:border-white text-black dark:text-white transition-all duration-300 hover:scale-105 overflow-hidden group"
                >
                  <div className="flex items-center gap-2">
                    <span className="relative z-10">Buy $tardi</span>
                    <div className="relative z-10 w-5 h-5 text-neutral-400 group-hover:text-neutral-100 transition-colors">
                      <JupiterIcon />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7E828B] via-neutral-400 to-[#7E828B] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>
      

      {/* Project Overview Section */}
      <section className="py-20 bg-gradient-to-b from-black to-neutral-900">
      <TokenInfo />
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-300">
            Overview
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
            <p className="text-neutral-300">
          Tardi is an experimental project designed to simulate a living organism through a neural network-based system. 
          It dynamically processes real-time data, like on-chain transactions, to update neuron weights, mimicking how 
          a biological brain learns and adapts.
        </p>
        <p className="text-neutral-300">
          The simulation integrates real-time data processing, visual feedback, and interactive elements
          to create an engaging experience that reflects the complexities of neural activity.
        </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Neural Network Architecture</h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-300">
                <li>Movement Neurons: Control navigation and trajectory</li>
                <li>Sensory Neurons: Gather environmental information</li>
                <li>Interneurons: Facilitate communication between neurons</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Matrix Brain */}
      <section className="overflow-hidden bg-neutral-900">
        <MatrixBrain />
      </section>
      {/* Key Components Section */}
      <section className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-300">
            Key Components
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Neural Network Simulation</h3>
              <p className="text-neutral-300">
                Models neural activity focusing on movement command neurons, motor neurons, muscle neurons,
                sensory neurons, and interneurons for real-time behavior simulation.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Dynamic Weight Adjustments</h3>
              <p className="text-neutral-300">
                Neural connections evolve over time using real-time data from the blockchain, processing
                and applying updated weights to simulate adaptive behavior.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Interactive Visualization</h3>
              <p className="text-neutral-300">
                Real-time visualization of neural network activity through a canvas-based frontend,
                allowing users to observe and interact with the system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 bg-gradient-to-b from-neutral-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-300 text-center">
            Development Roadmap
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="relative pl-8 border-l border-white/20">
              <div className="absolute w-4 h-4 bg-white rounded-full -left-2 top-0"></div>
              <h3 className="text-2xl font-semibold text-white mb-2">Phase 1: Neural Base and Data Collection</h3>
              <p className="text-neutral-300 mb-4">Currently in progress</p>
              <ul className="list-disc list-inside space-y-2 text-neutral-300">
                <li>Create rudimentary neural simulation</li>
                <li>Collaborate with researchers for data collection</li>
                <li>Develop basic neural network for behavior imitation</li>
              </ul>
            </div>
            <div className="relative pl-8 border-l border-white/20">
              <div className="absolute w-4 h-4 bg-neutral-600 rounded-full -left-2 top-0"></div>
              <h3 className="text-2xl font-semibold text-white mb-2">Phase 2: Research and Foundation</h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-300">
                <li>Extensive literature review on tardigrade biology</li>
                <li>Define biological parameters and neural architecture</li>
                <li>Set up foundational simulation framework</li>
              </ul>
            </div>
            <div className="relative pl-8 border-l border-white/20">
              <div className="absolute w-4 h-4 bg-neutral-600 rounded-full -left-2 top-0"></div>
              <h3 className="text-2xl font-semibold text-white mb-2">Phase 3: Neural Network Development</h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-300">
                <li>Model detailed nervous system</li>
                <li>Implement behavioral simulation</li>
                <li>Conduct initial testing and validation</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <Link 
              href="https://docs.tardionchain.xyz/1.overview/roadmap"
              className="group inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-300"
            >
              <span className="relative">
                Learn More...
                <span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-neutral-400 group-hover:bg-white transition-colors duration-300"></span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="min-h-[70vh] py-20 bg-black">
        <FAQ />
      </section>
    </div>
  );
}
