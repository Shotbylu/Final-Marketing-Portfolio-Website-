'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Campaign } from '@/lib/campaigns';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

interface VideoModalProps {
  campaign: Campaign | null;
  initialAssetIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ campaign, initialAssetIndex, isOpen, onClose }: VideoModalProps) {
  const [activeIndex, setActiveIndex] = useState(initialAssetIndex);
  const hasMultipleAssets = (campaign?.assets?.length || 0) > 1;

  useEffect(() => {
    setActiveIndex(initialAssetIndex);
  }, [initialAssetIndex, campaign]);

  const activeAsset = useMemo(() => campaign?.assets[activeIndex], [campaign, activeIndex]);

  const handlePrev = useCallback(() => {
    if (!campaign) return;
    setActiveIndex((prev) => (prev - 1 + campaign.assets.length) % campaign.assets.length);
  }, [campaign]);

  const handleNext = useCallback(() => {
    if (!campaign) return;
    setActiveIndex((prev) => (prev + 1) % campaign.assets.length);
  }, [campaign]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      }
      if (event.key === 'ArrowLeft') {
        handlePrev();
      }
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <DialogContent className="h-screen w-screen max-w-none overflow-hidden p-0 sm:h-[90vh] sm:w-[calc(100vw-2rem)] sm:max-h-[calc(100vh-2rem)] sm:rounded-2xl">
        {campaign && activeAsset && (
          <div className="grid h-full w-full min-h-0 lg:grid-cols-[1.1fr_1fr]">
            <div className="relative flex h-full min-h-0 flex-col bg-black">
              <div className="relative flex-1">
                {activeAsset.type === 'image' ? (
                  <Image
                    src={activeAsset.src}
                    alt={activeAsset.alt}
                    width={activeAsset.width}
                    height={activeAsset.height}
                    className="h-full w-full bg-black object-contain"
                    loading="lazy"
                  />
                ) : (
                  <video
                    key={activeAsset.src}
                    poster={activeAsset.poster}
                    controls
                    playsInline
                    className="h-full w-full bg-black object-contain"
                    preload="metadata"
                  >
                    <source src={activeAsset.src} type="video/mp4" />
                  </video>
                )}

                <div className="absolute left-0 right-0 top-0 flex items-start justify-between bg-gradient-to-b from-black/60 to-transparent px-4 py-3 md:px-6">
                  <div className="flex flex-wrap gap-2 text-xs text-white/90">
                    {campaign.channels.map((channel) => (
                      <Badge key={channel} variant="secondary" className="bg-white/20 text-white">
                        {channel}
                      </Badge>
                    ))}
                  </div>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs text-white">Use arrows or dots to navigate</span>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-black/40 px-4 py-4 backdrop-blur-sm md:px-6">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handlePrev}
                  aria-label="Previous asset"
                  disabled={!hasMultipleAssets}
                  className="border-white/30 bg-white/20 text-white hover:bg-white/30 disabled:cursor-not-allowed disabled:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>

                <div className="flex flex-1 items-center justify-center overflow-x-auto px-2" aria-label="Asset navigation dots">
                  <div className="flex items-center gap-2 pb-1">
                    {campaign.assets.map((asset, index) => (
                      <button
                        key={asset.src}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-2 w-2 shrink-0 rounded-full transition ${
                          index === activeIndex
                            ? 'bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.25)]'
                            : 'bg-white/50 hover:bg-white'
                        }`}
                        aria-label={`View asset ${index + 1}`}
                        aria-current={index === activeIndex}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleNext}
                  aria-label="Next asset"
                  disabled={!hasMultipleAssets}
                  className="border-white/30 bg-white/20 text-white hover:bg-white/30 disabled:cursor-not-allowed disabled:bg-white/10"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex h-full min-h-0 flex-col bg-white">
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-6 p-6 pb-10">
                  <DialogHeader className="space-y-3">
                    <DialogTitle className="text-3xl font-semibold leading-tight">{campaign.title}</DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground">
                      {campaign.summary}
                    </DialogDescription>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="border-gray-200 text-gray-700">
                        {campaign.role}
                      </Badge>
                      <Badge variant="outline" className="border-gray-200 text-gray-700">
                        {campaign.employer}
                      </Badge>
                      <Badge variant="outline" className="border-gray-200 text-gray-700">
                        {campaign.period}
                      </Badge>
                    </div>
                  </DialogHeader>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Responsibilities
                    </h4>
                    <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                      {campaign.responsibilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">KPIs</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                      {campaign.kpis.map((kpi) => (
                        <div key={kpi.label} className="rounded-md border border-gray-200 bg-gray-50 p-3">
                          <p className="text-xs text-muted-foreground">{kpi.label}</p>
                          <p className="text-lg font-semibold text-foreground">{kpi.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Tech & Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {campaign.tech.map((item) => (
                        <Badge key={item} variant="outline" className="border-gray-200 text-gray-700">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {(campaign.highlights?.length || campaign.industries?.length) && (
                    <div className="grid gap-4 border-t border-gray-100 pt-4">
                      {campaign.highlights?.length ? (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Highlights</h4>
                          <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                            {campaign.highlights.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {campaign.industries?.length ? (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Industries</h4>
                          <div className="flex flex-wrap gap-2">
                            {campaign.industries.map((industry) => (
                              <Badge key={industry} variant="secondary" className="bg-gray-100 text-gray-800">
                                {industry}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Assets</h4>
                    <ScrollArea className="h-36 rounded-md border border-gray-200">
                      <div className="flex gap-3 p-3">
                        {campaign.assets.map((asset, index) => (
                          <button
                            key={asset.src}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            className={`relative h-24 w-20 overflow-hidden rounded-md border transition ${
                              index === activeIndex
                                ? 'border-primary ring-2 ring-primary/50'
                                : 'border-transparent hover:border-gray-300'
                            }`}
                            aria-label={`Open asset ${index + 1}`}
                          >
                            {asset.type === 'image' ? (
                              <Image
                                src={asset.src}
                                alt={asset.alt}
                                width={asset.width}
                                height={asset.height}
                                className="h-full w-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <video
                                poster={asset.poster}
                                className="h-full w-full object-cover"
                                muted
                                playsInline
                                preload="metadata"
                              >
                                <source src={asset.src} type="video/mp4" />
                              </video>
                            )}
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-3">
                    {campaign.caseStudyUrl && (
                      <Button asChild variant="outline">
                        <a href={campaign.caseStudyUrl} target="_blank" rel="noreferrer">
                          Download Case Study
                        </a>
                      </Button>
                    )}
                    {campaign.externalUrl && (
                      <Button asChild>
                        <a href={campaign.externalUrl} target="_blank" rel="noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> View Live
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
