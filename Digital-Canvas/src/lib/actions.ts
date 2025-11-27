"use server";

import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  popia: z.string().refine(val => val === "on", {
    message: "You must accept the POPIA consent to proceed.",
  }),
});

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string[] | undefined;
  };
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {

  const rawData = Object.fromEntries(formData.entries());
  const parsed = contactFormSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the errors and try again.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await addDoc(collection(db, "leads"), {
      ...parsed.data,
      createdAt: serverTimestamp(),
      status: 'new',
    });

    return { success: true, message: "Thanks for connecting. I'll review your inquiry shortly." };
  } catch (error) {
    console.error("Error submitting form:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
