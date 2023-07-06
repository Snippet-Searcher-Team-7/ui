import {CreateSnippet, Snippet, SnippetDescriptor, UpdateSnippet} from '@/data/snippet'

export interface SnippetOperations {
  listSnippetDescriptors(): Promise<SnippetDescriptor[]>

  createSnippet(createSnippet: CreateSnippet): Promise<SnippetDescriptor>

  getSnippetById(id: string): Promise<Snippet | undefined>

  updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<SnippetDescriptor>

  updateFormattingRules(userId: string)

  updateLinterRules(userId: string)

  executeSnippet(id: String) : Promise<String>

  shareSnippet(snippetId: String, sharedUserId: String)

  createTestCase(data)

  runTestCase(data): Promise<String>


}
