import React, { useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormGroup,
  Typography,
  FormControlLabel,
} from '@mui/material';

import questions from 'src/_mock/vark-test';

import { Loader } from 'src/sections/loader';

function Vark() {
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

  const loading = false;
  const current = questions.length - arrayNumbers.length;
  const percentage = ((current - 1) / questions.length) * 100;
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
      setState('result');
      setCurrentQuestion(questions.length - 1);
      setArrayNumbers(Array.from(Array(questions.length - 1).keys()));
    } else {
      const randomNumber = Math.floor(Math.random() * arrayNumbers.length);
      setCurrentQuestion(arrayNumbers[randomNumber]);
      arrayNumbers.splice(randomNumber, 1);
    }
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
    <Container className="d-flex justify-content-center align-items-center flex-column min-vh-100">
      {loading ? (
        <Loader />
      ) : (
        <>
          {state === 'menu' && (
            <Box className="p-5 w-100 text-center">
              <Typography variant="h2">The VARK Questionnaire (Version 8.01)</Typography>
              <Typography variant="h4" mb={3}>
                How Do I Learn Best?
              </Typography>
              <Typography variant="body1" mb={4}>
                Choose the answer which best explains your preference and circle the letter(s) next
                to it. Please circle more than one if a single answer does not match your
                perception. Leave blank any question that does not apply.
              </Typography>
              <Button variant="contained" onClick={() => setState('quiz')}>
                Start Quiz
              </Button>
            </Box>
          )}
          {state === 'quiz' && (
            <Box className="p-5 w-75 border border-black rounded-5">
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
                {/* {currentQuestion > 0 && (
        <Button variant="outlined" onClick={handlePrevious}>
          Previous Question
        </Button>
      )} */}

                <Button
                  variant="contained"
                  color={isEndOfQuestions ? 'success' : 'primary'}
                  onClick={handleNext}
                  disabled={
                    !checked[0].value && !checked[1].value && !checked[2].value && !checked[3].value
                  }
                >
                  {isEndOfQuestions ? 'View Score' : 'Next Question'}
                </Button>
              </Box>
            </Box>
          )}
          {state === 'result' && (
            <Box className="p-5 w-75">
              <Box className="row justify-content-center">
                <Box className="col-6 mt-5 text-center">
                  <Typography variant="h3">
                    Visual: {(results.v / questions.length) * 100} %
                  </Typography>
                </Box>
                <Box className="col-6 mt-5 text-center">
                  <Typography variant="h3">
                    Auditory: {(results.a / questions.length) * 100} %
                  </Typography>
                </Box>
                <Box className="col-6 mt-5 text-center">
                  <Typography variant="h3">
                    Read&Write: {(results.r / questions.length) * 100} %
                  </Typography>
                </Box>
                <Box className="col-6 mt-5 text-center">
                  <Typography variant="h3">
                    kinaesthetic: {(results.k / questions.length) * 100} %
                  </Typography>
                </Box>
              </Box>
              <Box className="d-flex justify-content-center align-items-center mt-5">
                <Button
                  variant="contained"
                  onClick={() => {
                    setResults({ v: 0, a: 0, r: 0, k: 0 });
                    setState('menu');
                  }}
                >
                  Return to home
                </Button>
              </Box>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}

export default Vark;
