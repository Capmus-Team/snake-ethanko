import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SnakeGame } from "@/components/game/snake-game";

export default function GamePage() {
  return (
    <>
      <Header />
      <main className="flex-1 container py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Play SnakeByte Ethanko
          </h1>
          <p className="mt-4 text-muted-foreground max-w-[700px] mx-auto">
            Use arrow keys to move, space to pause. Collect food to grow your snake!
          </p>
        </div>
        <div className="flex justify-center">
          <SnakeGame />
        </div>
      </main>
      <Footer />
    </>
  );
} 