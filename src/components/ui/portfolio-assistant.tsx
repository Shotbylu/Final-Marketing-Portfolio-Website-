'use client';

import React, { useState, useEffect } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getPortfolioAssistantResponse } from '@/app/actions/ai';
import { campaigns } from '@/lib/campaigns';

export function PortfolioAssistant() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');
    const [suggestedProjects, setSuggestedProjects] = useState<Array<{
        id: string;
        title: string;
        employer: string;
        summary: string;
    }>>([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError('');
        setResponse('');
        setSuggestedProjects([]);

        try {
            const result = await getPortfolioAssistantResponse(query);
            if (result.success) {
                setResponse(result.response);
                setSuggestedProjects(result.suggestedProjects || []);
            }
        } catch (e) {
            console.error(e);
            setError('Failed to connect to AI service');
        } finally {
            setLoading(false);
        }
    };

    const exampleQuestions = [
        "What services do you offer?",
        "Tell me about your SEO experience",
        "Show me FMCG campaigns",
        "What's your experience with Meta Ads?",
    ];

    if (!mounted) return null;

    return (
        <section className="py-16 bg-white border-y border-gray-100">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-10">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary">
                        <Sparkles size={16} />
                        <span className="text-sm font-semibold">AI-Powered Assistant</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Ask Me Anything</h2>
                    <p className="text-gray-600 text-lg">
                        Ask about my services, experience, or request relevant case studies. I'll provide personalized answers.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto mb-8">
                    <form onSubmit={handleSubmit} className="flex gap-2 relative" suppressHydrationWarning>
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g., What&#39;s your experience with CRM systems?"
                            className="h-14 pl-6 pr-14 rounded-full border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-primary shadow-sm text-lg"
                            suppressHydrationWarning
                        />
                        <Button
                            type="submit"
                            disabled={loading || !query.trim()}
                            className="absolute right-2 top-2 bottom-2 rounded-full w-10 h-10 p-0 bg-primary hover:bg-primary/90 text-black font-bold"
                        >
                            {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                        </Button
                    </form>
                    {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
                </div>

                {/* Example Questions */}
                {!response && !loading && (
                    <div className="max-w-2xl mx-auto mb-12">
                        <p className="text-sm text-gray-500 mb-3 text-center">Try asking:</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {exampleQuestions.map((question, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setQuery(question)}
                                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* AI Response */}
                {response && (
                    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                    <Sparkles size={16} className="text-black" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-900 leading-relaxed whitespace-pre-line">{response}</p>
                                </div>
                            </div>
                        </div>

                        {/* Ask Another Question Button */}
                        <div className="flex justify-center mb-8">
                            <button
                                onClick={() => {
                                    setResponse('');
                                    setSuggestedProjects([]);
                                    setQuery('');
                                    setError('');
                                }}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full transition-colors shadow-md hover:shadow-lg"
                            >
                                <Sparkles size={18} />
                                Ask Another Question
                            </button>
                        </div>

                        {/* Suggested Projects */}
                        {suggestedProjects.length > 0 && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Relevant Case Studies</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {suggestedProjects.map((project) => {
                                        const fullProject = campaigns.find(c => c.id === project.id);
                                        return (
                                            <div
                                                key={project.id}
                                                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <h4 className="font-bold text-gray-900 leading-tight">{project.title}</h4>
                                                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                                                        {project.employer}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{project.summary}</p>
                                                {fullProject && (
                                                    <a
                                                        href="#work"
                                                        className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                                                    >
                                                        View Full Case Study →
                                                    </a>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
