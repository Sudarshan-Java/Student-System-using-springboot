import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Button, Paper, Typography, TextField } from '@mui/material';

// Styling using makeStyles
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: '10px 0',
        },
    },
    jsonContainer: {
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        marginTop: '20px',
        whiteSpace: 'pre-wrap',
        fontFamily: 'monospace',
    },
}));

export default function Student() {
    const paperStyle = { padding: '50px 20px', width: 800, margin: '20px auto' };
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [students, setStudents] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const classes = useStyles();

    const loadStudents = () => {
        fetch('http://localhost:8090/student/getAll')
            .then(async (res) => {
                if (!res.ok) throw new Error('Failed to fetch');
                const text = await res.text();
                return text ? JSON.parse(text) : [];
            })
            .then((result) => setStudents(result))
            .catch((error) => {
                console.error('Error loading students:', error);
                setStudents([]);
            });
    };

    const handleClick = (e) => {
        e.preventDefault();
        const student = { name, address };

        const url = isUpdate
            ? `http://localhost:8090/student/update/${updateId}`
            : 'http://localhost:8090/student/add';

        const method = isUpdate ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student),
        })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to save student');
                return res.text();
            })
            .then(() => {
                console.log(isUpdate ? 'Student updated' : 'New student added');
                setIsUpdate(false);
                setUpdateId(null);
                setName('');
                setAddress('');
                loadStudents();
            })
            .catch((error) => {
                console.error('Error saving student:', error);
                alert('Failed to save student');
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            fetch(`http://localhost:8090/student/delete/${id}`, {
                method: 'DELETE',
            })
                .then((res) => {
                    if (!res.ok) throw new Error('Delete failed');
                    return res.text();
                })
                .then(() => {
                    console.log('Student deleted');
                    loadStudents();
                })
                .catch((error) => {
                    console.error('Error deleting student:', error);
                    alert('Failed to delete student');
                });
        }
    };

    const handleUpdate = (student) => {
        setIsUpdate(true);
        setUpdateId(student.id);
        setName(student.name);
        setAddress(student.address);
    };

    useEffect(() => {
        loadStudents();
    }, []);

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <Typography variant="h4" gutterBottom style={{ color: 'blue' }}>
                    {isUpdate ? 'Update Student' : 'Add Student'}
                </Typography>

                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        label="Student Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Student Address"
                        variant="outlined"
                        fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button variant="contained" color="secondary" onClick={handleClick}>
                        {isUpdate ? 'Update' : 'Submit'}
                    </Button>
                    {isUpdate && (
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                                setIsUpdate(false);
                                setUpdateId(null);
                                setName('');
                                setAddress('');
                            }}
                        >
                            Cancel
                        </Button>
                    )}
                </form>
            </Paper>

            <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                Students List
                <Button
                    variant="contained"
                    color="primary"
                    onClick={loadStudents}
                    style={{ marginLeft: '20px' }}
                >
                    Refresh List
                </Button>
            </Typography>

            <Paper elevation={3} className={classes.jsonContainer}>
                {students && students.length > 0 ? (
                    <pre>{JSON.stringify(students, null, 2)}</pre>
                ) : (
                    <Typography>No students found</Typography>
                )}
            </Paper>
        </Container>
    );
}
