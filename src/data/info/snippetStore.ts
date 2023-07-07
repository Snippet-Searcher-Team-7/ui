import {Compliance, CreateSnippet, Snippet, SnippetDescriptor, SnippetType, UpdateSnippet} from "@/data/snippet";
import {v4 as uuid} from "uuid";
import {RequestManager} from "@/data/info/requestManager";


export type StoredSnippet = {
    id: string
    name: string
    type: SnippetType
    content: string
    compliance: Compliance
}


export class SnippetStore {
    private readonly snippetMap: Map<string, StoredSnippet> = new Map()
    private requestManager: RequestManager = new RequestManager()

    constructor() {
        this.requestManager.getSnippetsOfUser("1", (list => {
            list.forEach(snippet => {
                this.snippetMap.set(snippet.id, snippet)
            })
        }))
    }


    listSnippetDescriptors(): SnippetDescriptor[] {
        return Array.from(this.snippetMap, ([_, value]) => value)
    }

    createSnippet(createSnippet: CreateSnippet): SnippetDescriptor {
        const snippet: StoredSnippet = {
            id: uuid(),
            name: createSnippet.name,
            content: createSnippet.content,
            type: createSnippet.type,
            compliance: 'compliant'
        }

        this.snippetMap.set(snippet.id, snippet)

        this.requestManager.createSnippet("1", snippet);

        return snippet
    }

    getSnippetById(id: string): Snippet | undefined {
        return this.snippetMap.get(id)
    }

    updateSnippet(id: string, updateSnippet: UpdateSnippet): SnippetDescriptor {
        const existingSnippet = this.snippetMap.get(id)

        if (existingSnippet === undefined)
            throw Error(`Snippet with id ${id} does not exist`)

        const newSnippet = {
            ...existingSnippet,
            ...updateSnippet
        }
        this.snippetMap.set(id, newSnippet)

        this.requestManager.updateSnippet("1", updateSnippet, id);

        return newSnippet
    }
    getFormattingRules(userId: string, okCallback, errorCallback) {
        this.requestManager.getFormattingRules(userId, okCallback, errorCallback);
    }

    getLinterRules(userId: string, okCallback, errorCallback) {
        this.requestManager.getLinterRules(userId, okCallback, errorCallback);
    }
    updateFormattingRules(userId: string, rules) {
        this.requestManager.updateFormattingRules(userId, rules)
    }

    updateLinterRules(userId: string, rules) {
        this.requestManager.updateLinterRules(userId, rules)
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