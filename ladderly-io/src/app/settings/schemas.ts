import { z } from 'zod'

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
export const isValidOptionalEmail = (value: string) =>
  value === '' || emailRegex.test(value)

export const optionalEmailValidator = z
  .string()
  .refine(isValidOptionalEmail, {
    message: 'Invalid email',
  })
  .nullable()
  .optional()

export const uriValidator = z
  .string()
  .refine((value) => value === '' || value.startsWith('http'), {
    message: 'Invalid URI',
  })
  .nullable()
  .optional()

const optionalGitHubUriValidator = z
  .string()
  .refine((value) => value === '' || value.includes('github'), {
    message: 'Invalid GitHub URL',
  })
  .nullable()
  .optional()

const optionalLinkedInUriValidator = z
  .string()
  .refine((value) => value === '' || value.includes('linkedin'), {
    message: 'Invalid LinkedIn URL',
  })
  .nullable()
  .optional()

// form schema is parsed into trpc schema in onSubmit
export const UpdateSettingsFormSchema = z.object({
  email: z.string().email(),
  emailBackup: optionalEmailValidator,
  emailStripe: optionalEmailValidator,

  hasInPersonEventInterest: z.boolean().default(false),
  hasLiveStreamInterest: z.boolean().default(false),
  hasOnlineEventInterest: z.boolean().default(false),
  hasOpenToRelocation: z.boolean().default(false),
  hasOpenToWork: z.boolean().default(false),
  hasPublicProfileEnabled: z.boolean().default(false),
  hasShoutOutsEnabled: z.boolean().default(false),
  hasSmallGroupInterest: z.boolean().default(false),

  nameFirst: z.string().nullable().optional(),
  nameLast: z.string().nullable().optional(),
  profileBlurb: z.string().nullable().optional(),
  profileContactEmail: optionalEmailValidator,
  profileCurrentJobCompany: z.string(),
  profileCurrentJobTitle: z.string(),
  profileDiscordHandle: z.string().nullable().optional(),
  profileGitHubUri: optionalGitHubUriValidator,
  profileHighestDegree: z.string().nullable().optional(),
  profileHomepageUri: uriValidator,
  profileLinkedInUri: optionalLinkedInUriValidator,
  profileTopNetworkingReasons: z.array(z.string()).default([]),
  profileTopServices: z.array(z.string()).default([]),
  profileTopSkills: z.array(z.string()).default([]),
  profileYearsOfExperience: z.string().nullable().optional(),
  residenceCountry: z.string().optional().default(''),
  residenceUSState: z.string().optional().default(''),
})
