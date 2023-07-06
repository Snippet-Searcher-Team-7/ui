"use client";
import {FC, useState} from 'react'
import {useOperations} from "@/data/operationsContext";

const SettingsPage: FC = () => {
    const [spaceBeforeColonInDeclaration, setSpaceBeforeColonInDeclaration] = useState(false);
    const [spaceAfterColonInDeclaration, setSpaceAfterColonInDeclaration] = useState(false);
    const [spaceBeforeAndAfterEqualSignInAssignment, setSpaceBeforeAndAfterEqualSignInAssignment] = useState(false);
    const [amountOfLineBreaksBeforePrintLn, setAmountOfLineBreaksBeforePrintLn] = useState(0);
    const [AmountOfIndentedInIfBlock, setAmountOfIndentedInIfBlock] = useState(0);
    const [IfKeyInSameLine, setIfKeyInSameLine] = useState(false);

    const [caseConvention, setCaseConvention] = useState("camel case");
    const [printLnCondition, setPrintLnCondition] = useState(false);
    const [readInputCondition, setReadInputCondition] = useState(false);

    const {snippetOperations} = useOperations()

    const caseOptions = [
        "camel case",
        "snake case"
    ]

    const handleFormatSubmit =()=> {
        console.log("format")
        snippetOperations.updateFormattingRules("1", new Map<string, string>([
            ["spaceBeforeColonInDeclaration", spaceBeforeColonInDeclaration + ""],
            ["spaceAfterColonInDeclaration", spaceAfterColonInDeclaration + ""],
            ["spaceBeforeAndAfterEqualSignInAssignment", spaceBeforeAndAfterEqualSignInAssignment + ""],
            ["amountOfLineBreaksBeforePrintLn", amountOfLineBreaksBeforePrintLn + ""],
            ["AmountOfIndentedInIfBlock", AmountOfIndentedInIfBlock + ""],
            ["IfKeyInSameLine", IfKeyInSameLine + ""]
        ]))
    }
    const handleLinterSubmit =()=> {
        console.log("lint")
        snippetOperations.updateLinterRules("1", new Map<string, string>([
            ["caseConvention", caseConvention],
            ["printLnCondition", printLnCondition + ""],
            ["readInputCondition", readInputCondition + ""]
        ]))
    }

  return (
    <>
        <form style={{color:"black"}} onSubmit={handleFormatSubmit}>
        <h1 style={{color:"black"}}>FORMAT SETTINGS</h1>


            <input
                type="checkbox"
                checked={spaceBeforeColonInDeclaration}
                onChange={e => setSpaceBeforeColonInDeclaration(e.target.checked)}
            />
            Space before colon
            <br/>
            <input
                type="checkbox"
                checked={spaceAfterColonInDeclaration}
                onChange={e => setSpaceAfterColonInDeclaration(e.target.checked)}
            />
            Space after colon
            <br/>
            <input
                type="checkbox"
                checked={spaceBeforeAndAfterEqualSignInAssignment}
                onChange={e => setSpaceBeforeAndAfterEqualSignInAssignment(e.target.checked)}
            />
            Space before and after equal sign
            <br/>
            <input
                type="number"
                value={amountOfLineBreaksBeforePrintLn}
                min="0"
                max="3"
                onChange={e => setAmountOfLineBreaksBeforePrintLn(e.currentTarget.valueAsNumber)}
            />
            Amount of line breaks before print
            <br/>
            <input
                type="number"
                value={AmountOfIndentedInIfBlock}
                min="0"
                onChange={e => setAmountOfIndentedInIfBlock(e.currentTarget.valueAsNumber)}
            />
            Amount of indentation in 'if' block
            <br/>
            <input
                type="checkbox"
                checked={IfKeyInSameLine}
                onChange={e => setIfKeyInSameLine(e.target.checked)}
            />
            'if' key in same line

        <br/>
            <br/>
            <br/>
            <input type="submit" value="Submit"/>
        </form>
        <form style={{color:"black"}} onSubmit={handleLinterSubmit}>
            <h1>LINTER SETTINGS</h1>
            <input
                type="text"
                value={caseConvention}
                onChange={e => setCaseConvention(e.currentTarget.value)}
            />
            Case convention
            <br/>
            <input
                type="checkbox"
                checked={printLnCondition}
                onChange={e => setPrintLnCondition(e.target.checked)}
            />
            Print condition
            <br/>
            <input
                type="checkbox"
                checked={readInputCondition}
                onChange={e => setReadInputCondition(e.target.checked)}
            />
            Read input condition

            <br/>
            <br/>
            <br/>
            <input type="submit" value="Submit"/>
        </form>
    </>
  )
}

export default SettingsPage