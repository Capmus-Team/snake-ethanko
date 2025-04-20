import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Welcome to <span className="text-primary">SnakeByte Ethanko</span>
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                A modern take on the classic Snake game built with Next.js 15, React 19, and Tailwind CSS.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/game">
                  <Button size="lg">Play Now</Button>
                </Link>
                <Button variant="outline" size="lg">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Features
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Explore what makes SnakeByte Ethanko special
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Modern Tech Stack</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Built with the latest technologies including Next.js 15, React 19, and Tailwind CSS.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Responsive Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Play on any device with a fully responsive interface that adapts to your screen size.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Compete with players around the world and see your name on the global leaderboard.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
