'use server';

import { askPortfolioAssistant } from '@/ai/flows/portfolio-assistant';
import { campaigns } from '@/lib/campaigns';
import { getFallbackResponse } from '@/lib/fallback-responses';

export async function getPortfolioAssistantResponse(message: string) {
    try {
        // Map campaigns to the format expected by the AI flow
        const projectsForAI = campaigns.map((campaign) => ({
            id: campaign.id,
            title: campaign.title,
            employer: campaign.employer,
            role: campaign.role,
            period: campaign.period,
            channels: campaign.channels,
            summary: campaign.summary,
            tech: campaign.tech,
        }));

        const result = await askPortfolioAssistant({
            message,
            projects: projectsForAI,
        });

        // Map project IDs to full project objects
        const suggestedProjects = (result.suggestedProjects || [])
            .map(proj => {
                const fullCampaign = campaigns.find(c => c.id === proj.id);
                return fullCampaign ? {
                    id: proj.id,
                    title: proj.title,
                    employer: proj.employer,
                    summary: proj.summary,
                } : null;
            })
            .filter((p): p is NonNullable<typeof p> => p !== null);

        return {
            success: true,
            response: result.response,
            suggestedProjects,
        };
    } catch (error) {
        console.error('Portfolio assistant error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));

        // Use fallback system to still provide value
        const fallback = getFallbackResponse(message);

        // Map fallback project IDs to full objects
        const suggestedProjects = fallback.projects
            .map(id => {
                const campaign = campaigns.find(c => c.id === id);
                return campaign ? {
                    id: campaign.id,
                    title: campaign.title,
                    employer: campaign.employer,
                    summary: campaign.summary,
                } : null;
            })
            .filter((p): p is NonNullable<typeof p> => p !== null);

        return {
            success: true, // Return success with fallback
            response: fallback.response,
            suggestedProjects,
            isFallback: true, // Flag to indicate this is a fallback response
        };
    }
}
