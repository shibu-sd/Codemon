import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Autocomplete, Typography } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from "axios";

const tags = [
    'Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math', 'Sorting', 'Greedy', 'Depth-First Search',
    'Binary Search', 'Database', 'Breadth-First Search', 'Tree', 'Matrix', 'Two Pointers', 'Bit Manipulation',
    'Binary Tree', 'Heap (Priority Queue)', 'Stack', 'Prefix Sum', 'Simulation', 'Graph', 'Design', 'Counting',
    'Sliding Window', 'Backtracking', 'Union Find', 'Linked List', 'Enumeration', 'Ordered Set', 'Monotonic Stack',
    'Trie', 'Number Theory', 'Divide and Conquer', 'Recursion', 'Queue', 'Bitmask', 'Binary Search Tree', 'Segment Tree',
    'Memoization', 'Binary Indexed Tree', 'Geometry', 'Topological Sort', 'Combinatorics', 'Game Theory', 'Hash Function',
    'Shortest Path', 'Interactive', 'String Matching', 'Data Stream', 'Rolling Hash', 'Brainteaser', 'Monotonic Queue',
    'Randomized', 'Merge Sort', 'Iterator', 'Concurrency', 'Doubly-Linked List', 'Probability and Statistics', 'Quickselect',
    'Bucket Sort', 'Suffix Array', 'Minimum Spanning Tree', 'Counting Sort', 'Shell', 'Line Sweep', 'Reservoir Sampling',
    'Strongly Connected Component', 'Eulerian Circuit', 'Radix Sort', 'Rejection Sampling', 'Biconnected Component'
];

const difficultyOptions = ["easy", "medium", "hard"];

function EditProblem({ isAuthenticated }) {
    if (isAuthenticated) {

        const params = useParams();
        const [problem, setProblem] = useState({
            id: '',
            title: '',
            description: '',
            constraints: '',
            sampleInput: '',
            sampleOutput: '',
            difficulty: difficultyOptions[0],
            selectedTags: [],
            testCases: [],
            outputOfTestCases: [],
        });

        const handleChange = (field) => (e) => {
            setProblem({
                ...problem,
                [field]: e.target.value,
            });
        };

        const handleTagsChange = (_, value) => {
            setProblem({
                ...problem,
                selectedTags: value,
            });
        };

        const handleAddTestCase = () => {
            const newTestCases = [...problem.testCases, ''];
            const newOutputOfTestCases = [...problem.outputOfTestCases, ''];

            setProblem({
                ...problem,
                testCases: newTestCases,
                outputOfTestCases: newOutputOfTestCases,
            });
        };

        const handleTestCaseChange = (index, field) => (e) => {
            const newTestCases = [...problem.testCases];
            const newOutputOfTestCases = [...problem.outputOfTestCases];

            if (field === 'input') {
                newTestCases[index] = e.target.value;
            } else if (field === 'output') {
                newOutputOfTestCases[index] = e.target.value;
            }

            setProblem({
                ...problem,
                testCases: newTestCases,
                outputOfTestCases: newOutputOfTestCases,
            });
        };

        const handleSubmit = async () => {
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_BASE_URL}/admin/editproblem`,
                    {
                        id: problem.id,
                        title: problem.title,
                        description: problem.description,
                        constraints: problem.constraints,
                        sampleInput: problem.sampleInput,
                        sampleOutput: problem.sampleOutput,
                        difficulty: problem.difficulty,
                        tags: problem.selectedTags,
                        testCases: problem.testCases,
                        outputOfTestCases: problem.outputOfTestCases,
                    },
                    {
                        headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
                    }
                );
                console.log(response);
                alert("Problem updated !")
                window.location = "/admin/";
            } 
            catch (error) {
                console.error(error);
            }
        };

        return (
            <div style={{ width: "80%", margin: "auto" }}>
                <Typography variant="h4" sx={{ mt: 3, mb: 3 }}> Editing Problem : {params.id} </Typography>
                <Box>
                    <TextField label="ID" value={problem.id} onChange={handleChange('id')} fullWidth margin="normal" autoFocus />
                    <TextField label="Title" value={problem.title} onChange={handleChange('title')} fullWidth margin="normal" />
                    <TextField
                        label="Description"
                        multiline
                        rows={6}
                        value={problem.description}
                        onChange={handleChange('description')}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Constraints"
                        multiline
                        rows={2}
                        value={problem.constraints}
                        onChange={handleChange('constraints')}
                        fullWidth
                        margin="normal"
                    />
                    <TextField label="Sample Input" multiline value={problem.sampleInput} onChange={handleChange('sampleInput')} fullWidth margin="normal" />
                    <TextField label="Sample Output" multiline value={problem.sampleOutput} onChange={handleChange('sampleOutput')} fullWidth margin="normal" />

                    <Autocomplete
                        options={difficultyOptions}
                        value={problem.difficulty}
                        onChange={(e, value) => setProblem({ ...problem, difficulty: value })}
                        renderInput={(params) => <TextField {...params} label="Difficulty" fullWidth margin="normal" />}
                    />

                    <Autocomplete
                        multiple
                        id="tags"
                        options={tags}
                        value={problem.selectedTags}
                        onChange={handleTagsChange}
                        renderInput={(params) => <TextField {...params} label="Tags" fullWidth margin="normal" />}
                    />

                    {problem.testCases.map((_, index) => (
                        <Box key={index}>
                            <TextField
                                label={`Test Case ${index + 1} Input`}
                                multiline
                                value={problem.testCases[index]}
                                onChange={handleTestCaseChange(index, 'input')}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label={`Test Case ${index + 1} Output`}
                                multiline
                                value={problem.outputOfTestCases[index]}
                                onChange={handleTestCaseChange(index, 'output')}
                                fullWidth
                                margin="normal"
                            />
                        </Box>
                    ))}

                    <Button variant="contained" size="large" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={handleAddTestCase} sx={{ mt: 3, mb: 10 }}>
                        Add Test Case
                    </Button>

                    <Button variant="contained" size="large" color="success" startIcon={<DoneAllIcon />} onClick={handleSubmit} sx={{ mt: 3, ml: 5, mb: 10 }}>
                        Update
                    </Button>
                </Box>
            </div>
        )
    }
}

export default EditProblem