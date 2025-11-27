'use client';

import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getProjectRecommendations } from '@/app/actions/ai';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export function ProjectRecommender() {
    interface Suggestion {
        title: string;
        category: string;
        tech: string[];
        description: string;
        image: string;
    }

    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError('');
        setSuggestions([]);

        try {
            const result = await getProjectRecommendations(query);
            if (result.success && result.suggestions) {
                setSuggestions(result.suggestions);
                if (result.suggestions.length === 0) {
                    setError("No matching projects found. Try a different keyword.");
                }
            } else {
                setError(result.error || 'Something went wrong');
            }
        } catch (e) {
            console.error(e);
            setError('Failed to connect to AI service');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-16 bg-white border-y border-gray-100">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Find Relevant Case Studies</h2>
                    <p className="text-gray-600 text-lg">
                        Tell me what you&apos;re looking for (e.g., &quot;FMCG campaigns&quot;, &quot;Lead generation&quot;, &quot;Video production&quot;)
                        and I&apos;ll suggest the most relevant projects.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto mb-16">
                    <form onSubmit={handleSubmit} className="flex gap-2 relative">
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Describe what you're looking for..."
                            className="h-14 pl-6 pr-14 rounded-full border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-primary shadow-sm text-lg"
                        />
                        <Button
                            type="submit"
                            disabled={loading || !query.trim()}
                            className="absolute right-2 top-2 bottom-2 rounded-full w-10 h-10 p-0 bg-primary hover:bg-primary/90 text-black font-bold"
                        >
                            {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                        </Button>
                    </form>
                    {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
                </div>

                {suggestions.length > 0 && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {suggestions.map((project, index) => (
                            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow border-gray-200">
                                <div className="relative h-48 w-full bg-gray-100">
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                                    )}
                                </div>
                                <CardHeader className="p-4 pb-2">
                                    <div className="flex justify-between items-start gap-2">
                                        <CardTitle className="text-lg font-bold leading-tight">{project.title}</CardTitle>
                                    </div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">{project.category}</p>
                                </CardHeader>
                                <CardContent className="p-4 pt-2">
                                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {project.tech.slice(0, 3).map((t: string, i: number) => (
                                            <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600">
                                                {t}
                                            </Badge>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600">
                                                +{project.tech.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
