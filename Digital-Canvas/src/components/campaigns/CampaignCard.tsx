import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { type Campaign } from "@/lib/campaigns";

interface CampaignCardProps {
  campaign: Campaign;
  onOpen?: (campaign: Campaign, assetIndex: number, trigger?: HTMLElement) => void;
  className?: string;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onOpen, className = "" }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node || isVisible) return;
    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setIsVisible(true);
          obs.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible]);

  const primaryAsset = campaign.assets?.[0];

  const handleOpen = (event: React.MouseEvent<HTMLElement>, assetIndex = 0) => {
    if (!onOpen) return;
    onOpen(campaign, assetIndex, event.currentTarget as HTMLElement);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -8 }}
      className={`group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 ${className}`}
      data-analytics="campaign-card"
    >
      {/* Media Section - Strict Square */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        {primaryAsset ? (
          <button
            type="button"
            onClick={(event) => handleOpen(event, 0)}
            className="group/media absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`View ${campaign.title} media`}
          >
            <Image
              src={primaryAsset.poster ?? primaryAsset.src}
              alt={primaryAsset.alt}
              fill
              sizes="(max-width: 768px) calc(100vw - 3rem), 640px"
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-110"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

            {primaryAsset.type === "video" && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-6 w-6 fill-current ml-1" />
                </span>
              </span>
            )}

            {/* Employer Badge */}
            <span className="absolute left-4 top-4 inline-flex items-center rounded-md bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-900 shadow-sm backdrop-blur-md">
              {campaign.employer}
            </span>
          </button>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            No media available
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold leading-tight text-gray-900 group-hover:text-primary transition-colors duration-300">
            {campaign.title}
          </h3>
          {campaign.summary && (
            <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-3">
              {campaign.summary}
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <button
            type="button"
            onClick={(event) => handleOpen(event, 0)}
            className="w-full rounded-xl bg-[#0f172a] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-primary hover:text-black hover:shadow-lg"
          >
            View Case Study
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CampaignCard;
