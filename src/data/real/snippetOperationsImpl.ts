import {SnippetOperations} from '@/data/snippetOperations'
import {CreateSnippet, Snippet, SnippetDescriptor, UpdateSnippet} from '@/data/snippet'
import autoBind from 'auto-bind'
import {SnippetStore} from "@/data/real/snippetStore";

const DELAY: number = 1000



export class SnippetOperationsImpl implements SnippetOperations {
    private snippetStore:SnippetStore;

    constructor(userId: string | null | undefined) {
        this.snippetStore = new SnippetStore(userId?.substring(6))
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

    getFormattingRules(okCallback, errorCallback) {
        this.snippetStore.getFormattingRules(okCallback, errorCallback);
    }

    getLinterRules(okCallback, errorCallback) {
        this.snippetStore.getLinterRules(okCallback, errorCallback);
    }

    updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<SnippetDescriptor> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.snippetStore.updateSnippet(id, updateSnippet)), DELAY)
        })
    }

    updateFormattingRules(rules) {
        this.snippetStore.updateFormattingRules(rules)
    }

    updateLinterRules(rules) {
        this.snippetStore.updateLinterRules(rules)
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