import Image from 'next/image';
import { Button } from '@/components/ui/button';

type PortfolioItemProps = {
  title: string;
  category: string;
  image: string;
  description: string;
  imageHint: string;
};

export function PortfolioItem({
  title,
  category,
  image,
  description,
  imageHint
}: PortfolioItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group flex flex-col h-full border border-gray-200/80">
      <div className="aspect-[16/10] w-full overflow-hidden bg-gray-200 relative">
        <Image
          src={image}
          alt={title}
          width={800}
          height={500}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          data-ai-hint={imageHint}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-black/50 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-sm backdrop-blur-sm">
            {category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-black mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
          {description}
        </p>
        <Button asChild variant="outline" className="w-full mt-auto border-gray-300 hover:bg-black hover:text-white hover:border-black">
            <a href="#">
                View Case Study
            </a>
        </Button>
      </div>
    </div>
  );
}
