import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SendIcon from '@mui/icons-material/Send';
import DoneIcon from '@mui/icons-material/Done';
import CodeMirror from '@uiw/react-codemirror';
import { monokai } from "@uiw/codemirror-theme-monokai";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";

function Problem({ isAuthenticated }) {
    const params = useParams();
    const [code, setCode] = useState("// Type your code here");
    const [problem, setProblem] = useState({});
    const languages = [cpp(), java(), python()];
    const [selectedLanguage, setSelectedLanguage] = useState(0);
    const [codefontSize, setcodeFontSize] = useState(16);
    const [isDarkTheme, setisDarkTheme] = useState(true);
    const [userInput, setuserInput] = useState("");
    const [userOutput, setuserOutput] = useState("");

    const [isCompiling, setisCompiling] = useState(false);
    const [isJudging, setisJudging] = useState(false);
    const [result, setResult] = useState("");

    const [username, setUsername] = useState("");

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handlecodefontSize = (event) => {
        setcodeFontSize(event.target.value);
    }

    const toggleDarkMode = () => {
        setisDarkTheme((prevMode) => !prevMode);
    };

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    }

    const handleRunCode = async () => {
        try {
            setisCompiling(true);
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/compile`, { "id": params.id, "code": code, "input": userInput, "language": selectedLanguage },
                { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });

            const data = response.data.output;
            setuserOutput(data.output);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setisCompiling(false);
        }
    }

    const handleCodeSubmit = async () => {
        try {
            setisJudging(true);
            setResult("");
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/submit`, { "id": params.id, "code": code, "language": selectedLanguage, "username" : username, problemTitle : problem.title },
                { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });

            const data = response.data.result;
            setResult(data);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setisJudging(false);
        }
    };

    function difficultyColor(difficulty) {
        let color;
        if (difficulty == "easy") {
            color = "success";
        }
        else if (difficulty == "medium") {
            color = "warning";
        }
        else {
            color = "error";
        }
        return color;
    }

    useEffect(() => {
        const getProblem = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/problemset/` + params.id, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
                setProblem(response.data.problem);
            }
            catch (error) {
                console.log(error);
            }
        }

        getProblem();
    }, [params.id])

    // to get the username inorder to deal with when solution is accepted
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/me`, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
                const data = response.data;
                setUsername(data.user.username);
            }
            catch (error) {
                console.log(error);
            }
        }

        getUser();
    }, [])

    if (isAuthenticated) {
        return (
            <div style={{ display: 'flex', padding: 3 }}>
                <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc' }}>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: 32, mr: 5 }}> {problem.title} </Typography>
                        <Button variant="contained" color={difficultyColor(problem.difficulty)}>{problem.difficulty}</Button>
                    </div>

                    <Typography sx={{ mt: 5, whiteSpace: 'pre-line' }}>
                        {problem.description}
                    </Typography>

                    <Typography sx={{ fontSize: 18, mt: 5 }}>
                        <b>Constraints : </b>
                    </Typography>
                    <Box
                        sx={{ whiteSpace: 'pre-line', backgroundColor: '#f0f0f0', width: 'fit-content', display: 'inline-block', padding: 0 }}>
                        {problem.constraints && (
                            <ul>
                                {problem.constraints.split('\n').map((constraint, index) => (
                                    <Typography key={index} sx={{ marginBottom: 1 }}><li key={index}>{constraint}</li></Typography>
                                ))}
                            </ul>
                        )}
                    </Box>

                    <div style={{ display: 'flex', marginTop: 10 }}>
                        <div style={{ flex: 1, marginRight: 10, display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontSize: 18, mt: 5, mb: 1 }}>
                                <b>Sample Input: </b>
                            </Typography>
                            <Box sx={{ backgroundColor: '#f0f0f0', padding: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box component="ul" sx={{ listStyleType: 'none', padding: 0, flex: 1 }} >
                                    {problem.sampleInput &&
                                        typeof problem.sampleInput === 'string' &&
                                        problem.sampleInput.split('\n').map((input, index) => (
                                            <li key={index} style={{ marginBottom: 4 }}>
                                                <Typography key={index} sx={{ mt: 1 }}>{input}</Typography>
                                            </li>
                                        ))}
                                </Box>
                            </Box>
                        </div>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontSize: 18, mt: 5, mb: 1 }}>
                                <b>Sample Output: </b>
                            </Typography>
                            <Box sx={{ backgroundColor: '#f0f0f0', padding: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box component="ul" sx={{ listStyleType: 'none', padding: 0, flex: 1 }} >
                                    {problem.sampleOutput &&
                                        typeof problem.sampleOutput === 'string' &&
                                        problem.sampleOutput.split('\n').map((output, index) => (
                                            <li key={index} style={{ marginBottom: 4 }}>
                                                <Typography key={index} sx={{ mt: 1 }}>{output}</Typography>
                                            </li>
                                        ))}
                                </Box>
                            </Box>
                        </div>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: 18, mt: 5, mb: 1 }}>
                            <b>Tags: </b>
                        </Typography>
                        <Box sx={{ backgroundColor: '#f0f0f0', padding: 2, flex: 1, display: 'flex', flexDirection: 'column', mb: 5 }}>
                            <Typography sx={{ mt: 1 }}>{problem.tags && problem.tags.join(', ')}</Typography>
                        </Box>
                    </div>
                </div>


                <div style={{ flex: 1, padding: '20px' }}>
                    <FormControl sx={{ width: 200 }}>
                        <InputLabel id="language-selector-label" sx={{ fontSize: 18 }}>Language</InputLabel>
                        <Select labelId="language-selector-label" id="language-selector" value={selectedLanguage} label="Select Language" onChange={handleLanguageChange}>
                            <MenuItem value={0}>C++</MenuItem>
                            <MenuItem value={1}>Java</MenuItem>
                            <MenuItem value={2}>Python</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ width: 200, ml: 5 }}>
                        <InputLabel id="font-selector-label" sx={{ fontSize: 18 }}>Font Size</InputLabel>
                        <Select labelId="font-selector-label" id="font-selector" value={codefontSize} label="Font Size" onChange={handlecodefontSize}>
                            <MenuItem value={14}>14 px</MenuItem>
                            <MenuItem value={16}>16 px</MenuItem>
                            <MenuItem value={18}>18 px</MenuItem>
                            <MenuItem value={24}>24 px</MenuItem>
                            <MenuItem value={32}>32 px</MenuItem>
                        </Select>
                    </FormControl>

                    <Button sx={{ ml: 5 }} variant="contained" color="inherit" onClick={toggleDarkMode}>
                        {isDarkTheme ? <DarkModeIcon sx={{ fontSize: 36 }} /> : <LightModeIcon sx={{ fontSize: 36 }} />}
                    </Button>

                    <CodeMirror
                        value={code}
                        height="600px"
                        {...(isDarkTheme && { theme: monokai })}
                        extensions={languages[selectedLanguage]}
                        onChange={handleCodeChange}
                        style={{ marginTop: 20, fontSize: codefontSize }}
                    />

                    <TextField
                        label="Input"
                        multiline
                        color="primary"
                        rows={10}
                        variant="filled"
                        sx={{ width: 300, marginTop: 5 }}
                        onChange={(e) => { setuserInput(e.target.value) }}
                    />

                    <TextField
                        value={userOutput}
                        label="Output"
                        multiline
                        color="primary"
                        rows={10}
                        variant="filled"
                        sx={{ width: 300, marginTop: 5, ml: 5 }}
                        InputProps={{
                            readOnly: true
                        }}
                    />

                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 50 }}>
                        {isCompiling ?
                            <Button variant="contained" color="inherit" size="large" sx={{ mr: 3 }} >
                                Compiling <CircularProgress sx={{ ml: 2, color: "black" }} />
                            </Button>
                            :
                            <Button variant="contained" color="error" startIcon={<SendIcon />} size="large" sx={{ mr: 3 }} onClick={handleRunCode} >
                                Run Code
                            </Button>
                        }

                        {isJudging ?
                            <Button variant="contained" color="inherit" size="large" sx={{ mr: 3 }} >
                                Judging <CircularProgress sx={{ ml: 2, color: "black" }} />
                            </Button>
                            :
                            <Button variant="contained" color="success" size="large" sx={{ mr: 3 }} startIcon={<DoneIcon />} onClick={handleCodeSubmit} >
                                Submit
                            </Button>
                        }

                        {result !== "" &&
                            <Typography sx={{ fontSize: 28 }}>
                                Verdict : <span style={{ color: (result === "Accepted") ? "green" : "blue" }}>{result}</span>
                            </Typography>
                        }
                    </div>

                </div>
            </div>
        );
    }
}

export default Problem;
