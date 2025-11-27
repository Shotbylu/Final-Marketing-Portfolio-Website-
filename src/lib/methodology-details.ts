export const methodologyDetails = {
    'Paid Media Strategy': {
        title: 'Paid Media Strategy',
        subtitle: 'Full-Funnel Optimization Across Meta, Google, and LinkedIn',
        approach: 'I architect data-driven paid media campaigns that convert ad spend into measurable revenue. My approach combines strategic planning, creative excellence, and continuous optimization.',
        process: [
            {
                step: '1. Strategic Foundation',
                description: 'I start by analyzing your business objectives, target audience, and competitive landscape. Using tools like Meta Business Suite, Google Analytics 4, and LinkedIn Campaign Manager, I build a comprehensive audience strategy with detailed persona mapping.',
                outcome: 'Clear campaign objectives, KPIs, and budget allocation across channels'
            },
            {
                step: '2. Campaign Architecture',
                description: 'I design full-funnel campaigns with distinct strategies for awareness, consideration, and conversion. Each campaign is structured for optimal performance with proper tracking, UTM parameters, and conversion events.',
                outcome: 'Scalable campaign structure with clear attribution and measurement'
            },
            {
                step: '3. Creative Direction',
                description: 'I develop video-led creative strategies that stop the scroll. Working with designers and videographers, I ensure every asset is optimized for platform-specific best practices and audience preferences.',
                outcome: 'High-performing creative assets with proven engagement rates'
            },
            {
                step: '4. Launch & Optimization',
                description: 'I monitor campaigns daily, analyzing CTR, CPC, CPM, and conversion metrics. Using A/B testing and multivariate analysis, I continuously refine targeting, bidding, and creative to maximize ROAS.',
                outcome: 'Sustained performance improvement and efficient budget utilization'
            }
        ],
        results: [
            '4.2:1 ROAS on retail campaigns for Mazda SA',
            '28% increase in engagement rates through video-led creative',
            'Managed R10M+ in annual media budgets',
            'Maintained 2.8%+ CTR across automotive campaigns'
        ],
        tools: ['Meta Ads Manager', 'Google Ads', 'LinkedIn Campaign Manager', 'TikTok Ads Manager', 'GA4', 'Power BI']
    },
    'Technical Implementation': {
        title: 'Technical Implementation',
        subtitle: 'Building Custom Solutions for Marketing Automation',
        approach: 'I bridge the gap between marketing strategy and technical execution by building custom tools, dashboards, and automation workflows that solve real business problems.',
        process: [
            {
                step: '1. Problem Analysis',
                description: 'I identify inefficiencies in existing workflows and data processes. Through stakeholder interviews and process mapping, I define technical requirements that align with business objectives.',
                outcome: 'Clear technical specifications and success metrics'
            },
            {
                step: '2. Solution Design',
                description: 'I architect scalable solutions using Python, React, and FastAPI. Whether it\'s a custom dashboard, API integration, or automation script, I design for maintainability and performance.',
                outcome: 'Technical blueprints and development roadmap'
            },
            {
                step: '3. Development & Testing',
                description: 'I build production-ready code with proper error handling, logging, and documentation. Every solution undergoes rigorous testing to ensure reliability and data accuracy.',
                outcome: 'Deployed, tested, and documented technical solutions'
            },
            {
                step: '4. Training & Handover',
                description: 'I create comprehensive documentation and conduct training sessions to ensure teams can effectively use and maintain the solutions I build.',
                outcome: 'Empowered teams with sustainable technical capabilities'
            }
        ],
        results: [
            'Built POPIA-compliant CRM system handling 1000+ leads monthly',
            'Automated reporting workflows saving 20+ hours per week',
            'Developed custom dashboards for real-time campaign monitoring',
            'Created API integrations connecting HubSpot, GA4, and Meta'
        ],
        tools: ['Python', 'React', 'FastAPI', 'HubSpot API', 'Google Apps Script', 'Power BI', 'SQL']
    },
    'Data Science & ML': {
        title: 'Data Science & Machine Learning',
        subtitle: 'Turning Data into Actionable Insights',
        approach: 'I use advanced analytics and machine learning to uncover deep user insights, predict trends, and optimize marketing performance beyond basic reporting.',
        process: [
            {
                step: '1. Data Collection & Cleaning',
                description: 'I aggregate data from multiple sources (GA4, CRM, social platforms) and clean it for analysis. Using Python (Pandas, NumPy), I ensure data quality and consistency.',
                outcome: 'Clean, structured datasets ready for analysis'
            },
            {
                step: '2. Exploratory Analysis',
                description: 'I conduct deep-dive analysis to identify patterns, correlations, and anomalies. Using statistical methods and visualization tools, I uncover insights that inform strategy.',
                outcome: 'Data-driven insights and opportunity identification'
            },
            {
                step: '3. Predictive Modeling',
                description: 'I build machine learning models to predict customer behavior, forecast campaign performance, and optimize budget allocation. Using scikit-learn and TensorFlow, I create models that drive decisions.',
                outcome: 'Predictive models with measurable accuracy improvements'
            },
            {
                step: '4. Visualization & Reporting',
                description: 'I create interactive dashboards and reports that make complex data accessible to stakeholders. Using Power BI and Python visualization libraries, I tell compelling data stories.',
                outcome: 'Clear, actionable insights presented to decision-makers'
            }
        ],
        results: [
            'Improved lead scoring accuracy by 35% using ML models',
            'Predicted campaign performance with 85%+ accuracy',
            'Identified high-value customer segments driving 60% of revenue',
            'Optimized budget allocation increasing overall ROAS by 22%'
        ],
        tools: ['Python (Pandas, Scikit-learn)', 'Power BI', 'GA4', 'SQL', 'Jupyter Notebooks', 'TensorFlow']
    }
};

export type MethodologyKey = keyof typeof methodologyDetails;
