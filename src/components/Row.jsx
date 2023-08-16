import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCorrectWordCount, setInCorrectGuessCount } from '../redux/userSlice'

export default function Row({ guess, currentGuess, incorrectGuess }) {
    const themeMode = useSelector((state) => state.theme.themeMode)
    const wordsGuessed = useSelector((state) => state.user.wordsGuessed)
    const words = useSelector((state) => state.user.words)
    const correctWordsCount = useSelector((state) => state.user.correctWordsCount)
    const incorrectGuessCount = useSelector((state) => state.user.incorrectGuessCount)

    const [currentWordArray, setCurrentWordArray] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        if (words.length !== 0) {
            setCurrentWordArray(words[wordsGuessed].split(''))

        }
    }, [words, wordsGuessed])



    useEffect(() => {
        if (guess !== undefined) {
            const allColorsAreGreen = guess.every(l => l.color === 'green');
            const keys = guess.map(l => l.key);
            const joinedKeys = keys.join('');

            if (allColorsAreGreen) {
                dispatch(setCorrectWordCount({ joinedKeys, wordsGuessed }));
                dispatch(setInCorrectGuessCount({ joinedKeys, incorrectGuess }));
            }
            else {
                dispatch(setInCorrectGuessCount({ joinedKeys, incorrectGuess }));
                dispatch(setCorrectWordCount({ joinedKeys, wordsGuessed }));

            }
        }
    }, [guess]);

    if (guess) {

        const allColorsAreGreen = guess.every(l => l.color === 'green');
        const keys = guess.map(l => l.key);
        const joinedKeys = keys.join('');

        return (
            <Box
                sx={{
                    width: { xs: '100%', xs350: '100%', xs450: '100%', sm: '638px' },
                    display: "flex",
                    justifyContent: 'space-between',
                    alignItems: 'center',

                }}
            >
                {/* <Typography sx={{ fontSize: { xs: '0px', xs320: '6px', xs450: '8px', xs550: '9px', sm: '10px', zIndex: 9999 }, color: themeMode === 'light' ? "#202537" : '#FFF' }}>
                    {`Guesses Left: ${incorrectGuessCount[joinedKeys] ? (6 - incorrectGuessCount[joinedKeys]) : 6}`}
                </Typography> */}
                <Box></Box>

                <Box sx={{
                    ml: { xs: '20px', xs320: '32px', xs450: '38px', xs550: '48px', sm: '98px' },
                    mr: { xs: '20px', xs320: '4px', xs450: '2px', xs550: '5px', sm: '0px' },
                    border: allColorsAreGreen && '1px solid green',
                    borderRadius: '12px'
                    // background: allColorsAreGreen && 'green'
                }}
                >
                    {/* <div className="row past">
                         {guess.map((l, i) => (
                            // <div key={i} className={allColorsAreGreen ? 'correct' : l.color}>{l.key}</div>
                            <div key={i} className={currentWordArray[i] === l.key ? 'green' : currentWordArray.includes(l.key) ? 'yellow' : 'grey'}>{l.key}</div>
                            ))}
                        </div> */}

                    <div className="row past">
                        {guess.map((l, i) => {
                            let className;

                            if (currentWordArray[i] === l.key) {
                                if (allColorsAreGreen) {
                                    className = 'success-green';
                                } else {
                                    className = 'green';
                                }
                            } else if (currentWordArray.includes(l.key)) {
                                if (allColorsAreGreen) {
                                    className = 'success-yellow';
                                } else {
                                    className = 'yellow';
                                }
                            } else {
                                if (allColorsAreGreen) {
                                    className = 'success-grey';
                                } else {
                                    className = 'grey';
                                }
                            }

                            return (
                                <div key={i} className={className}>
                                    {l.key}
                                </div>
                            );
                        })}
                    </div>

                </Box>

                {/* <Typography sx={{ fontSize: { xs: '0px', xs320: '6px', xs450: '8px', xs550: '9px', sm: '10px' }, color: themeMode === 'light' ? "#202537" : '#FFF' }}>
                    {`Words Guessed : ${correctWordsCount[joinedKeys]}`}
                </Typography> */}
                <Typography sx={{ mr: { sm: '50px' }, fontSize: { xs: '0px', xs320: '11px', xs450: '15px', xs550: '18px', sm: '20px' }, color: themeMode === 'light' ? "#202537" : '#FFF' }}>
                    {correctWordsCount[joinedKeys]} / 20
                </Typography>

            </Box >

        )
    }

    if (currentGuess) {
        let letters = currentGuess.split('')

        return (
            <div className="row current">
                {letters.map((letter, i) => (
                    <div style={{ color: themeMode === 'light' ? '#56575E' : '#FFF' }} key={i} className="filled">{letter}</div>
                ))}
                {[...Array(5 - letters.length)].map((_, i) => (
                    <div key={i}></div>
                ))}
            </div>

        )
    }

    return (
        <Box className="row">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </Box>
    )

}