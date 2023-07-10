"use client";
import * as React from 'react';
import {FC, useState, useEffect} from 'react'
import {useOperations} from "@/data/operationsContext";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

const SettingsPage: FC = () => {
    const [spaceBeforeColonInDeclaration, setSpaceBeforeColonInDeclaration] = useState(false);
    const [spaceAfterColonInDeclaration, setSpaceAfterColonInDeclaration] = useState(false);
    const [spaceBeforeAndAfterEqualSignInAssignment, setSpaceBeforeAndAfterEqualSignInAssignment] = useState(false);
    const [amountOfLineBreaksBeforePrintLn, setAmountOfLineBreaksBeforePrintLn] = useState(0);
    const [amountOfIndentedInIfBlock, setAmountOfIndentedInIfBlock] = useState(0);
    const [IfKeyInSameLine, setIfKeyInSameLine] = useState(false);

    const [caseConvention, setCaseConvention] = useState("");
    const [printLnCondition, setPrintLnCondition] = useState(false);
    const [readInputCondition, setReadInputCondition] = useState(false);

    const {snippetOperations} = useOperations()


    useEffect(() => {
        snippetOperations.getFormattingRules(
            (data) => {
            setSpaceBeforeColonInDeclaration(data.spaceBeforeColonInDeclaration === "true");
                setSpaceAfterColonInDeclaration(data.spaceAfterColonInDeclaration === "true");
                setSpaceBeforeAndAfterEqualSignInAssignment(data.spaceBeforeAndAfterEqualSignInAssignment === "true");
                setAmountOfLineBreaksBeforePrintLn(parseInt(data.amountOfLineBreaksBeforePrintLn));
                setAmountOfIndentedInIfBlock(parseInt(data.amountOfIndentedInIfBlock));
                setIfKeyInSameLine(data.IfKeyInSameLine === "true");
            },
            (error) => {
            console.log(error)
            })

        snippetOperations.getLinterRules(
            (data) => {
                setCaseConvention(data.caseConvention);
                setPrintLnCondition(data.printLnCondition === "true");
                setReadInputCondition(data.readInputCondition === "true");
            },
            (error) => {
                console.log(error)
            })

    }, [])
    const handleFormatSubmit = async e => {
        e.preventDefault();
        snippetOperations.updateFormattingRules({
            spaceBeforeColonInDeclaration:spaceBeforeColonInDeclaration,
            spaceAfterColonInDeclaration:spaceAfterColonInDeclaration,
            spaceBeforeAndAfterEqualSignInAssignment:spaceBeforeAndAfterEqualSignInAssignment,
            amountOfLineBreaksBeforePrintLn:amountOfLineBreaksBeforePrintLn,
            amountOfIndentedInIfBlock:amountOfIndentedInIfBlock,
            IfKeyInSameLine:IfKeyInSameLine
        })
    }
    const handleLinterSubmit = async e => {
        e.preventDefault();
        snippetOperations.updateLinterRules({
            caseConvention:caseConvention,
            printLnCondition:printLnCondition,
            readInputCondition:readInputCondition
        })
    }

  return (
    <>
        <form style={{color:"black"}} onSubmit={handleFormatSubmit}>
        <h1>FORMAT SETTINGS</h1>
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
                value={amountOfIndentedInIfBlock}
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
            <input type="submit"/>
        </form>
        <br/>
        <br/>
        <form style={{color:"black"}} onSubmit={handleLinterSubmit}>
            <h1>LINTER SETTINGS</h1>
            <div>
                <InputLabel id="demo-simple-select-label">Case convention</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={caseConvention}
                    label="Age"
                    onChange={e => setCaseConvention(e.target.value)}
                >
                    <MenuItem value={"snake case"}>Snake case</MenuItem>
                    <MenuItem value={"camel case"}>Camel case</MenuItem>
                </Select>
            </div>
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
            <input type="submit" value="Submit"/>
        </form>
    </>
  )
}

export default SettingsPage