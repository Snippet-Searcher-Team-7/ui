import {Compliance, CreateSnippet, Snippet, SnippetDescriptor, SnippetType, UpdateSnippet} from "@/data/snippet";
import axios from 'axios';
import {StoredSnippet} from "@/data/real/snippetStore";
import {useUser} from "@auth0/nextjs-auth0/client";




export class RequestManager {
    private snippet_service_url:string = "https://snippetteam7dev.ddns.net/snippet-api";

    getSnippetsOfUser(id: string | null | undefined, response) {
        if (id != null){
            this.getRequest(this.snippet_service_url + '/snippet/getAllSnippets/' + id,
                (data) => {
                    let list: StoredSnippet[] = []
                    if (data != null){
                        data.forEach(snippet => {
                            list.push(
                                {id: snippet.id + "",
                                    name: snippet.snippetName,
                                    type: snippet.type.toLowerCase(),
                                    content: snippet.snippetText,
                                    compliance: this.adaptStatus(snippet.status)}
                            )
                        })
                        console.log("getSnippets sucessful")
                        response(list)
                    }
                },
                (error) => {
                    console.log(error)
                })
        }
        else{
            let list: StoredSnippet[] = []
            response(list)
        }

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

    createSnippet(userId: string | null | undefined, snippet: StoredSnippet) {
        this.postRequest(this.snippet_service_url + '/snippet/save/base64encoded/' + userId, {
                content:btoa(snippet.content),
                snippetName:snippet.name,
                type:snippet.type.toUpperCase(),
                version:1.1
            },
            () => {
                console.log("snippet created")
            },
            (error)=> {
                console.log(error)
            })

    }



    updateSnippet(userId: string | null | undefined, updateSnippet: UpdateSnippet, snippetId: string) {
        this.postRequest(this.snippet_service_url + '/snippet/save/update/base64encoded/' + userId, {
                content:btoa(updateSnippet.content),
                id: snippetId
        },
            () => {
                console.log("snippet updated")
            },
            (error)=> {
                console.log(error)
            })

    }

    getFormattingRules(userId: string | null | undefined, okCallback, errorCallback) {
        this.getRequest(this.snippet_service_url + '/rule/get/formatter/' + userId,
            (data) => {
                okCallback(data)
            },
            (error) => {
                errorCallback(error)
            })
    }

    getLinterRules(userId: string | null | undefined, okCallback, errorCallback) {
        this.getRequest(this.snippet_service_url + '/rule/get/sca/' + userId,
            (data) => {
                okCallback(data)
            },
            (error) => {
                errorCallback(error)
            })
    }
    updateFormattingRules(userId: string | null | undefined, rules) {
        this.postRequest(this.snippet_service_url + '/rule/updateFormattingRules/' + userId, rules, () => {
            console.log("updated formatting rules")
        }, (error)=> {
            console.log(error)
        })
    }

    updateLinterRules(userId: string | null | undefined, rules) {
        this.postRequest(this.snippet_service_url + '/rule/updateScaRules/' + userId, rules, () => {
            console.log("updated linter rules")
        }, (error)=> {
            console.log(error)
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