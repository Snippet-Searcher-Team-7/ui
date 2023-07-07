import {CreateSnippet, Snippet, SnippetDescriptor, UpdateSnippet} from '@/data/snippet'

export interface SnippetOperations {
  listSnippetDescriptors(): Promise<SnippetDescriptor[]>

  createSnippet(createSnippet: CreateSnippet): Promise<SnippetDescriptor>

  getSnippetById(id: string): Promise<Snippet | undefined>

  updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<SnippetDescriptor>

  getFormattingRules(userId: string, okCallback, errorCallback)

  getLinterRules(userId: string, okCallback, errorCallback)

  updateFormattingRules(userId: string, rules)

  updateLinterRules(userId: string, rules)

  executeSnippet(id: String) : Promise<String>

  shareSnippet(snippetId: String, sharedUserId: String)

  createTestCase(data)

  runTestCase(data): Promise<String>


}
