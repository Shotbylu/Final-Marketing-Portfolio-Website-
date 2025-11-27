'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import type { MethodologyKey } from '@/lib/methodology-details';
import { methodologyDetails } from '@/lib/methodology-details';

interface MethodologyModalProps {
    isOpen: boolean;
    onClose: () => void;
    methodologyKey: MethodologyKey | null;
}

export function MethodologyModal({ isOpen, onClose, methodologyKey }: MethodologyModalProps) {
    if (!methodologyKey) return null;

    const details = methodologyDetails[methodologyKey];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-gray-900">{details.title}</DialogTitle>
                    <p className="text-lg text-primary font-semibold mt-2">{details.subtitle}</p>
                </DialogHeader>

                <div className="space-y-8 mt-6">
                    {/* Approach */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">My Approach</h3>
                        <p className="text-gray-700 leading-relaxed">{details.approach}</p>
                    </div>

                    {/* Process */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Execution Process</h3>
                        <div className="space-y-6">
                            {details.process.map((item, index) => (
                                <div key={index} className="relative pl-8 pb-6 border-l-2 border-primary/30 last:border-l-0 last:pb-0">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-white" />
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">{item.step}</h4>
                                    <p className="text-gray-700 mb-3 leading-relaxed">{item.description}</p>
                                    <div className="flex items-start gap-2 text-sm">
                                        <ArrowRight size={16} className="text-primary mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-600 italic">{item.outcome}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Results */}
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Proven Results</h3>
                        <div className="grid gap-3">
                            {details.results.map((result, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <CheckCircle2 size={20} className="text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-800 font-medium">{result}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tools */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Tools & Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                            {details.tools.map((tool, index) => (
                                <Badge key={index} variant="secondary" className="px-3 py-1.5 text-sm font-medium bg-gray-100 text-gray-800">
                                    {tool}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
