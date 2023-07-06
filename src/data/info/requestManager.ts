import {Compliance, CreateSnippet, Snippet, SnippetDescriptor, SnippetType, UpdateSnippet} from "@/data/snippet";
import {v4 as uuid} from "uuid";
import axios from 'axios';
import {StoredSnippet} from "@/data/fake/fakeSnippetStore";

// export type StoredSnippet = {
//     id: string
//     name: string
//     type: SnippetType
//     content: string
//     compliance: Compliance
// }


export class RequestManager {
    private readonly snippetMap: Map<string, StoredSnippet> = new Map()

    constructor() {
        this.getSnippetsOfUser("1", (list => {
            list.forEach(snippet => {
                this.snippetMap.set(snippet.id, snippet)
            })
        }))
    }

    getSnippetsOfUser(id: string, response) {
        this.getRequest('http://localhost:8081/snippet/getAllSnippets/' + id,
            (data) => {
                let list: StoredSnippet[] = []
                data.forEach(snippet => {
                    list.push(
                        {id: snippet.id + "",
                            name: snippet.snippetName,
                            type: snippet.type.toLowerCase(),
                            content: snippet.snippetText,
                            compliance: this.adaptStatus(snippet.status)}
                    )
                })
                response(list)
            },
            (error) => {
                console.log("ERROR")
                response(null)
            })
    }
    private adaptStatus(status: String):Compliance {
        if (status == "PENDING") {
            return 'pending'
        }
        else if (status == "INVALID") {
            return 'failed'
        }
        else if (status == "VALID") {
            return 'compliant'
        }
        else {
            return 'not-compliant'
        }
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

        return snippet
    }

    getSnippetById(id: string): Snippet | undefined {
        console.log(id)
        console.log(this.snippetMap)
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

        return newSnippet
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

    private postRequest(url, data, okCallback, errorCallback) {
        axios.post(url, data)
            .then(function (response) {
                okCallback(response.data)
            })
            .catch(function (error) {
                errorCallback(error)
            });
    }
    private getRequest(url, okCallback, errorCallback) {
        axios.get(url)
            .then(function (response) {
                okCallback(response.data)
            })
            .catch(function (error) {
                errorCallback(error)
            });
    }
}