import {FakeSnippetStore} from '@/data/fake/fakeSnippetStore'
import {z} from 'zod'

export const ComplianceSchema = z.enum(['pending', 'failed', 'not-compliant', 'compliant'])
export type Compliance = z.infer<typeof ComplianceSchema>

export const SnippetTypeSchema = z.enum(['printscript'])
export type SnippetType = z.infer<typeof SnippetTypeSchema>

export const SnippetDescriptorSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: SnippetTypeSchema,
  compliance: ComplianceSchema
})
export type SnippetDescriptor = z.infer<typeof SnippetDescriptorSchema>

export const SnippetSchema = SnippetDescriptorSchema.and(z.object({
  content: z.string()
}))
export type Snippet = z.infer<typeof SnippetSchema>

export const CreateSnippetSchema = z.object({
  name: z.string(),
  type: SnippetTypeSchema,
  content: z.string()
})
export type CreateSnippet = z.infer<typeof CreateSnippetSchema>

export const UpdateSnippetSchema = z.object({
  content: z.string()
})
export type UpdateSnippet = z.infer<typeof UpdateSnippetSchema>
