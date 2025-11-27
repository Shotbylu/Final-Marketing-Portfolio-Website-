'use server';

/**
 * @fileOverview A flow to suggest relevant projects based on user interests expressed in the contact form.
 *
 * - suggestRelevantProjects - A function that takes user message and project details as input and returns suggested projects.
 * - SuggestRelevantProjectsInput - The input type for the suggestRelevantProjects function.
 * - SuggestRelevantProjectsOutput - The return type for the suggestRelevantProjects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelevantProjectsInputSchema = z.object({
  message: z.string().describe('The message from the contact form expressing user interests.'),
  projects: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      category: z.string(),
      tech: z.array(z.string()),
      description: z.string(),
      image: z.string(),
    })
  ).describe('An array of available projects.'),
});
export type SuggestRelevantProjectsInput = z.infer<typeof SuggestRelevantProjectsInputSchema>;

const SuggestRelevantProjectsOutputSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    category: z.string(),
    tech: z.array(z.string()),
    description: z.string(),
    image: z.string(),
  })
).describe('An array of relevant projects based on user interests.');
export type SuggestRelevantProjectsOutput = z.infer<typeof SuggestRelevantProjectsOutputSchema>;

export async function suggestRelevantProjects(
  input: SuggestRelevantProjectsInput
): Promise<SuggestRelevantProjectsOutput> {
  return suggestRelevantProjectsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelevantProjectsPrompt',
  input: {schema: SuggestRelevantProjectsInputSchema},
  output: {schema: SuggestRelevantProjectsOutputSchema},
  prompt: `You are an expert portfolio curator. A user has submitted the following message via a contact form:

  """{{message}}"""

  Based on their message, identify the projects from the following list that would be most relevant to their interests.  Return ONLY the projects that are relevant.  If no projects are relevant, return an empty array.

  Return the projects as a JSON array.

  Here are the available projects:
  """\n{{#each projects}}
  {
    "id": {{id}},
    "title": "{{title}}",
    "category": "{{category}}",
    "tech": [{{#each tech}}"{{this}}",{{/each}}],
    "description": "{{description}}",
    "image": "{{image}}"\n  }{{^last}},{{/last}}
  {{/each}}
  """
`,
});

const suggestRelevantProjectsFlow = ai.defineFlow(
  {
    name: 'suggestRelevantProjectsFlow',
    inputSchema: SuggestRelevantProjectsInputSchema,
    outputSchema: SuggestRelevantProjectsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
