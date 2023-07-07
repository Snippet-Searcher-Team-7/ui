import {SnippetOperations} from '@/data/snippetOperations'
import {FakeSnippetStore} from '@/data/fake/fakeSnippetStore'
import {CreateSnippet, Snippet, SnippetDescriptor, UpdateSnippet} from '@/data/snippet'
import autoBind from 'auto-bind'
import {SnippetStore} from "@/data/info/snippetStore";

const DELAY: number = 1000

export class SnippetOperationsImpl implements SnippetOperations {
    private snippetStore = new SnippetStore()

    constructor() {
        autoBind(this)
    }

    createSnippet(createSnippet: CreateSnippet): Promise<SnippetDescriptor> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.snippetStore.createSnippet(createSnippet)), DELAY)
        })
    }

    getSnippetById(id: string): Promise<Snippet | undefined> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.snippetStore.getSnippetById(id)), DELAY)
        })

    }

    listSnippetDescriptors(): Promise<SnippetDescriptor[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.snippetStore.listSnippetDescriptors()), DELAY)
        })
    }

    getFormattingRules(userId: string, okCallback, errorCallback) {
        this.snippetStore.getFormattingRules(userId, okCallback, errorCallback);
    }

    getLinterRules(userId: string, okCallback, errorCallback) {
        this.snippetStore.getLinterRules(userId, okCallback, errorCallback);
    }

    updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<SnippetDescriptor> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.snippetStore.updateSnippet(id, updateSnippet)), DELAY)
        })
    }

    updateFormattingRules(userId: string, rules) {
        this.snippetStore.updateFormattingRules(userId, rules)
    }

    updateLinterRules(userId: string, rules) {
        this.snippetStore.updateLinterRules(userId, rules)
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