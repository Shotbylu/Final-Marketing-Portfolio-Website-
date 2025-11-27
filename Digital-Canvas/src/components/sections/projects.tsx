'use client';
import { useCallback, useRef, useState } from 'react';
import { CampaignCard, VideoModal } from '@/components/campaigns';
import { campaigns as campaignData, type Campaign } from '@/lib/campaigns';

export function Projects() {
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  const [initialAssetIndex, setInitialAssetIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);


  const openCampaignModal = useCallback((campaign: Campaign, assetIndex: number, trigger: HTMLElement) => {
    setActiveCampaign(campaign);
    setInitialAssetIndex(assetIndex);
    setIsModalOpen(true);
    triggerRef.current = trigger;
  }, []);

  const closeCampaignModal = useCallback(() => {
    setIsModalOpen(false);
    setActiveCampaign(null);
    setInitialAssetIndex(0);
  }, []);

  return (
    <section id="work" className="border-t border-gray-100 bg-white py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-5xl space-y-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Case Studies</span>
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold leading-tight text-black sm:text-4xl lg:text-5xl">Campaign Impact</h2>
            <p className="mx-auto max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              Explore recent work across paid media, CRM, web and integrated communications. Each case study opens directly to
              campaign storytelling, assets, KPIs, and links without extra filtering.
            </p>
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {campaignData.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} onOpen={openCampaignModal} />
          ))}
        </div>
      </div>

      <VideoModal
        campaign={activeCampaign}
        initialAssetIndex={initialAssetIndex}
        isOpen={isModalOpen}
        onClose={closeCampaignModal}
        triggerRef={triggerRef}
      />
    </section>
  );
}
