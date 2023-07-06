import {SnippetOperations} from '@/data/snippetOperations'
import {FakeSnippetStore} from '@/data/fake/fakeSnippetStore'
import {CreateSnippet, Snippet, SnippetDescriptor, UpdateSnippet} from '@/data/snippet'
import autoBind from 'auto-bind'
import {RequestManager} from "@/data/info/requestManager";

const DELAY: number = 1000

export class SnippetOperationsImpl implements SnippetOperations {
    private requestManager = new RequestManager()

    constructor() {
        autoBind(this)
    }

    createSnippet(createSnippet: CreateSnippet): Promise<SnippetDescriptor> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.requestManager.createSnippet(createSnippet)), DELAY)
        })
    }

    getSnippetById(id: string): Promise<Snippet | undefined> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.requestManager.getSnippetById(id)), DELAY)
        })

    }

    listSnippetDescriptors(): Promise<SnippetDescriptor[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.requestManager.listSnippetDescriptors()), DELAY)
        })
    }

    updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<SnippetDescriptor> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.requestManager.updateSnippet(id, updateSnippet)), DELAY)
        })
    }

    updateFormattingRules(id: string) {
    }

    updateLinterRules(id: string) {
    }

    createTestCase(data) {
    }

    executeSnippet(id: String): Promise<String> {
        return Promise.resolve("");
    }

    runTestCase(data): Promise<String> {
        return Promise.resolve("");
    }

    shareSnippet(snippetId: String, sharedUserId: String) {
    }
}