import {Compliance, CreateSnippet, Snippet, SnippetDescriptor, SnippetType, UpdateSnippet} from "@/data/snippet";
import {v4 as uuid} from "uuid";
import {RequestManager} from "@/data/real/requestManager";



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
    private readonly userId:string | null | undefined;

    constructor(userId: string | null | undefined) {
        this.userId = userId;
        this.requestManager.getSnippetsOfUser(userId, (list => {
            if (list != null){
                list.forEach(snippet => {
                    this.snippetMap.set(snippet.id, snippet)
                })
            }
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

        this.requestManager.createSnippet(this.userId, snippet);

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

        this.requestManager.updateSnippet(this.userId, updateSnippet, id);

        return newSnippet
    }
    getFormattingRules(okCallback, errorCallback) {
        this.requestManager.getFormattingRules(this.userId, okCallback, errorCallback);
    }

    getLinterRules(okCallback, errorCallback) {
        this.requestManager.getLinterRules(this.userId, okCallback, errorCallback);
    }
    updateFormattingRules(rules) {
        this.requestManager.updateFormattingRules(this.userId, rules)
    }

    updateLinterRules(rules) {
        this.requestManager.updateLinterRules(this.userId, rules)
    }

}