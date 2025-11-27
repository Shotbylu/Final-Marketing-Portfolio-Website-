'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
} from 'lucide-react';
import { submitContactForm, type ContactFormState } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  popia: z.boolean().refine((val) => val === true, { message: "You must accept the terms and conditions." }),
});

function SubmitButton() {
  return (
    <Button
      type="submit"
      className="w-full bg-black text-white py-4 font-bold tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors mt-4"
    >
      SEND MESSAGE
    </Button>
  );
}

export function Contact() {
  const { toast } = useToast();
  const [state, setState] = useState<ContactFormState | undefined>();
  const [mounted, setMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "General Inquiry",
      message: "",
      popia: false,
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    const result = await submitContactForm(undefined, formData);
    setState(result);
  }

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Success!",
        description: state.message,
      });
      form.reset();
    } else if (state?.message) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast, form]);

  if (!mounted) return null;

  return (
    <section id="contact" className="py-24 bg-zinc-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-light mb-6">
              Available for{' '}
              <span className="text-primary font-serif italic">
                remote collaboration
              </span>
              .
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Based in Johannesburg. Open to freelance work and consulting.
              Whether you need a paid media audit or a custom machine learning
              model for your data, let&apos;s discuss.
            </p>

            <div className="space-y-6 mt-12">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-zinc-800 rounded-sm flex items-center justify-center border border-zinc-700">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    Location
                  </div>
                  <div className="font-medium">Johannesburg, South Africa</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-zinc-800 rounded-sm flex items-center justify-center border border-zinc-700">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    Email
                  </div>
                  <a href="mailto:lsibisi@icloud.com" className="font-medium hover:text-primary transition-colors">lsibisi@icloud.com</a>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <a
                href="#"
                className="p-3 bg-zinc-800 hover:bg-white hover:text-black transition-colors rounded-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="p-3 bg-zinc-800 hover:bg-white hover:text-black transition-colors rounded-sm"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="p-3 bg-zinc-800 hover:bg-white hover:text-black transition-colors rounded-sm"
                aria-label="Instagram Profile"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-sm text-gray-900">
            <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" suppressHydrationWarning>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="name@company.co.za" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Subject</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                          <SelectItem value="Paid Media Audit">Paid Media Audit</SelectItem>
                          <SelectItem value="Data Science Project">Data Science Project</SelectItem>
                          <SelectItem value="Web Development">Web Development</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell me about your project..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="popia"
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-3 pt-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="grid gap-1.5 leading-none">
                        <FormLabel className="text-xs text-gray-400 leading-tight">
                          I consent to having this website store my submitted information for the purpose of responding to my inquiry, in accordance with the{' '}
                          <span className="underline">POPI Act</span>.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <SubmitButton />
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
