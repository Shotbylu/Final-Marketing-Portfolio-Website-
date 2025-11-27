/**
 * Fallback responses when AI is unavailable
 * These ensure users always get helpful information about services
 */

export const fallbackResponses: Record<string, { response: string; projects?: string[] }> = {
    services: {
        response: "I offer comprehensive digital marketing services including:\n\n• **SEO & Technical Optimization** - Keyword research, on-page optimization, and technical SEO\n• **Paid Social Media** - Expert management of Meta Ads, Google Ads, LinkedIn Ads, and TikTok Ads\n• **Social Media Management** - Content creation, community engagement, and brand storytelling\n• **CRM & Marketing Automation** - HubSpot implementation, lead nurturing, and POPIA-compliant data handling\n• **Digital Marketing Strategy** - Full-funnel campaign architecture and performance optimization\n• **Analytics & Reporting** - GA4, Power BI dashboards, and ROI tracking\n\nI've delivered results for major brands in Automotive (Mazda), Energy (Sasol), Mining (South32), and Education sectors.",
        projects: ['mazda-brand-meaning-lvl2-2025', 'sasol-green-future-2024']
    },

    seo: {
        response: "My SEO expertise includes technical SEO, on-page optimization, content strategy, and competitive analysis. I've successfully driven organic growth for automotive and energy sector clients, focusing on keyword research, site architecture, and conversion optimization. I use tools like GA4, SEMrush, and implement data-driven strategies that deliver measurable ROI.",
        projects: []
    },

    meta: {
        response: "I specialize in Meta Ads (Facebook & Instagram) with proven results:\n\n• Achieved 4.2:1 ROAS on retail campaigns\n• Managed multi-million rand budgets\n• Expert in full-funnel architecture (prospecting, retargeting, lead nurture)\n• A/B testing and daily optimization\n• Video-led creative direction\n\nI've run successful campaigns for Mazda SA, driving engagement rates up 28% and maintaining CTRs above 2.8%.",
        projects: ['mazda-brand-meaning-lvl2-2025', 'mazda-gfv-q3-2025', 'mazdacare-warranty-2025']
    },

    crm: {
        response: "I'm a certified CRM architect specializing in HubSpot implementation and marketing automation:\n\n• POPIA-compliant lead management systems\n• Email marketing and lead nurturing workflows\n• CRM hygiene and data quality management\n• Integration with sales and dealer networks\n• Lead scoring and routing automation\n\nI've built and managed CRM systems for Mazda SA, handling thousands of leads monthly with full compliance and dealer alignment.",
        projects: ['mazda-brand-meaning-lvl2-2025']
    },

    campaigns: {
        response: "I've executed successful campaigns across multiple industries:\n\n**Automotive** - Mazda SA: Brand campaigns, retail promotions, and service plan marketing\n**Energy** - Sasol: Strategic communications and stakeholder engagement\n**Mining** - South32: Internal communications and community campaigns\n**Education** - Initium: B2B marketing and brand development\n\nAll campaigns feature data-driven strategy, creative excellence, and measurable results.",
        projects: ['mazda-brand-meaning-lvl2-2025', 'sasol-green-future-2024', 'south32-community-2024', 'initium-b2b-acceleration-2025']
    },

    experience: {
        response: "I bring 3+ years of digital marketing experience across diverse industries:\n\n**Current** - Digital Marketing Specialist at Mazda Southern Africa (2025)\n**Previous** - Communications Officer at Sasol (2024)\n**Previous** - Marketing & Alumni Lead at South32 (2022)\n**Previous** - Marketing & Brand Strategist at Initium Venture Solutions (2024-2025)\n\nI've managed budgets exceeding R10M, delivered 4.2:1 ROAS, and built POPIA-compliant systems serving thousands of users.",
        projects: []
    },

    default: {
        response: "I'm a Digital Marketing Specialist based in Johannesburg, specializing in converting ad spend into revenue. My core expertise includes SEO, paid social media (Meta, Google, LinkedIn, TikTok), CRM architecture, and data-driven campaign strategy.\n\nI've worked with major brands like Mazda, Sasol, and South32, delivering measurable results through full-funnel marketing, creative direction, and performance optimization.\n\nFeel free to ask about specific services, view my case studies below, or contact me to discuss your marketing needs!",
        projects: ['mazda-brand-meaning-lvl2-2025', 'sasol-green-future-2024']
    }
};

export function getFallbackResponse(query: string): { response: string; projects: string[] } {
    const lowerQuery = query.toLowerCase();

    // Match keywords to responses
    if (lowerQuery.includes('service') || lowerQuery.includes('offer') || lowerQuery.includes('do you do')) {
        return { response: fallbackResponses.services.response, projects: fallbackResponses.services.projects || [] };
    }

    if (lowerQuery.includes('seo') || lowerQuery.includes('search engine')) {
        return { response: fallbackResponses.seo.response, projects: fallbackResponses.seo.projects || [] };
    }

    if (lowerQuery.includes('meta') || lowerQuery.includes('facebook') || lowerQuery.includes('instagram') || lowerQuery.includes('social media ads')) {
        return { response: fallbackResponses.meta.response, projects: fallbackResponses.meta.projects || [] };
    }

    if (lowerQuery.includes('crm') || lowerQuery.includes('hubspot') || lowerQuery.includes('automation')) {
        return { response: fallbackResponses.crm.response, projects: fallbackResponses.crm.projects || [] };
    }

    if (lowerQuery.includes('campaign') || lowerQuery.includes('case stud') || lowerQuery.includes('work') || lowerQuery.includes('project')) {
        return { response: fallbackResponses.campaigns.response, projects: fallbackResponses.campaigns.projects || [] };
    }

    if (lowerQuery.includes('experience') || lowerQuery.includes('background') || lowerQuery.includes('about you')) {
        return { response: fallbackResponses.experience.response, projects: fallbackResponses.experience.projects || [] };
    }

    // Default response
    return { response: fallbackResponses.default.response, projects: fallbackResponses.default.projects || [] };
}
