import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center">
        <Image
          src="/next.svg"
          alt="App Logo"
          width={150}
          height={150}
          priority
        />
        <h1 className="text-4xl font-bold mt-6">Welcome to the Auth App</h1>
        <p className="mt-4 text-lg text-center">
          This is a simple application for user authentication. Sign up or log in to continue.
        </p>
      </div>
    </main>
  );
}
