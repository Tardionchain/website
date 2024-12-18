import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function Page() {
  return (
    <section className="md:h-[80vh] flex items-center justify-center">
      <Card className="max:w-96 md:w-[50vw] sm:w-[80vw]">
        <CardHeader>
          <CardTitle className="text-3xl">Token Allocation Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="my-4 text-2xl">circulating supply (93.5%)</h2>
          <p>
            fairly launched and available to the world. this ensures wide
            distribution and community ownership from day one.
          </p>
          <h2 className="my-4 text-2xl">team (6.5%)</h2>
          <p className="my-4">
            research, development, and sustaining the project&apos;s operations,
            ensuring continuous innovation and ecosystem growth.
          </p>
          <strong>
            4.5% is completely{" "}
            <a
              className="text-blue-500"
              href="https://app.streamflow.finance/contract/solana/mainnet/94EyjNb18DT3aHQN6XFj9QfsMo9WpDaxXkjpqsHYiNHm"
            >
              locked
            </a>
            . locked for now until January 30th. After unlocking, it will be
            locked again for 1 year.
          </strong>
        </CardContent>
      </Card>
    </section>
  );
}
