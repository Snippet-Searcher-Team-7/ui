import {SnippetOperations} from '@/data/snippetOperations'
import {FakeSnippetStore} from '@/data/fake/fakeSnippetStore'
import {CreateSnippet, Snippet, SnippetDescriptor, UpdateSnippet} from '@/data/snippet'
import autoBind from 'auto-bind'

const DELAY: number = 1000

export class FakeSnippetOperations implements SnippetOperations {
  private readonly fakeStore = new FakeSnippetStore()

  constructor() {
    autoBind(this)
  }

  createSnippet(createSnippet: CreateSnippet): Promise<SnippetDescriptor> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.fakeStore.createSnippet(createSnippet)), DELAY)
    })
  }

  getSnippetById(id: string): Promise<Snippet | undefined> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.fakeStore.getSnippetById(id)), DELAY)
    })

  }

  listSnippetDescriptors(): Promise<SnippetDescriptor[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.fakeStore.listSnippetDescriptors()), DELAY)
    })
  }

  updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<SnippetDescriptor> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.fakeStore.updateSnippet(id, updateSnippet)), DELAY)
    })
  }

  updateFormattingRules(userId: string) {
  }

  updateLinterRules(userId: string) {
  }

  getFormattingRules(okCallback, errorCallback) {
  }

  getLinterRules(okCallback, errorCallback) {
  }
}