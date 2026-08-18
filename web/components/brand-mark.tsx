import Image from "next/image";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-label="Logo da Speed Milhas" role="img">
      <Image
        src="/logo_speedmilhas.png"
        alt="Speed Milhas"
        width={56}
        height={56}
        priority
        className="size-14 rounded-2xl"
      />
    </div>
  );
}
