import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Paper,
  Button,
  Checkbox,
  Container,
  FormGroup,
  Typography,
  FormControlLabel,
} from '@mui/material';

import route from 'src/routes';
import questions from 'src/_mock/vark-test';
import { addResult } from 'src/api/varkSlice';

import { Loader } from 'src/sections/loader';

function Vark() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([
    { key: '', value: false },
    { key: '', value: false },
    { key: '', value: false },
    { key: '', value: false },
  ]);
  const [state, setState] = useState('menu');
  const [currentQuestion, setCurrentQuestion] = useState(questions.length - 1);
  const [results, setResults] = useState({ v: 0, a: 0, r: 0, k: 0 });
  const [arrayNumbers, setArrayNumbers] = useState(Array.from(Array(questions.length - 1).keys()));

  const vark = useSelector((store) => store.vark);
  const current = questions.length - arrayNumbers.length;
  const percentage = (current / questions.length) * 100;
  const isEndOfQuestions = arrayNumbers.length <= 0;

  const handleChange = (e, i) => {
    const arr = [...checked];
    arr[i] = { key: e.target.value, value: e.target.checked };
    setChecked(() => [...arr]);
  };

  const handleNext = () => {
    if (!checked[0].value && !checked[1].value && !checked[2].value && !checked[3].value) return;
    checked.map((checkBox) => {
      if (checkBox.key === 'V') setResults((prev) => ({ ...prev, v: prev.v + 1 }));
      else if (checkBox.key === 'A') setResults((prev) => ({ ...prev, a: prev.a + 1 }));
      else if (checkBox.key === 'R') setResults((prev) => ({ ...prev, r: prev.r + 1 }));
      else if (checkBox.key === 'K') setResults((prev) => ({ ...prev, k: prev.k + 1 }));
      return null;
    });
    setChecked([
      { key: '', value: false },
      { key: '', value: false },
      { key: '', value: false },
      { key: '', value: false },
    ]);
    if (isEndOfQuestions) {
      // Can create a state for it and calculate them just one, it's used around line 200
      const res = {
        v: results.v / questions.length,
        a: results.a / questions.length,
        r: results.r / questions.length,
        k: results.k / questions.length,
      };
      dispatch(addResult(res));
      setState('result');
      setCurrentQuestion(questions.length - 1);
      setArrayNumbers(Array.from(Array(questions.length - 1).keys()));
    } else {
      const randomNumber = Math.floor(Math.random() * arrayNumbers.length);
      setCurrentQuestion(arrayNumbers[randomNumber]);
      arrayNumbers.splice(randomNumber, 1);
    }
  };

  const handleReset = () => {
    setChecked([
      { key: '', value: false },
      { key: '', value: false },
      { key: '', value: false },
      { key: '', value: false },
    ]);
    setState('menu');
    setArrayNumbers(Array.from(Array(questions.length - 1).keys()));
    setResults({ v: 0, a: 0, r: 0, k: 0 });
  };

  //   const handlePrevious = () => {
  //     setChecked([
  //       { key: '', value: false },
  //       { key: '', value: false },
  //       { key: '', value: false },
  //       { key: '', value: false },
  //     ]);
  //     setCurrentQuestion((prev) => prev - 1);
  //   };

  return (
    <>
      <Helmet>
        <title>Vark Questionnaire</title>
      </Helmet>

      <Container className="d-flex justify-content-center align-items-center flex-column min-vh-100">
        {vark.loading ? (
          <Loader />
        ) : (
          <>
            {state === 'menu' && (
              <Paper elevation={3} className="p-5 w-100 rounded-5 text-center">
                <Typography variant="h2">The VARK Questionnaire (Version 8.01)</Typography>
                <Typography variant="h4" mb={3}>
                  How Do I Learn Best?
                </Typography>
                <Typography variant="body1" mb={4}>
                  Choose the answer which best explains your preference and circle the letter(s)
                  next to it. Please circle more than one if a single answer does not match your
                  perception. Leave blank any question that does not apply.
                </Typography>
                <Button variant="contained" onClick={() => setState('quiz')}>
                  Start Quiz
                </Button>
              </Paper>
            )}

            {state === 'quiz' && (
              <Paper elevation={3} className="p-5 w-75 rounded-5">
                <Box>
                  <Box
                    className="progress"
                    role="progressbar"
                    aria-label="Animated striped example"
                    aria-valuenow={percentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <Box
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      style={{ width: `${percentage}%` }}
                    />
                  </Box>
                  <Typography variant="h6" mb={2}>
                    {`Question: ${current}/${questions.length}`}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4">
                    {`${current}) ${questions[currentQuestion]?.question}`}
                  </Typography>
                  {questions[currentQuestion]?.options.map((option, i) => (
                    <FormGroup key={option.key}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked[i].value}
                            onChange={(e) => handleChange(e, i)}
                            value={option.answer}
                          />
                        }
                        label={`${option.key}. ${option.value}`}
                      />
                    </FormGroup>
                  ))}
                </Box>
                <Box className="d-flex justify-content-between align-items-center mt-3">
                  <Button variant="outlined" onClick={handleReset}>
                    Reset
                  </Button>

                  <Button
                    variant="contained"
                    color={isEndOfQuestions ? 'success' : 'primary'}
                    onClick={handleNext}
                    disabled={
                      !checked[0].value &&
                      !checked[1].value &&
                      !checked[2].value &&
                      !checked[3].value
                    }
                  >
                    {isEndOfQuestions ? 'View Score' : 'Next Question'}
                  </Button>
                </Box>
              </Paper>
            )}
            {state === 'result' && (
              <Paper elevation={3} className="p-5 w-75 rounded-5">
                <Box className="row justify-content-center">
                  <Box className="col-6 mt-5 text-center">
                    <Typography variant="h3">
                      Visual: {Math.ceil((results.v / questions.length) * 100)} %
                    </Typography>
                  </Box>
                  <Box className="col-6 mt-5 text-center">
                    <Typography variant="h3">
                      Auditory: {Math.ceil((results.a / questions.length) * 100)} %
                    </Typography>
                  </Box>
                  <Box className="col-6 mt-5 text-center">
                    <Typography variant="h3">
                      Read&Write: {Math.ceil((results.r / questions.length) * 100)} %
                    </Typography>
                  </Box>
                  <Box className="col-6 mt-5 text-center">
                    <Typography variant="h3">
                      kinaesthetic: {Math.ceil((results.k / questions.length) * 100)} %
                    </Typography>
                  </Box>
                </Box>
                <Box className="d-flex justify-content-center align-items-center mt-5">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setResults({ v: 0, a: 0, r: 0, k: 0 });
                      setState('menu');
                      navigate(route.login);
                    }}
                  >
                    Go to home
                  </Button>
                </Box>
              </Paper>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default Vark;
