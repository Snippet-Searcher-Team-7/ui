import {Compliance, CreateSnippet, Snippet, SnippetDescriptor, SnippetType, UpdateSnippet} from "@/data/snippet";
import axios from 'axios';
import {StoredSnippet} from "@/data/info/snippetStore";


export class RequestManager {

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
        else if (status == "FAILED") {
            return 'failed'
        }
        else if (status == "COMPLIANT") {
            return 'compliant'
        }
        else {
            return 'not-compliant'
        }
    }



    updateSnippet(id: string, updateSnippet: UpdateSnippet) {

    }
    updateFormattingRules(userId: string, rules: Map<string, string>) {
        this.postRequest('http://localhost:8081/rule/updateFormatterRules/' + userId, rules, () => {

        }, ()=> {
            console.log("error in /rule/updateFormatterRules")
        })
    }

    updateLinterRules(userId: string, rules: Map<string, string>) {
        this.postRequest('http://localhost:8081/rule/updateScaRules/' + userId, rules, () => {

        }, ()=> {
            console.log("error in /rule/updateScaRules")
        })
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